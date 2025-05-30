import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 200 300 400 500 600 700 800 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "SIP Portal",
  description: "Apply to startups for internships",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-mono)]`}
      >
        {children}
      </body>
    </html>
  );
}
