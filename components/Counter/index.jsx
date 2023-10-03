"use client";

import { useCallback, useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => setCount(count + 1), [count]);

  return (
    <div>
      <div>{count}回</div>
      <button onClick={handleClick}>ボタン</button>
    </div>
  );
}
