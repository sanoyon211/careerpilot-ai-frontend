import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

import { constructMetadata } from "@/utils/metadata";

export const metadata: Metadata = constructMetadata();

import { Providers } from "@/redux/provider";
import { SweetAlertProvider } from "@/components/common/SweetAlertProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className={`${plusJakartaSans.variable} font-sans antialiased min-h-screen bg-white text-[#1E293B]`}>
        <Providers>
          <SweetAlertProvider>{children}</SweetAlertProvider>
        </Providers>
      </body>
    </html>
  );
}
