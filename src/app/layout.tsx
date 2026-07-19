import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareerPilot AI",
  description: "Your Agentic AI Career & Job Assistant",
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
      <body className={`${inter.className} antialiased min-h-screen bg-background font-sans`}>
        <Providers>
          <SweetAlertProvider>{children}</SweetAlertProvider>
        </Providers>
      </body>
    </html>
  );
}
