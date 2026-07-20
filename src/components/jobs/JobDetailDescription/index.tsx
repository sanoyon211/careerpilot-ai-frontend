"use client";

interface JobDetailDescriptionProps {
  fullDescription: string;
}

export function JobDetailDescription({ fullDescription }: JobDetailDescriptionProps) {
  return (
    <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-6 sm:p-8 space-y-8 shadow-xs">
      <section>
        <h2 className="text-xl font-extrabold text-[#1E293B] mb-4">Job Description & Responsibilities</h2>
        <div className="text-[#64748B] whitespace-pre-line leading-relaxed text-sm font-medium">
          {fullDescription}
        </div>
      </section>
    </div>
  );
}
