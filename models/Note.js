const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
	title: String,
})

module.exports = mongoose.model("Note", noteSchema)      