import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@kadira/storybook';
import Image from '../src/image';
import photo1x from './images/astronaut.jpg';
import photo2x from './images/astronaut@2x.jpg';
import photo1xBw from './images/astronaut_bw.jpg';
import photo2xBw from './images/astronaut_bw@2x.jpg';
import photo300 from './images/react-300.png';
import photo900 from './images/react-900.png';

import './image.css';

const srcSetPixel = {
  '1x': photo1x,
  '2x': photo2x,
};

const srcSetPixelBw = {
  '1x': photo1xBw,
  '2x': photo2xBw,
};

const srcSetWidth = {
  '300w': photo300,
  '900w': photo900,
};

const sizesForWidthDescriptor = [
  { size: '100vw', mediaCondition: '(max-width: 480px)' },
  { size: '50vw', mediaCondition: '(max-width: 1200px)' },
  { size: 'calc(33vw - 100px)' },
];

storiesOf('<Image />', module)
  .addDecorator(story => (
    <div
      style={{
        textAlign: 'center',
        maxWidth: 640,
      }}>
      {story()}
    </div>
  ))
  .add('with pixel descriptor', () => (
    <div>
      <Image
        alt="react-simple-image storybook component"
        src={photo1x}
        className="additional-className"
        srcSet={srcSetPixel}
      />
      <p>License: CC0 1.0 Universal (CC0 1.0) Public Domain Dedication</p>
      <p><a href="https://visualhunt.com/photo/15033/close-up-of-astronaut-in-space/">Visual Hunt</a></p>
    </div>
  ))
  .add('with width descriptor', () => (
    <div>
      <Image
        alt="react-simple-image storybook component"
        src={photo300}
        className="additional-className"
        srcSet={srcSetWidth}
        sizes={sizesForWidthDescriptor}
      />
      <p>License: <a href="https://facebook.github.io/react/">React</a></p>
    </div>
  ))
  .add('change srcSet on MouseEvent fired', () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = { srcSet: srcSetPixel };
      }

      handleMouseEnter() {
        this.setState({ srcSet: srcSetPixelBw });
      }

      handleMouseLeave() {
        this.setState({ srcSet: srcSetPixel });
      }

      render() {
        return (
          <div
            onMouseEnter={() => this.handleMouseEnter()}
            onMouseLeave={() => this.handleMouseLeave()}
          >
            <Image
              alt="react-simple-image storybook component"
              src={photo1x}
              className="additional-className"
              srcSet={this.state.srcSet}
            />
          </div>
        );
      }
    }
    return <Wrapper />;
  })
  .add('change className on MouseEvent fired', () => {
    // eslint-disable-next-line react/no-multi-comp
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = { className: 'additional-classname ' };
      }

      handleMouseEnter() {
        this.setState({
          className: 'additional-classname is-hidden',
        });
      }

      handleMouseLeave() {
        this.setState({
          className: 'additional-classname',
        });
      }

      render() {
        return (
          <div
            onMouseEnter={() => this.handleMouseEnter()}
            onMouseLeave={() => this.handleMouseLeave()}
          >
            <Image
              alt="react-simple-image storybook component"
              src={photo1x}
              className={this.state.className}
              srcSet={srcSetPixel}
            />
          </div>
        );
      }
    }
    return <Wrapper />;
  })
  ;
