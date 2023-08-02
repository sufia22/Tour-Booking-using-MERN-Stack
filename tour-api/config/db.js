import mongoose from "mongoose";

// database connection
mongoose.set("strictQuery", false);
const mongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB database connected`.bgCyan.black);
  } catch (error) {
    console.log(`${error.message}`.bgRed.black);
  }
};

// export
export default mongoDBConnection;
