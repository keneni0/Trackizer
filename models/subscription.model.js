import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    price: {
        type: Number,
        required: [true, 'Subscription Price is required'],
        min: [0, 'Subscription Price must be greater than 0']
    },
    currency: {
        type: String,
        required: [true, 'Subscription Currency is required'],
        enum: ['USD', 'EUR', 'GBP', 'INR'],
        default: 'USD'
    },
    frequency: {
        type: String,
        required: [true, 'Subscription Frequency is required'],
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        required: [true, 'Subscription Category is required'],
        enum: ['food', 'entertainment', 'shopping', 'other']
    },
    paymentMethod: {
        type: String,
        required: [true, 'Subscription Payment Method is required'],
        enum: ['card', 'bank transfer', 'paypal', 'other']
    },
    paymentStatus: {
        type: String,
        required: [true, 'Subscription Payment Status is required'],
        enum: ['active', 'cancelled', 'expired']
    },
    paymentStartDate: {
        type: Date,
        required: [true, 'Subscription Payment Start Date is required'],
        validate: {
            validator: function(value) {
                return value <= new Date();
            },
            message: 'Subscription Payment Start Date must be in the past'
        }
    },
    paymentRenewalDate: {
        type: Date,
        required: [true, 'Subscription Payment Start Date is required'],
        validate: {
            validator: function(value) {
                return value >= this.paymentStartDate;
            },
            message: 'Subscription Payment Renewal Date must be after start date.'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Subscription User is required'],
        index:true
    }

}, {timestamps: true});

subscriptionSchema.pre('save', function(next) {
    if(!this.paymentRenewalDate && this.paymentStartDate){
        const paymentRenewalDate={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365
        };
        this.paymentRenewalDate = new Date(this.paymentStartDate);
        this.paymentRenewalDate.setDate(this.paymentRenewalDate.getDate() + paymentRenewalDate[this.frequency]);
    }
    // Autoupdate the status if renewal date has passed
    if(this.paymentRenewalDate < new Date()){
        this.paymentStatus = 'expired';
    }
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
