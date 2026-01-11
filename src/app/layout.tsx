import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "أسامة محمد زكريا جنيدي - Portfolio",
  description: "خبير في التجارة الإلكترونية والتسويق الرقمي. متخصص في إدارة المتاجر الإلكترونية وكتابة المحتوى والتسويق الرقمي.",
  keywords: ["أسامة جنيدي", "التجارة الإلكترونية", "التسويق الرقمي", "إدارة المتاجر", "كتابة المحتوى", "السوشيال ميديا", "الذكاء الاصطناعي", "علوم البيانات"],
  authors: [{ name: "أسامة محمد زكريا جنيدي" }],
  openGraph: {
    title: "أسامة جنيدي - Portfolio",
    description: "خبير في التجارة الإلكترونية والتسويق الرقمي",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
