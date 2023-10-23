"use client";

import { useMemo } from "react";

export function Study_useMemo() {
  const result = useMemo(() => {
    return "処理が重い関数などを保存するときに便利";
  }, []);

  return (
    <div>
      <div>{result}</div>
    </div>
  );
}
