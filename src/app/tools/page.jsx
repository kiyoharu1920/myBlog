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
        <Link href={"./tools/photos"}>photos</Link>
      </main>
    </div>
  );
}
