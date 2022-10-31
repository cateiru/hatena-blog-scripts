/**
 * はてなブログの見出し要素にコピー用のリンクを設置、
 * リンクをクリックすると、その見出しの応じたURLがコピーされる
 */
define("src/headingLink", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.headingLinkCopy = void 0;
    const ENTRY_SELECTOR = ".entry-content";
    const HEADING_SELECTOR = ".entry-content > h1, .entry-content > h2, .entry-content > h3, .entry-content > h4, .entry-content > h5, .entry-content > h6";
    const HEADING_CLASS_NAME = "heading";
    function isElement(target) {
        return target instanceof Element;
    }
    class HeadingLinkCopy {
        headings;
        constructor() {
            const headings = this.searchAllHeading();
            headings.forEach((v) => {
                this.addLink(v);
            });
            this.headings = headings;
        }
        /**
         * 記事内のすべての見出し要素を取得する
         */
        searchAllHeading() {
            return document.querySelectorAll(HEADING_SELECTOR);
        }
        /**
         * 現在のページのURLを取得する
         */
        getEntryURL() {
            return new URL(location.href);
        }
        /**
         * targetの要素にクラス名を追加してリンク化する
         */
        addLink(target) {
            target.classList.add(HEADING_CLASS_NAME);
            target.style.cssText = "cursor: pointer";
        }
        /**
         * クリックを監視して、見出しをクリックした場合
         */
        observe() {
            const entryElement = document.querySelector(ENTRY_SELECTOR);
            if (!entryElement) {
                return;
            }
            entryElement.addEventListener("click", (e) => {
                const target = e.target;
                if (!target) {
                    return;
                }
                if (!isElement(target)) {
                    return;
                }
                if (target.classList.contains(HEADING_CLASS_NAME)) {
                    window.alert(this.getEntryURL());
                }
            });
        }
    }
    function headingLinkCopy() {
        const h = new HeadingLinkCopy();
        h.observe();
    }
    exports.headingLinkCopy = headingLinkCopy;
});
define("src/index", ["require", "exports", "src/headingLink"], function (require, exports, headingLink_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function main() {
        (0, headingLink_1.headingLinkCopy)();
    }
    main();
});
