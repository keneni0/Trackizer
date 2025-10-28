import { emailTemplates } from './email_template.js'
import dayjs from 'dayjs'
import transporter, { accountEmail } from '../config/nodemailer.js'

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if(!to || !type) throw new Error('Missing required parameters');

  const template = emailTemplates.find((t) => t.label === type);

  if(!template) throw new Error('Invalid email type');

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate || subscription.paymentRenewalDate).format('MMM D, YYYY'),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
    accountSettingsLink: 'https://your-app.com/settings',
    supportLink: 'https://your-app.com/support',
  }

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: message,
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        console.error('❌ Error sending email:', error);
        reject(error);
      } else {
        console.log('✅ Email sent successfully:', info.response);
        resolve(info);
      }
    });
  });
}