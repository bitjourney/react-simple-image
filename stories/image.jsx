import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@kadira/storybook';
import Image from '../src/image';
import photo1x from './images/astronaut.jpg';
import photo2x from './images/astronaut@2x.jpg';
import photo300 from './images/react-300.png';
import photo900 from './images/react-900.png';

storiesOf('<Image />', module)
  .addDecorator(story => (
    <div style={{ textAlign: 'center' }}>
      {story()}
    </div>
  ))
  .add('with pixel descriptor', () => (
    <div>
      <Image
        alt="react-simple-image storybook component"
        src={photo1x}
        className="additional-className"
        srcSet={{
          '1x': photo1x,
          '2x': photo2x,
        }}
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
        srcSet={{
          '300w': photo300,
          '900w': photo900,
        }}
        sizes={[
          { size: '100vw', mediaCondition: '(max-width: 30em)' },
          { size: '50vw', mediaCondition: '(max-width: 50em)' },
          { size: 'calc(33vw - 100px)' },
        ]}
        />
      <p>License: <a href="https://facebook.github.io/react/">React</a></p>
    </div>
  ));
