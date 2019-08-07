define(["exports", "./main-application.js"], function (_exports, _mainApplication) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.WcSubTitle = _exports.$wcSubTitle = void 0;

  function _templateObject_3110fcd0b90611e9a800a18e7cb9762c() {
    var data = babelHelpers.taggedTemplateLiteral(["\n            ", "\n            <h2 class=\"subtitle\">\n                ", "\n            </h2>\n        "]);

    _templateObject_3110fcd0b90611e9a800a18e7cb9762c = function _templateObject_3110fcd0b90611e9a800a18e7cb9762c() {
      return data;
    };

    return data;
  }

  var WcSubTitle =
  /*#__PURE__*/
  function (_LitElement) {
    babelHelpers.inherits(WcSubTitle, _LitElement);
    babelHelpers.createClass(WcSubTitle, null, [{
      key: "properties",
      get: function get() {
        return {
          myText: {
            attribute: 'my-text'
          }
        };
      }
    }]);

    function WcSubTitle() {
      babelHelpers.classCallCheck(this, WcSubTitle);
      return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(WcSubTitle).call(this));
    }

    babelHelpers.createClass(WcSubTitle, [{
      key: "render",
      value: function render() {
        return (0, _mainApplication.html)(_templateObject_3110fcd0b90611e9a800a18e7cb9762c(), _mainApplication.style, this.myText);
      }
    }]);
    return WcSubTitle;
  }(_mainApplication.LitElement);

  _exports.WcSubTitle = WcSubTitle;
  customElements.define('wc-sub-title', WcSubTitle);
  var wcSubTitle = {
    WcSubTitle: WcSubTitle
  };
  _exports.$wcSubTitle = wcSubTitle;
});