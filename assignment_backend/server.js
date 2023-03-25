// set up express
import express from 'express';
const app = express();

// set up database connection
import { MongoClient } from 'mongodb';
const client = new MongoClient('mongodb://127.0.0.1:27017')

//enable file uploads
import multer from 'multer';

//handle file paths
import { fileURLToPath } from 'url';
import path from 'path';

// middleware for json data
app.use(express.json());

// middleware for file uploads
const upload = multer({dest: 'uploads/'});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware for static files
app.use(express.static(path.join(__dirname, '../../uploads')));
app.use(express.static(path.join(__dirname, 'build')));



// handle non api requests
app.get(/^(?!\/api).+/, (req, res) => {
    res.redirect('/')
})

// get route for movies data
app.get('/api/movies', async (req, res) => {
    await client.connect();
    const db = client.db('moviesdb');
    const movieData = await db.collection('movies').find({}).toArray();
    res.json(movieData);
})

// post route for movies data
// app.post('/api/addMovie', upload.single('image'), async (req, res) => {
app.post('/api/addMovie', async (req, res) => {
    await client.connect();
    const db = client.db('moviesdb');
    //
    const insertData = await db.collection('movies').insertOne({
        title: req.body.title,
        date: req.body.date,
        actors: req.body.actors,
        rating: req.body.rating,
        image: "./images/imdb.jpg"
    });
    res.json(insertData);


    console.log("hit me baby one more time");
    console.log(req.body);

})


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});



