"use client";

import { Target, Zap, Users2, Sparkles } from "lucide-react";

export function AboutMission() {
  const missionPoints = [
    { icon: Target, text: "Precision matching through Groq Llama 3.3 70B LLM analysis" },
    { icon: Zap, text: "Real-time market insights and ATS resume scoring" },
    { icon: Users2, text: "Fostering direct connections between talent and hiring teams" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-16 mb-24 items-center">
      <div className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">Our Mission</h2>
        <p className="text-[#64748B] leading-relaxed text-lg font-medium">
          To empower professionals worldwide by providing them with an autonomous, intelligent career copilot. We aim to eliminate bias and friction in traditional hiring processes, ensuring every candidate is evaluated on their true potential.
        </p>
        <ul className="space-y-5 pt-2">
          {missionPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <li key={idx} className="flex items-center gap-4">
                <div className="bg-[#8B5CF6]/15 p-3 rounded-2xl text-[#8B5CF6]">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-extrabold text-[#0F172A] text-base">{item.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="relative">
        <div className="relative bg-[#F4F7FE] border border-[#E2E8F0] rounded-[36px] p-12 aspect-square flex flex-col justify-center items-center text-center shadow-subtle">
          <div className="h-24 w-24 bg-[#8B5CF6]/15 rounded-3xl flex items-center justify-center mb-6 text-[#8B5CF6] shadow-2xs">
            <Sparkles className="h-12 w-12" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-4">Powered by Groq Agentic AI</h3>
          <p className="text-[#64748B] text-base leading-relaxed font-medium max-w-md">
            Our intelligent agents work 24/7 to analyze your resume, score ATS readiness, and find roles that perfectly align with your career trajectory.
          </p>
        </div>
      </div>
    </div>
  );
}
