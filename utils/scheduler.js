import cron from 'node-cron';
import Subscription from '../models/subscription.model.js';
import User from '../models/user.model.js';
import { sendReminderEmail } from './send_email.js';

// Function to send reminder emails based on renewal dates
const sendScheduledReminders = async () => {
  try {
    console.log('🔄 Running scheduled reminder check...');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find subscriptions that need reminders
    const subscriptions = await Subscription.find({
      paymentStatus: 'active',
      paymentRenewalDate: { $gte: today }
    }).populate('user', 'name email');
    
    console.log(`📊 Found ${subscriptions.length} active subscriptions`);
    
    let remindersSent = 0;
    
    for (const subscription of subscriptions) {
      const renewalDate = new Date(subscription.paymentRenewalDate);
      const daysUntilRenewal = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
      
      console.log(`📅 Subscription: ${subscription.name}, Renewal: ${renewalDate.toDateString()}, Days until renewal: ${daysUntilRenewal}`);
      
      let reminderType = null;
      
      // Determine which reminder to send based on days until renewal
      if (daysUntilRenewal === 7) {
        reminderType = "7 days before reminder";
      } else if (daysUntilRenewal === 5) {
        reminderType = "5 days before reminder";
      } else if (daysUntilRenewal === 2) {
        reminderType = "2 days before reminder";
      } else if (daysUntilRenewal === 1) {
        reminderType = "1 days before reminder";
      }
      
      console.log(`🎯 Reminder type for ${subscription.name}: ${reminderType || 'No reminder needed'}`);
      
      // Send reminder if it matches a scheduled day
      if (reminderType && subscription.user && subscription.user.email) {
        try {
          console.log(`📧 Attempting to send ${reminderType} to ${subscription.user.email} for ${subscription.name}`);
          
          await sendReminderEmail({
            to: subscription.user.email,
            type: reminderType,
            subscription: {
              ...subscription.toObject(),
              user: subscription.user,
              renewalDate: subscription.paymentRenewalDate
            }
          });
          
          console.log(`✅ Sent ${reminderType} to ${subscription.user.email} for ${subscription.name}`);
          remindersSent++;
        } catch (error) {
          console.error(`❌ Failed to send reminder for subscription ${subscription._id}:`, error.message);
        }
      } else {
        console.log(`⚠️ Skipping ${subscription.name}: reminderType=${reminderType}, user=${!!subscription.user}, email=${subscription.user?.email}`);
      }
    }
    
    console.log(`📧 Scheduled reminders completed. Sent ${remindersSent} reminders.`);
    
  } catch (error) {
    console.error('❌ Error in scheduled reminder system:', error);
  }
};

// Schedule the reminder check to run daily at 9:00 AM
const startReminderScheduler = () => {
  console.log('⏰ Starting subscription reminder scheduler...');
  
  // Run daily at 9:00 AM
  cron.schedule('0 9 * * *', async () => {
    console.log('🕘 Daily reminder check triggered at 9:00 AM');
    await sendScheduledReminders();
  }, {
    scheduled: true,
    timezone: "UTC"
  });
  
  console.log('✅ Reminder scheduler started successfully');
};

export { startReminderScheduler, sendScheduledReminders };
