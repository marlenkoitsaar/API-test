import mongoose from 'mongoose';

const dogSchema = new mongoose.Schema({
  age: String,
  breed: String,
  name: String,
  createdAt: { default: Date.now, type: Date },
});

export default mongoose.model('Dog', dogSchema);
