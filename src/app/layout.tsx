import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import "./styles/notion.css"
import "./styles/prism-theme.css"
import 'react-notion-x/src/styles.css'
import { Footer } from "@/components/Footer";
import { Social } from "@/components/Social";
import { Header } from "@/components/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        <main className="notion-page notion-full-page index-page">
          <div className="notion-page-content notion-page-content-has-aside">
            {children}
            <Social />
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
