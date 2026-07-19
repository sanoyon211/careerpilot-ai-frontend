import { Users, Briefcase, FileCheck, Award } from "lucide-react";

const stats = [
  { id: 1, name: "Active Candidates", value: "2.4M+", icon: Users },
  { id: 2, name: "AI Position Matches", value: "150K+", icon: Briefcase },
  { id: 3, name: "Resumes Evaluated", value: "850K+", icon: FileCheck },
  { id: 4, name: "AI Match Precision", value: "94.8%", icon: Award },
];

export function Statistics() {
  return (
    <section className="bg-[#000000] text-white py-24 border-y border-white/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center justify-center p-6 rounded-3xl bg-[#161617] border border-white/10">
              <stat.icon className="h-7 w-7 text-[#0071e3] mb-3" />
              <div className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">{stat.value}</div>
              <div className="text-xs font-semibold text-slate-400 mt-3 tracking-tight">{stat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
