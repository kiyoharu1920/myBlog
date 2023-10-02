"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { Headline } from "@/components/Headline";
import { Footer } from "@/components/Footer";

export default function Article() {
  return (
    <div>
      <Headline></Headline>
      こんにちは
      <Footer></Footer>
    </div>
  );
}
