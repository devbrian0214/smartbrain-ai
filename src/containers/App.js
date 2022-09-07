import React, { Component } from "react";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Logo />
      </div>
    );
  }
}

export default App;
