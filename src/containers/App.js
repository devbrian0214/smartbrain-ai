import React, { Component } from "react";
import Navigation from "../components/Navigation/Navigation";
import Rank from "../components/Rank/Rank";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import BgParticles from "../components/BgParticles/BgParticles";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BgParticles />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
      </div>
    );
  }
}

export default App;
