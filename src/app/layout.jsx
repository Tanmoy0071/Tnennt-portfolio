import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const myFont = localFont({ src: '../fonts/Nexa-Heavy.woff2' })


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
