const fs = require('fs');
const path = require('path');

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

function updateNote(id, notesArray, body) {
    if (notesArray[id]) {
        if (body.title) notesArray[id].title = body.title;
        if (body.text) notesArray[id].text = body.text;
        fs.writeFileSync(
            path.join(__dirname, './db/db.json'),
            JSON.stringify({ notes: notesArray }, null, 2)
        )
    }
    return id;
}

function deleteNote(id, notesArray) {
    const key = id;
    if (notesArray[key]) {
        let index = notesArray.indexOf(notesArray[key]);
        delete notesArray[key];
        notesArray.splice(index, 1);
        fs.writeFileSync(
            path.join(__dirname, './db/db.json'),
            JSON.stringify({ notes: notesArray }, null, 2)
        );
        return key;
    }
    console.log('no such note');
}



function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    return filteredResults;
}



app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
    let result = findById(req.params.id, notes);
    res.json(result);
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes);
    res.json(note);
});

app.put('/api/notes/:id', (req, res) => {
    const note = updateNote(req.params.id, notes, req.body);
    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    let key = deleteNote(req.params.id, notes);
    console.log(key + ' is deleted');
    res.send(key);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});