import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

function AddMovie(props){

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        actors: '',
        rating: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    //
    // const handleSubmit2 = (event) => {
    //
    //     fetch("/api/addMovie", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newMovie)
    //     })
    //         .then(response => response.json()) // parse the JSON from the server
    //         .then((movies) => {
    //             props.setMovies(movies);
    //         })
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        const response = await fetch('/api/addMovie', {
            method: 'POST',
            body: data,
        });

        const result = await response.json();
        console.log(result);
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };


    return(

        <div id="add-form">

            <Card className={"w-50 mx-auto mt-xxl-5 bg-secondary"}>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter movie title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                        <Form.Group controlId="date">
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter release date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="actors">
                            <Form.Label>Actors</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter actors"
                                name="actors"
                                value={formData.actors}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                placeholder="Enter movie rating"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.File
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Add Movie
                        </Button>
                    </Form>

                </Card.Body>
            </Card>

        </div>

    );
}

export default AddMovie;


