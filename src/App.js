import React from 'react';
import './App.css';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Rank from "./Components/Rank/Rank"
import Particles from 'react-particles-js';
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "f0a3c48626c14107b19dadaa30219446"
});

const particle = {
   "particles": {
       "number": {
           "value": 101,
            "density": {
              "enable": true,
              "value_area": 800
            }
        },
        "size": {
            "value": 2
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            }
        }
    }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    const input = event.target.value;
    this.setState({ input }, () => console.log(this.state.input));
  }

  onSubmit = () => {
    const { input } = this.state;
    this.setState({ imageUrl: input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input ).then(
      function(response) {
        console.log(response);
      },
      function(err) {
        console.log(err);
      }
    );
  }

  render() {
    const { imageUrl } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particle} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange = { this.onInputChange } onSubmit = { this.onSubmit } />
        <FaceRecognition imageUrl = { imageUrl } />
      </div>
    );
  }
}

export default App;
