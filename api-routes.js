var fs = require("fs");
const { get } = require("http");

module.exports = function (app) {
    
    // GET ALL NOTES FROM DB.JSON

    app.get('/api/notes/', function (req, res) {
        fs.readFile("./db/db.json", "utf8", (err, response) => {
            if (err) throw err;
            let allNotes = JSON.parse(response);
            res.json(allNotes);
        });
    });
    
    // CREATE NEW NOTES AND STORE IN DB.JSON

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

    // DELETE NOTES FROM DB.JSON

    app.delete("/api/notes/:id", function(req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        let noteID = req.params.id;
        let newID = 0;
        console.log(`Deleting note with ID ${noteID}`);
        savedNotes = savedNotes.filter(currNote => {
            return currNote.id != noteID;
        })
        
        for (currNote of savedNotes) {
            currNote.id = newID.toString();
            newID++;
        }
    
        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
        res.json(savedNotes);
    })

};
