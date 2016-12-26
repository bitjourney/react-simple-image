import assert from 'power-assert';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
/* eslint no-undef: 0 */

import Image from 'image';

describe('Image', () => {
  describe('with widthDescriptor', () => {
    it('renders an expected html string without sizes option', () => {
      const props = {
        alt: 'example',
        widthDescriptor: {
          srcSet: [
            { descriptor: '360w', src: 'example-small.png' },
            { descriptor: '720w', src: 'example-middle.png' },
            { descriptor: '1200w', src: 'example-large.png' },
          ],
        },
      };
      const html = renderToString(createElement(Image, props));
      assert(html.startsWith('<img'));
      assert(html.includes(' alt="example" '));
      assert(html.includes(' src="example-small.png" '));
      assert(html.includes(' srcset="example-small.png 360w,example-middle.png 720w,example-large.png 1200w" '));
    });

    it('renders an expected html string without option', () => {
      const props = {
        alt: 'example',
        widthDescriptor: {
          srcSet: [
            { descriptor: '360w', src: 'example-small.png' },
            { descriptor: '720w', src: 'example-middle.png' },
            { descriptor: '1200w', src: 'example-large.png' },
          ],
          sizes: [
            { size: '100vw', mediaCondition: '(max-width: 30em)' },
            { size: '50vw', mediaCondition: '(max-width: 50em)' },
            { size: 'calc(33vw - 100px)' }, // should be default if mediaCondition is not given
          ],
        },
      };
      const html = renderToString(createElement(Image, props));
      assert(html.startsWith('<img'));
      assert(html.includes(' alt="example" '));
      assert(html.includes(' src="example-small.png" '));
      assert(html.includes(' srcset="example-small.png 360w,example-middle.png 720w,example-large.png 1200w" '));
      assert(html.includes(' sizes="(max-width: 30em) 100vw,(max-width: 50em) 50vw,calc(33vw - 100px)"'));
    });
  });

  describe('with pixelDescriptor', () => {
    it('renders an expected html string', () => {
      const props = {
        alt: 'example',
        pixelDescriptor: {
          srcSet: [
            { descriptor: '1x', src: 'example.png' },
            { descriptor: '2x', src: 'example@2x.png' },
          ],
        },
      };
      const html = renderToString(createElement(Image, props));
      assert(html.startsWith('<img'));
      assert(html.includes(' alt="example" '));
      assert(html.includes(' src="example.png" '));
      assert(html.includes(' srcset="example.png 1x,example@2x.png 2x" '));
    });
  });

  describe('with both widthDescriptor and pixelDescriptor', () => {
    it('should renders widthDescriptor over pixelDescriptor', () => {
      const props = {
        alt: 'example',
        widthDescriptor: {
          srcSet: [
            { descriptor: '360w', src: 'example-small.png' },
          ],
        },
        pixelDescriptor: {
          srcSet: [
            { descriptor: '1x', src: 'example.png' },
          ],
        },
      };
      const html = renderToString(createElement(Image, props));
      assert(html.startsWith('<img'));
      assert(html.includes(' alt="example" '));
      assert(html.includes(' src="example-small.png" '));
      assert(html.includes(' srcset="example-small.png 360w" '));
      assert(!html.includes(' srcset="example.png 1x,example@2x.png 2x" '));
    });
  });
});
