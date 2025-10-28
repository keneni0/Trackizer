import mongoose from 'mongoose';

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: [true,'User Name is required'],
        trim:true,
        minlength:2,
        maxlength: 50
    },
    email:{
        type: String,
        required:[true,'User Email is required'],
        unique: true,
        trim:true,
        match: [/^\S+@\S+\.\S+$/,'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'User Password is required'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
}, {
    timestamps: true
});

const User = mongoose.model('User',userSchema);

export default User;
