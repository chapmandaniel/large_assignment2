import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function MovieList(props) {

    let myMovies = props.movies;
    //let delMovie = props.deleteMovie;

    const cardContainer = {
        backgroundColor: '#272c31',
        fontSize: '16px',
        color: 'white'
    };

    const cardTitle = {
        fontSize: '28px',
        color: 'white'
    }

    const cardText = {
        fontSize: '14px',
        color: 'grey'
    }

    const cardBackground = {
        backgroundColor: '#272c31',
        color: 'lightgrey'
    }

    const movieImage = {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        objectPosition: 'center',
        opacity: '0.7'
    }


    function getStarSymbols(rating){
        let starString = "";
        let ratingInt = parseInt(rating);
        for(let i = 0; i < ratingInt; i++){
            starString += "⭐";
        }
        return starString;
    }

    return (
        <div className="movieBlockContainer">
            {myMovies.map((movie) => (
                <div key={movie.id} className={"w-25 p-lg-3 bg-dark"} style={cardContainer}>

                    <Card className={"w-100 p-lg-3"} style={cardBackground}>
                        <Card.Img variant="top" src={movie.image} style={movieImage} />
                        <Card.Body>
                            <Card.Title style={cardTitle}>{movie.title}</Card.Title>
                            <Card.Text style={cardText}>
                                {movie.actors}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush" style={cardBackground}>
                            <ListGroup.Item style={cardBackground}>Released: {movie.date}</ListGroup.Item>
                            <ListGroup.Item style={cardBackground}>{getStarSymbols(movie.rating)}</ListGroup.Item>
                            <ListGroup.Item style={cardBackground}>
                                <Button variant="outline-secondary" onClick={() => {
                                props.deleteMovie(movie.id);
                                }}>Delete</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>


                </div>
            ))}
        </div>
    );

}

export default MovieList;
