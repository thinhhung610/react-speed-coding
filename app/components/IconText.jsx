import React, { PropTypes } from 'react';

export default class IconText extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
    rotate: PropTypes.number,
    flip: PropTypes.oneOf(['horizontal', 'vertical']),
    inverse: PropTypes.bool
  }

  render () {
    let { icon, text, className, size, rotate, flip, inverse } = this.props;
    let variation = "";

    variation += className ? ` ${className}` : "";
    variation += size ? ` fa-${size}` : "";
    variation += rotate ? ` fa-rotate-${rotate}` : "";
    variation += flip ? ` fa-flip-${flip}` : "";
    variation += inverse ? ` fa-inverse` : "";

    const iconClass = `fa fa-${icon}${variation}`;

    return (
      <div>
        <i className={iconClass}></i>
        &nbsp;<span>{text}</span>
      </div>
    );
  }
}
