"use client";

import { useMemo } from "react";

/**
 * useMemoフックの学習用コンポーネント
 * 重い処理の結果をメモ化してパフォーマンスを向上させる
 */
export function Study_useMemo() {
  // useMemoを使用して重い処理の結果をメモ化
  // 依存配列が空なので、初回レンダリング時のみ実行される
  const result = useMemo(() => {
    return "処理が重い関数などを保存するときに便利";
  }, []);

  return (
    <div>
      {/* メモ化された結果を表示 */}
      <div>{result}</div>
    </div>
  );
}
