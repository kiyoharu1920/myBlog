"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { Headline } from "@/components/Headline";

export default function Home() {
  return (
    <div>
      <Headline></Headline>
      <main className={styles.main}>
        プロフィールです
      </main>
    </div>
  );
}
