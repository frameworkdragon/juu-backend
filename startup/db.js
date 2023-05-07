require("dotenv").config({ path: __dirname + "../.env" });
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(
      process.env.COSMOSDB_URI,
      {
        ssl: true,
        auth: {
          username: process.env.COSMOSDB_USER,
          password: process.env.COSMOSDB_PASSWORD,
        },
      },
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Database Connection Established"))
    .catch((err) => {
      console.log("Error connecting to Database: " + err);
    });
};

module.exports = connectDB;
