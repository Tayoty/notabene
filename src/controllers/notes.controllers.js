const note = require('../models/notes.models');

exports.noteCreate = async (req, res) => {
    const{NoteTitle, Description, NoteBody} = req.body

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

       

         const newNote = new note ({
            NoteTitle,
            Description, 
            NoteBody, 
}); 

         await newNote.save(); 
         return res
         .status (201)
         .json({message: 'Note Saved', data: newNote});

    } catch(error){
        console.error('Error creating note', error); 
        return res
        .status(500)
        .json({message: 'Server error'})

    }
};

exports.noteDelete = async (req, res) => {
    const {_id} = req.query
       try{
           const deletebyID = await note.findOneAndDelete({_id}); 

         if(!deletebyID) {
            return res
            .status (404)
            .json({message: 'Note not found'}); 
         }

          return res
          .status (200)
          .json({message: 'Note Deleted'}); 

        } catch(error) { 
          console.error(error); 
          return res
          .status(500)
          .json({message: 'Server Error'}); 
        }
};

exports.noteEdit = async (req, res) => {
    const {NoteTitle, Description, NoteBody} = req.body;
    const {_id} = req.query;
    try{ 
        const editNote = await note.findOneAndUpdate(
            {_id}, 
            {
                NoteTitle,
                Description,
                NoteBody, 
            },
            {isNew: true}
        ); 

        if (!editNote) {
            return res
                .status (404)
                .json({message: 'Note not Found'}); 
        }
       

        await editNote.save();
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
    const { NoteTitle } = req.query;
    try {
        const searchAll = await note.findOne({ NoteTitle });
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