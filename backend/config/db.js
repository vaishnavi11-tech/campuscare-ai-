const mongoose = require("mongoose");

const connectDB = async () => {
 try {
    console.log("Connecting...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
} catch (error) {
    console.error("DB ERROR:");
    console.error(error);
}
};

module.exports = connectDB;