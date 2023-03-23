import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./components/Navigation";
import MovieList from "./pages/MovieList";
import AddMovie from "./pages/AddMovie";
import {useEffect, useState} from "react";
function App() {

    let [movies, setMovies] = useState(null);

    function deleteMovie(id){
        setMovies(movies.filter(movie => movie.id !== id))
    }


    useEffect(() => {
        fetch("/movies")
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setMovies(data);
            })
            .catch(error => console.error(error));
    }, []);

    if(movies !== null){
        return (
            <div className="App">
                <Router>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<MovieList movies={movies} deleteMovie={deleteMovie} />} />
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
