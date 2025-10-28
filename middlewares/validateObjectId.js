import mongoose from 'mongoose';

const validateObjectId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: `Invalid user id '${id}'. Must be a 24-character hex string.`
    });
  }
  next();
};

export default validateObjectId;
