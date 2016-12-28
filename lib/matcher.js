"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var REGEXP_DECIMAL_NUMBER = /\d+(?:\.\d+)?/;
var REGEXP_DESCRIPTOR_WIDTH = new RegExp("^" + REGEXP_DECIMAL_NUMBER.source + "w$");
var REGEXP_DESCRIPTOR_PIXEL = new RegExp("^" + REGEXP_DECIMAL_NUMBER.source + "x$");
var REGEXP_DESCRIPTOR_WIDTH_AND_PIXEL = new RegExp("^" + REGEXP_DECIMAL_NUMBER.source + "[wx]$");

var Matcher = function () {
  function Matcher() {
    _classCallCheck(this, Matcher);
  }

  _createClass(Matcher, null, [{
    key: "matchWidthDescriptor",
    value: function matchWidthDescriptor(str) {
      return REGEXP_DESCRIPTOR_WIDTH.test(str);
    }
  }, {
    key: "matchPixelDescriptor",
    value: function matchPixelDescriptor(str) {
      return REGEXP_DESCRIPTOR_PIXEL.test(str);
    }
  }, {
    key: "matchDescriptor",
    value: function matchDescriptor(str) {
      return REGEXP_DESCRIPTOR_WIDTH_AND_PIXEL.test(str);
    }
  }]);

  return Matcher;
}();

exports.default = Matcher;