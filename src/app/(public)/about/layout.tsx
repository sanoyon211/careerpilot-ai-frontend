import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: "About Us | CareerPilot AI",
  description: "Learn more about CareerPilot AI, our mission to revolutionize recruitment with Agentic AI, and our team.",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
