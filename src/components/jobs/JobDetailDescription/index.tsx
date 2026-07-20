"use client";

interface JobDetailDescriptionProps {
  fullDescription: string;
}

export function JobDetailDescription({ fullDescription }: JobDetailDescriptionProps) {
  return (
    <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[32px] p-8 sm:p-12 space-y-8 shadow-subtle">
      <section>
        <h2 className="text-2xl font-extrabold text-[#0F172A] mb-6">Job Description & Responsibilities</h2>
        <div className="text-[#64748B] whitespace-pre-line leading-relaxed text-base font-medium">
          {fullDescription}
        </div>
      </section>
    </div>
  );
}
