# react-responsive-image

`react-responsive-image` is a React Components of <img> tag with cleaner srcset/sizes interface.

# Installation

```bash
npm install --save react-responsive-image
```

or,

```bash
yarn add react-responsive-image
```

# Usage

The `<Image/>` component has two descriptor type:

- `widthDescriptor(Object)` : descriptor like 360w, 720w, 1200w, etc.
  - `srcSet(Array)` : `descriptor` for 360w, and `src` for image paths/urls
  - `sizes(Array)` : `size` for image size, and `mediaCondition` to apply on the image size
- `pixelDescriptor(Object)` : descriptor like 360w, 720w, 1200w, etc.
  - `srcSet(Array)` : `descriptor` for 360w, and `src` for image paths/urls

Here are some tips:

- As the HTML5 standard specifications says, `sizes` is not compatible with pixel descriptor. If you specify `sizes` with `pixelDescriptor`, it is gracefully ignored.
- `widthDescriptor` and `pixelDescriptor` are not intended to use at the same time. If you declare both props, `widthDescriptor` overwrites and `pixelDescriptor` props is ignored

For more information, see http://w3c.github.io/html/semantics-embedded-content.html#element-attrdef-img-srcset

```jsx harmony
<Image
  alt='example'
  widthDescriptor={{
    srcSet: [
      {descriptor: '360w', src: 'example-small.svg',},
      {descriptor: '720w', src: 'example-middle.svg',},
      {descriptor: '1200w', src: 'example-large.svg',},
    ],
    sizes: [
      {size: '100vw', mediaCondition: '(max-width: 30em)',},
      {size: '50vw', mediaCondition: '(max-width: 50em)',},
      {size: 'calc(33vw - 100px)',}, 
    ]
  }}
  />
```

# Example

## widthDescriptor

```jsx harmony
import Image from 'react-responsive-image';

<Image
  alt='example'
  widthDescriptor={{
    srcSet: [
      {descriptor: '360w', src: 'example-small.svg',},
      {descriptor: '720w', src: 'example-middle.svg',},
      {descriptor: '1200w', src: 'example-large.svg',},
    ],
    sizes: [
      {size: '100vw', mediaCondition: '(max-width: 30em)',},
      {size: '50vw', mediaCondition: '(max-width: 50em)',},
      {size: 'calc(33vw - 100px)',}, 
    ]
  }}
  />
```

## pixelDescriptor

```jsx harmony
import Image from 'react-responsive-image';

<Image
  alt='example'
  pixelDescriptor={{
    srcSet: [
      {descriptor: '1x', src: 'example.svg'},
      {descriptor: '2x', src: 'example@2x.svg'},
    ],
  }}
  />
```
