import React from 'react';
import Matcher from './matcher';

export default class Image extends React.Component {
  static get propTypes() {
    return {
      alt: React.PropTypes.string.isRequired,
      className: React.PropTypes.string,
      srcSet: React.PropTypes.objectOf((props, propName, componentName) => {
        if (!Matcher.matchDescriptor(propName)) {
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
        return Matcher.matchWidthDescriptor(descriptor);
      }),
    };
  }

  getSrc() {
    /*
     * TODO: object properties does not specify order,
     * so the result could change for each browser implementation.
     * Using Map would be simple alternative.
     *
     * @see
     * https://www.ecma-international.org/ecma-262/5.1/#sec-15.2.3.14
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Objects_and_maps_compared
     */
    const firstSrcSetKey = Object.keys(this.props.srcSet)[0];
    return this.props.srcSet[firstSrcSetKey];
  }

  buildSrcSet() {
    const matcher = this.state.widthDescriptorOnly
      ? Matcher.matchWidthDescriptor : Matcher.matchPixelDescriptor;
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
