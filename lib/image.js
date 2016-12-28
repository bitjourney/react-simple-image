'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('/Users/kenjuwagatsuma/bitjourney/react-simple-image/node_modules/react');

var _react2 = _interopRequireDefault(_react);

var _matcher = require('./matcher');

var _matcher2 = _interopRequireDefault(_matcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = function (_React$Component) {
  _inherits(Image, _React$Component);

  _createClass(Image, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        alt: _react2.default.PropTypes.string.isRequired,
        className: _react2.default.PropTypes.string,
        srcSet: _react2.default.PropTypes.arrayOf(function (props, propName, componentName) {
          if (!_matcher2.default.matchDescriptor(propName)) {
            return new Error('Invalid prop \'' + propName + '\' supplied to \'' + componentName + '\'. Validation failed.');
          }
          return null;
        }),
        sizes: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
          size: _react2.default.PropTypes.string.isRequired,
          mediaCondition: _react2.default.PropTypes.string
        }))
      };
    }
  }]);

  function Image(props) {
    _classCallCheck(this, Image);

    var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, props));

    _this.state = {
      widthDescriptorOnly: _this.props.srcSet.every(function (srcSet) {
        return Object.keys(srcSet).every(function (descriptor) {
          return _matcher2.default.matchWidthDescriptor(descriptor);
        });
      })
    };
    return _this;
  }

  _createClass(Image, [{
    key: 'getSrc',
    value: function getSrc() {
      var firstSrcSet = this.props.srcSet[0];
      var key = Object.keys(firstSrcSet)[0];
      return firstSrcSet[key];
    }
  }, {
    key: 'buildSrcSet',
    value: function buildSrcSet() {
      var _this2 = this;

      var matcher = this.state.widthDescriptorOnly ? _matcher2.default.matchWidthDescriptor : _matcher2.default.matchPixelDescriptor;
      return this.props.srcSet.filter(function (srcSet) {
        return Object.keys(srcSet).every(function (descriptor) {
          return matcher.call(_this2, descriptor);
        });
      }).map(function (srcSet) {
        return Object.keys(srcSet).map(function (descriptor) {
          return srcSet[descriptor] + ' ' + descriptor;
        });
      });
    }
  }, {
    key: 'buildSizes',
    value: function buildSizes() {
      if (this.props.sizes && this.state.widthDescriptorOnly) {
        return this.props.sizes.map(function (size) {
          if (size.mediaCondition) {
            return size.mediaCondition + ' ' + size.size;
          }
          return '' + size.size;
        });
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('img', {
        alt: this.props.alt,
        className: this.props.className,
        src: this.getSrc(),
        srcSet: this.buildSrcSet(),
        sizes: this.buildSizes()
      });
    }
  }]);

  return Image;
}(_react2.default.Component);

exports.default = Image;