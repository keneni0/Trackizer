import Subscription from '../models/subscription.model.js'

export const createSubscription = async (req, res, next) => {
  try {
    // Validate dates to prevent past dates
    const { paymentStartDate, paymentRenewalDate } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    if (new Date(paymentStartDate) < today) {
      return res.status(400).json({ 
        success: false, 
        message: 'Payment start date cannot be in the past' 
      });
    }
    
    if (paymentRenewalDate && new Date(paymentRenewalDate) <= new Date(paymentStartDate)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Payment renewal date must be after start date' 
      });
    }

    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'Subscription created successfully',
      data: subscription 
    });
  } catch (e) {
    next(e);
  }
}

export const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionById = async (req, res, next) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });
    if (sub.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.status(200).json({ success: true, data: sub });
  } catch (err) { next(err); }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });
    if (sub.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    Object.assign(sub, req.body);
    await sub.save();
    res.status(200).json({ success: true, data: sub });
  } catch (err) { next(err); }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });
    if (sub.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await sub.deleteOne();
    res.status(200).json({ success: true, message: 'Subscription deleted' });
  } catch (err) { next(err); }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });
    if (sub.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    sub.paymentStatus = 'cancelled';
    await sub.save();
    res.status(200).json({ success: true, data: sub });
  } catch (err) { next(err); }
};

export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const now = new Date();
    const weekAhead = new Date();
    weekAhead.setDate(now.getDate() + 7);
    const subscriptions = await Subscription.find({
      user: req.user._id,
      paymentRenewalDate: { $gte: now, $lte: weekAhead },
      paymentStatus: 'active'
    });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (err) { next(err); }
};