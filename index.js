'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var React = require('react');
var ReactDOM = require('react-dom');
var ClickOutComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(ClickOutComponent, _React$Component);
  function ClickOutComponent() {
    _classCallCheck(this, ClickOutComponent);
    return _callSuper(this, ClickOutComponent);
  }
  _createClass(ClickOutComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var elTouchIsClick = true;
      var documentTouchIsClick = true;
      var el = ReactDOM.findDOMNode(this);
      self.__documentTouchStarted = function (e) {
        el.removeEventListener('click', self.__elementClicked);
        document.removeEventListener('click', self.__documentClicked);
      };
      self.__documentTouchMoved = function (e) {
        documentTouchIsClick = false;
      };
      self.__documentTouchEnded = function (e) {
        if (documentTouchIsClick) self.__documentClicked(e);
        documentTouchIsClick = true;
      };
      self.__documentClicked = function (e) {
        if ((e.__clickedElements || []).indexOf(el) !== -1) return;
        var clickOutHandler = self.onClickOut || self.props.onClickOut;
        if (!clickOutHandler) {
          return console.warn('onClickOut is not defined.');
        }
        clickOutHandler.call(self, e);
      };
      self.__elementTouchMoved = function (e) {
        elTouchIsClick = false;
      };
      self.__elementTouchEnded = function (e) {
        if (elTouchIsClick) self.__elementClicked(e);
        elTouchIsClick = true;
      };
      self.__elementClicked = function (e) {
        e.__clickedElements = e.__clickedElements || [];
        e.__clickedElements.push(el);
      };
      setTimeout(function () {
        if (self.__unmounted) return;
        self.toggleListeners('addEventListener');
      }, 0);
    }
  }, {
    key: "toggleListeners",
    value: function toggleListeners(listenerMethod) {
      var el = ReactDOM.findDOMNode(this);
      el[listenerMethod]('touchmove', this.__elementTouchMoved);
      el[listenerMethod]('touchend', this.__elementTouchEnded);
      el[listenerMethod]('click', this.__elementClicked);
      document[listenerMethod]('touchstart', this.__documentTouchStarted);
      document[listenerMethod]('touchmove', this.__documentTouchMoved);
      document[listenerMethod]('touchend', this.__documentTouchEnded);
      document[listenerMethod]('click', this.__documentClicked);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleListeners('removeEventListener');
      this.__unmounted = true;
    }
  }, {
    key: "render",
    value: function render() {
      return Array.isArray(this.props.children) ? /*#__PURE__*/React.createElement("div", null, this.props.children) : React.Children.only(this.props.children);
    }
  }]);
  return ClickOutComponent;
}(React.Component);
module.exports = ClickOutComponent;
