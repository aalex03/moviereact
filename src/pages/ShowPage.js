import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {db} from "../firebaseApp";
import {collection, getDocs, query, where} from "firebase/firestore";

function ShowPage()
{
    const {title} = useParams();
    var [show, setShow] = useState(null);

    useEffect(() => {
        async function getShow() {
            const q = query(collection(db, "shows"), where("Title", "==", title));
            const querySnapshot = await getDocs(q);
            setShow(querySnapshot.docs[0].data());
        }
        getShow();
    }, [title]);

    
    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
}

export default ShowPage;