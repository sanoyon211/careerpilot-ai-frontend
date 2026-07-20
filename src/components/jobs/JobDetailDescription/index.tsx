"use client";

interface JobDetailDescriptionProps {
  fullDescription: string;
}

export function JobDetailDescription({ fullDescription }: JobDetailDescriptionProps) {
  return (
    <div className="bg-card border rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
      <section>
        <h2 className="text-xl font-bold mb-4">Job Description & Responsibilities</h2>
        <div className="text-muted-foreground whitespace-pre-line leading-relaxed text-sm">
          {fullDescription}
        </div>
      </section>
    </div>
  );
}
