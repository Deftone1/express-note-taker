var fs = require("fs");
const { get } = require("http");

module.exports = function (app) {
    // get all notes from db.json
    app.get('/api/notes/', function (req, res) {
        fs.readFile("./db/db.json", "utf8", (err, response) => {
            if (err) throw err;
            let allNotes = JSON.parse(response);
            res.json(allNotes);
        });
    });

    app.post("/api/notes", function (req, res) {
        fs.readFile("./db/db.json", "utf8", (err, response) => {
            if (err) throw err;
            let allNotes = JSON.parse(response);
            // console.log("Original List", allNotes);
            let newId = parseInt(allNotes[allNotes.length - 1].id);
            newId = newId + 1;
            // console.log("new Note", req.body)
            let newNote = { ...req.body, id: newId }
            // console.log(newNote);
            allNotes = [...allNotes, newNote];
            // console.log("Combine List", allNotes);
            fs.writeFile("./db/db.json", JSON.stringify(allNotes), err => {
                if (err) throw err;
                res.json({ success: true, msg: 'Created new note' });
                console.log("NOTE CREATED!", newNote);
            })
        });
    })
};


