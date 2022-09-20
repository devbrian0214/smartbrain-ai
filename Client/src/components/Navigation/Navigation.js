import React from 'react';
import { HOME, REGISTER, SIGNIN, SIGNOUT } from '../../constants/constants';

const Navigation = ({ onChangeRoute, route }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {route === HOME ? (
        <p
          onClick={() => onChangeRoute(SIGNOUT)}
          className="f3 link dim pa3 pointer"
        >
          Sign Out
        </p>
      ) : route === REGISTER ? (
        <p
          onClick={() => onChangeRoute(SIGNIN)}
          className="f3 link dim pa3 pointer"
        >
          Sign In
        </p>
      ) : (
        <p
          onClick={() => onChangeRoute(REGISTER)}
          className="f3 link dim pa3 pointer"
        >
          Register
        </p>
      )}
    </nav>
  );
};

export default Navigation;
