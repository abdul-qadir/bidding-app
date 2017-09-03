// CSS from http://stackoverflow.com/questions/19064987/html-css-popup-div-on-text-click
// and http://stackoverflow.com/questions/10019797/pure-css-close-button
import React, { Component, PropTypes } from 'react';

class LightboxModal extends Component {

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if ((this.props.display) && (e.keyCode === 27)) {
        this.props.closeLightbox();
      }
    });
  }

  render() {
    const whiteContentStyles = {
      position: 'fixed',
      width: '700px',
      height: '600px',
      top: '10%',
      left: '25%',
      backgroundColor: '#fff',
      color: '#7F7F7F',
      padding: '20px',
      border: '2px solid #ccc',
      borderRadius: '20px',
      boxShadow: '0 1px 5px #333',
      zIndex: '101',
    };

    const blackOverlayStyles = {
      background: 'black',
      opacity: '.5',
      position: 'fixed',
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px',
      zIndex: '100',
    };

    const closeTagStyles = {
      float: 'right',
      marginTop: '-30px',
      marginRight: '-30px',
      cursor: 'pointer',
      color: '#fff',
      border: '1px solid #AEAEAE',
      borderRadius: '30px',
      background: '#605F61',
      fontSize: '31px',
      fontWeight: 'bold',
      display: 'inline-block',
      lineHeight: '0px',
      padding: '11px 3px',
      textDecoration: 'none',
    };

    const childrenWithProps = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        ...this.props,
      })
    );

    if (this.props.display) {
      return (
        <div>
          <div style={blackOverlayStyles} onClick={this.props.closeLightbox} />
          <div style={whiteContentStyles}>
            <a style={closeTagStyles} id="lightbox-Btn-Cls" onClick={this.props.closeLightbox}>&times;</a>
            {childrenWithProps}
          </div>
        </div>
      );
    }
    return (<div />);
  }
}

LightboxModal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()),
  data: PropTypes.shape({}),
  closeLightbox: PropTypes.func,
  display: PropTypes.bool,
};

export default LightboxModal;
