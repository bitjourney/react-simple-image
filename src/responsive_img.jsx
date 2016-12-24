import React from 'react';

const srcSetShape = React.PropTypes.array(React.PropTypes.shape({
  descriptor: React.PropTypes.string.isRequired,
  src: React.PropTypes.string.isRequired,
}));

export const propsShape = {
  alt: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  widthDescriptor: React.PropTypes.shape({
    srcSet: srcSetShape,
    sizes: React.PropTypes.array(React.PropTypes.shape({
      size: React.PropTypes.string.isRequired,
      mediaCondition: React.PropTypes.string,
    })),
  }),
  pixelDescriptor: React.PropTypes.shape({
    srcSet: srcSetShape,
  }),
};

export default class ResponsiveImg extends React.Component {
  static get propTypes() {
    return propsShape;
  }

  getSrc() {
    if (this.props.widthDescriptor) {
      return this.props.widthDescriptor.srcSet[0].src;
    } else if (this.props.pixelDescriptor) {
      return this.props.pixelDescriptor.srcSet[0].src;
    }
  }

  buildSrcSet() {
    if (this.props.widthDescriptor) {
      return this.props.widthDescriptor.srcSet.map(srcSet => {
        return `${srcSet.src} ${srcSet.descriptor}`;
      });
    } else if (this.props.pixelDescriptor) {
      return this.props.pixelDescriptor.srcSet.map(srcSet => {
        return `${srcSet.src} ${srcSet.descriptor}`;
      });
    }
  }

  buildSizes() {
    if (this.props.widthDescriptor && this.props.widthDescriptor.sizes) {
      return this.props.widthDescriptor.sizes.map(size => {
        if (size.mediaCondition) {
          return `${size.mediaCondition} ${size.size}`;
        } else {
          return `${size.size}`;
        }
      });
    }
  }

  render() {
    return (
      <img alt={this.props.alt}
           className={this.props.className}
           src={this.getSrc()}
           srcSet={this.buildSrcSet()}
           sizes={this.buildSizes()}
      />
    );
  }
}
