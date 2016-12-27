import assert from 'power-assert';
/* eslint no-undef: 0 */

import Matcher from 'matcher';

describe('Matcher', () => {
  describe('#matchDescriptor', () => {
    it('should match with both width and pixel descriptor', () => {
      const validInputs = [
        '0w',
        '360w',
        '1200w',
        '33.3w',
        '0x',
        '1x',
        '1.5x',
        '2x',
      ];
      validInputs.map(str => assert(Matcher.matchDescriptor(str)));
    });

    it('should not match with invalid descriptor', () => {
      const invalidInputs = [
        'foo2w',
        '2w2',
        'foo2x',
        '2x2',
        'invalid',
        true,
        null,
        undefined,
      ];
      invalidInputs.map(str => assert(!Matcher.matchDescriptor(str)));
    });
  });

  describe('#matchWidthDescriptor', () => {
    it('should match with width descriptor', () => {
      const validInputs = [
        '0w',
        '360w',
        '1200w',
        '33.3w',
      ];
      validInputs.map(str => assert(Matcher.matchWidthDescriptor(str)));
    });

    it('should not match with invalid descriptor', () => {
      const invalidInputs = [
        '1x',
        '2x',
        'foo2w',
        '2w2',
        'invalid',
        true,
        null,
        undefined,
      ];
      invalidInputs.map(str => assert(!Matcher.matchWidthDescriptor(str)));
    });
  });

  describe('#matchPixelDescriptor', () => {
    it('should match with pixel descriptor', () => {
      const validInputs = [
        '0x',
        '1x',
        '1.5x',
        '2x',
      ];
      validInputs.map(str => assert(Matcher.matchPixelDescriptor(str)));
    });

    it('should not match with invalid descriptor', () => {
      const invalidInputs = [
        '1w',
        '360w',
        'foo2x',
        '2x2',
        'invalid',
        true,
        null,
        undefined,
      ];
      invalidInputs.map(str => assert(!Matcher.matchPixelDescriptor(str)));
    });
  });
});
