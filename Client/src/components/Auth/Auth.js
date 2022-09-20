import React, { Component } from 'react';
import { REGISTER, SIGNIN } from '../../constants/constants';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  render() {
    // from external props
    const { isRegister, onChangeRoute } = this.props;

    // from class state
    // const { name, email, password } = this.state;
    return (
      <article
        className=" bg-white br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
        style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
      >
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">
                {isRegister ? 'Register' : 'Sign In'}
              </legend>
              {isRegister && (
                <div className="mt3">
                  <label className="db fw6 lh-copy f5" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="pa2 input-reset ba hover-bg-lightest-blue hover-black w-100 outline-0"
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
              )}
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba hover-bg-lightest-blue hover-black w-100 outline-0"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba hover-bg-lightest-blue hover-black w-100 outline-0"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                type="submit"
                value={isRegister ? 'Register' : 'Sign in'}
              />
            </div>
            <div className="lh-copy mt3">
              {isRegister ? (
                <p
                  onClick={() => onChangeRoute(SIGNIN)}
                  className="f5 link dim black db pointer"
                >
                  Sign In
                </p>
              ) : (
                <p
                  onClick={() => onChangeRoute(REGISTER)}
                  className="f5 link dim black db pointer"
                >
                  Register
                </p>
              )}
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Auth;
