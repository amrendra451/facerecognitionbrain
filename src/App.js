import React from 'react';
import './App.css';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Rank from "./Components/Rank/Rank";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    const { input } = this.state;
    this.setState({ imageUrl: input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input )
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { imageUrl } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particle} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {
          this.state.route === "home"
            ? <div>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange = { this.onInputChange } onSubmit = { this.onSubmit } />
                <FaceRecognition onRouteChange={this.onRouteChange} box={this.state.box} imageUrl = { imageUrl } />
              </div>
            : (
                this.state.route === 'signin' ? <SignIn onRouteChange={this.onRouteChange}/> : <Register onRouteChange={this.onRouteChange} />
              )
        }
      </div>
    );
  }
}

export default App;
