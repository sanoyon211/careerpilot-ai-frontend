import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CareerPilot AI | Intelligent Autonomous Career Copilot",
  description: "AI-powered career platform combining Groq Agentic AI with human-centric recruitment.",
};

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
