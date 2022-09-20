import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: '',
      info: '',
    };
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
  }

  render() {
    const { hasError, error, info } = this.state;

    if (hasError) {
      console.log(error, info);
    }

    return hasError ? <h1>Whoops, something is wrong</h1> : this.props.children;
  }
}

export default ErrorBoundary;
