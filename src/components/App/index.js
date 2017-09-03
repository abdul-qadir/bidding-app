import React, { Component, PropTypes } from 'react';


class App extends Component {
  state = {
    profile: {},
  }

  render() {
    return (
      <div id="wrapper">
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default App;
