const notesCtrl = {};

const Notes = require('../models/Notes');
// importamos el modelos de datos notes
const Note = require('../models/Notes');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
}

notesCtrl.createNewNote = async (req, res) => {
    // obtenemos los datos que vienen de request body
    const { title, description } = req.body;
    // creamos una nueva nota y le pasamos los datos para guardarlo en la db
    const newNote = new Note({title, description});
    // luego guardamos la nota, al operar con la db esta es una operacion asincrona, por lo tanto usamos async await
    await newNote.save();
    res.send('new note');
}

notesCtrl.renderNotes = async (req, res) => {
    // el metodo renderNotes es el encargado de hacer la consulta a la db
    // una vez termine me va a devolver un arreglo de notas
    const notes = await Notes.find().lean();
    res.render('notes/all-notes', { notes });
}

notesCtrl.renderEditForm = (req, res) => {
    res.send('render edit form');
}

notesCtrl.updateNote = (req, res) => {
    res.send('update note');
}

notesCtrl.deleteNote = (req, res) => {
    res.send('delete note');
}

module.exports = notesCtrl;