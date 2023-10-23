import { Study_useCallback } from "@/components/Study/Study_useCallback";
import { Study_useEffect } from "@/components/Study/Study_useEffect";
import { Study_useMemo } from "@/components/Study/Study_useMemo";

export default function Study() {
  return (
    <div>
      <main>
        <div>useMemoやuseCallbackは値を保存しておくか関数を保存しておくかの違い</div>
        <div>レンダリングの際に再度読み込むことがない</div>
        <div>再度読込をしたい場合は第2引数に変数が入った配列を入れる</div>
        <hr />
        <div>
          useCallback
          <Study_useCallback />
        </div>
        <hr />
        <div>
          useMemo
          <Study_useMemo></Study_useMemo>
        </div>
        <hr />
        <div>
          useEffect
          <Study_useEffect></Study_useEffect>
        </div>
      </main>
    </div>
  );
}
