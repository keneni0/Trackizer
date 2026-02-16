import connectToDatabase from '../database/mongodb.js';
import { signUp } from '../controller/auth.controller.js';

// A minimal wrapper so POST /api/signup works on Vercel
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    if (!global.__mongooseConnected) {
      await connectToDatabase();
      global.__mongooseConnected = true;
    }

    // Call the existing Express controller directly
    await signUp(req, res, (err) => {
      console.error('Error in signUp controller:', err);
      res.status(err?.statusCode || 500).json({ success: false, message: err?.message || 'Internal Server Error' });
    });
  } catch (err) {
    console.error('Error in /api/signup wrapper:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
