"use client";

import { useEffect, useState } from "react";

/**
 * useEffectフックの学習用コンポーネント
 * 副作用の実行タイミングとライフサイクルについて学習
 */
export function Study_useEffect() {
  // useEffectを使用してマウント時とアンマウント時の処理を定義
  useEffect(() => {
    console.log("マウント");

    // クリーンアップ関数（アンマウント時に実行）
    return console.log("アンマウント");
  }, []); // 空の依存配列で初回マウント時のみ実行

  return (
    <div>
      {/* useEffectの基本的な使用方法の説明 */}
      <div>
        処理を実行するタイミングを第2引数に変数を設定することで決めることができる
      </div>
      <div>第2引数が空配列だとマウント時、アンマウント時に実行される</div>
      <div>npm run devだとStrictModeが有効のときは2回レンダリングされる</div>
      <div>npm run build → npm run startだと2回レンダリングされない</div>
      <div>無限ループに注意(useStateのsetXXXを入れて第2引数にその変数を入れると...)</div>
    </div>
  );
}
