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
      Boxes: [],
    };
  }

  calculateLocationFace = (regions) => {
    let regionArrays = [];
    const mainImage = document.getElementById("mainImage");
    const width = Number(mainImage.width);
    const height = Number(mainImage.height);

    //calculate top,right, bottom,left of each box
    for (let region of regions) {
      let { left_col, top_row, right_col, bottom_row } =
        region["region_info"]["bounding_box"];

      regionArrays.push({
        leftCol: left_col * width,
        topRow: top_row * height,
        rightCol: width - right_col * width,
        bottomRow: height - bottom_row * height,
      });
    }

    return regionArrays;
  };

  displayBoxesFace = (Boxes) => {
    this.setState({ Boxes: Boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    // fetching face_detection Clarifai API
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
        this.displayBoxesFace(
          this.calculateLocationFace(result.outputs[0].data.regions)
        )
      )
      .catch((error) => console.log("error", error));
  };

  render() {
    const { imageUrl, Boxes } = this.state;

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
        {imageUrl && <FacialRecognition Boxes={Boxes} imageUrl={imageUrl} />}
      </div>
    );
  }
}

export default App;
