import React from "react";
import "./ImageLinkForm.css";

const imageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div>
            <p className="f3">
                {`This magic brain detect faces in your picture. Give it a try.`}
            </p>
            <div className="center"> 
                <div className="pa4 br3 shadow-5 form center">
                    <input className="f4 pa2 w-70 center" type = "text" onChange = { onInputChange } />
                    <button className="w-30 grow f4 pa2 line pointer dib white bg-light-purple" onClick = { onSubmit }>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default imageLinkForm;