import React from 'react';
import { HOME, REGISTER, SIGNIN, SIGNOUT } from '../../constants/constants';

const Navigation = ({ onChangeRoute, route }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {route === HOME ? (
        <p
          onClick={() => onChangeRoute(SIGNOUT)}
          className="f3 link pa3 pointer hover-black"
        >
          Sign Out
        </p>
      ) : route === REGISTER ? (
        <p
          onClick={() => onChangeRoute(SIGNIN)}
          className="f3 link pa3 pointer hover-black"
        >
          Sign In
        </p>
      ) : (
        <p
          onClick={() => onChangeRoute(REGISTER)}
          className="f3 link pa3 pointer hover-black"
        >
          Register
        </p>
      )}
    </nav>
  );
};

export default Navigation;
