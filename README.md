# react-simple-image [![CircleCI](https://circleci.com/gh/bitjourney/react-simple-image/tree/master.svg?style=svg)](https://circleci.com/gh/bitjourney/react-simple-image/tree/master)

`react-simple-image` is a React Components of `<img>` tag with cleaner srcset/sizes interface.

## Install

```bash
npm install --save react-simple-image
```

or,

```bash
yarn add react-simple-image
```

## Usage

The `<Image/>` component has two descriptor type:

- `alt - String` : (Required) alt text
- `className - String` : (Optional) additional className
- `src - String` : (Required) src attribute
- `srcSet - Object` : (Required) src set
  - `key: descriptor - Regexp`: width descriptor (e.g. 360w, 720w) or pixel descriptor (e.g. 1x, 1.5x, or 2x)
  - `value: src - String`: image paths/urls
- `sizes - Array` : (Optional) sizez set for width descriptor
  - `Object`
    - `size - String`: image size
    - `mediaCondition - String`: to apply on the image size

Here are some tips:

- As the HTML5 standard specifications says, `sizes` is not compatible with pixel descriptor. If you specify `sizes` with pixel descriptor, it is gracefully ignored.
- `width descriptor` and `pixel descriptor` are not intended to use at the same time. If you declare both props, `pixel descriptor` overwrites and `width descriptor` props is ignored

For more information, please reach out for:

- http://w3c.github.io/html/semantics-embedded-content.html#element-attrdef-img-srcset

### React Component

```jsx
<Image
  alt='example'
  className='additional-className'
  src='example-small.png',
  srcSet={{
    '360w': 'example-small.png',
    '720w': 'example-middle.png',
    '1200w': 'example-large.png',
  }},
  sizes={[
    {size: '100vw', mediaCondition: '(max-width: 30em)'},
    {size: '50vw', mediaCondition: '(max-width: 50em)'},
    {size: 'calc(33vw - 100px)'},
  ]},
  />
```

## Example

### width descriptor

#### React Component

```jsx
<Image
  alt='example'
  src='example-small.png',
  srcSet={{
    '360w': 'example-small.png',
    '720w': 'example-middle.png',
    '1200w': 'example-large.png',
  }},
  sizes={[
    {size: '100vw', mediaCondition: '(max-width: 30em)'},
    {size: '50vw', mediaCondition: '(max-width: 50em)'},
    {size: 'calc(33vw - 100px)'},
  ]},
  />
```

#### Rendered HTML

```html
<img
  alt="example"
  src="example-small.png"
  srcset="example-small.png 360w,example-middle.png 720w,example-large.png 1200w"
  sizes="(max-width: 30em) 100vw,(max-width: 50em) 50vw,calc(33vw - 100px)"
  data-reactroot=""
  data-reactid="1"
  data-react-checksum="1197296813"/>
```

### pixel descriptor

#### React Component

```jsx
<Image
  alt='example'
  className='additional-className'
  src='example.png',
  srcSet={{
    '1x': 'example.png',
    '2x': 'example@2x.png',
  }},
  />
```

#### Rendered HTML

```html
<img
  alt="example"
  class="additional-className"
  src="example.png"
  srcset="example.png 1x,example@2x.png 2x"
  data-reactroot=""
  data-reactid="1"
  data-react-checksum="1897738717"/>
```

## License

Copyright (c) 2016 Bit Journey, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
