import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: "FAQ | CareerPilot AI",
  description: "Find answers to frequently asked questions about CareerPilot AI's resume analyzer, job search, and AI assistant.",
});

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
