import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "CareerPilot AI | Where Great Companies Meet Great Talent",
  description: "AI-powered career platform for job seekers and recruiters.",
};

import { Providers } from "@/redux/provider";
import { SweetAlertProvider } from "@/components/common/SweetAlertProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${inter.className} antialiased min-h-screen bg-background font-sans`}>
        <Providers>
          <SweetAlertProvider>{children}</SweetAlertProvider>
        </Providers>
      </body>
    </html>
  );
}

