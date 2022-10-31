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
  constructor() {
    const headings = this.searchAllHeading();
    headings.forEach((v) => {
      this.addLink(v);
    });
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
        const url = this.copyLink(target);
        this.copy(url);
      }
    });
  }

  /**
   * コピーするためのURLを返す
   *
   * @param target - クリックした見出しの要素
   * @returns URL
   */
  private copyLink(target: Element) {
    const id = target.id;
    const url = this.getEntryURL();
    url.hash = id;
    return url.toString();
  }

  /**
   * クリップボードにコピーする
   */
  private copy(target: string) {
    if(navigator.clipboard){
      navigator.clipboard.writeText(target);
    }
  }
}


export function headingLinkCopy() {
  const h = new HeadingLinkCopy();

  h.observe();
}
