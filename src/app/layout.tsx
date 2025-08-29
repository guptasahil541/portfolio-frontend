import type { Metadata } from "next";
import { clashDisplay, thicccboi } from "./fonts/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sahil Gupta - UI Designer and Developer",
  description: "I bridge design and development to create digital experiences that stand out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"className={`${thicccboi.variable} ${clashDisplay.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
