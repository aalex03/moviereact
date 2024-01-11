import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { ref, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../firebaseApp";
import {doc, getDoc, deleteDoc, setDoc, addDoc, collection, query, getDocs, where} from 'firebase/firestore';
import { db } from "../firebaseApp";

function ShowCardDetailed({ showDoc }) {

    const show = showDoc.data();
    const [currentUser] = useAuthState(auth);
    const [imageUrl, setImageUrl] = useState(null);
    const [followStatus, setFollowStatus] = useState(false);
    useEffect(() => {
        const show = showDoc.data();
        const imageRef = ref(storage, show.PosterURL);
        getFollowStatus();
        getDownloadURL(imageRef)
            .then(url => { setImageUrl(url) })
            .catch(error => console.error('Error getting download URL:', error));
    }, [show.PosterURL, showDoc]);

    const getFollowStatus = async () => {
        const userId = currentUser.uid;
        const showId = showDoc.id;

        const followStatus = await getFollowDocument(userId, showId);
        setFollowStatus((followStatus != null));
    }

    const handleFollow = async () => {
        const showId = showDoc.id;
        const userId = currentUser.uid;

        const followDoc = await getFollowDocument(userId, showId);
        if (followDoc != null)
        {
            await deleteDoc(followDoc);
            setFollowStatus(false);
        }
        else
        {
            await addDoc(collection(db,'follows'), {UserId: userId, ShowId: showId});
            setFollowStatus(true);
        }
    }

    async function getFollowDocument(userId, showId) {
        const q = query(
          collection(db, 'follows'),
          where('UserId', '==', userId),
          where('ShowId', '==', showId)
        );
      
        const querySnapshot = await getDocs(q);
      
        if (!querySnapshot.empty) {
          // Document found
          const doc = querySnapshot.docs[0].ref;
          return doc;
        } else {
          // No document found
          return null;
        }
      }

    return (
        <div>
            <Row>
                <Col className="w-25">
                    <Card style={{ width: '18rem', height: "auto", backgroundColor: '#1d2026' }}>
                        <Card.Title style={{color: "white"}}>{show.Title}</Card.Title>
                        <Card.Img variant="top" src={imageUrl} />
                        <Card.Body >
                            <Card.Text style={{ fontSize: 'small', overflowY: 'auto', maxHeight: '100px', textAlign: 'left', color: "white" }}>
                                Rating: {show.Score}⭐
                                <br />
                                Status: {show.Status}
                            </Card.Text>
                            <Button variant="info" onClick={handleFollow}>{followStatus ? 'Unfollow' : 'Follow'}</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="w-75 justify-content-center text-center">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item" src={show.TrailerURL} allowFullScreen style={{ height: "560px", width: "848px" }}></iframe>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default ShowCardDetailed;