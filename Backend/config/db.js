const mongoose = require("mongoose");
const logger = require("../lib/logger");
const log = logger.child({ label: "db.js" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    log.info("MongoDB connected Sucess");
  } catch (error) {
    log.error(error.message);
  }
};

module.exports = connectDB;
