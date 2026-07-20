"use client";

import { Target, Zap, Users2, Sparkles } from "lucide-react";

export function AboutMission() {
  const missionPoints = [
    { icon: Target, text: "Precision matching through Groq Llama 3.3 70B LLM analysis" },
    { icon: Zap, text: "Real-time market insights and ATS resume scoring" },
    { icon: Users2, text: "Fostering direct connections between talent and hiring teams" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          To empower professionals worldwide by providing them with an autonomous, intelligent career copilot. We aim to eliminate bias and friction in traditional hiring processes, ensuring every candidate is evaluated on their true potential.
        </p>
        <ul className="space-y-4 pt-4">
          {missionPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <li key={idx} className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-foreground text-sm sm:text-base">{item.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
        <div className="relative bg-card border rounded-3xl p-8 aspect-square flex flex-col justify-center items-center text-center shadow-lg">
          <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Powered by Groq Agentic AI</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Our intelligent agents work 24/7 to analyze your resume, score ATS readiness, and find roles that perfectly align with your career trajectory.
          </p>
        </div>
      </div>
    </div>
  );
}
