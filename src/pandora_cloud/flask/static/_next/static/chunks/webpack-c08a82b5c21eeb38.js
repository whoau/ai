(function () {
    "use strict";
    // 模块缓存
    var installedModules = {};
    // 模块加载函数
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            id: moduleId,
            loaded: false,
            exports: {}
        };
        try {
            __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.loaded = true;
        } catch (e) {
            delete installedModules[moduleId];
            throw e;
        }
        return module.exports;
    }
    // 模块定义对象
    var __webpack_modules__ = {};
    // 动态加载模块的 Promise 数组
    var chunkLoadingPromises = {};
    // 加载脚本函数
    function loadScript(src, onScriptComplete) {
        var script = document.createElement('script');
        script.charset = 'utf-8';
        script.src = src;
        script.onload = onScriptComplete;
        script.onerror = function (e) {
            onScriptComplete(new Error('Failed to load script: ' + src));
        };
        document.head.appendChild(script);
    }
    // 动态加载模块函数
    __webpack_require__.e = function (chunkId) {
        if (chunkLoadingPromises[chunkId]) {
            return chunkLoadingPromises[chunkId];
        }
        var promise = new Promise(function (resolve, reject) {
            var chunkFilename = 'chunks/' + chunkId + '.js';
            loadScript(chunkFilename, function (error) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
        chunkLoadingPromises[chunkId] = promise;
        return promise;
    };
    // 初始化模块加载逻辑，这里简化处理，原代码中的复杂逻辑去除
    var webpackChunk = self.webpackChunk = self.webpackChunk || [];
    webpackChunk.push = function (chunkData) {
        var chunkIds = chunkData[0];
        var moreModules = chunkData[1];
        for (var moduleId in moreModules) {
            if (moreModules.hasOwnProperty(moduleId)) {
                __webpack_modules__[moduleId] = moreModules[moduleId];
            }
        }
        chunkIds.forEach(function (chunkId) {
            if (chunkLoadingPromises[chunkId]) {
                chunkLoadingPromises[chunkId].resolve();
                delete chunkLoadingPromises[chunkId];
            }
        });
    };
    // 模拟调用加载逻辑
    webpackChunk.forEach(function (chunkData) {
        webpackChunk.push(chunkData);
    });
})();
