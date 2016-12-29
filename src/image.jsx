import React from 'react';
import { matchDescriptor, matchWidthDescriptor, matchPixelDescriptor } from '../src/matcher';

export default class Image extends React.Component {
  static get propTypes() {
    return {
      alt: React.PropTypes.string.isRequired,
      className: React.PropTypes.string,
      srcSet: React.PropTypes.objectOf((props, propName, componentName) => {
        if (!matchDescriptor(propName)) {
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
      widthDescriptorOnly: Object.keys(this.props.srcSet).every((descriptor) => {
        return matchWidthDescriptor(descriptor);
      }),
    };
  }

  getSrc() {
    /*
     * TODO: object properties does not specify order,
     * so the result could change for each browser implementation.
     *
     * see discussion below:
     * https://github.com/bitjourney/react-simple-image/pull/4/files#r94013960
     */
    const firstSrcSetKey = Object.keys(this.props.srcSet)[0];
    return this.props.srcSet[firstSrcSetKey];
  }

  buildSrcSet() {
    const matcher = this.state.widthDescriptorOnly ? matchWidthDescriptor : matchPixelDescriptor;
    return Object.keys(this.props.srcSet)
      .filter(descriptor => matcher.call(this, descriptor))
      .map(descriptor => `${this.props.srcSet[descriptor]} ${descriptor}`);
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
