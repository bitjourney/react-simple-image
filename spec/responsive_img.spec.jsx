import assert from 'power-assert';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';

import ResponsiveImg from 'responsive_img';

describe('ResponsiveImg', () => {
    it('renders an expected html string with width descriptor', () => {
        const props = {
            alt: 'example',
            widthDescriptor:[
                {
                    descriptor: '360w',
                    src: 'example-small.svg',
                },
                {
                    descriptor: '720w',
                    src: 'example-middle.svg',
                },
                {
                    descriptor: '1200w',
                    src: 'example-large.svg',
                },
            ],
        };
        const html = renderToString(createElement(ResponsiveImg, props));
        assert(html.startsWith('<img'));
        assert(html.includes(' alt="example" '));
        assert(html.includes(' src="example-small.svg" '));
        assert(html.includes(' srcset="example-small.svg 360w, example-middle.svg 720w, example-large.svg 1200w" '));
    });

    it('renders an expected html string with pixel descriptor', () => {
        const props = {
            alt: 'example',
            pixelDescriptor : [
                {
                    descriptor: '1x',
                    src: 'example.svg'
                },
                {
                    descriptor: '2x',
                    src: 'example@2x.svg'
                },
            ],
        };
        const html = renderToString(createElement(ResponsiveImg, props));
        assert(html.startsWith('<img'));
        assert(html.includes(' alt="example" '));
        assert(html.includes(' src="example.svg" '));
        assert(html.includes(' srcset="example.svg 1x, example@2x.svg 2x" '));
    });

    it('should throw error if both width descriptor and pixel descriptor are given', () => {
        const props = {
            alt: 'foo',
            pixelDescriptor : [
                {
                    descriptor: '1x',
                    src: 'example.svg'
                },
            ],
            widthDescriptor:[
                {
                    descriptor: '360w',
                    src: 'example-small.svg',
                },
            ],
        };
        const html = renderToString(createElement(ResponsiveImg, props));
        // TODO: add test to catch console warning
    });
});
