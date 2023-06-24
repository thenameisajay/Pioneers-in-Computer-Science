const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection has been established");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
