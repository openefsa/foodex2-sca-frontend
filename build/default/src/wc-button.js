define(["exports", "./main-application.js"], function (_exports, _mainApplication) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.WcButton = _exports.$wcButton = void 0;

  function _templateObject_31143120b90611e9a800a18e7cb9762c() {
    var data = babelHelpers.taggedTemplateLiteral(["\n            ", "\n            <div>\n                <button @click=\"", "\" class=\"button\"> Get the code ", "</button>\n            </div>\n        "]);

    _templateObject_31143120b90611e9a800a18e7cb9762c = function _templateObject_31143120b90611e9a800a18e7cb9762c() {
      return data;
    };

    return data;
  }

  var WcButton =
  /*#__PURE__*/
  function (_LitElement) {
    babelHelpers.inherits(WcButton, _LitElement);
    babelHelpers.createClass(WcButton, null, [{
      key: "properties",
      get: function get() {
        return {
          counter: {
            type: Number
          }
        };
      }
    }]);

    function WcButton() {
      var _this;

      babelHelpers.classCallCheck(this, WcButton);
      _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(WcButton).call(this));
      _this.counter = 0;
      return _this;
    }

    babelHelpers.createClass(WcButton, [{
      key: "render",
      value: function render() {
        return (0, _mainApplication.html)(_templateObject_31143120b90611e9a800a18e7cb9762c(), _mainApplication.style, this.clickHandler, this.counter);
      }
    }, {
      key: "clickHandler",
      value: function clickHandler() {
        if (this.counter < 10) this.counter += 1;else this.counter = 0;
      }
    }]);
    return WcButton;
  }(_mainApplication.LitElement);

  _exports.WcButton = WcButton;
  customElements.define("wc-button", WcButton);
  var wcButton = {
    WcButton: WcButton
  };
  _exports.$wcButton = wcButton;
});