'use client';

import React, { useEffect, useRef, useState } from 'react';

const SPECIALTIES = ['React.js', 'Next.js', 'TypeScript', 'UI Engineering', 'AI Products'];

const TERMINAL_LINES = [
  { text: '> Initializing Nova Star AI...', delay: 0, color: '#4F8EF7' },
  { text: '> Loading portfolio assets...', delay: 600, color: '#A8ABBE' },
  { text: '> Systems online. Welcome.', delay: 1200, color: '#06B6D4' },
  { text: '> ashkan@epic2077 ~ $', delay: 1800, color: '#4F8EF7', cursor: true },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [specialtyIdx, setSpecialtyIdx] = useState(0);
  const [terminalLines, setTerminalLines] = useState<typeof TERMINAL_LINES>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Animated grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let offset = 0;
    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gridSize = 60;
      ctx.strokeStyle = 'rgba(79,142,247,0.08)';
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let x = 0; x <= canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines with scroll offset
      for (let y = (offset % gridSize) - gridSize; y <= canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Bright intersection dots
      ctx.fillStyle = 'rgba(79,142,247,0.15)';
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = (offset % gridSize) - gridSize; y <= canvas.height + gridSize; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      offset += 0.4;
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Terminal lines reveal
  useEffect(() => {
    TERMINAL_LINES.forEach((line) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, line]);
      }, 2200 + line.delay);
    });
  }, []);

  // Rotating specialties
  useEffect(() => {
    const t = setInterval(() => {
      setSpecialtyIdx((i) => (i + 1) % SPECIALTIES.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  // Parallax mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      id="hero"
    >
      {/* Animated grid canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ opacity: 1 }} />

      {/* Radial glow blobs */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(79,142,247,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 40%, rgba(124,58,237,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Parallax floating accent circles */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: 'transform 0.3s ease',
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
          transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
          transition: 'transform 0.3s ease',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero text */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="section-label">Front-End Developer</span>
              <span className="h-px flex-1 max-w-16 bg-primary opacity-30" />
              <span className="text-xs text-muted-foreground font-mono">Shiraz, Iran</span>
            </div>

            {/* Main headline */}
            <div>
              <h1 className="font-display text-hero text-foreground leading-tight">
                Hi, I&apos;m <span className="gradient-text italic">Ashkan.</span>
              </h1>
              <p className="font-display text-display text-secondary-foreground font-light mt-2">
                I build exceptional
                <br />
                <span className="text-foreground font-normal">digital experiences.</span>
              </p>
            </div>

            {/* Rotating specialty */}
            <div className="flex items-center gap-3 h-8">
              <span className="text-muted-foreground text-sm">Specializing in</span>
              <div className="relative overflow-hidden h-8 flex items-center">
                {SPECIALTIES.map((s, i) => (
                  <span
                    key={s}
                    className="absolute left-0 font-bold text-sm gradient-text transition-all duration-500"
                    style={{
                      opacity: i === specialtyIdx ? 1 : 0,
                      transform:
                        i === specialtyIdx
                          ? 'translateY(0)'
                          : i < specialtyIdx
                            ? 'translateY(-100%)'
                            : 'translateY(100%)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={() => handleScroll('#projects')} className="btn-primary">
                <span>View Projects</span>
              </button>
              <button onClick={() => handleScroll('#contact')} className="btn-ghost">
                Contact Me
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4 border-t border-border">
              {[
                { num: '4+', label: 'Years Experience' },
                { num: '12+', label: 'Projects Shipped' },
                { num: '4', label: 'Companies' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold gradient-text">{stat.num}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Terminal */}
          <div
            className="hidden lg:block"
            style={{
              transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
              transition: 'transform 0.4s ease',
            }}
          >
            <div
              className="glass-card rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 0 60px rgba(79,142,247,0.1), 0 0 120px rgba(124,58,237,0.05)',
              }}
            >
              {/* Terminal header */}
              <div
                className="flex items-center gap-2 px-5 py-4"
                style={{
                  borderBottom: '1px solid rgba(79,142,247,0.1)',
                  background: 'rgba(13,13,24,0.8)',
                }}
              >
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">
                  nova-star — bash — 80×24
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-primary font-mono">LIVE</span>
                </div>
              </div>

              {/* Terminal body */}
              <div className="p-6 font-mono text-sm space-y-2 min-h-[280px]">
                {terminalLines.map((line, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span style={{ color: line.color }}>{line.text}</span>
                    {line.cursor && (
                      <span className="terminal-cursor text-primary text-base">▋</span>
                    )}
                  </div>
                ))}

                {terminalLines.length === 0 && (
                  <div className="text-muted-foreground text-xs">Connecting to Nova Star...</div>
                )}
              </div>

              {/* Nova Star badge */}
              <div
                className="flex items-center gap-3 px-6 py-4"
                style={{
                  borderTop: '1px solid rgba(79,142,247,0.1)',
                  background: 'rgba(79,142,247,0.03)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center orb-pulse"
                  style={{ background: 'transparent', border: '1px solid rgba(79,142,247,0.3)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L14.5 9H22L16 13.5L18.5 20.5L12 16.5L5.5 20.5L8 13.5L2 9H9.5L12 2Z"
                      fill="#4F8EF7"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Nova Star AI</div>
                  <div className="text-xs text-muted-foreground">Signature Project — Active</div>
                </div>
                <div className="ml-auto">
                  <span className="text-xs text-green-400 font-mono">● ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-px h-10 relative overflow-hidden bg-border">
          <div
            className="absolute top-0 left-0 w-full bg-primary"
            style={{
              height: '100%',
              animation: 'scan-line 2s ease-in-out infinite',
              background: 'linear-gradient(180deg, transparent, #4F8EF7, transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
