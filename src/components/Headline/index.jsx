import Link from "next/link";
import styles from "./page.module.css";

// ナビゲーション用のページ設定
const PAGES = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Articles",
    href: "/articles",
  },
  {
    title: "Tools",
    href: "/tools",
  },  {
    title: "Study",
    href: "/study",
  },
  {
    title: "Profile",
    href: "/profile",
  },
];

/**
 * ナビゲーションヘッドラインコンポーネント
 * サイト内の主要ページへのリンクを表示
 */
export function Headline() {
  return (
    <div className={styles.center}>
      <div className={styles.headline}>
        {/* 各ページへのナビゲーションリンクを生成 */}
        {PAGES.map((page) => {
          return (
            <span className={styles.anchor} key={page.title}>
              <Link href={page.href} >
                {page.title}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
