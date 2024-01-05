import { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { ref, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../firebaseApp";
import CommentForm from "./CommentForm";
function ShowCardDetailed({ showDoc }) {
    const currentUser = auth.currentUser;
    const show = showDoc.data();
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const show = showDoc.data();
        const imageRef = ref(storage, show.PosterURL);

        getDownloadURL(imageRef)
            .then(url => { console.log(url); setImageUrl(url) })
            .catch(error => console.error('Error getting download URL:', error));
    }, [show.PosterURL]);


    return (
        <div>
            <Row>
                <Col className="w-25">
                    <Card style={{ width: '18rem', height: "560px" }}>
                        <Card.Title>{show.Title}</Card.Title>
                        <Card.Img variant="top" src={imageUrl} />
                        <Card.Body>
                            <Card.Text style={{ fontSize: 'small', overflowY: 'auto', maxHeight: '100px' }}>

                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>

                        </Card.Footer>
                    </Card>
                </Col>
                <Col className="w-75 justify-content-center text-center">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item" src={show.TrailerURL} allowFullScreen style={{ height: "560px", width: "848px" }}></iframe>
                    </div>
                </Col>
            </Row>
            
            {currentUser ? <CommentForm showId={showDoc.id} /> : <p>Log in to comment</p>}
        </div>
    );
}

export default ShowCardDetailed;