import Image from "next/image";
import styles from "./page.module.css";

export function Header() {
  return (
    <div className={styles.image}
    >
      <Image
        src="/aig-ai230105526-xl.png"
        width={1900}
        height={300}
        sizes="80vw"
        alt="Picture of the author"
        style={{ width: '100%', height: 'auto' }}
      ></Image>
    </div>
  );
}
