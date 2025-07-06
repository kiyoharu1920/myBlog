import Image from "next/image";
import styles from "./page.module.css";

/**
 * ヘッダー画像を表示するコンポーネント
 * サイトのトップに表示されるメイン画像
 */
export function Header() {
  return (
    <div className={styles.image}>
      {/* ヘッダー画像（優先読み込み、高品質設定） */}
      <Image
        src="/aig-ai230105526-xl.png"
        width={1900}
        height={300}
        priority
        alt="Header image"
        className={styles.headerImage}
        quality={75}
        loading="eager"
      />
    </div>
  );
}
