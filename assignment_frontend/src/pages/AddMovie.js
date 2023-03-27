import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

function AddMovie(props){

    let newMovie = {
        "title": "",
        "date": "",
        "actors": "",
        "image": "./images/imdb.jpg",
        "rating": ""
    }

    const navigate = useNavigate();
    const [addMovie, setAddMovie] = useState(newMovie);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [imageFile, setImageFile] = useState("./imdb.jpg");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitting");

        const formData = new FormData();
        formData.append("title", addMovie.title);
        formData.append("date", addMovie.date);
        formData.append("actors", addMovie.actors);
        formData.append("rating", addMovie.rating);
        formData.append("image", imageFile);

        fetch("/api/addMovie", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((movies) => {
                props.setMovies(movies);
                navigate('/');
            });
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
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(event) => setImageFile(event.target.files[0])}
                            />
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
