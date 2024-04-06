import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { AppProvider } from "@/components/AppContext";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "Arya Kue Snack",
  description: "Generated by create next app",
  icons: {
    icon: {
      url: '/images/logo.png',
      href: '/images/logo.png',
    },
  },
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <AppProvider>
          <Toaster />
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
