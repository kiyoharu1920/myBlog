"use client";

import styles from "./page.module.css"
import { useCallback, useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => setCount(count + 1), [count]);

  return (
    <div className={styles.container}>
      カウンター
      <div>{count}回</div>
      <button onClick={handleClick}>ボタン</button>
    </div>
  );
}
