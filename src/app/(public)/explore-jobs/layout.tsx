import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: "Explore Jobs | CareerPilot AI",
  description: "Browse thousands of job openings. Use our Agentic AI to find jobs tailored to your skills and resume.",
});

export default function ExploreJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
