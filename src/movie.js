import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Image, OverlayTrigger, Popover } from 'react-bootstrap';
import axios from 'axios';
import "./movie.css"
const Movie = () => {
    const [albums, setAlbums] = useState([]);
    const [active, setActive] = useState(false);
    const [imageDetails, setdetails] = useState([])
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/photos")
            .then(function (response) {
                setAlbums(response.data)
            })
    }, [])

    const showImageDetails = (event, datadetails) => {
        setActive(true)
        setdetails(datadetails)
        console.log(datadetails)
    }

    const displayDetails = (
        <Popover id='popover-basic' className="spanContent">
            <Popover.Body>
                <span style={{ display: active ? "block" : "hidden" }}>
                    {imageDetails &&
                        (<span style={{ display: active ? "block" : "hidden" }} >
                            <h3>Id: {imageDetails.id}</h3>
                            <h3>AlbumId: {imageDetails.albumId}</h3>
                            <h3>Title: {imageDetails.title}</h3>
                            <h3>Thumbnail: {imageDetails.thumbnailUrl}</h3>
                        </span>)
                    }
                </span>
            </Popover.Body>
        </Popover>
    )
    return (
        <div>
            <Container>
                <div className='navBar'>
                    <Row>
                        <Col className='alignNav'><a href="https://www.w3schools.com/css/css3_flexbox_responsive.asp">Home</a></Col>
                        <Col className='alignNav'>About</Col>
                        <Col className='alignNav'>Help</Col>
                    </Row>
                </div>
                <div className='content'>
                    <Row>
                        <h1>Movie List</h1>
                    </Row>
                    <Row>
                        <div className='imageContent'>
                            {albums.map((item) => {
                                return <OverlayTrigger overlay={displayDetails} placement="right" delay={{ show: 250, hide: 400 }}>
                                    <Image key={item.id} src={item.url} className="imageAlign" onMouseEnter={(e) => showImageDetails(e, item)} />
                                </OverlayTrigger>

                            })}
                        </div>
                    </Row>

                </div>

            </Container>
        </div>
    )

}

export default Movie