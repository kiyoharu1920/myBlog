"use client";

import { useCallback } from "react";

/**
 * useCallbackフックの学習用コンポーネント
 * 関数をメモ化して不要な再レンダリングを防ぐ
 */
export function Study_useCallback() {
  // useCallbackを使用して関数をメモ化
  // 依存配列が空なので、初回レンダリング時のみ関数が作成される
  const func = useCallback(() => {
    return (
      <div>
        <div>重い関数の処理結果などを保存するときに便利</div>
      </div>
    );
  }, []);

  return (
    <div>
      {/* メモ化された関数を実行して結果を表示 */}
      {func()}
    </div>
  );
}
