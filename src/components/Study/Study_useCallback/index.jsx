"use client";

import { useCallback } from "react";

export function Study_useCallback() {
  const func = useCallback(() => {
    return (
      <div>
        <div>重い関数の処理結果などを保存するときに便利</div>
      </div>
    );
  }, []);
  return (
    <div>
      {func()}
    </div>
  );
}
