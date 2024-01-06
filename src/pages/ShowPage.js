import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {db} from "../firebaseApp";
import {collection, getDocs, query, where} from "firebase/firestore";
import ShowCardDetailed from "../components/ShowCardDetailed";

function ShowPage()
{
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
        </div>
    );
}

export default ShowPage;