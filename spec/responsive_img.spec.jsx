import assert from 'power-assert';
import {renderToString} from 'react-dom/server';
import {createElement} from 'react';

import ResponsiveImg from 'responsive_img';

describe('ResponsiveImg', () => {
  describe('with widthDescriptor', () => {
    it('renders an expected html string without sizes option', () => {
      const props = {
        alt: 'example',
        widthDescriptor: {
          srcSet: [
            {descriptor: '360w', src: 'example-small.svg',},
            {descriptor: '720w', src: 'example-middle.svg',},
            {descriptor: '1200w', src: 'example-large.svg',},
          ],
        },
      };
      const html = renderToString(createElement(ResponsiveImg, props));
      assert(html.startsWith('<img'));
      assert(html.includes(' alt="example" '));
      assert(html.includes(' src="example-small.svg" '));
      assert(html.includes(' srcset="example-small.svg 360w,example-middle.svg 720w,example-large.svg 1200w" '));
    });

    it('renders an expected html string without option', () => {
      const props = {
        alt: 'example',
        widthDescriptor: {
          srcSet: [
            {descriptor: '360w', src: 'example-small.svg',},
            {descriptor: '720w', src: 'example-middle.svg',},
            {descriptor: '1200w', src: 'example-large.svg',},
          ],
          sizes: [
            {size: '100vw', mediaCondition: '(max-width: 30em)',},
            {size: '50vw', mediaCondition: '(max-width: 50em)',},
            {size: 'calc(33vw - 100px)',}, // should be default if mediaCondition is not given
          ]
        },
      };
      const html = renderToString(createElement(ResponsiveImg, props));
      assert(html.startsWith('<img'));
      assert(html.includes(' alt="example" '));
      assert(html.includes(' src="example-small.svg" '));
      assert(html.includes(' srcset="example-small.svg 360w,example-middle.svg 720w,example-large.svg 1200w" '));
      assert(html.includes(' sizes="(max-width: 30em) 100vw,(max-width: 50em) 50vw,calc(33vw - 100px)"'));
    });
  });

  describe('with pixelDescriptor', () => {
    it('renders an expected html string', () => {
      const props = {
        alt: 'example',
        pixelDescriptor: {
          srcSet: [
            {descriptor: '1x', src: 'example.svg'},
            {descriptor: '2x', src: 'example@2x.svg'},
          ],
        },
      };
      const html = renderToString(createElement(ResponsiveImg, props));
      assert(html.startsWith('<img'));
      assert(html.includes(' alt="example" '));
      assert(html.includes(' src="example.svg" '));
      assert(html.includes(' srcset="example.svg 1x,example@2x.svg 2x" '));
    });
  });

  describe('with both widthDescriptor and pixelDescriptor', () => {
    it('should throw error', () => {
      const props = {
        alt: 'foo',
        pixelDescriptor: {
          srcSet: [
            {descriptor: '1x', src: 'example.svg'}
          ],
        },
        widthDescriptor: {
          srcSet: [
            {descriptor: '360w', src: 'example-small.svg',}
          ],
        },
      };
      const html = renderToString(createElement(ResponsiveImg, props));
      // TODO: add test to catch console warning
    });
  });
});
