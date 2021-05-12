const mongoose = require("mongoose")

const schema = mongoose.Schema({
	id: String,
	title: String,
})

module.exports = mongoose.model("notas", schema)