"use client";

import { useEffect, useState } from "react";

export function Study_useEffect() {
  useEffect(() => {
    console.log("マウント");

    return console.log("アンマウント");
  }, []);
  return (
    <div>
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
