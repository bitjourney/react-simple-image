import React from 'react';

export default class Image extends React.Component {
  static get propTypes() {
    return {
      alt: React.PropTypes.string.isRequired,
      className: React.PropTypes.string,
      srcSet: React.PropTypes.arrayOf(React.PropTypes.shape({
        descriptor: function(props, propName, componentName) {
          if (!/(\d)+(\.\d+)?(w|x)/.test(props[ propName ])) {
            return new Error(`Invalid prop ${propName} supplied to '${componentName}'. Validation failed.`);
          }
        },
        src: React.PropTypes.string.isRequired,
      })),
      sizes: React.PropTypes.arrayOf(React.PropTypes.shape({
        size: React.PropTypes.string.isRequired,
        mediaCondition: React.PropTypes.string,
      })),
    };
  }

  getSrc() {
    return this.props.srcSet[ 0 ].src;
  }

  buildSrcSet() {
    return this.props.srcSet.map(srcSet => `${srcSet.src} ${srcSet.descriptor}`);
  }

  buildSizes() {
    if (this.props.sizes) {
      return this.props.sizes.map((size) => {
        if (size.mediaCondition) {
          return `${size.mediaCondition} ${size.size}`;
        }
        return `${size.size}`;
      });
    }
  }

  render() {
    console.log(this.props)
    return (
      <img
        alt={this.props.alt}
        className={this.props.className}
        src={this.getSrc()}
        srcSet={this.buildSrcSet()}
        sizes={this.buildSizes()}
      />
    );
  }
}
