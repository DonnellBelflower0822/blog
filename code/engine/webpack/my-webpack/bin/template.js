/**
 * 生成文件
 * @param {*} entryId 入口文件路径, 在modules里面的key
 * @param {*} modules 模块map
 * @returns 
 */
const generateTemplate = (entryId, modules) => {
  const modulesText = Object.entries(modules).reduce((text, [key, module]) => {
    // return {
    //   ...obj,
    //   [key]: `(function (module, exports, __webpack_require__) {
    //         ${module}
    //     }),`
    // }
    return `${text}${text ? ',' : ''} "${key}": (function (module, exports, __webpack_require__) {
      ${module}
    })`
  }, '')

  return `
(function (modules) { // webpackBootstrap
  // The module cache
  // 已经安装的模块
  var installedModules = {};

  // The require function
  // 自己 实现 require 函数
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    // 先从缓存中找
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // 创建新模块
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      // 核心是exports
      exports: {}
    };

    // Execute the module function
    // 执行模块的函数
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  // __webpack_public_path__
  __webpack_require__.p = "";

  // Load entry module and return exports
  // 执行入口文件
  return __webpack_require__(__webpack_require__.s = "${entryId}");
})({${modulesText}})
`
}

module.exports = generateTemplate