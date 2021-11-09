const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const { v4:uuidv4 } = require('uuid');
// const router = express.Router();
const PORT = process.env.PORT || 5500;

// middleware for JSON parsing and urlencoded form data
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//GET route for the main page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//GET route for the note taking page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db/db.json","utf-8"));
  res.json(data);
})
app.post('/api/notes', (req, res) => {
  // Informs client that a POST request was received
  res.json(`${req.method} request received to add your new note`);

  //Informs developer that a POST request was received in terminal
  console.info(`${req.method} request received to add user note`);

  // Destructuring assignment for the items in req.body
  const addNote = req.body;

  // if (addNote) {}

  //giving new note an id
  addNote.id = uuidv4();

  // Read notes 
  const data = JSON.parse(fs.readFileSync("./db/db.json","utf-8"));

  // Push new note to file
  data.push(addNote);


  fs.writeFileSync('./db/db.json', JSON.stringify(data))


  console.log("note created");
  res.json(data);

});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} !`)
);


