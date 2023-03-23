import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

function AddMovie(props){

    let newMovie = {
        "id": "",
        "title": "",
        "date": "",
        "actors": "",
        "image": "./images/imdb.jpg",
        "rating": ""
    }

    const [addMovie, setAddMovie] = useState(newMovie);
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleSubmit = (event) => {
        newMovie.id = props.movies.length + 1;
        event.preventDefault();
        setAddMovie(newMovie);
        props.movies.push(addMovie);
        setIsSubmitted(true);
    };


        return(

        <div id="add-form">

            <Card className={"w-50 mx-auto mt-xxl-5 bg-secondary"}>
                <Card.Body>
                    {isSubmitted && (
                        <Alert key={'success'} variant={'success'}>
                            Movie Added Successfully!
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="a">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" onChange={(event) => newMovie.title = event.target.value} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Date" onChange={(event) => newMovie.date = event.target.value} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="b">
                            <Form.Label>Actors</Form.Label>
                            <Form.Control type="text" placeholder="Enter Actors" onChange={(event) => newMovie.actors = event.target.value} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="c">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="number" placeholder="Rate this film 1 to 5 Stars" onChange={(event) => newMovie.rating = event.target.value} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="d">
                            <Form.Label>Image</Form.Label>
                            <Form.Select id="moviePoster" onChange={(e) => {
                                newMovie.image = e.target.value;
                            }}>
                                <option value="./images/imdb.jpg">Generic IMDB Image</option>
                                <option value="./images/godfather.jpg">The Godfather</option>
                                <option value="./images/basterds.jpg">Inglorious Basterds</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </Card.Body>
            </Card>

        </div>

    );
}

export default AddMovie;


// <button onClick={() => {
//     props.movies.push(testMovie);
// }
// }>ADD REVIEW</button>