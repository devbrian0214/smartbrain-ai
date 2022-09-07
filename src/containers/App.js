import React, { Component } from "react";
import Navigation from "../components/Navigation/Navigation";
import Rank from "../components/Rank/Rank";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FacialRecognition from "../components/FacialRecognition/FacialRecognition";
import BgParticles from "../components/BgParticles/BgParticles";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    const raw = JSON.stringify({
      user_app_id: {
        user_id: process.env.REACT_APP_USER_ID,
        app_id: process.env.REACT_APP_APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: this.state.input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + process.env.REACT_APP_PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" +
        process.env.REACT_APP_MODEL_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        console.log(
          result.outputs[0].data.regions[0]["region_info"]["bounding_box"]
        )
      )
      .catch((error) => console.log("error", error));
  };

  render() {
    const { imageUrl } = this.state;
    return (
      <div className="App">
        <BgParticles />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        {imageUrl && <FacialRecognition imageUrl={imageUrl} />}
      </div>
    );
  }
}

export default App;
