import * as React from 'react';
import * as PropTypes from 'prop-types';
import { matchDescriptor, matchWidthDescriptor, matchPixelDescriptor } from './matcher';

export interface Size {
  size: string;
  mediaCondition?: string;
}

export interface Props {
  alt: string;
  src: string;
  className?: string;
  srcSet?: any;
  sizes?: Size[];
}

export interface State {
  widthDescriptorOnly: boolean;
}

export default class Image extends React.Component<Props, State> {
  static get propTypes() {
    return {
      alt: PropTypes.string.isRequired,
      className: PropTypes.string,
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.objectOf((props, propName, componentName) => {
        if (!matchDescriptor(propName)) {
          return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`);
        }
        return null;
      }),
      sizes: PropTypes.arrayOf(PropTypes.shape({
        size: PropTypes.string.isRequired,
        mediaCondition: PropTypes.string,
      })),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      widthDescriptorOnly: Object.keys(this.props.srcSet).every((descriptor) => matchWidthDescriptor(descriptor)),
    };
  }

  buildSrcSet() {
    const matcher = this.state.widthDescriptorOnly ? matchWidthDescriptor : matchPixelDescriptor;
    return Object.keys(this.props.srcSet)
      .filter(matcher)
      .map(descriptor => `${this.props.srcSet[descriptor]} ${descriptor}`)
      .join(',');
  }

  buildSizes() {
    if (this.props.sizes && this.state.widthDescriptorOnly) {
      return this.props.sizes.map((size) => {
        if (size.mediaCondition) {
          return `${size.mediaCondition} ${size.size}`;
        }
        return `${size.size}`;
      }).join(',');
    }
    return '';
  }

  render() {
    return (
      <img
        alt={this.props.alt}
        className={this.props.className}
        src={this.props.src}
        srcSet={this.buildSrcSet()}
        sizes={this.buildSizes()}
        />
    );
  }
}
