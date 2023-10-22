import { Study_useCallback } from "@/components/Study/Study_useCallback";
import { Study_useState } from "@/components/Study/Study_useState";
import { Study_useEffect } from "@/components/Study/Study_useEffect";
import { Study_useMemo } from "@/components/Study/Study_useMemo";

export default function Study() {
  return (
    <div>
      <main>
        <div>
          useCallback
          <Study_useCallback />
        </div>
        <hr />
        <div>
          useState
          <Study_useState />
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
