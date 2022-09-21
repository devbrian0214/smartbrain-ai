import React, { Component } from 'react';
import { HOME, REGISTER, SIGNIN } from '../../constants/constants';
import { authentication } from '../../api/actions/user';

const initialState = {
  name: '',
  email: '',
  password: '',
};

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  // change name
  onChangeName = e => {
    this.setState({ name: e.target.value });
  };

  // change email
  onChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  // change password
  onChangePassword = e => {
    this.setState({ password: e.target.value });
  };

  // handle submit signin/register
  handleFormSubmit = async e => {
    e.preventDefault();
    const { name, ...rest } = this.state;

    const formData = name ? this.state : rest;

    const data = await authentication(formData, name ? REGISTER : SIGNIN);

    this.props.loadingUser(data);

    this.props.onChangeRoute(HOME);

    this.onClear();
  };

  // clear state
  onClear = e => {
    this.setState(initialState);
  };

  render() {
    // from external props
    const { isRegister, onChangeRoute } = this.props;

    // from class state
    const { name, email, password } = this.state;
    return (
      <article
        className=" bg-white br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
        style={{ backgroundColor: 'rgba(16,128,187,0.6)' }}
      >
        <main className="pa4 white-80">
          <div className="measure">
            <form onSubmit={this.handleFormSubmit}>
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
                      required
                      minLength="8"
                      maxLength="30"
                      onChange={this.onChangeName}
                      value={name}
                      autoComplete="name"
                      placeholder="Your name"
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
                    minLength="8"
                    maxLength="50"
                    required
                    onChange={this.onChangeEmail}
                    value={email}
                    autoComplete="email"
                    placeholder="Your email"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f5" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="pa2 input-reset ba hover-bg-lightest-blue hover-black w-100 outline-0"
                    type="password"
                    name="password"
                    id="password"
                    // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    minLength="8"
                    maxLength="30"
                    required
                    onChange={this.onChangePassword}
                    value={password}
                    autoComplete="password"
                    placeholder="Your password"
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--white bg-transparent white hover-black grow pointer f5 dib"
                  type="submit"
                  value={isRegister ? 'Register' : 'Sign in'}
                />
              </div>
            </form>
            <div className="lh-copy mt3">
              {isRegister ? (
                <p
                  onClick={async () => {
                    await onChangeRoute(SIGNIN);
                    await this.onClear();
                  }}
                  className="f5 link black db pointer hover-white"
                >
                  Sign In
                </p>
              ) : (
                <p
                  onClick={async () => {
                    await onChangeRoute(REGISTER);
                    await this.onClear();
                  }}
                  className="f5 link black db pointer hover-white"
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
