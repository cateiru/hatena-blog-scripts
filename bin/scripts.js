(function () {
    var defines = {};
    var entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies: dependencies, factory: factory };
        entry[0] = name;
    }
    define("require", ["exports"], function (exports) {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: function (name) { return resolve(name); } });
    });
    /**
     * はてなブログの見出し要素にコピー用のリンクを設置、
     * リンクをクリックすると、その見出しの応じたURLがコピーされる
     */
    define("headingLink", ["require", "exports"], function (require, exports) {
        "use strict";
        exports.__esModule = true;
        exports.headingLinkCopy = void 0;
        var HEADING_SELECTOR = ".entry-content > h1, .entry-content > h2, .entry-content > h3, .entry-content > h4, .entry-content > h5, .entry-content > h6";
        var HEADING_CLASS_NAME = "heading";
        function isElement(target) {
            return target instanceof Element;
        }
        var HeadingLinkCopy = /** @class */ (function () {
            function HeadingLinkCopy() {
                var _this = this;
                var headings = this.searchAllHeading();
                headings.forEach(function (v) {
                    _this.addLink(v);
                });
            }
            /**
             * 記事内のすべての見出し要素を取得する
             */
            HeadingLinkCopy.prototype.searchAllHeading = function () {
                return document.querySelectorAll(HEADING_SELECTOR);
            };
            /**
             * 現在のページのURLを取得する
             */
            HeadingLinkCopy.prototype.getEntryURL = function () {
                return new URL(location.href);
            };
            /**
             * targetの要素にクラス名を追加してリンク化する
             */
            HeadingLinkCopy.prototype.addLink = function (target) {
                target.classList.add(HEADING_CLASS_NAME);
                target.style.cssText = "cursor: pointer";
            };
            /**
             * クリックを監視して、見出しをクリックした場合
             */
            HeadingLinkCopy.prototype.observe = function () {
                var _this = this;
                document.addEventListener("click", function (e) {
                    var target = e.target;
                    if (!target) {
                        return;
                    }
                    if (!isElement(target)) {
                        return;
                    }
                    if (target.classList.contains(HEADING_CLASS_NAME)) {
                        var url = _this.copyLink(target);
                        _this.copy(url);
                        window.alert("見出しのリンクをコピーしました");
                    }
                });
            };
            /**
             * コピーするためのURLを返す
             *
             * @param target - クリックした見出しの要素
             * @returns URL
             */
            HeadingLinkCopy.prototype.copyLink = function (target) {
                var id = target.id;
                var url = this.getEntryURL();
                url.hash = id;
                return url.toString();
            };
            /**
             * クリップボードにコピーする
             */
            HeadingLinkCopy.prototype.copy = function (target) {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(target);
                }
                else {
                    window.prompt("リンクをコピーしてください", target);
                }
            };
            return HeadingLinkCopy;
        }());
        function headingLinkCopy() {
            var h = new HeadingLinkCopy();
            h.observe();
        }
        exports.headingLinkCopy = headingLinkCopy;
    });
    define("index", ["require", "exports", "headingLink"], function (require, exports, headingLink_1) {
        "use strict";
        exports.__esModule = true;
        function main() {
            (0, headingLink_1.headingLinkCopy)();
        }
        main();
    });
    
    'marker:resolver';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            var dependencies = ['exports'];
            var factory = function (exports) {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch (_a) {
                    throw Error(['module "', name, '" not found.'].join(''));
                }
            };
            return { dependencies: dependencies, factory: factory };
        }
    }
    var instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        var define = get_define(name);
        if (typeof define.factory !== 'function') {
            return define.factory;
        }
        instances[name] = {};
        var dependencies = define.dependencies.map(function (name) { return resolve(name); });
        define.factory.apply(define, dependencies);
        var exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports["default"] : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();