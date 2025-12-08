const winston = require("winston");
const path = require("path");

const isDevelopment = process.env.NODE_ENV === "development";

const logger = winston.createLogger({
  level: "debug",
  silent: !isDevelopment,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.printf(({ level, message, timestamp, label }) => {
      return `${level.toUpperCase()} (${label}): ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
