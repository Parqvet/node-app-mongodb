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
    res.redirect('/notes');
}

notesCtrl.renderNotes = async (req, res) => {
    // el metodo renderNotes es el encargado de hacer la consulta a la db
    // una vez termine me va a devolver un arreglo de notas
    const notes = await Notes.find().lean();
    res.render('notes/all-notes', { notes });
}

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', { note });
}

notesCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    res.redirect('/notes');
}

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
}

module.exports = notesCtrl;