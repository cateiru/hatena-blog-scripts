/**
 * はてなブログの見出し要素にコピー用のリンクを設置、
 * リンクをクリックすると、その見出しの応じたURLがコピーされる
 */

const ENTRY_SELECTOR = ".entry-content"
const HEADING_SELECTOR = ".entry-content > h1, .entry-content > h2, .entry-content > h3, .entry-content > h4, .entry-content > h5, .entry-content > h6"

const HEADING_CLASS_NAME = "heading"

function isElement(target: EventTarget): target is Element {
  return target instanceof Element
}

class HeadingLinkCopy {
  private headings: NodeListOf<HTMLHeadingElement>

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
  private searchAllHeading(): NodeListOf<HTMLHeadingElement> {
    return document.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR);
  }

  /**
   * 現在のページのURLを取得する
   */
  private getEntryURL(): URL {
    return new URL(location.href)
  }

  /**
   * targetの要素にクラス名を追加してリンク化する
   */
  private addLink(target: HTMLHeadingElement): void {
    target.classList.add(HEADING_CLASS_NAME);
    target.style.cssText ="cursor: pointer"
  }

  /**
   * クリックを監視して、見出しをクリックした場合
   */
  public observe() {
    const entryElement = document.querySelector<HTMLDivElement>(ENTRY_SELECTOR);
    if(!entryElement) {
      return;
    }

    entryElement.addEventListener("click", (e) => {
      const target = e.target;
      if(!target) {
        return;
      }
      if(!isElement(target)) {
        return;
      }

      if(target.classList.contains(HEADING_CLASS_NAME)) {
        window.alert(this.getEntryURL());
      }
    });
  }
}


export function headingLinkCopy() {
  const h = new HeadingLinkCopy();

  h.observe();
}
