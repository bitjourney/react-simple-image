import React from 'react';

// TODO: fix regexp after reading book
const REGEXP_DESCRIPTOR_WIDTH = /(\d)+(\.\d+)?w$/;
const REGEXP_DESCRIPTOR_PIXEL = /(\d)+(\.\d+)?x$/;
const REGEXP_DESCRIPTOR_WIDTH_AND_PIXEL = /(\d)+(\.\d+)?(w|x)$/;

export default class Image extends React.Component {
  static get propTypes() {
    return {
      alt: React.PropTypes.string.isRequired,
      className: React.PropTypes.string,
      srcSet: React.PropTypes.arrayOf((props, propName, componentName) => {
        if (!REGEXP_DESCRIPTOR_WIDTH_AND_PIXEL.test(propName)) {
          return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`);
        }
        return null;
      }),
      sizes: React.PropTypes.arrayOf(React.PropTypes.shape({
        size: React.PropTypes.string.isRequired,
        mediaCondition: React.PropTypes.string,
      })),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      widthDescriptorOnly: this.props.srcSet.every((srcSet) => {
        return Object.keys(srcSet).every(descriptor => REGEXP_DESCRIPTOR_WIDTH.test(descriptor));
      }),
    };
  }

  getSrc() {
    const firstSrcSet = this.props.srcSet[0];
    const key = Object.keys(firstSrcSet)[0];
    return firstSrcSet[key];
  }

  buildSrcSet() {
    const descriptorPattern = this.state.widthDescriptorOnly
          ? REGEXP_DESCRIPTOR_WIDTH : REGEXP_DESCRIPTOR_PIXEL;
    return this.props.srcSet
                .filter((srcSet) => {
                  return Object.keys(srcSet).every(descriptor => descriptorPattern.test(descriptor));
                }).map((srcSet) => {
                  return Object.keys(srcSet).map(descriptor => `${srcSet[descriptor]} ${descriptor}`);
                });
  }

  buildSizes() {
    if (this.props.sizes && this.state.widthDescriptorOnly) {
      return this.props.sizes.map((size) => {
        if (size.mediaCondition) {
          return `${size.mediaCondition} ${size.size}`;
        }
        return `${size.size}`;
      });
    }
    return null;
  }

  render() {
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
