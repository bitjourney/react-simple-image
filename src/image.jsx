import React from 'react';

const srcSetShape = React.PropTypes.array(React.PropTypes.shape({
  descriptor: React.PropTypes.string.isRequired,
  src: React.PropTypes.string.isRequired,
}));

const sizesShape = React.PropTypes.array(React.PropTypes.shape({
  size: React.PropTypes.string.isRequired,
  mediaCondition: React.PropTypes.string,
}));

export const propsShape = {
  alt: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  widthDescriptor: React.PropTypes.shape({
    srcSet: srcSetShape,
    sizes: sizesShape,
  }),
  pixelDescriptor: React.PropTypes.shape({
    srcSet: srcSetShape,
  }),
};

export default class Img extends React.Component {
  static get propTypes() {
    return propsShape;
  }

  constructor(props) {
    super(props);
    this.state = {
      descriptor: this.props.widthDescriptor
        ? this.props.widthDescriptor
        : this.props.pixelDescriptor,
    };
  }

  getSrc() {
    return this.state.descriptor.srcSet[0].src;
  }

  buildSrcSet() {
    return this.state.descriptor.srcSet.map(srcSet => `${srcSet.src} ${srcSet.descriptor}`);
  }

  buildSizes() {
    if (this.props.widthDescriptor && this.props.widthDescriptor.sizes) {
      return this.props.widthDescriptor.sizes.map((size) => {
        if (size.mediaCondition) {
          return `${size.mediaCondition} ${size.size}`;
        }
        return `${size.size}`;
      });
    }
    return '';
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
