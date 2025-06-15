import Image from "next/image";
import styles from "./page.module.css";

export function Header() {
  return (
    <div className={styles.image}>
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
