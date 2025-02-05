const express = require('express'); 
const { noteCreate, noteDelete, noteEdit, viewAll, searchAll } = require('../controllers/notes.controllers')
const router = express.Router(); 


router.post('/newnote', noteCreate); 
router.delete('/deletenote', noteDelete); 
router.patch('/updatenote', noteEdit); 
router.get('/viewAll', viewAll); 
router.get('/searchAll', searchAll)


module.exports = router; 