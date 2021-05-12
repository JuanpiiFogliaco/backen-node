const mongoose = require("mongoose");

const uri = `mongodb+srv://juanpii:riverplate@cluster0.4rwvg.mongodb.net/Cluster0?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("error db:", e));