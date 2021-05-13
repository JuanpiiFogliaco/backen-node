const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Notes = require("../models/Note");
const app = express();
app.use(express.json());
//get all
router.get("/", (req, res) => {
  Notes.find()
    .then((notes) => res.json(notes))
    .catch((err) => console.log("ERROR GET ALL", err));
});
//get one
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Notes.find({ _id: id })
    .then((note) => {
      console.log(note.length);
      if (note.length === 1) {
        res.json(note);
      } else {
        res.send("No existe el elemento buscado.");
      }
    })
    .catch((err) => {
      console.log("ERROR GET ONE", err);
      res.status(404).end();
    });
});
//post one
router.post("/", (req, res) => {
  const note = req.body;
  if (!note || !note.title) {
    return res.status(400).json({
      error: "Note.title is missing",
    });
  }
  const Note = new Notes({
    title: note.title,
  });
  Note.save()
    .then((res) => {
      console.log(res);
      mongoose.connection.close();
    })
    .catch((e) => console.log(e));
});
//delete one
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Notes.deleteOne({ _id: id })
    .then((note) => console.log("DELETE SUCCES"))
    .catch((err) => {
      console.log("ERROR DELETE ONE", err);
      res.status(404).end();
    });
});

module.exports = router;
