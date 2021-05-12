/*-Mocks---------------------------------------------*/
const notes = require("./mocks/notes.json");
const Notas = require("./models/Notas");
/*-Configs------------------------------------------*/
const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json());
require("./config/conexionDB");
const router = express.Router();
require("dotenv").config();
const logger = require("./loggerMiddleware");
/* -Logger-----------------------------------------*/
app.use(logger);
/* -Routes-----------------------------------------*/
//GET ALL
app.get("/api/notes", (req, res) => {
  res.json(notes);
});
//GET ONE
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});
//POST ONE POST :P
app.post("/api/notes", (req, res) => {
  const note = req.body;
  console.log("NOTE", note);
  if (!note || !note.title) {
    return res.status(400).json({
      error: "Note.content is missing",
    });
  }

  const newNota = {
    id: note.id,
    title: note.title,
  };

  res.json(newNota);
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not found!",
  });
});

/* -Server-----------------------------------------*/
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`);
});

module.exports = router;
