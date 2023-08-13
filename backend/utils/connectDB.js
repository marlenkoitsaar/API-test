import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dogscluster.cqtmkmc.mongodb.net/`
    );
    console.log('connected to mongo db');
  } catch (error) {
    console.log('failed to connect to mongodb', error);
  }
}
