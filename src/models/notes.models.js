const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    
    NoteTitle: {
        type: String,
        required: true
    }, 
    Description: {
        type: String, 
        required: false
    }, 
    NoteBody: {
        type: String, 
        required: true
    },
    NoteID: {
        type: String, 
        required: true
    },
    timestamps: true, 
    versionKey: false
}); 

module.exports = mongoose.model('note', noteSchema);