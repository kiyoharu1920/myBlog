"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { Headline } from "@/components/Headline";
import { Main } from "@/components/Main";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Headline></Headline>

      <Main></Main>

      <Footer></Footer>
    </div>
  );
}
