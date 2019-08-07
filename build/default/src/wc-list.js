define(["exports", "./main-application.js"], function (_exports, _mainApplication) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.WcList = _exports.$wcList = void 0;

  function _templateObject2_3118ec10b90611e9a800a18e7cb9762c() {
    var data = babelHelpers.taggedTemplateLiteral(["<h2 class=\"subtitle\">", "</h2>"]);

    _templateObject2_3118ec10b90611e9a800a18e7cb9762c = function _templateObject2_3118ec10b90611e9a800a18e7cb9762c() {
      return data;
    };

    return data;
  }

  function _templateObject_3118ec10b90611e9a800a18e7cb9762c() {
    var data = babelHelpers.taggedTemplateLiteral(["\n            ", "\n            <div>\n                ", "\n            </div>\n        "]);

    _templateObject_3118ec10b90611e9a800a18e7cb9762c = function _templateObject_3118ec10b90611e9a800a18e7cb9762c() {
      return data;
    };

    return data;
  }

  var WcList =
  /*#__PURE__*/
  function (_LitElement) {
    babelHelpers.inherits(WcList, _LitElement);
    babelHelpers.createClass(WcList, null, [{
      key: "properties",
      get: function get() {
        return {
          words: {
            type: Array
          }
        };
      }
    }]);

    function WcList() {
      var _this;

      babelHelpers.classCallCheck(this, WcList);
      _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(WcList).call(this));
      _this.words = ["Banana", "Kiwi", "Milk"];
      return _this;
    }

    babelHelpers.createClass(WcList, [{
      key: "render",
      value: function render() {
        return (0, _mainApplication.html)(_templateObject_3118ec10b90611e9a800a18e7cb9762c(), _mainApplication.style, this.words.map(function (word) {
          return (0, _mainApplication.html)(_templateObject2_3118ec10b90611e9a800a18e7cb9762c(), word);
        }));
      }
    }]);
    return WcList;
  }(_mainApplication.LitElement);

  _exports.WcList = WcList;
  customElements.define("wc-list", WcList);
  var wcList = {
    WcList: WcList
  };
  _exports.$wcList = wcList;
});