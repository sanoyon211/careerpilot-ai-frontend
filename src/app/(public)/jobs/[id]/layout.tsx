import { constructMetadata } from "@/utils/metadata";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const apiUrl = baseUrl.endsWith("/api/v1")
      ? baseUrl
      : `${baseUrl.replace(/\/$/, "")}/api/v1`;

    const response = await fetch(`${apiUrl}/jobs/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return constructMetadata({
        title: "Job Not Found | CareerPilot AI",
      });
    }

    const { data: job } = await response.json();

    return constructMetadata({
      title: `${job?.title || "Job Details"} at ${job?.employerId?.name || "CareerPilot AI"}`,
      description:
        job?.shortDescription ||
        `Apply for the ${job?.title || "position"} on CareerPilot AI.`,
      image: job?.imageUrl || "/icon.png",
    });
  } catch (error) {
    return constructMetadata({
      title: "Job Details | CareerPilot AI",
    });
  }
}

export default function JobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
