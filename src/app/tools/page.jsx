import styles from "./page.module.css";
import Link from "next/link";

import { Counter } from "@/components/Counter";
import { ToDo } from "@/components/ToDo";
import { SendEmail } from "@/components/SendEMail";

export default function Tools() {
  return (
    <div>
      <main>
        <Counter></Counter>
        <ToDo></ToDo>
       <SendEmail />
        <div className={styles.link}>
          <Link href={"./tools/photos"}>Photos</Link>
        </div>
        <div className={styles.link}>
          <Link href={"./tools/googlemaps"}>Google Map</Link>
        </div>
        <div className={styles.link}>
          <Link href={"./tools/dbtest"}>postgreSQL てすと</Link>
        </div>
      </main>
    </div>
  );
}
