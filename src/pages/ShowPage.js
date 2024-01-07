import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {db, auth} from "../firebaseApp";
import {collection, getDocs, query, where} from "firebase/firestore";
import ShowCardDetailed from "../components/ShowCardDetailed";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import Review from "../components/Review";
function ShowPage()
{   const [currentUser] = useAuthState(auth);
    const {title} = useParams();
    const [showDoc, setShowDoc] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getShow() {
            const q = query(collection(db, "shows"), where("Title", "==", title));
            const querySnapshot = await getDocs(q);
            setShowDoc(querySnapshot.docs[0]);
            setLoading(false);
        }
        getShow();
    }, [title]);

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div style={{marginTop: '8rem'}}>
            {showDoc && <ShowCardDetailed showDoc={showDoc} />}
            <CommentList showId={showDoc.id} />
            {currentUser ? <CommentForm showId={showDoc.id} /> : <p>Log in to comment</p>}
            {currentUser ? <Review showId={showDoc.id} /> : <p>Log in to review</p>}
        </div>
    );
}

export default ShowPage;