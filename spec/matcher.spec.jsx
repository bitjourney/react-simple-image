import assert from 'power-assert';
/* eslint no-undef: 0 */

import Matcher from 'matcher';

describe('Matcher', () => {
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
        'invalid',
        true,
        null,
        undefined,
      ];
      invalidInputs.map(str => assert(!Matcher.matchWidthDescriptor(str)));
    });
  });
});
