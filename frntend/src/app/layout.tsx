import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeRegistry } from "@/lib/ThemeRegistry";
import { StoreProvider } from "@/lib/StoreProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Formedics",
  description: "Monitor your key metrics and analytics in real-time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} min-h-full`}>
        <StoreProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}