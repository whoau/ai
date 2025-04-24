(function () {
    "use strict";
    // 模块缓存
    const installedModules = {};
    // 模块加载函数
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        const module = installedModules[moduleId] = {
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
    const __webpack_modules__ = {};
    // 动态加载模块的 Promise 数组
    const chunkLoadingPromises = {};
    // 可配置的 chunk 文件路径前缀
    const CHUNK_PATH_PREFIX = 'chunks/';
    // 加载脚本函数
    function loadScript(src, onScriptComplete) {
        const script = document.createElement('script');
        script.charset = 'utf-8';
        script.src = src;
        script.onload = () => onScriptComplete(null);
        script.onerror = (e) => {
            const error = new Error(`Failed to load script: ${src}`);
            error.originalEvent = e;
            onScriptComplete(error);
        };
        document.head.appendChild(script);
    }
    // 动态加载模块函数
    __webpack_require__.e = function (chunkId) {
        if (chunkLoadingPromises[chunkId]) {
            return chunkLoadingPromises[chunkId];
        }
        const promise = new Promise((resolve, reject) => {
            const chunkFilename = CHUNK_PATH_PREFIX + chunkId + '.js';
            loadScript(chunkFilename, (error) => {
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
    const webpackChunk = self.webpackChunk = self.webpackChunk || [];
    webpackChunk.push = function (chunkData) {
        const chunkIds = chunkData[0];
        const moreModules = chunkData[1];
        for (const moduleId in moreModules) {
            if (moreModules.hasOwnProperty(moduleId)) {
                __webpack_modules__[moduleId] = moreModules[moduleId];
            }
        }
        chunkIds.forEach((chunkId) => {
            if (chunkLoadingPromises[chunkId]) {
                chunkLoadingPromises[chunkId].then(() => {}); // 原代码 resolve 调用有误，这里改为 then 处理
                delete chunkLoadingPromises[chunkId];
            }
        });
    };
    // 模拟调用加载逻辑
    webpackChunk.forEach((chunkData) => {
        webpackChunk.push(chunkData);
    });
})();    
