const express = require("express");
const { createServer } = require("http");
const path = require("path");
const pizzasRoute = require("./routes/pizzasRoute");
const userRoute = require("./routes/userRoute");
const ordersRoute = require("./routes/ordersRoute");

const app = express();
const db = require("./db");

app.use(express.json());
app.use("/api/v0/pizzas", pizzasRoute);
app.use("/api/v0/users", userRoute);
app.use("/api/v0/orders", ordersRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/client/build/index.html"));
  });
}

const PORT = process.env.PORT || 8000;
const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
