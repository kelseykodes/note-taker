const express = require('express');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5500;

// middleware for JSON parsing and urlencoded form data
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//GET route for the main page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} !`)
);








// app.get('/api/reviews', (req, res) => {
//     // Inform the client
//     res.json(`${req.method} request received to get reviews`);
  
//     // Log our request to the terminal
//     console.info(`${req.method} request received to get reviews`);
//   });

// //post route - allow user to type notes and save it 
// app.post('/api/reviews', (req, res) => {
//     // Inform the client that their POST request was received
//     res.json(`${req.method} request received to add a review`);
  
//     // Log our request to the terminal
//     console.info(`${req.method} request received to add a review`);
//   });