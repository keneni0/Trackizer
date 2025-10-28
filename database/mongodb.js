import mongoose from "mongoose";
import { DB_URI, DB_NAME, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
    throw new Error('Missing DB_URI. Define DB_URI in .env.<development|production>.local');
}

const redactConnectionString = (uri) => {
    try {
        const url = new URL(uri);
        if (url.password) url.password = "<redacted>";
        if (url.username) url.username = "<redacted>";
        return url.toString();
    } catch {
        return "<invalid-uri>";
    }
};

const connectToDatabase = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(DB_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 20000,
            tls: DB_URI.includes('mongodb.net'),
            dbName: DB_NAME || undefined,
        });

        // Optional health check
        if (mongoose.connection.db?.admin) {
            await mongoose.connection.db.admin().ping();
        }

        console.log(`Connected to database in ${NODE_ENV} mode`);
    } catch (error) {
        console.error('Error connecting to database:', {
            message: error.message,
            name: error.name,
            code: error.code,
            reason: error.reason?.toString?.() || undefined,
            uri: redactConnectionString(DB_URI)
        });
        console.error('If using MongoDB Atlas, ensure your current IP is whitelisted and the connection string is correct.');
        process.exit(1);
    }
};

export default connectToDatabase;