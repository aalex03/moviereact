import React from "react";
import { useParams } from "react-router-dom";
function ShowPage()
{
    const {title} = useParams();
    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
}

export default ShowPage;