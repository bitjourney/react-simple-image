import * as assert from 'power-assert';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import Image from '../src/Image';

describe('Image', () => {
  describe('with width descriptor', () => {
    it('should render an expected html string without sizes option', () => {
      const props = {
        alt: 'example',
        src: 'example-small.png',
        srcSet: {
          '360w': 'example-small.png',
          '720w': 'example-middle.png',
          '1200w': 'example-large.png',
        },
      };
      const html = renderToString(createElement(Image, props));
      assert(html.startsWith('<img'));
      assert(html.includes(' alt="example" '));
      assert(html.includes(' src="example-small.png" '));
      assert(html.includes(' srcSet="example-small.png 360w,example-middle.png 720w,example-large.png 1200w" '));
    });

    it('should render an expected html string without option', () => {
      const props = {
        alt: 'example',
        src: 'example-small.png',
        srcSet: {
          '360w': 'example-small.png',
          '720w': 'example-middle.png',
          '1200w': 'example-large.png',
        },
        sizes: [
          { size: '100vw', mediaCondition: '(max-width: 30em)' },
          { size: '50vw', mediaCondition: '(max-width: 50em)' },
          { size: 'calc(33vw - 100px)' }, // should be default if mediaCondition is not given
        ],
      };
      const html = renderToString(createElement(Image, props));
      assert(html.startsWith('<img'));
      assert(html.includes(' alt="example" '));
      assert(html.includes(' src="example-small.png" '));
      assert(html.includes(' srcSet="example-small.png 360w,example-middle.png 720w,example-large.png 1200w" '));
      assert(html.includes(' sizes="(max-width: 30em) 100vw,(max-width: 50em) 50vw,calc(33vw - 100px)"'));
    });
  });

  describe('with pixel descriptor', () => {
    it('should render an expected html string', () => {
      const props = {
        alt: 'example',
        className: 'additional-className',
        src: 'example.png',
        srcSet: {
          '1x': 'example.png',
          '2x': 'example@2x.png',
        },
      };
      const html = renderToString(createElement(Image, props));
      assert(html.startsWith('<img'));
      assert(html.includes(' alt="example" '));
      assert(html.includes(' class="additional-className" '));
      assert(html.includes(' src="example.png" '));
      assert(html.includes(' srcSet="example.png 1x,example@2x.png 2x" '));
    });

    it('should not render an expected html string with sizes', () => {
      const props = {
        alt: 'example',
        src: 'example.png',
        srcSet: {
          '1x': 'example.png',
          '2x': 'example@2x.png',
        },
        sizes: [
          { size: '100vw', mediaCondition: '(max-width: 30em)' },
          { size: '50vw', mediaCondition: '(max-width: 50em)' },
          { size: 'calc(33vw - 100px)' },
        ],
      };
      const html = renderToString(createElement(Image, props));
      assert(html.startsWith('<img'));
      assert(html.includes(' alt="example" '));
      assert(html.includes(' src="example.png" '));
      assert(html.includes(' srcSet="example.png 1x,example@2x.png 2x" '));
      assert(!html.includes(' sizes="(max-width: 30em) 100vw,(max-width: 50em) 50vw,calc(33vw - 100px)"'));
    });
  });

  describe('with both width descriptor and pixel descriptor', () => {
    it('should render pixel descriptor and not render width descriptor', () => {
      const props = {
        alt: 'example',
        src: 'example-small.png',
        srcSet: {
          '360w': 'example-small.png',
          '720w': 'example-middle.png',
          '1x': 'example.png',
          '2x': 'example@2x.png',
        },
      };
      const html = renderToString(createElement(Image, props));
      assert(html.startsWith('<img'));
      assert(html.includes(' alt="example" '));
      assert(html.includes(' src="example-small.png" '));
      assert(html.includes(' srcSet="example.png 1x,example@2x.png 2x" '));
      assert(!html.includes(' srcSet="example-small.png 360w,example-middle.png 720w" '));
    });
  });

  describe('with invalid descriptor', () => {
    it('should throw error into console', () => {
      const props = {
        alt: 'example',
        src: 'example.png',
        srcSet: {
          invalid: 'example.png',
        },
      };
      const html = renderToString(createElement(Image, props));
      /*
       * TODO: react gracefully show warning into console if props validation failed
       * so currently there is no clean way to test invlid props
       */
      assert(html.startsWith('<img'));
    });
  });

  describe('with empty alt', () => {
    it('should throw error into console', () => {
      const props = {
        src: 'example.png',
        srcSet: {},
      };
      const html = renderToString(createElement(Image, props));
      assert(html.includes('alt=""'));
      assert(!html.includes('srcSet'));
      assert(!html.includes('sizes'));
    });
  });
});
