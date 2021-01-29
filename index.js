const express = require("express");
const routes = require("./routes");

const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/", routes);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
module.exports = server;
