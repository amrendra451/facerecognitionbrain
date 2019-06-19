import React from "react";

const faceRecognition = ({ imageUrl }) => {
    return (
        <div className="center ma">
            <div className="mt2">
                <img src={imageUrl} alt="" width="500px" height="auto"/>
            </div>
        </div>
    );
}

export default faceRecognition;