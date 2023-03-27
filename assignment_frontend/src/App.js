import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./components/Navigation";
import MovieList from "./pages/MovieList";
import AddMovie from "./pages/AddMovie";
import {useEffect, useState} from "react";
function App() {

    let [movies, setMovies] = useState(null);

    function deleteMovie(title, date){

        console.log('deleting movie: ' + title + ' ' + date);

        const movie = {
            title: title,
            date: date
        }

        console.log(JSON.stringify(movie));

        fetch("/api/deleteMovies", {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(movie => {
                console.log(`deleted: ${movie.title}`)
                setMovies(movies.filter(movie => (movie.title !== title) && (movie.date !== date)))})
            .catch(error => console.log('Response '+ error));
    }

    useEffect(() => {
        fetch("/api/movies")
            .then(response => response.json())
            .then((movies) => {
                setMovies(movies);
            })
            .catch(error => console.error(error));
    }, []);

    if(movies !== null){
        return (
            <div className="App">
                <Router>
                    <Navigation />
                    <Routes>
                        <Route index path="/" element={<MovieList movies={movies} deleteMovie={deleteMovie} />} />
                        <Route path="/submit-review" element={<AddMovie movies={movies} setMovies={setMovies} />} />
                    </Routes>

                </Router>
            </div>
        )
    }
    else{
        return "loading";
    }

}

export default App;
