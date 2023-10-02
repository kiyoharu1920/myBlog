import Image from "next/image";
import styles from "./page.module.css";

import Link from "next/link";

const PAGES = [
  {
    title: "home",
    href: "/",
  },
  {
    title: "profile",
    href: "/profile",
  },
];

export function Headline() {
  return (
    <div>
      <div className={styles.navigation}>
        {PAGES.map((page) => {
          return (
            <Link href={page.href} key={page.title}>
              {page.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
