'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

type Project = {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  description: string;
  tech: string[];
  color: string;
  accentColor: string;
  image: string;
  imageAlt: string;
  demo?: string;
  github: string;
  featured?: boolean;
  badge?: string;
  span?: string;
};

const PROJECTS: Project[] = [
  {
    id: 'nova-star',
    title: 'Nova Star AI',
    subtitle: 'Signature AI Assistant',
    problem:
      'people needed a companion that understands context, not just syntax. With a shared memory.',
    description:
      'A production-grade AI assistant built with Next.js, OpenAI API, and DeepSeek. Features real-time streaming, persistent conversation memory, and a cinematic UI that makes AI feel approachable.',
    tech: [
      'Next.js 16',
      'TypeScript',
      'OpenAI',
      'Shadcn UI',
      'Tailwind',
      'SupaBase',
      'Framer Motion',
    ],
    color: '#4F8EF7',
    accentColor: '#7C3AED',
    image: '/assets/images/nova-star.png',
    imageAlt:
      'Futuristic AI interface with dark background, glowing blue neural network visualization and code streams',
    demo: 'https://nova-star-ai.vercel.app/',
    github: 'https://github.com/Epic2077/nova-star-ai',
    featured: true,
    badge: 'Signature Project',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    id: 'elegant-sounds',
    title: 'Elegant Sounds',
    subtitle: 'Music Devices Ecommerce',
    problem:
      'A Complete Website Focused on electronics for listening to music. Developed in Next.js',
    description:
      'A comprehensive web application designed to provide a seamless experience for electronics enthusiasts and music lovers. The website offers a variety of features including product listings, user reviews, dashboards for sellers and admins, and much more.',
    tech: ['Next.js 15', 'TypeScript', 'Tailwind', 'Shadcn UI', 'Redux', 'JWT'],
    color: '#7C3AED',
    accentColor: '#06B6D4',
    image: '/assets/images/elegant-sound.png',
    imageAlt:
      'Dark music player interface with glowing purple waveform visualizer on black background',
    github: 'https://github.com/Epic2077/elegant-sounds',
  },
  {
    id: 'tsx-shoes',
    title: 'TSX-Shoes',
    subtitle: 'E-Commerce Experience',
    problem:
      'Shoe stores online feel transactional. Buying shoes should feel like visiting a boutique.',
    description:
      'Full-stack e-commerce platform with 3D product previews, real-time inventory, and a checkout flow that converts 40% better than industry average.',
    tech: ['React', 'TypeScript', 'Redux', 'Tailwind', 'Axios', 'Vite'],
    color: '#06B6D4',
    accentColor: '#4F8EF7',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b2637a13-1772158027539.png',
    imageAlt:
      'Premium sneaker product shot on dark studio background with dramatic cyan side lighting',
    github: 'https://github.com/Epic2077/TSX-Shoes',
  },
  {
    id: 'markdown-editor',
    title: 'Markdown Editor',
    subtitle: 'Developer Writing Tool',
    problem: 'Markdown editors are either too simple or too complex. There is no middle ground.',
    description:
      'A distraction-free markdown editor with live preview, syntax highlighting, export to PDF/HTML, and a Vim-mode for power users.',
    tech: ['React', 'TypeScript', 'CodeMirror', 'Remark', 'Tailwind'],
    color: '#4F8EF7',
    accentColor: '#7C3AED',
    image: 'https://images.unsplash.com/photo-1613068685650-fccf66365f29',
    imageAlt:
      'Dark code editor with syntax highlighted markdown text, split-screen preview on deep charcoal background',
    github: 'https://github.com/Epic2077/markDown-text-editor-react',
  },
  {
    id: 'vanilla-shoes',
    title: 'Vanilla Shoes',
    subtitle: 'Pure JS Showcase',
    problem: "Proving that you don't need a framework to build something beautiful.",
    description:
      'A fully animated e-commerce product page built with zero frameworks — pure HTML, CSS, and JavaScript. A love letter to web fundamentals.',
    tech: ['JavaScript', 'CSS Animations', 'HTML5', 'Tailwind', 'Figma'],
    color: '#F59E0B',
    accentColor: '#06B6D4',
    image: 'https://images.unsplash.com/photo-1503710369-325f97ea6ffc',
    imageAlt:
      'Minimalist white sneaker on warm amber-toned studio background with soft dramatic shadows',
    github: 'https://github.com/Epic2077/Vanilla-Shoes',
    span: '',
  },
  {
    id: 'libria-cafe',
    title: 'Libria Cafe',
    subtitle: 'Pure JS Showcase',
    problem: "Proving that you don't need a framework to build something beautiful.",
    description:
      'A fully animated e-commerce product page built with zero frameworks — pure HTML, CSS, and JavaScript. A love letter to web fundamentals.',
    tech: ['Next.js', 'CSS Animations', 'HTML5', 'GSAP'],
    color: '#F59E0B',
    accentColor: '#06B6D4',
    image: 'https://images.unsplash.com/photo-1503710369-325f97ea6ffc',
    imageAlt:
      'Minimalist white sneaker on warm amber-toned studio background with soft dramatic shadows',
    github: 'https://github.com/Epic2077/libria-cafe',
    span: '',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Build a stable, deduped list of filter chips from the actual projects.
  // We bucket related variants together (e.g. Next.js 15 + Next.js 16 -> 'Next.js') for cleaner UX.
  const filterTags = React.useMemo(() => {
    const set = new Set<string>();
    for (const p of PROJECTS) {
      for (const t of p.tech) {
        const norm = t.replace(/\s*\d+(\.\d+)?$/, '').trim();
        set.add(norm);
      }
    }
    const priority = ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind'];
    const all = Array.from(set);
    const ordered = [
      ...priority.filter((p) => all.includes(p)),
      ...all.filter((t) => !priority.includes(t)).sort(),
    ];
    return ['All', ...ordered];
  }, []);

  const visibleProjects = React.useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) =>
      p.tech.some((t) => t.replace(/\s*\d+(\.\d+)?$/, '').trim() === activeFilter)
    );
  }, [activeFilter]);

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

  // Close modal on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 px-6 md:px-10 relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(79,142,247,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div
          className="flex items-center justify-between mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="section-label">Featured Projects</span>
              <span className="h-px flex-1 max-w-24 bg-primary opacity-20" />
            </div>
            <h2 className="font-display text-display text-foreground">
              Things I&apos;ve
              <br />
              <span className="gradient-text italic">shipped.</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Click any project to explore
          </div>
        </div>

        {/* Tech filter chips */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Filter projects by technology"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s',
          }}
        >
          {filterTags.map((tag) => {
            const isActive = tag === activeFilter;
            return (
              <button
                key={tag}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(tag)}
                className="px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(79,142,247,0.15)' : 'transparent',
                  border: isActive
                    ? '1px solid rgba(79,142,247,0.45)'
                    : '1px solid rgba(79,142,247,0.15)',
                  color: isActive ? '#4F8EF7' : 'rgba(232,234,240,0.65)',
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* BENTO GRID AUDIT:
              Array has 5 cards: [NovaStar, ElegantSounds, TSXShoes, MarkdownEditor, VanillaShoes]
              Row 1: [col-1 to col-2: NovaStar cs-2 rs-1] [col-3: ElegantSounds cs-1]
              Row 2: [col-1: TSXShoes cs-1] [col-2: MarkdownEditor cs-1] [col-3: VanillaShoes cs-1]
              Placed 5/5 cards ✓
           */}
        <div className="grid lg:grid-cols-3 gap-5">
          {visibleProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              visible={visible}
              onClick={() => setActiveProject(project)}
            />
          ))}
          {visibleProjects.length === 0 && (
            <div className="col-span-full text-center py-16 text-sm text-muted-foreground">
              No projects match this filter yet.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  index,
  visible,
  onClick,
}: {
  project: Project;
  index: number;
  visible: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isTall = project.span?.includes('row-span');

  return (
    <div
      className={`relative rounded-2xl overflow-hidden cursor-pointer group flex flex-col ${project.span || ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${index * 0.08}s`,
        border: `1px solid ${hovered ? `${project.color}40` : 'rgba(79,142,247,0.1)'}`,
        boxShadow: hovered ? `0 0 40px ${project.color}15` : 'none',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — fills remaining height for tall (row-span) cards, fixed ratio otherwise */}
      <div className={`relative overflow-hidden ${isTall ? 'flex-1 min-h-0' : 'aspect-video'}`}>
        <AppImage
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 20%, rgba(5,5,8,0.95) 100%), linear-gradient(135deg, ${project.color}15 0%, transparent 60%)`,
          }}
        />

        {project.badge && (
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: `linear-gradient(135deg, ${project.color}, ${project.accentColor})`,
              color: '#fff',
              boxShadow: `0 0 15px ${project.color}60`,
            }}
          >
            {project.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-shrink-0" style={{ background: 'rgba(13,13,24,0.95)' }}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-foreground text-lg leading-tight">{project.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{project.subtitle}</p>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-3 transition-all duration-300"
            style={{
              background: hovered ? `${project.color}20` : 'transparent',
              border: `1px solid ${hovered ? project.color : 'rgba(79,142,247,0.2)'}`,
              transform: hovered ? 'rotate(-45deg)' : 'none',
            }}
          >
            <Icon name="ArrowRightIcon" size={14} className="text-foreground" />
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-1 text-xs rounded"
              style={{
                background: `${project.color}10`,
                color: project.color,
                border: `1px solid ${project.color}25`,
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-1 text-xs text-muted-foreground rounded border border-border">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(20px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{
          background: '#0D0D18',
          border: `1px solid ${project.color}30`,
          boxShadow: `0 0 80px ${project.color}20`,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          style={{ background: 'rgba(5,5,8,0.8)', border: '1px solid rgba(79,142,247,0.2)' }}
          aria-label="Close modal"
        >
          <Icon name="XMarkIcon" size={16} className="text-foreground" />
        </button>

        {/* Hero image */}
        <div className="relative aspect-video">
          <AppImage
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover"
            priority
          />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, transparent 30%, rgba(13,13,24,1) 100%)`,
            }}
          />

          {project.badge && (
            <div
              className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: `linear-gradient(135deg, ${project.color}, ${project.accentColor})`,
                color: '#fff',
              }}
            >
              {project.badge}
            </div>
          )}
        </div>

        {/* Modal content */}
        <div className="p-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-1">{project.title}</h2>
          <p className="text-sm text-muted-foreground mb-6">{project.subtitle}</p>

          <div
            className="rounded-xl p-5 mb-6"
            style={{ background: `${project.color}08`, border: `1px solid ${project.color}20` }}
          >
            <div className="section-label mb-2" style={{ color: project.color }}>
              Problem Solved
            </div>
            <p className="text-sm text-foreground leading-relaxed italic">
              &ldquo;{project.problem}&rdquo;
            </p>
          </div>

          <p className="text-sm text-secondary-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="mb-8">
            <div className="section-label mb-3">Technologies Used</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-xs font-bold rounded-full"
                  style={{
                    background: `${project.color}10`,
                    color: project.color,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {project.demo && (
              <a
                href={project.demo}
                className="btn-primary flex-1 text-center text-sm py-3 flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${project.color}, ${project.accentColor})`,
                }}
              >
                <span>Live Demo</span>
                <Icon name="ArrowTopRightOnSquareIcon" size={14} className="text-white" />
              </a>
            )}
            <a
              href={project.github}
              className="btn-ghost flex-1 text-center text-sm py-3 flex items-center justify-center gap-2"
            >
              <Icon name="CodeBracketIcon" size={14} className="text-foreground" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
