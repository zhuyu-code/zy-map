"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require("path");
var Axios = require("axios");
var fs = require("fs");
var FormData = require("form-data");

var WebpackOnBuildPlugin = function () {
  function WebpackOnBuildPlugin(config) {
    _classCallCheck(this, WebpackOnBuildPlugin);

    _initialiseProps.call(this);

    var root = config.root,
        url = config.url,
        maxContentLength = config.maxContentLength,
        productName = config.productName,
        projectName = config.projectName,
        versionName = config.versionName,
        versionDesc = config.versionDesc;

    this.root = root;
    this.url = url;
    this.maxContentLength = maxContentLength;
    this.productName = productName;
    this.projectName = projectName;
    this.versionName = versionName;
    this.versionDesc = versionDesc;
  }

  _createClass(WebpackOnBuildPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      compiler.plugin('done', this.callback);
    }
  }]);

  return WebpackOnBuildPlugin;
}();

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.callback = function () {
    //遍历文件夹逻辑
    var root = _this.root;
    var list = fs.readdirSync(root);
    var results = [];
    list.forEach(function (file) {
      if (path.extname(file) == '.map') {
        results = results.concat(path.resolve(root, file));
      }
    });
    _this.uploadFile(results);
  };

  this.uploadFile = function (paths) {
    var formData = new FormData();
    formData.append("productName", _this.productName);
    formData.append("projectName", _this.projectName);
    formData.append("versionName", _this.versionName);
    formData.append("versionDesc", _this.versionDesc);
    console.log(formData);
    paths.forEach(function (item) {
      var readStream = fs.createReadStream(item);
      formData.append("" + path.basename(item), readStream);
    });

    var config = {
      headers: formData.getHeaders()
    };
    Axios.post(_this.url, formData, config, { maxContentLength: _this.maxContentLength }).then(function (res) {
      console.log("确认打印");
      console.log(res.data);
    });
  };
};

module.exports = WebpackOnBuildPlugin;
