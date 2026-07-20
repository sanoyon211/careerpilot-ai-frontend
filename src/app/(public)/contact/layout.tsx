import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: "Contact Us | CareerPilot AI",
  description: "Get in touch with the CareerPilot AI team for support, partnerships, or general inquiries.",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
