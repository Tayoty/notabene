const note = require('../models/notes.models');
const {v4 = uuidv4} = require('uuid'); 


exports.noteCreate = async (req, res) => {
    const{
        NoteTitle,
        Description, 
        NoteBody, 
    } = req.body

    //Check the Note length before saving 
    try{
        if (NoteBody.replace(/\s+/g, '').length > 500)
            return res
            .status(403)
            .json ({message: 'Character count above 500'})

        if (!NoteTitle || !Description)
            return res
            .status (400)
            .json({message: 'Please input the Note Title and Description'})

         //Generate a new note ID using uuid
        const NoteID = `NOTE-${uuidv4.slice(0,4)}`.toUpperCase(); 

         const newNote = new note ({
            NoteTitle,
            Description, 
            NoteBody, 
            NoteID
         }); 

         await newNote.save(); 
         return res
         .status (201)
         .json({message: 'Note Saved'});

    } catch(error){
        console.error(); 
        return res
        .status(500)
        .json({message: 'Server error'})

    }
};

exports.noteDelete = async (req, res) => {
    const {NoteID} = req.query
       try{
           const deletebyID = await note.findOneDelete({NoteID}); 

         if(!deletebyID) {
            return res
            .status (400)
            .json({message: 'Note not found'}); 
         }

          return res
          .status (200)
          .json({data: deletebyID}); 

        } catch(error) { 
          console.error(error); 
          return res
          .status(500)
          .json({message: 'Server Error'}); 
        }
};

exports.noteEdit = async (req, res) => {
    try{ 
        const editNote = await note.findOne({NoteTitle}); 
        if (!editNote) {
            return res
                .status (404)
                .json({message: 'Note not Found'}); 
        }
        const {NoteTitle, NoteBody, Description} = req.body
        note.NoteTitle = NoteTitle || note.NoteTitle
        note.Notebody = NoteBody || note.NoteBody
        note.Description = Description || note.Description 

        await note.save();
         return res
         .status(200)
         .json({data: editNote, message: 'Note Updated'}); 

        
    } catch(error) {
        console.error(error); 
        return res
            .status (500)
            .json({message: 'Server error'}); 
    }
}; 

exports.viewAll = async (req, res) => {
    try {
        const viewAll = await note.find().sort({ createdAt: 1 });
        if (!viewAll || viewAll.length === 0) {
            return res
                .status(404)
                .json({ message: 'Notes Empty; Create a new Note' });
        }
        return res
            .status(200)
            .json({ data: viewAll, length: viewAll.length });

    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: 'Server error' });
    }
};

exports.searchAll = async (req, res) => {
    const { noteTitle } = req.query;
    try {
        const searchAll = await note.findOne({ noteTitle });
        if (!searchAll) {
            return res
                .status(404)
                .json({ message: 'Note not found' });
        }
        return res
            .status(200)
            .json({ data: searchAll });

    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: 'Server error' });
    }
};