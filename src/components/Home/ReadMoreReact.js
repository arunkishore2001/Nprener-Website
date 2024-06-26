"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _trimText3 = _interopRequireDefault(require("./trimText"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ReadMoreReact =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReadMoreReact, _React$Component);

  function ReadMoreReact(props) {
    var _this;

    _classCallCheck(this, ReadMoreReact);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReadMoreReact).call(this, props));
    var args = [_this.props.text, _this.props.min, _this.props.ideal, _this.props.max];

    var _trimText = _trimText3["default"].apply(void 0, args),
        _trimText2 = _slicedToArray(_trimText, 2),
        primaryText = _trimText2[0],
        secondaryText = _trimText2[1];

    _this.state = {
      displaySecondary: false,
      primaryText: primaryText,
      secondaryText: secondaryText,
      readMoreText: _this.props.readMoreText
    };
    return _this;
  }

  _createClass(ReadMoreReact, [{
    key: "setStatus",
    value: function setStatus() {
      var display = !this.state.displaySecondary;
      this.setState({
        displaySecondary: display
      });
    }
  }, {
    key: "render",
    value: function render() {
      var displayText;

      if (!this.state.secondaryText) {
        displayText = _react["default"].createElement("div", {
          className: "display-text-group"
        }, _react["default"].createElement("span", {
          className: "displayed-text"
        }, "".concat(this.state.primaryText, " ").concat(this.state.secondaryText)));
      } else if (this.state.displaySecondary) {
        displayText = _react["default"].createElement("div", {
          className: "display-text-group"
        }, _react["default"].createElement("span", {
          className: "displayed-text",
          onClick: this.setStatus.bind(this)
        }, "".concat(this.state.primaryText, " ").concat(this.state.secondaryText)));
      } else {
        displayText = _react["default"].createElement("div", {
          className: "display-text-group"
        }, _react["default"].createElement("span", {
          className: "displayed-text"
        }, this.state.primaryText, _react["default"].createElement("span", {
          style: {
            display: "none"
          }
        }, this.state.secondaryText), _react["default"].createElement("div", {
          className: "read-more-button",
          onClick: this.setStatus.bind(this),
          style : {color:"grey", margin:"7px", cursor:"pointer"},
        }, this.state.readMoreText)));
      }

      return displayText;
    }
  }]);

  return ReadMoreReact;
}(_react["default"].Component);

exports["default"] = ReadMoreReact;
ReadMoreReact.propTypes = {
  text: _propTypes["default"].string.isRequired,
  min: _propTypes["default"].number,
  ideal: _propTypes["default"].number,
  max: _propTypes["default"].number,
  readMoreText: _propTypes["default"].string
};
ReadMoreReact.defaultProps = {
  readMoreText: "read more"
};