require("./mongoo");
require("dotenv").config();
//const
const express = require("express");
const cors = require("cors");
const logger = require("./loggerMiddleware");
const app = express();
//app use
app.use(cors());
app.use(express.json());
app.use(logger);
//middleware routes
app.use("/api/users", require("./routes/users"));
app.use(
  "/api/notes",
  require("./routes/validate-token"),
  require("./routes/notes")
);

//404
app.use((req, res) => {
  res.status(404).json({
    error: "Not found!",
  });
});
//server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`);
});
