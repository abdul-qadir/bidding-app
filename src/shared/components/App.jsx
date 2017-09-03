import React, { Component, PropTypes } from 'react';
import Header from '../../components/Header';


class App extends Component {
  state = {
    profile: {},
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default App;
