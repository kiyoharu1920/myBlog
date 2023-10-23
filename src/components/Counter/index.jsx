"use client";

import styles from "./page.module.css";
import { useCallback, useState } from "react";

function useCounterSet() {
  const [count, setCount] = useState(0);
  const handleClickAdd = useCallback(
    () => setCount((prev) => prev + 1),
    []
  );

  const handleClickClear = useCallback(() => setCount(() => 0), []);

  return { count, handleClickAdd, handleClickClear };
}

export function Counter() {
  const { count, handleClickAdd, handleClickClear } = useCounterSet();

  return (
    <div className={styles.container}>
      カウンター
      <div>{count}回</div>
      <button onClick={handleClickAdd} className={styles.button}>
        Click me!
      </button>
      <button onClick={handleClickClear} className={styles.button}>
        Clear
      </button>
    </div>
  );
}
