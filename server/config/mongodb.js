import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`db connected successfully`);
    })
    .catch((err) => {
      console.log("message :: ", err.message);
    });
};

export default connectDB;
