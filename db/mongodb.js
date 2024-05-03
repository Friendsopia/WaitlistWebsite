import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose;
  mongoose
    .set("strictQuery", true)
    .connect("mongodb+srv://friendsopia:DR6g1jQySf38u7hP@webwaitlist.rqnbumw.mongodb.net/?retryWrites=true&w=majority&appName=webWaitlist", {
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => console.log(error));
};

export default connectDB;
