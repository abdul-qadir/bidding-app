import React from 'react';

const LightboxTrigger = (props) => {
  // props.children.props.onClick = props.openLightbox;

  const childrenWithProps = React.Children.map(props.children,
      child => React.cloneElement(child, {
        ...props,
        onClick: props.openLightbox,
      })
    );

  return childrenWithProps[0];
};
export default LightboxTrigger;
