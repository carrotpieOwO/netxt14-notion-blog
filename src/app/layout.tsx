import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import "./styles/notion.css"
import "./styles/prism-theme.css"
import "../components/modal.css"
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-coy.css'
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { api } from "@/lib/config";
import { ListLayout } from "@/components/ListLayout";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

async function getCoverImages() {
	const res = await fetch(api.getMainImages)
	
	if (!res.ok) {
	  throw new Error('Failed to fetch data')
	}
	return res.json()
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const coverImages = await getCoverImages()

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header icon={coverImages.heroImage} />
        <ListLayout coverImages={coverImages}>
          { children }
        </ListLayout>
        <Footer />
      </body>
    </html>
  );
}
