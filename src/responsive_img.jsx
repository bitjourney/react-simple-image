import React from 'react';

export default class ResponsiveImg extends React.Component {
  static get propTypes() {
    return {
      alt: React.PropTypes.string.isRequired,
      srcSet: React.PropTypes.shape({
        '1x': React.PropTypes.string.isRequired,
        '2x': React.PropTypes.string.isRequired,
      }),
      className: React.PropTypes.string,
    };
  }

  getSrc() {
    return this.props.srcSet['1x'];
  }

  buildSrcSet() {
    return Object.keys(this.props.srcSet).map(size => {
      return `${this.props.srcSet[size]} ${size}`;
    });
  }

  render() {
    return (
      <img alt={this.props.alt}
           src={this.getSrc()}
           srcSet={this.buildSrcSet()}
           className={this.props.className}/>
    );
  }
}
