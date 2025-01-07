import mongoose from "mongoose";

const db_connection = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGO_CONN_STRING);
  } catch (error) {
    console.log("Error while connecting database", error);
  }
};

export default db_connection;
