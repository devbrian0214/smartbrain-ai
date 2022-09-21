import React, { Component } from 'react';
import decode from 'jwt-decode';

// import components
import Navigation from '../components/Navigation/Navigation';
import Rank from '../components/Rank/Rank';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FacialRecognition from '../components/FacialRecognition/FacialRecognition';
import BgParticles from '../components/BgParticles/BgParticles';
import Auth from '../components/Auth/Auth';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

// import api actions and constants
import { handleImageURL } from '../api/actions/image';
import { updateProfileEntries } from '../api/actions/profile';
import { SIGNIN, REGISTER, SIGNOUT, HOME } from '../constants/constants';

// import styles
import './App.css';

// initial state
const initialState = {
  input: '',
  imageUrl: '',
  Boxes: [],
  route: SIGNIN,
  isRegister: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    // get data from localstorage
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));

    // auto log out
    const token = userProfile?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        this.onChangeRoute(SIGNOUT);
        return;
      }
    }

    // keep signed in after refresh
    if (userProfile?.user) {
      this.loadingUser(userProfile?.user);
      this.onChangeRoute(HOME);
    }
  }

  // load user to state
  loadingUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  // calculate face dectection boxes
  calculateLocationFace = regions => {
    let regionArrays = [];
    const mainImage = document.getElementById('mainImage');
    const width = Number(mainImage.width);
    const height = Number(mainImage.height);

    //calculate top,right, bottom,left of each box
    for (let region of regions) {
      let { left_col, top_row, right_col, bottom_row } = region;

      regionArrays.push({
        leftCol: left_col * width,
        topRow: top_row * height,
        rightCol: width - right_col * width,
        bottomRow: height - bottom_row * height,
      });
    }

    return regionArrays;
  };

  displayBoxesFace = Boxes => {
    this.setState({ Boxes });
  };

  getFaceBoxesData = imageURLObj => {
    return handleImageURL(imageURLObj);
  };

  getProfileEntries = IDObj => {
    return updateProfileEntries(IDObj);
  };

  onImageUrlChange = event => {
    this.setState({ input: event.target.value });
  };

  // submit detect button
  onButtonSubmit = async () => {
    try {
      await this.setState({ imageUrl: this.state.input });

      const imageURLObject = { imageUrl: this.state.input };

      const resultImage = await this.getFaceBoxesData(imageURLObject);

      if (resultImage) {
        // display face boxes
        this.displayBoxesFace(
          this.calculateLocationFace(resultImage.data.regionArr)
        );

        // update entries
        const resultEntries = await this.getProfileEntries({
          id: this.state.user.id,
        });

        if (resultEntries?.data?.entries) {
          await this.setState(
            Object.assign(this.state.user, {
              entries: resultEntries?.data?.entries,
            })
          );

          // update localstorage
          const userProfile = await JSON.parse(
            localStorage.getItem('userProfile')
          );

          userProfile.user.entries = resultEntries?.data?.entries;

          await localStorage.setItem(
            'userProfile',
            JSON.stringify({ ...userProfile })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // changing routes
  onChangeRoute = route => {
    switch (route) {
      case SIGNOUT:
        this.setState({ isRegister: false, route: SIGNOUT });
        this.setState(initialState);
        localStorage.removeItem('userProfile');
        break;
      case SIGNIN:
        this.setState({ isRegister: false, route: SIGNIN });
        break;
      case REGISTER:
        this.setState({ isRegister: true, route: REGISTER });
        break;
      case HOME:
        this.setState({ isRegister: false, route: HOME });
        break;
      default:
        break;
    }
  };

  render() {
    const { imageUrl, Boxes, route, user, isRegister } = this.state;

    return (
      <div className="App">
        <ErrorBoundary>
          <BgParticles />
          <Navigation route={route} onChangeRoute={this.onChangeRoute} />
          {route === HOME ? (
            <>
              <Logo />
              <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm
                onImageUrlChange={this.onImageUrlChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              {imageUrl && (
                <FacialRecognition Boxes={Boxes} imageUrl={imageUrl} />
              )}
            </>
          ) : (
            <Auth
              loadingUser={this.loadingUser}
              isRegister={isRegister}
              onChangeRoute={this.onChangeRoute}
            />
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
