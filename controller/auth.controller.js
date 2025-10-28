import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import BlacklistedToken from "../models/blacklist.model.js";

export const signUp = async (req,res,next) => {
    // Implement sign up logic here

    const session =await mongoose.startSession();
    session.startTransaction();

    try{
        const { name, email, password} =req.body;

        if(!name || !email || typeof password === 'undefined'){
            const error = new Error('Name, email, and password are required.');
            error.statusCode = 400;
            throw error;
        }

        const passwordStr = String(password);
        if(passwordStr.length < 6){
            const error = new Error('Password must be at least 6 characters long.');
            error.statusCode = 400;
            throw error;
        }

        //CHECK IF A USER ALREADY EXISTS
        const existingUser = await User.findOne({ email });

        if(existingUser){
            const error =new Error('User already exists.')
            error.statusCode=409;
            throw error;
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordStr, salt);

        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });
        
        // Commit transaction BEFORE sending response
        await session.commitTransaction();
        
        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUsers[0]
            }
        });



    } catch(error){
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }

}

export const signIn = async (req,res,next) => {
    // Implement sign in logic here
    try{
        const { email, password } = req.body;

        const user =  await User.findOne({ email });

        if(!user){
            const error =new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        
        const isPasswordValid = await bcrypt.compare(String(password), user.password);
        if(!isPasswordValid){
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        
        // Remove password from user object
        const userObj = user.toObject();
        delete userObj.password;
        
        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user: userObj
            }
        });
    } catch(error){
        next(error);
    }
    
}


export const getCurrentUser = async (req, res, next) => {
    try {
        // req.user is set by the authorize middleware
        const user = await User.findById(req.user._id).select('-password');
        
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req,res,next) => {
    // Implement sign out logic here
    res.clearCookie("token", {
        httpOnly: true,
        secure:  false,   // set true if using HTTPS
        sameSite: "strict"
      });
    
     
      try {
        // Extract token from Authorization header
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
    
        if (!token) {
          return res.status(400).json({ success: false, message: "No token provided" });
        }
    
        // Decode token (just to get expiry time)
        const decoded = jwt.decode(token);
    
        if (!decoded || !decoded.exp) {
          return res.status(400).json({ success: false, message: "Invalid token" });
        }
    
        // Save token to blacklist with expiry
        await BlacklistedToken.create({
          token,
          expiresAt: new Date(decoded.exp * 1000) // JWT exp is in seconds
        });
    
        return res.status(200).json({
          success: true,
          message: "User signed out successfully"
        });
      } catch (err) {
        next(err);
      }
    
}

//merge with auth.routes.js