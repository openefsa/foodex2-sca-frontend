define(["exports", "./main-application.js"], function (_exports, _mainApplication) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.WcTitle = _exports.$wcTitle = void 0;

  function _templateObject_310bccb0b90611e9a800a18e7cb9762c() {
    var data = babelHelpers.taggedTemplateLiteral(["\n            ", "\n            <h1 class=\"title\">FoodEX2 WC \uD83C\uDF54<h1>\n        "]);

    _templateObject_310bccb0b90611e9a800a18e7cb9762c = function _templateObject_310bccb0b90611e9a800a18e7cb9762c() {
      return data;
    };

    return data;
  }

  var WcTitle =
  /*#__PURE__*/
  function (_LitElement) {
    babelHelpers.inherits(WcTitle, _LitElement);

    function WcTitle() {
      babelHelpers.classCallCheck(this, WcTitle);
      return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(WcTitle).call(this));
    }

    babelHelpers.createClass(WcTitle, [{
      key: "render",
      value: function render() {
        return (0, _mainApplication.html)(_templateObject_310bccb0b90611e9a800a18e7cb9762c(), _mainApplication.style);
      }
    }]);
    return WcTitle;
  }(_mainApplication.LitElement);

  _exports.WcTitle = WcTitle;
  customElements.define('wc-title', WcTitle);
  var wcTitle = {
    WcTitle: WcTitle
  };
  _exports.$wcTitle = wcTitle;
});