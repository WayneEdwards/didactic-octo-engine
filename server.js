const { notes } = require('./db/db.json')

const fs = require('fs');
const path = require('path');

// start express.js server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

function updateNote(id, notesArray, body) {
    if (notesArray[id]) {
        if (body.title) notesArray[id].title = body.title;
        if (body.text) notesArray[id].text = body, text;
        fs.writeFileSync(
            path.join(__dirname, './db/db.json'),
            JSON.stringify({ notes: notesArray }, null, 2)
        )
    }
    return id;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes, notesArray }, null, 2)
    );
    return note;
}






app.get



















app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});