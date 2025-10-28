import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    try {
      const users = await User.find().select('-password');

      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  }

export const getUser = async (req, res, next) => {
    try {
        const user=await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new Error('User not found.')
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({success: true, data:user })
    }catch(error){
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and password are required.'
            });
        }
        // Mongoose handles email uniqueness and password min length
        const newUser = new User({ name, email, password });
        await newUser.save();
        const userObj = newUser.toObject();
        delete userObj.password;
        res.status(201).json({ success: true, data: userObj });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.email) {
            // Duplicate email
            return res.status(400).json({
                success: false,
                message: 'Email already in use.'
            });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        next(error);
    }
};