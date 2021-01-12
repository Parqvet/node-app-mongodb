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
    // por cada nota que se guarde tambien se guaradara el id del usuario
    newNote.user = req.user.id;
    // luego guardamos la nota, al operar con la db esta es una operacion asincrona, por lo tanto usamos async await
    await newNote.save();

    // cuando se cree una nueva nota enviamos un mensaje en la sesion del server con el modulo flash
    req.flash('success_msg', 'Note Added Successfuly');
    res.redirect('/notes');
}

notesCtrl.renderNotes = async (req, res) => {
    // el metodo renderNotes es el encargado de hacer la consulta a la db
    // una vez termine me va a devolver un arreglo de notas
    // buscar solo las notas que le pertenecen al usuario
    const notes = await Notes.find({user: req.user.id}).lean().sort({createdAt: 'desc'});
    res.render('notes/all-notes', { notes });
}

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', { note });
}

notesCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Note Updated Successfuly');
    res.redirect('/notes');
}

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Successfuly');
    res.redirect('/notes');
}

module.exports = notesCtrl;