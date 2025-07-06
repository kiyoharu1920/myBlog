"use client";

import styles from "./page.module.css";
import { useCallback, useState } from "react";

/**
 * カウンター機能を提供するカスタムフック
 * @returns {Object} count - 現在のカウント値
 * @returns {Function} handleClickAdd - カウントを1増やす関数
 * @returns {Function} handleClickClear - カウントを0にリセットする関数
 */
function useCounterSet() {
  // カウントの状態を管理
  const [count, setCount] = useState(0);
  
  // カウントを1増やす関数（useCallbackでメモ化）
  const handleClickAdd = useCallback(
    () => setCount((prev) => prev + 1),
    []
  );

  // カウントを0にリセットする関数（useCallbackでメモ化）
  const handleClickClear = useCallback(() => setCount(() => 0), []);

  return { count, handleClickAdd, handleClickClear };
}

/**
 * カウンターコンポーネント
 * クリックでカウントを増やしたり、リセットしたりできるUI
 */
export function Counter() {
  // カスタムフックからカウンター機能を取得
  const { count, handleClickAdd, handleClickClear } = useCounterSet();

  return (
    <div className={styles.container}>
      {/* カウンターのタイトル */}
      カウンター
      
      {/* 現在のカウント値を表示 */}
      <div>{count}回</div>
      
      {/* カウントを増やすボタン */}
      <button onClick={handleClickAdd} className={styles.button}>
        Click me!
      </button>
      
      {/* カウントをリセットするボタン */}
      <button onClick={handleClickClear} className={styles.button}>
        Clear
      </button>
    </div>
  );
}
