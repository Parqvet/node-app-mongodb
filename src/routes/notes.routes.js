const { Router } = require('express');
const router = Router();

const { 
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote } = require('../controllers/notes.controller');

// new note
router.get('/notes/add', renderNoteForm);

router.post('/notes/new-note', createNewNote);

// get all note
router.get('/notes', renderNotes);

// edit notes
router.get('/notes/edit/:id', renderEditForm);

router.put('/notes/edit/:id', updateNote);

// delete notes
router.delete('/notes/delete/:id', deleteNote);

module.exports = router;