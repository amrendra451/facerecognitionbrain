import React from "react";
import Tilt from 'react-tilt';
import "./Logo.css";
import Brain from "./brain.png"

const logo = () => {
    const options = {
        reverse:        false,  // reverse the tilt direction
        max:            55,     // max tilt rotation (degrees)
        perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
        scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
        speed:          300,    // Speed of the enter/exit transition
        transition:     true,   // Set a transition on enter/exit.
        axis:           null,   // What axis should be disabled. Can be X or Y.
        reset:          true,   // If the tilt effect has to be reset on exit.
        easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    }
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={options} style={{ height: 108, width: 100 }} >
                <div className="Tilt-inner"><img src={Brain} alt="Logo"/></div>
            </Tilt>
        </div>
    );
}

export default logo;