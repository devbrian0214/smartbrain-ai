import React, { Component } from "react";
import Navigation from "../components/Navigation/Navigation";
import Rank from "../components/Rank/Rank";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import BgParticles from "../components/BgParticles/BgParticles";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  };

  onButtonSubmit = () => {
    console.log("click");
  };
  render() {
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
      </div>
    );
  }
}

export default App;
