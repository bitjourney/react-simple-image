import assert from 'power-assert';
import { renderToString } from 'react-dom/server';
import { createElement } from 'components';

import ResponsiveImg from 'src/responsive_img';

describe('ResponsiveImg', () => {
    it('renders expected html string', () => {
        const props = {
            alt: 'foo',
            srcSet: {
                '1x': 'foo.svg',
                '2x': 'foo@2x.svg'
            }
        };
        const html = renderToString(createElement(ResponsiveImg, props));
        assert(html.startsWith('<img'));
        assert(html.includes(' alt="foo" '));
        assert(html.includes(' src="foo.svg" '));
        assert(html.includes(' srcset="foo.svg 1x,foo@2x.svg 2x" '));
    });
});
