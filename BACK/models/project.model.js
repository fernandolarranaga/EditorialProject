// song.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: String,
    content: String,
    avatar:String, // eliminar esto si no funciona
    fecha:Date,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Project = mongoose.model('Project', songSchema);

module.exports = Project;
