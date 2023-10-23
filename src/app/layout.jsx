import "./globals.css";
import { Inter } from "next/font/google";

import { Headline } from "@/components/Headline";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="jp">
      <body className={inter.className}>
        <Header></Header>
        <Headline></Headline>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
