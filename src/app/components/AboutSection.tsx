'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  const traits = [
    {
      icon: '⚡',
      label: 'Performance-Obsessed',
      desc: 'Sub-100ms interactions, optimized bundles, 100 Lighthouse scores.',
    },
    {
      icon: '🎨',
      label: 'Craft-Driven',
      desc: 'Every pixel, every animation, every transition is intentional.',
    },
    {
      icon: '🤖',
      label: 'AI-Native Builder',
      desc: 'Integrating LLM capabilities into production products since 2023.',
    },
    {
      icon: '🧠',
      label: 'Mentor & Teacher',
      desc: 'Actively mentoring junior developers, accelerating team growth.',
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6 md:px-10 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div
          className="flex items-center gap-4 mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <span className="section-label">About Me</span>
          <span className="h-px flex-1 max-w-24 bg-primary opacity-20" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story */}
          <div
            className="space-y-8"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.1s',
            }}
          >
            <h2 className="font-display text-display text-foreground">
              Building the web
              <br />
              <span className="gradient-text italic">one component</span>
              <br />
              at a time.
            </h2>

            <div className="space-y-5 text-secondary-foreground leading-relaxed">
              <p>
                I&apos;m Mohammadhossein Sadeghi — known as{' '}
                <strong className="text-foreground">Ashkan</strong> — a front-end engineer from
                Shiraz, Iran with a relentless obsession for building exceptional digital products.
              </p>
              <p>
                My journey started with curiosity about how beautiful interfaces come to life.
                Today, I architect scalable React applications, design systems that scale to
                millions of users, and build AI-powered products that genuinely change how people
                work.
              </p>
              <p>
                At <strong className="text-foreground">Maktab Sharif</strong>, I don&apos;t just
                write code — I mentor the next generation of developers, teaching them that great
                software is equal parts engineering and empathy.
              </p>
              <p>
                My signature project, <strong className="text-primary">Nova Star AI</strong>,
                represents my vision for what AI-native interfaces should feel like: intelligent,
                responsive, and deeply human.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {[
                'Next.js Expert',
                'React',
                'TypeScript',
                'JavaScript',
                'System Design',
                'AI Integration',
                'Mentorship',
              ]?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-bold rounded-full"
                  style={{
                    background: 'rgba(79,142,247,0.08)',
                    border: '1px solid rgba(79,142,247,0.2)',
                    color: '#4F8EF7',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Traits + photo */}
          <div
            className="space-y-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s',
            }}
          >
            {/* Profile visual */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-video mb-8"
              style={{ border: '1px solid rgba(79,142,247,0.15)' }}
            >
              <AppImage
                src="https://images.unsplash.com/photo-1609359217292-c910017fa3a8"
                alt="Dark workspace with multiple monitors showing code in a dimly lit room with blue LED lighting"
                fill
                className="object-cover"
                priority
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(5,5,8,0.4) 0%, transparent 60%, rgba(124,58,237,0.2) 100%)',
                }}
              />

              <div className="absolute bottom-4 left-4 glass-card rounded-xl px-4 py-3">
                <div className="text-xs font-mono text-primary">ashkan@epic2077</div>
                <div className="text-xs text-muted-foreground mt-0.5">Shiraz, Iran · UTC+3:30</div>
              </div>
            </div>

            {/* Trait cards */}
            <div className="grid grid-cols-2 gap-4">
              {traits?.map((t, i) => (
                <div
                  key={t?.label}
                  className="glass-card-hover rounded-xl p-4"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.1}s`,
                  }}
                >
                  <div className="text-2xl mb-2">{t?.icon}</div>
                  <div className="text-sm font-bold text-foreground mb-1">{t?.label}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{t?.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
