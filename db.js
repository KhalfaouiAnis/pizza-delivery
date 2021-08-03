const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://anis:anis12345@cluster0.h2q6h.mongodb.net/fffd";
// "mongodb+srv://anis:anis12345@khalfaoui-dev.adik2.mongodb.net/fffd?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var db = mongoose.connection;

mongoose.connection.once("open", () => {
  console.log("MongoDb connection ready...");
});

db.on("error", () => {
  console.log("connected to mongo_db: failed");
});

module.exports = mongoose;
