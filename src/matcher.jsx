const REGEXP_DECIMAL_NUMBER = /\d+(?:\.\d+)?/;
const REGEXP_DESCRIPTOR_WIDTH = new RegExp(`^${REGEXP_DECIMAL_NUMBER.source}w$`);
const REGEXP_DESCRIPTOR_PIXEL = new RegExp(`^${REGEXP_DECIMAL_NUMBER.source}x$`);
const REGEXP_DESCRIPTOR_WIDTH_AND_PIXEL = new RegExp(`^${REGEXP_DECIMAL_NUMBER.source}[wx]$`);

export function matchWidthDescriptor(str) {
  return REGEXP_DESCRIPTOR_WIDTH.test(str);
}

export function matchPixelDescriptor(str) {
  return REGEXP_DESCRIPTOR_PIXEL.test(str);
}

export function matchDescriptor(str) {
  return REGEXP_DESCRIPTOR_WIDTH_AND_PIXEL.test(str);
}
