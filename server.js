const express = require('express'); //install express pkg - npm i express
const path = require('path'); // allows me to write and access paths correctly throughout my code
const app = express(); //variable created to utilize express with my methods
const fs = require('fs'); //allows data to be rednered on html file - npm i fs
const { v4:uuidv4 } = require('uuid'); //helper function created to give each note a unique id - install pkg: npm i uuid
// const router = express.Router();  - could be used to replace 'app'
const PORT = process.env.PORT || 5500; 

// middleware for json parsing and urlencoded form data
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

//GET route to paste new notes on note taking page from api data on the db.json located in 'db' folder
app.get('/api/notes', (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db/db.json","utf-8"));  //JSON.parse = taking data and turning it into js object, readFileSync = will read the db.json file and returns note (content) to utf-8 aka notes.html
  res.json(data); //responds with json with data variable passed through
})

//POST route to create new note 
app.post('/api/notes', (req, res) => {
  // Informs client that a POST request was received
  res.json(`${req.method} request received to add your new note`);

  //Informs developer that a POST request was received in terminal
  console.info(`${req.method} request received to add user note`);

  // Destructuring assignment for the items in req.body
  // Reference index.js in 'public' folder - line 42
  const addNote = req.body;


  // Giving new note a unique id
  // Using my helper function, declared on line 5
  addNote.id = uuidv4();

  // Read notes
  // Same as line 27 on this js file
  const data = JSON.parse(fs.readFileSync("./db/db.json","utf-8"));

  // Adds new note to file
  data.push(addNote);

  // Converts new note into user friendly string and out of object format
  fs.writeFileSync('./db/db.json', JSON.stringify(data))

  // Logs in terminal new note completion 
  console.log("note created");
  // Same as line 28 on this js file
  res.json(data);

});

//notifies devloper the port your app is running on
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} !`)
);


// SENDING MY CODE TO HEROKU (run following commands):

// 1. git add -A, git commit -m, git push
// 2. heroku login
// 3. heroku create
// 4. git push heroku main, if err { run git push heroku master }
// 5. heroku open  

