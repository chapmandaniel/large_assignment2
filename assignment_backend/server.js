import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';
import  { fileURLToPath } from 'url';
import multer from 'multer';


const upload = multer({dest: 'uploads'});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(upload.fields([{ name: "image" }]));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.get(/^(?!\/api).+/, (req, res) => {
    res.redirect('/');
})

app.get('/api/movies', async (req, res) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect();
    const db = client.db('moviesdb');
    const movieData = await db.collection('movies').find({}).toArray();
    res.send(movieData);
    await client.close();
})

app.post("/api/addMovie", async (req, res) => {
    //sanity check
    console.log("Received data");
    console.log(req.body);
    console.log("Received image file");
    console.log(req.files);

    // Handle the uploaded file
    const imageFile = req.files.image ? req.files.image[0] : null;

    // Connect to the database
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    const db = client.db("moviesdb");

    // Add the movie to the database
    const addMovie = await db.collection("movies").insertOne({
        title: req.body.title,
        date: req.body.date,
        actors: req.body.actors,
        rating: req.body.rating,
        image: `${imageFile.filename}`
    });

    // get the updated list of movies and return it
    const updatedMovies = await db.collection("movies").find({}).toArray();
    res.send(updatedMovies);
    await client.close();


});


app.post('/api/deleteMovies', async (req, res) => {

    console.log("Received data");
    console.log(req.body);

    const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect();
    const db = client.db('moviesdb');
    const deleteMovie = await db.collection('movies').deleteOne({
        "title": req.body.title,
        "date": req.body.date,
    });
    console.log(deleteMovie);
    res.send(
        {
            "title": req.body.title,
            "date": req.body.date,
        }
    );
    await client.close();
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
});