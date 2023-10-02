import Image from "next/image";
import styles from "./page.module.css";

import { Articles } from "@/components/Articles";

export function Main() {
  return (
    <main className={styles.main}>
      Hello World
      <Articles></Articles>
    </main>
  );
}
