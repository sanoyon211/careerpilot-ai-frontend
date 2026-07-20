import { Metadata } from "next";

export function constructMetadata({
  title = "CareerPilot AI | Intelligent Autonomous Career Copilot",
  description = "AI-powered career platform combining Groq Agentic AI with human-centric recruitment. Simplify your job search, build ATS-friendly resumes, and accelerate your career.",
  image = "/icon.png",
  icons = "/icon.png",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@CareerPilotAI",
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
