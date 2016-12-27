// TODO: fix regexp after reading book
const REGEXP_DESCRIPTOR_WIDTH = /^\d+(?:\.\d+)?w$/;
const REGEXP_DESCRIPTOR_PIXEL = /^\d+(?:\.\d+)?x$/;
const REGEXP_DESCRIPTOR_WIDTH_AND_PIXEL = /^\d+(?:\.\d+)?[wx]$/;

export default class Matcher {
  static matchWidthDescriptor(str) {
    return REGEXP_DESCRIPTOR_WIDTH.test(str);
  }

  static matchPixelDescriptor(str) {
    return REGEXP_DESCRIPTOR_PIXEL.test(str);
  }

  static matchDescriptor(str) {
    return REGEXP_DESCRIPTOR_WIDTH_AND_PIXEL.test(str);
  }
}
