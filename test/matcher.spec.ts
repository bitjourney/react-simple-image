import * as assert from 'power-assert';
import { matchDescriptor, matchWidthDescriptor, matchPixelDescriptor } from 'src/matcher';

describe('Matcher', () => {
  const validWidths = [
    '0w',
    '360w',
    '1200w',
    '33.3w',
  ];

  const validPixels = [
    '0x',
    '1x',
    '1.5x',
    '2x',
  ];

  const invalidWidths = [
    'foo2w',
    '2w2',
  ];

  const invalidPixels = [
    'foo2x',
    '2x2',
  ];

  const invalidDescriptor = [
    'invalid',
    true,
    null,
    undefined,
  ];

  describe('#matchDescriptor', () => {
    it('should match with both width and pixel descriptor', () => {
      validWidths.concat(validPixels)
        .map(str => assert(matchDescriptor(str)));
    });

    it('should not match with invalid descriptor', () => {
      invalidDescriptor.concat(invalidPixels, invalidWidths)
        .map(str => assert(!matchDescriptor(str)));
    });
  });

  describe('#matchWidthDescriptor', () => {
    it('should match with width descriptor', () => {
      validWidths.map(str => assert(matchWidthDescriptor(str)));
    });

    it('should not match with invalid descriptor', () => {
      invalidDescriptor.concat(validPixels, invalidWidths)
        .map(str => assert(!matchWidthDescriptor(str)));
    });
  });

  describe('#matchPixelDescriptor', () => {
    it('should match with pixel descriptor', () => {
      validPixels.map(str => assert(matchPixelDescriptor(str)));
    });

    it('should not match with invalid descriptor', () => {
      invalidDescriptor.concat(validWidths, invalidPixels)
        .map(str => assert(!matchPixelDescriptor(str)));
    });
  });
});
