import serverless from 'serverless-http';
import app from '../app.js';
import connectToDatabase from '../database/mongodb.js';

const handler = serverless(app);

const ensureDbConnected = async () => {
  if (global.__mongooseConnected) return;
  await connectToDatabase();
  global.__mongooseConnected = true;
};

export default async function (req, res) {
  try {
    console.log('Function invoked -- URL:', req.url, 'Method:', req.method);
    await ensureDbConnected();
    return handler(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
