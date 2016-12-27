# react-simple-image

`react-simple-image` is a React Components of `<img>` tag with cleaner srcset/sizes interface.

# Installation

```bash
npm install --save react-simple-image
```

or,

```bash
yarn add react-simple-image
```

# Usage

The `<Image/>` component has two descriptor type:

- `alt` : (Required) alt text
- `srcSet - Array` : (Required) src set
  - `descriptor - Regexp`: width descriptor (e.g. 360w, 720w) or pixel descriptor (e.g. 1x, 1.5x, or 2x) 
  - `src - String`: image paths/urls
- `sizes - Array` : (Optional) sizez set for width descriptor
  - `size - String`: image size
  - `mediaCondition - String`: to apply on the image size

Here are some tips:

- As the HTML5 standard specifications says, `sizes` is not compatible with pixel descriptor. If you specify `sizes` with pixel descriptor, it is gracefully ignored.
- `width descriptor` and `pixel descriptor` are not intended to use at the same time. If you declare both props, `pixel descriptor` overwrites and `width descriptor` props is ignored

For more information, see http://w3c.github.io/html/semantics-embedded-content.html#element-attrdef-img-srcset

```jsx
<Image
  alt='example'
  srcSet={[
    {descriptor: '360w', src: 'example-small.svg',},
    {descriptor: '720w', src: 'example-middle.svg',},
    {descriptor: '1200w', src: 'example-large.svg',},
  ]},
  sizes={[
    {size: '100vw', mediaCondition: '(max-width: 30em)',},
    {size: '50vw', mediaCondition: '(max-width: 50em)',},
    {size: 'calc(33vw - 100px)',}, 
  ]},
  />
```

# Example

## widthDescriptor

```jsx 
import Image from 'react-simple-image';

<Image
  alt='example'
  srcSet={[
    {descriptor: '360w', src: 'example-small.svg',},
    {descriptor: '720w', src: 'example-middle.svg',},
    {descriptor: '1200w', src: 'example-large.svg',},
  ]},
  sizes={[
    {size: '100vw', mediaCondition: '(max-width: 30em)',},
    {size: '50vw', mediaCondition: '(max-width: 50em)',},
    {size: 'calc(33vw - 100px)',}, 
  ]},
  />
```

## pixelDescriptor

```jsx
import Image from 'react-simple-image';

<Image
  alt='example'
  srcSet={[
    {descriptor: '1x', src: 'example.svg'},
    {descriptor: '2x', src: 'example@2x.svg'},
  ]},
  />
```
