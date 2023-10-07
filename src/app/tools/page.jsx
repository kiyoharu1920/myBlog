import styles from "./page.module.css";

import { Counter } from "@/components/Counter";
import { ToDo } from "@/components/ToDo";

export default function Home() {
  return (
    <div>
      <main>
        <Counter></Counter>
        <ToDo></ToDo>
      </main>
    </div>
  );
}
