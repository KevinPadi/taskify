import mongoose from "mongoose";
import { config as configDotenv } from "dotenv"
// Cargar variables de entorno
configDotenv({ path: '../.env' });

console.log(process.env.MONGODB_URI)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1)
  }
};

export default connectDB;
