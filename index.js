const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();

// import routes
const dashboadRoutes = require('./routes/dashboard');
const verifyToken = require('./routes/validate-token');


const app = express();

// route middlewares
app.use('/api/dashboard', verifyToken, dashboadRoutes);

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
const uri = `mongodb+srv://juanpii:riverplate@cluster0.4rwvg.mongodb.net/Cluster0?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("error db:", e));

// import routes
const authRoutes = require("./routes/auth");

// route middlewares
app.use("/api/user", authRoutes);

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`);
});

// cors
const cors = require('cors');
var corsOptions = {
    origin: 'https://backen-node.herokuapp.com/', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
