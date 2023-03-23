import express from 'express';

const app = express();

app.get('/movies', (req, res) => {
    res.send(myObj);
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});


const myObj = [
    {
        "id": 1,
        "title": "Shawshank Redemption",
        "date": "1994-09-23",
        "actors": "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler, Clancy Brown",
        "image": "./images/shawshank.jpg",
        "rating": "5"
    },
    {
        "id": 2,
        "title": "The Godfather",
        "date": "1972-03-24",
        "actors": "Al Pacino, Marlon Brando, James Caan, Richard S. Castellano, Robert Duvall, Sterling Hayden",
        "image": "./images/godfather.jpg",
        "rating": "5"
    },
    {
        "id": 3,
        "title": "Interstellar",
        "date": "2014-11-07",
        "actors": "Matthew McConaughey, Anne Hathaway, Jessica Chastain, Bill Irwin, Ellen Burstyn, Michael Caine, Wes Bentley, Casey Affleck",
        "image": "./images/interstellar.jpg",
        "rating": "5"
    },
    {
        "id": 4,
        "title": "Inglourious Basterds",
        "date": "2009-08-21",
        "actors": "Brad Pitt, Diane Kruger, Eli Roth, Mélanie Laurent, Mike Myers, Christoph Waltz, Daniel Brühl, Til Schweiger, Michael Fassbender",
        "image": "./images/basterds.jpg",
        "rating": "5"
    }
];
