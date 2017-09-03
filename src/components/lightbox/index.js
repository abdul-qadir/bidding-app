import React, { Component, PropTypes } from 'react';

class Lightbox extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      display: false,
    };
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
  }

  componentWillMount() {
    if (this.props.data) { this.setState(this.props.data); }
  }

  setLightboxState(obj) {
    this.setState(obj);
  }

  closeLightbox() {
    this.setState({ display: false });
  }

  openLightbox() {
    this.setState({ display: true });
  }

  render() {
    const childProps = Object.assign({}, this.state);
    const childrenWithProps = React.Children.map(this.props.children,
      (child, i) => React.cloneElement(child, {
        openLightbox: this.openLightbox,
        closeLightbox: this.closeLightbox,
        setLightboxState: this.setLightboxState,
        key: i,
        ...childProps,
      })
    );

    return (
      <div className={this.props.className}>
        {childrenWithProps}
      </div>
    );
  }
}

Lightbox.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
  data: PropTypes.shape({}),
  className: PropTypes.string,
};

export default Lightbox;
