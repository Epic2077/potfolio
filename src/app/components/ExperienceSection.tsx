'use client';

import React, { useEffect, useRef, useState } from 'react';

type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  color: string;
  description: string;
  highlights: string[];
};

const EXPERIENCES: Experience[] = [
  {
    company: 'Sonat',
    role: 'Front-End Developer',
    period: '2025 — 2026',
    location: 'San Diego, USA (remote)',
    type: 'Full-Time',
    color: '#06B6D4',
    description:
      'Developed and maintained a public citation website for Sonat Company as a mid-level front-end developer. Collaborated with cross-functional teams to deliver a seamless user experience and implemented responsive design principles to ensure accessibility across devices.',
    highlights: [
      'Delivered 3 business changing features that increased user engagement by 25%',
      'Implemented design system from scratch',
      'Refactored legacy codebase, improving performance by 40%',
      'Refactored design system components, reducing CSS bundle size by 30%',
    ],
  },
  {
    company: 'Maktab Sharif',
    role: 'Senior Front-End Instructor & Developer',
    period: '2023 — Present',
    location: 'Tehran, Iran (Remote)',
    type: 'Full-Time',
    color: '#4F8EF7',
    description:
      'Leading advanced React and Next.js curriculum development while mentoring cohorts of 30+ developers. Built internal tooling that reduced course management overhead by 60%.',
    highlights: [
      'Mentored 40+ junior developers in React and Next ecosystem',
      'Designed project-based TypeScript curriculum',
      'Built internal LMS dashboard with Next.js 16',
      'Introduced AI-assisted coding practices to curriculum',
    ],
  },
  {
    company: 'ZARSIM',
    role: 'Front-End Developer',
    period: '2022 — 2023',
    location: 'Shiraz, Iran',
    type: 'Full-Time',
    color: '#7C3AED',
    description:
      'Architected and delivered enterprise-grade financial dashboards serving 50,000+ daily users. Led migration from legacy jQuery codebase to modern React architecture.',
    highlights: [
      'Migrated 80K LOC jQuery → React 18 in 4 months',
      'Built real-time trading dashboard with WebSockets',
      'Reduced initial load time from 8s to 1.2s',
      'Led team of 4 frontend developers',
    ],
  },

  {
    company: 'Freelance',
    role: 'Independent Front-End Engineer',
    period: '2019 — 2021',
    location: 'Remote · Worldwide',
    type: 'Freelance',
    color: '#F59E0B',
    description:
      'Worked with startups and agencies across Europe and the Middle East, delivering pixel-perfect interfaces and e-commerce solutions. Built a reputation for shipping on time, every time.',
    highlights: [
      '15+ international clients served',
      'Specialized in e-commerce and SaaS UIs',
      'Maintained 5-star rating on Upwork',
      'Built first AI chatbot integration in 2020',
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeExp, setActiveExp] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 px-6 md:px-10 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div
          className="flex items-center gap-4 mb-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <span className="section-label">Experience</span>
          <span className="h-px flex-1 max-w-24 bg-primary opacity-20" />
        </div>

        <h2
          className="font-display text-display text-foreground mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s',
          }}
        >
          The journey
          <br />
          <span className="gradient-text italic">so far.</span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Timeline nav */}
          <div className="lg:col-span-2 relative">
            {/* Vertical line */}
            <div
              className="absolute left-[22px] top-4 bottom-4 w-px hidden lg:block"
              style={{ background: 'linear-gradient(180deg, #4F8EF7, #7C3AED, #06B6D4, #F59E0B)' }}
            />

            <div className="space-y-2">
              {EXPERIENCES.map((exp, i) => (
                <button
                  key={exp.company}
                  onClick={() => setActiveExp(i)}
                  className="relative w-full text-left px-6 py-5 rounded-xl transition-all duration-300 lg:pl-14"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                    transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
                    background: activeExp === i ? `${exp.color}0D` : 'transparent',
                    border: `1px solid ${activeExp === i ? `${exp.color}30` : 'transparent'}`,
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full hidden lg:flex items-center justify-center"
                    style={{
                      background: activeExp === i ? exp.color : '#1A1A2E',
                      border: `2px solid ${exp.color}`,
                      boxShadow: activeExp === i ? `0 0 12px ${exp.color}80` : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {activeExp === i && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  <div
                    className="font-bold text-sm mb-0.5"
                    style={{ color: activeExp === i ? exp.color : '#E8EAF0' }}
                  >
                    {exp.company}
                  </div>
                  <div className="text-xs text-muted-foreground">{exp.period}</div>
                  <div
                    className="text-xs mt-1 font-medium"
                    style={{ color: activeExp === i ? exp.color : 'transparent' }}
                  >
                    {exp.type}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Experience detail */}
          <div
            className="lg:col-span-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.3s',
            }}
          >
            {EXPERIENCES.map((exp, i) => (
              <div
                key={exp.company}
                style={{
                  display: activeExp === i ? 'block' : 'none',
                }}
              >
                <div
                  className="glass-card rounded-2xl p-8"
                  style={{ border: `1px solid ${exp.color}20` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="section-label mb-2" style={{ color: exp.color }}>
                        {exp.type} · {exp.period}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${exp.color}15`,
                        border: `1px solid ${exp.color}30`,
                      }}
                    >
                      <span className="text-xl">
                        {i === 0 ? '🎓' : i === 1 ? '📈' : i === 2 ? '⚙️' : '🌍'}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-secondary-foreground leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div>
                    <div className="section-label mb-4">Key Highlights</div>
                    <div className="space-y-3">
                      {exp.highlights.map((h, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{
                              background: exp.color,
                              boxShadow: `0 0 6px ${exp.color}80`,
                            }}
                          />
                          <span className="text-sm text-foreground">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
