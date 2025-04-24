// 初始化 Webpack 块数组
(self.webpackChunk = self.webpackChunk || []).push([
    [179],
    {
        // 6212 模块：为 String、Symbol、Array、Promise 和 Object 添加缺失的方法
        6212: function () {
            if (!('trimStart' in String.prototype)) {
                String.prototype.trimStart = String.prototype.trimLeft;
            }
            if (!('trimEnd' in String.prototype)) {
                String.prototype.trimEnd = String.prototype.trimRight;
            }
            if (!('description' in Symbol.prototype)) {
                Object.defineProperty(Symbol.prototype, 'description', {
                    configurable: true,
                    get: function () {
                        const match = /\((.*)\)/.exec(this.toString());
                        return match ? match[1] : undefined;
                    }
                });
            }
            if (!Array.prototype.flat) {
                Array.prototype.flat = function (depth = 1) {
                    let result = this.concat.apply([], this);
                    while (depth > 1 && result.some(Array.isArray)) {
                        result = result.flat(depth - 1);
                    }
                    return result;
                };
                Array.prototype.flatMap = function (callback) {
                    return this.map(callback).flat();
                };
            }
            if (!Promise.prototype.finally) {
                Promise.prototype.finally = function (callback) {
                    if (typeof callback!== 'function') {
                        return this;
                    }
                    const PromiseConstructor = this.constructor || Promise;
                    return this.then(
                        (value) => PromiseConstructor.resolve(callback()).then(() => value),
                        (reason) => PromiseConstructor.resolve(callback()).then(() => { throw reason; })
                    );
                };
            }
            if (!Object.fromEntries) {
                Object.fromEntries = function (iterable) {
                    return Array.from(iterable).reduce((obj, [key, value]) => {
                        obj[key] = value;
                        return obj;
                    }, {});
                };
            }
        },
        // 50664 模块：添加基础路径
        50664: function (exports, require) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const normalizePathTrailingSlash = require(412);
            const addPathPrefix = require(73003);

            function addBasePath(path, base) {
                return normalizePathTrailingSlash(addPathPrefix(path, base));
            }

            exports.addBasePath = addBasePath;
        },
        // 87061 模块：添加语言环境
        87061: function (exports, require) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            require(81949);
            require(412);

            function addLocale(locale, ...args) {
                return locale;
            }

            exports.addLocale = addLocale;
        },
        // 51770 模块：检测域名语言环境
        51770: function (exports, require) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            require(81949);

            function detectDomainLocale(...args) {
                return args;
            }

            exports.detectDomainLocale = detectDomainLocale;
        },
        // 1127 模块：检查是否有基础路径
        1127: function (exports, require) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const pathHasPrefix = require(70461);

            function hasBasePath(path, base) {
                return pathHasPrefix(path, base);
            }

            exports.hasBasePath = hasBasePath;
        },
        // 12077 模块：处理 DOM 元素和头部更新
        12077: function (exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });

            const DOMAttributeNames = {
                acceptCharset: 'accept-charset',
                className: 'class',
                htmlFor: 'for',
                httpEquiv: 'http-equiv',
                noModule: 'noModule'
            };

            function createElement(type, props) {
                const element = document.createElement(type);
                for (const prop in props) {
                    if (props.hasOwnProperty(prop) && prop!== 'children' && prop!== 'dangerouslySetInnerHTML' && props[prop]!== undefined) {
                        const attrName = DOMAttributeNames[prop] || prop.toLowerCase();
                        if (type ==='script' && ['async', 'defer', 'noModule'].includes(attrName)) {
                            element[attrName] =!!props[prop];
                        } else {
                            element.setAttribute(attrName, props[prop]);
                        }
                    }
                }
                const children = props.children;
                const dangerouslySetInnerHTML = props.dangerouslySetInnerHTML;
                if (dangerouslySetInnerHTML) {
                    element.innerHTML = dangerouslySetInnerHTML.__html || '';
                } else if (children) {
                    element.textContent = typeof children ==='string'? children : Array.isArray(children)? children.join('') : '';
                }
                return element;
            }

            function isEqualNode(node1, node2) {
                if (node1 instanceof HTMLElement && node2 instanceof HTMLElement) {
                    const nonce = node2.getAttribute('nonce');
                    if (nonce &&!node1.getAttribute('nonce')) {
                        const clone = node2.cloneNode(true);
                        clone.setAttribute('nonce', '');
                        clone.nonce = nonce;
                        return nonce === node1.nonce && node1.isEqualNode(clone);
                    }
                }
                return node1.isEqualNode(node2);
            }

            function updateHead(elements) {
                const head = document.getElementsByTagName('head')[0];
                const nextHeadCountMeta = head.querySelector('meta[name=next-head-count]');
                const count = Number(nextHeadCountMeta.content);
                const existingElements = [];
                let prevElement = nextHeadCountMeta.previousElementSibling;
                for (let i = 0; i < count; i++) {
                    if (prevElement && prevElement.tagName.toLowerCase() === elements[0].type) {
                        existingElements.push(prevElement);
                    }
                    prevElement = prevElement? prevElement.previousElementSibling : null;
                }
                const newElements = elements.map(createElement).filter((newElement) => {
                    for (let i = 0; i < existingElements.length; i++) {
                        if (isEqualNode(existingElements[i], newElement)) {
                            existingElements.splice(i, 1);
                            return false;
                        }
                    }
                    return true;
                });
                existingElements.forEach((element) => {
                    if (element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                });
                newElements.forEach((element) => {
                    head.insertBefore(element, nextHeadCountMeta);
                });
                nextHeadCountMeta.content = (count - existingElements.length + newElements.length).toString();
            }

            exports.DOMAttributeNames = DOMAttributeNames;
            exports.isEqualNode = isEqualNode;
            exports.updateHead = updateHead;
        },
        // 19649 模块：Next.js 运行时逻辑（简化）
        19649: function (exports, require) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });

            const React = require(64838);
            require(6212);

            // 这里省略了大量与 Vercel 相关的配置和复杂逻辑
            // 简化为只保留必要的核心逻辑
            const version = '13.3.4';
            let router;

            function initialize() {
                // 模拟初始化逻辑
                router = {
                    isSsr: false,
                    pathname: '/',
                    query: {}
                };
                return router;
            }

            exports.version = version;
            exports.router = () => router;
            exports.initialize = initialize;
        }
    }
]);    
