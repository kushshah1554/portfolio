/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║              Portfolio · Kush Shah                          ║
 * ║  ✏️  Edit PORTFOLIO_DATA below to update your content       ║
 * ║  📦  Install: npm install gsap                              ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github, Linkedin, Mail, Phone, Download, Send,
  Menu, X, ArrowUpRight, MapPin,
  Code2, Server, Database, Layers, Cpu, Wrench, Brain,
} from "lucide-react";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ✏️  PORTFOLIO DATA
   Update anything here — sections, skills, projects, links.
   No need to touch the component code below.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PORTFOLIO = {
  // ── Personal Info ───────────────────────────────────────────
  name: "Kush Shah",
  initials: "KS",
  role: "Full-Stack Developer",
  tagline: "I build scalable web apps — pixel to server.",
  location: "Nepal,Kathmandu",
  resumeUrl: "/files/Kush_Shah_CV.pdf", // ← path to your resume

  about: `I'm a passionate Full-Stack Developer specialising in modern,
scalable web applications. With a strong foundation in the MERN stack,
I craft solutions that are both performant and delightful to use.
I'm constantly evolving with new technologies to push the limits
of what's possible on the web.`,

  // ── Quick stats shown in Hero & About ───────────────────────
  stats: [
    { value: "3+",  label: "Projects Shipped" },
    { value: "20+", label: "Technologies"     },
    { value: "1+",  label: "Years Building"   },
  ],

  // ── Contact details ─────────────────────────────────────────
  contact: {
    email:    "skush1554@gmail.com",
    phone:    "9704588231",
    github:   "https://github.com/kushshah1554",
    linkedin: "https://www.linkedin.com/in/kush-shah-8186a9336",
  },

  // ── Skills ──────────────────────────────────────────────────
  // icon: key from ICON_MAP below
  skills: [
    {
      category: "Frontend",
      icon: "Code2",
      items: [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand",
        "Redux", "Framer Motion", "Axios", "Tanstack Query",
        "Tanstack Table", "Tanstack Form", "RHF", "Tiptap", "shadcn", "Zod",
      ],
    },
    {
      category: "Backend & APIs",
      icon: "Server",
      items: [
        "Node.js", "Express", "GraphQL",
        "Apollo Server", "REST APIs", "Redis", "RabbitMQ",
      ],
    },
    {
      category: "ORM & Database Tools",
      icon: "Layers",
      items: ["Prisma ORM", "Drizzle ORM"],
    },
    {
      category: "Databases & Vector DBs",
      icon: "Database",
      items: ["MongoDB", "PostgreSQL", "MySQL", "Qdrant (Vector DB)"],
    },
    {
      category: "AI Integrations",
      icon: "Brain",
      items: ["LangChain", "LangGraph"],
    },
    {
      category: "DevOps & Tools",
      icon: "Wrench",
      items: ["Docker", "Git", "Vercel", "Cloudinary", "Multer"],
    },
    {
      category: "Soft Skills",
      icon: "Cpu",
      items: [
        "Communication", "Teamwork", "Problem-solving",
        "Adaptability", "Time Management",
      ],
    },
  ],

  // ── Projects ─────────────────────────────────────────────────
  // Add a new object to this array to add a project
  projects: [
    {
      title: "ImageGallery",
      description:
        "Full-stack image gallery with secure sign-in, cloud media storage, album tagging, and responsive browsing with upload management.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "Tailwind CSS"],
      liveUrl:   "https://image-gallery-app-green.vercel.app",
      githubUrl: "https://github.com/kushshah1554",
      year: "2024",
    },
    {
      title: "Task Management System",
      description:
        "MERN to-do list app with JWT auth, protected routes, and CRUD task management across Express/MongoDB backend and React frontend.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      liveUrl:   "https://todo-app-iota-ten-47.vercel.app",
      githubUrl: "https://github.com/kushshah1554",
      year: "2024",
    },
    {
      title: "WorkConnect",
      description:
        "End-to-end job marketplace with smart recommendations, role-based dashboards, secure auth, and Cloudinary-backed media uploads.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "Tailwind CSS"],
      liveUrl:   "https://work-connect-ten.vercel.app",
      githubUrl: "https://github.com/kushshah1554",
      year: "2024",
    },
  ],
};
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   END OF EDITABLE DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

// ── Replace this URL with your actual photo path later ──────────
const PHOTO_URL = "/img/me.jpeg"; // ← swap with your local path e.g. "/images/me.jpg"

// Map icon string keys → Lucide components
const ICON_MAP = { Code2, Server, Database, Layers, Cpu, Wrench, Brain };
function SkillIcon({ name }) {
  const Icon = ICON_MAP[name] ?? Code2;
  return <Icon className="w-4 h-4" />;
}

/* ─── Custom Cursor ──────────────────────────────────────────── */
function CustomCursor() {
  const dot  = useRef(null);
  const ring = useRef(null);

  // ✅ Only render on devices with a fine pointer (mouse)
  const isPointerFine = typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches;

  useEffect(() => {
    if (!isPointerFine) return; // bail out on touch devices

    const move = (e) => {
      gsap.to(dot.current,  { x: e.clientX, y: e.clientY, duration: 0.05, ease: "none" });
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.28, ease: "power2.out" });
    };
    const grow   = () => gsap.to(ring.current, { scale: 2.8, opacity: 0.35, duration: 0.25 });
    const shrink = () => gsap.to(ring.current, { scale: 1,   opacity: 1,    duration: 0.25 });

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    return () => window.removeEventListener("mousemove", move);
  }, [isPointerFine]);

  // ✅ Render nothing on touch/tablet devices
  if (!isPointerFine) return null;

  return (
    <>
      <div ref={dot}  className="fixed z-9999 pointer-events-none top-0 left-0 w-2 h-2 rounded-full bg-[#00e5a0]"
           style={{ transform: "translate(-50%,-50%)", mixBlendMode: "difference" }} />
      <div ref={ring} className="fixed z-9998 pointer-events-none top-0 left-0 w-8 h-8 rounded-full border border-[#00e5a0]"
           style={{ transform: "translate(-50%,-50%)" }} />
    </>
  );
}

/* ─── Animated split-text ────────────────────────────────────── */
function SplitChars({ text, className = "" }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} className="char" style={{ display: "inline-block" }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/* ─── Project Card (3-D tilt on hover) ───────────────────────── */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const onMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    gsap.to(card, {
      rotateY: x * 14, rotateX: -y * 14,
      duration: 0.4, ease: "power2.out",
      transformPerspective: 900,
    });
    const shine = card.querySelector(".card-shine");
    gsap.to(shine, {
      opacity: 0.08,
      backgroundImage: `radial-gradient(circle at ${e.clientX - left}px ${e.clientY - top}px, rgba(255,255,255,0.5) 0%, transparent 65%)`,
      duration: 0.25,
    });
  }, []);

  const onLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      rotateY: 0, rotateX: 0,
      duration: 0.7, ease: "elastic.out(1, 0.6)",
      transformPerspective: 900,
    });
    gsap.to(cardRef.current?.querySelector(".card-shine"), { opacity: 0, duration: 0.3 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="project-card relative rounded-2xl p-6 bg-[#0f1117] border border-white/[0.07] overflow-hidden group"
      style={{ transformStyle: "preserve-3d", cursor: "default" }}
    >
      {/* shine layer */}
      <div className="card-shine absolute inset-0 rounded-2xl opacity-0 pointer-events-none z-10" />

      {/* header row */}
      <div className="flex items-start justify-between mb-5">
        <span className="mono-font text-[#00e5a0] text-xs tracking-widest">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex gap-3">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
             className="text-[#4b5563] hover:text-white transition-colors duration-200">
            <Github className="w-4 h-4" />
          </a>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
             className="text-[#4b5563] hover:text-[#00e5a0] transition-colors duration-200">
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-[#00e5a0] transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-[#6b7280] text-sm leading-relaxed mb-5">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t}
            className="mono-font text-[11px] px-2 py-0.5 rounded-full bg-white/4 text-[#6b7280] border border-white/6">
            {t}
          </span>
        ))}
      </div>

      {/* bottom accent line */}
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-linear-to-r from-[#00e5a0] via-[#00e5a080] to-transparent transition-all duration-500" />
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function Portfolio() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [formData,   setFormData]   = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({ type: "", msg: "" });
  const [activeSection, setActiveSection] = useState("home");

  const navRef  = useRef(null);
  const heroRef = useRef(null);

  const NAV_LINKS = ["home", "about", "skills", "projects", "contact"];

  /* ── Google Fonts ───────────────────────────────────────────── */
  useEffect(() => {
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  /* ── Global CSS ─────────────────────────────────────────────── */
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      html { scroll-behavior: smooth; cursor: none !important; }
      a, button { cursor: none !important; }
      body {
        background: #08090c;
        color: #f0eff8;
        font-family: 'DM Sans', sans-serif;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
      }
      ::selection { background: #00e5a020; color: #00e5a0; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: #08090c; }
      ::-webkit-scrollbar-thumb { background: #00e5a050; border-radius: 2px; }
      .display-font { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }
      .mono-font    { font-family: 'JetBrains Mono', monospace; }
      .noise-overlay {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 200px 200px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  /* ── GSAP Animations ────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Navbar entrance
      gsap.from(navRef.current, {
        y: -90, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.05,
      });

      // --- Hero timeline
      const tl = gsap.timeline({ delay: 0.45 });
      tl.from(".hero-eyebrow", { opacity: 0, y: 24, duration: 0.55 })
        .from(".hero-name .char", {
          opacity: 0, y: 80, rotationX: -70, stagger: 0.032,
          duration: 0.85, ease: "back.out(1.4)",
        }, "-=0.2")
        .from(".hero-role",    { opacity: 0, x: -36, duration: 0.6, ease: "power3.out" }, "-=0.5")
        .from(".hero-tagline", { opacity: 0, y: 20,  duration: 0.5 }, "-=0.35")
        .from(".hero-cta > *", { opacity: 0, y: 22, stagger: 0.1, duration: 0.5 }, "-=0.3")
        .from(".hero-stats > *", {
          opacity: 0, y: 32, stagger: 0.1, duration: 0.6, ease: "power2.out",
        }, "-=0.4")
        .from(".hero-social > *", { opacity: 0, x: 20, stagger: 0.1, duration: 0.5 }, "-=0.5")
        .from(".hero-scroll",  { opacity: 0, y: 12, duration: 0.5 }, "-=0.3");

      // --- Floating background orbs
      gsap.to(".orb-1", { x: 110, y: -70, duration: 9,  repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".orb-2", { x: -80, y: 100, duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".orb-3", { x: 60,  y: 60,  duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" });

      // --- About
      gsap.from(".about-text > *", {
        scrollTrigger: { trigger: "#about", start: "top 78%" },
        immediateRender: false,
        opacity: 0, y: 44, stagger: 0.14, duration: 0.85, ease: "power3.out",
      });
      gsap.from(".about-card", {
        scrollTrigger: { trigger: "#about", start: "top 68%" },
        immediateRender: false,
        opacity: 0, x: 48, stagger: 0.12, duration: 0.7, ease: "power3.out",
      });

      // --- Photo reveal (clip-path wipe up)
      gsap.to(".about-photo-clip", {
        scrollTrigger: { trigger: "#about", start: "top 70%" },
        clipPath: "inset(0% 0 0% 0)",
        duration: 1.3, ease: "power4.out",
        immediateRender: false,
      });
      gsap.from(".about-photo-ring", {
        scrollTrigger: { trigger: "#about", start: "top 70%" },
        immediateRender: false,
        opacity: 0, scale: 0.82, duration: 1, ease: "power3.out",
      });
      gsap.from(".about-badge", {
        scrollTrigger: { trigger: "#about", start: "top 65%" },
        immediateRender: false,
        opacity: 0, y: 18, scale: 0.85, duration: 0.6, ease: "back.out(1.6)", delay: 0.3,
      });
      gsap.from(".about-corner", {
        scrollTrigger: { trigger: "#about", start: "top 70%" },
        immediateRender: false,
        opacity: 0, scale: 0.5, stagger: 0.08, duration: 0.5, ease: "back.out(1.8)",
      });
      // Floating photo
      gsap.to(".about-photo-clip", {
        y: -14, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.4,
      });
      // Scan line sweep
      gsap.fromTo(".about-scan",
        { top: "-4px" },
        { top: "105%", duration: 2.8, repeat: -1, ease: "none", delay: 1.8 }
      );

      // --- Section headings
      document.querySelectorAll(".section-label").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          immediateRender: false,
          opacity: 0, y: 28, duration: 0.65, ease: "power3.out",
        });
      });

      // --- Skills
      gsap.from(".skill-card", {
        scrollTrigger: { trigger: "#skills", start: "top 72%" },
        immediateRender: false,
        opacity: 0, y: 50, stagger: 0.07, duration: 0.65, ease: "power3.out",
      });

      // --- Projects
      gsap.from(".project-card", {
        scrollTrigger: { trigger: "#projects", start: "top 76%" },
        immediateRender: false,
        opacity: 0, y: 64, stagger: 0.12, duration: 0.75, ease: "power3.out",
      });

      // --- Contact
      gsap.from(".contact-info > *", {
        scrollTrigger: { trigger: "#contact", start: "top 76%" },
        immediateRender: false,
        opacity: 0, x: -44, stagger: 0.1, duration: 0.7, ease: "power3.out",
      });
      gsap.from(".contact-form > *", {
        scrollTrigger: { trigger: "#contact", start: "top 76%" },
        immediateRender: false,
        opacity: 0, x: 44, stagger: 0.1, duration: 0.7, ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── Active section tracker ─────────────────────────────────── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.38 }
    );
    NAV_LINKS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* ── Helpers ────────────────────────────────────────────────── */
  const scrollTo = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/send-email", formData);
      if (data.success) {
        setFormStatus({ type: "ok", msg: "Message sent! I'll reply soon." });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch {
      setFormStatus({ type: "err", msg: "Couldn't send. Try emailing directly." });
    }
    setTimeout(() => setFormStatus({ type: "", msg: "" }), 4000);
  };

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     RENDER
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  return (
    <div className="min-h-screen bg-[#08090c] text-[#f0eff8] overflow-x-hidden relative">

      <CustomCursor />

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 h-[62px] flex items-center justify-between px-6 md:px-14"
        style={{
          background: "rgba(8,9,12,0.82)",
          backdropFilter: "blur(22px)",
          borderBottom: "1px solid rgba(255,255,255,0.055)",
        }}
      >
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "home")}
          className="display-font text-2xl text-[#00e5a0] tracking-widest hover:opacity-75 transition-opacity"
        >
          {PORTFOLIO.initials}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => scrollTo(e, id)}
              className={`mono-font text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 ${
                activeSection === id ? "text-[#00e5a0]" : "text-[#6b7280] hover:text-white"
              }`}
            >
              {id}
            </a>
          ))}
          <a
            href={PORTFOLIO.resumeUrl}
            download
            className="mono-font text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded border border-[#00e5a035] text-[#00e5a0] hover:bg-[#00e5a012] transition-colors duration-200 flex items-center gap-2"
          >
            <Download className="w-3 h-3" /> Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#6b7280] hover:text-white transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-9"
          style={{ background: "rgba(8,9,12,0.97)", backdropFilter: "blur(24px)" }}
        >
          {NAV_LINKS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => scrollTo(e, id)}
              className="display-font text-6xl text-white hover:text-[#00e5a0] transition-colors duration-200 uppercase"
            >
              {id}
            </a>
          ))}
          <a
            href={PORTFOLIO.resumeUrl}
            download
            className="mono-font text-sm uppercase tracking-widest px-8 py-3 border border-[#00e5a035] text-[#00e5a0] rounded hover:bg-[#00e5a012] transition-colors"
          >
            Download Resume
          </a>
        </div>
      )}

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-28 pt-[62px] overflow-hidden"
      >
        {/* Background orbs */}
        <div className="orb-1 absolute top-[22%] right-[20%] w-[380px] h-[380px] rounded-full pointer-events-none blur-[80px] opacity-[0.12]"
             style={{ background: "radial-gradient(circle, #00e5a0, transparent 65%)" }} />
        <div className="orb-2 absolute bottom-[25%] left-[8%] w-[460px] h-[460px] rounded-full pointer-events-none blur-[90px] opacity-[0.08]"
             style={{ background: "radial-gradient(circle, #4f46e5, transparent 65%)" }} />
        <div className="orb-3 absolute top-[55%] left-[45%] w-[300px] h-[300px] rounded-full pointer-events-none blur-[70px] opacity-[0.07]"
             style={{ background: "radial-gradient(circle, #e5006c, transparent 65%)" }} />

        {/* Dot-grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-5xl">
          <p className="hero-eyebrow mono-font text-[#00e5a0] text-[11px] tracking-[0.35em] uppercase mb-7 flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-[#00e5a0]" />
            Available for work
          </p>

          <h1 className="display-font leading-none text-white mb-5"
              style={{ fontSize: "clamp(4.5rem, 13vw, 11rem)" }}>
            <SplitChars text={PORTFOLIO.name} className="hero-name" />
          </h1>

          <p className="hero-role display-font text-[#00e5a0] mb-4"
             style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}>
            {PORTFOLIO.role}
          </p>

          <p className="hero-tagline text-[#6b7280] text-lg max-w-md leading-relaxed mb-11">
            {PORTFOLIO.tagline}
          </p>

          <div className="hero-cta flex flex-wrap gap-4 mb-16">
            <a
              href="#projects"
              onClick={(e) => scrollTo(e, "projects")}
              className="px-8 py-3 rounded bg-[#00e5a0] text-[#08090c] font-semibold text-sm uppercase tracking-wider hover:bg-[#00c98a] transition-colors duration-200"
            >
              View Work
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "contact")}
              className="px-8 py-3 rounded border border-white/[0.14] text-white font-semibold text-sm uppercase tracking-wider hover:border-white/40 transition-colors duration-200"
            >
              Contact Me
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats flex flex-wrap gap-10">
            {PORTFOLIO.stats.map((s) => (
              <div key={s.label}>
                <div className="display-font text-[2.8rem] text-white leading-none">{s.value}</div>
                <div className="mono-font text-[10px] text-[#6b7280] uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right-rail social icons */}
        <div className="hero-social hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-5">
          {[
            { href: PORTFOLIO.contact.github,   icon: <Github    className="w-[15px] h-[15px]" /> },
            { href: PORTFOLIO.contact.linkedin,  icon: <Linkedin  className="w-[15px] h-[15px]" /> },
            { href: `mailto:${PORTFOLIO.contact.email}`, icon: <Mail className="w-[15px] h-[15px]" /> },
          ].map(({ href, icon }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
               className="text-[#4b5563] hover:text-white transition-colors duration-200">
              {icon}
            </a>
          ))}
          <div className="w-px h-14 bg-linear-to-b from-transparent via-[#4b5563] to-transparent mt-2" />
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="mono-font text-[#4b5563] text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <div className="w-px h-12 bg-linear-to-b from-[#4b5563] to-transparent" />
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-28 px-6 md:px-16 lg:px-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left — text + stats */}
          <div className="about-text space-y-6">
            <p className="section-label mono-font text-[#00e5a0] text-[11px] tracking-[0.35em] uppercase flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#00e5a0]" />
              About Me
            </p>
            <h2 className="display-font text-white leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Crafting Digital<br />Experiences
            </h2>
            <p className="text-[#6b7280] leading-[1.85] whitespace-pre-line">{PORTFOLIO.about}</p>
            <p className="mono-font text-sm text-[#6b7280] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#00e5a0]" />
              {PORTFOLIO.location}
            </p>
            {/* Inline stat cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {PORTFOLIO.stats.map((s) => (
                <div
                  key={s.label}
                  className="about-card flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0f1117] border border-white/[0.07] hover:border-[#00e5a035] transition-colors duration-300"
                >
                  <span className="display-font text-[2.2rem] text-[#00e5a0] leading-none">{s.value}</span>
                  <span className="mono-font text-[9px] text-[#6b7280] uppercase tracking-widest mt-1 text-center">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Photo with animations */}
          <div className="relative flex items-center justify-center py-8">

            {/* Outer glow */}
            <div className="absolute w-[300px] h-[380px] rounded-[28px] blur-[60px] opacity-[0.18]"
                 style={{ background: "radial-gradient(circle, #00e5a0, transparent 70%)" }} />

            {/* Rotating dashed ring */}
            <div
              className="about-photo-ring absolute w-[320px] h-[400px] rounded-[28px] border border-dashed border-[#00e5a025]"
              style={{ transform: "rotate(4deg)" }}
            />
            <div
              className="about-photo-ring absolute w-[310px] h-[390px] rounded-3xl border border-[#00e5a015]"
              style={{ transform: "rotate(-2deg)" }}
            />

            {/* Photo with clip-path reveal */}
            <div
              className="about-photo-clip relative rounded-[20px] overflow-hidden z-10"
              style={{
                width: "280px",
                clipPath: "inset(100% 0 0% 0)",
                boxShadow: "0 0 0 1px rgba(0,229,160,0.12), 0 32px 64px rgba(0,0,0,0.6)",
              }}
            >
              <img
                src={PHOTO_URL}
                alt={PORTFOLIO.name}
                className="w-full object-cover object-top"
                style={{ aspectRatio: "4/5", display: "block" }}
              />
              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-linear-to-t from-[#0f1117] to-transparent" />
              {/* Scan line */}
              <div
                className="about-scan absolute left-0 right-0 h-0.5 pointer-events-none"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(0,229,160,0.5), transparent)",
                  top: "-4px",
                }}
              />
            </div>

            {/* Corner brackets */}
            <div className="about-corner absolute top-[22px] left-[calc(50%-158px)] w-6 h-6 border-t-2 border-l-2 border-[#00e5a0] rounded-tl" />
            <div className="about-corner absolute top-[22px] right-[calc(50%-158px)] w-6 h-6 border-t-2 border-r-2 border-[#00e5a0] rounded-tr" />
            <div className="about-corner absolute bottom-[22px] left-[calc(50%-158px)] w-6 h-6 border-b-2 border-l-2 border-[#00e5a0] rounded-bl" />
            <div className="about-corner absolute bottom-[22px] right-[calc(50%-158px)] w-6 h-6 border-b-2 border-r-2 border-[#00e5a0] rounded-br" />

            {/* Status badge */}
            <div
              className="about-badge absolute bottom-4 right-[calc(50%-170px)] z-20 bg-[#0f1117] rounded-xl px-4 py-2.5"
              style={{ border: "1px solid rgba(0,229,160,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}
            >
              <div className="mono-font text-[9px] text-[#4b5563] uppercase tracking-widest mb-1">Status</div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5a0] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5a0]" />
                </span>
                <span className="mono-font text-[11px] text-[#00e5a0] font-semibold">Available for work</span>
              </div>
            </div>

            {/* Floating role tag */}
            <div
              className="about-badge absolute top-4 left-[calc(50%-170px)] z-20 bg-[#0f1117] rounded-xl px-3 py-2"
              style={{ border: "1px solid rgba(0,229,160,0.15)", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}
            >
              <span className="mono-font text-[10px] text-[#00e5a0]">Full-Stack Dev</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────── */}
      <section
        id="skills"
        className="py-28 px-6 md:px-16 lg:px-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="section-label mono-font text-[#00e5a0] text-[11px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4">
              <span className="inline-block w-8 h-px bg-[#00e5a0]" />
              Skills & Technologies
            </p>
            <h2 className="display-font text-white leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              My Toolbox
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO.skills.map((group) => (
              <div
                key={group.category}
                className={`skill-card p-5 rounded-2xl bg-[#0f1117] border border-white/[0.07] hover:border-[#00e5a035] transition-all duration-300 ${
                  group.category === "Frontend" ? "sm:col-span-2 lg:col-span-3" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#00e5a0]"><SkillIcon name={group.icon} /></span>
                  <h3 className="mono-font text-[11px] font-semibold text-white uppercase tracking-[0.2em]">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="mono-font text-[11px] px-3 py-1 rounded-full bg-white/4 border border-white/6 text-[#6b7280] hover:bg-[#00e5a010] hover:text-[#00e5a0] hover:border-[#00e5a030] transition-all duration-200 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────── */}
      <section
        id="projects"
        className="py-28 px-6 md:px-16 lg:px-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="section-label mono-font text-[#00e5a0] text-[11px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4">
              <span className="inline-block w-8 h-px bg-[#00e5a0]" />
              Selected Work
            </p>
            <h2 className="display-font text-white leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Projects
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORTFOLIO.projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-28 px-6 md:px-16 lg:px-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="section-label mono-font text-[#00e5a0] text-[11px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4">
              <span className="inline-block w-8 h-px bg-[#00e5a0]" />
              Let's Talk
            </p>
            <h2 className="display-font text-white leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Get In Touch
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Info cards */}
            <div className="contact-info space-y-3">
              {[
                { Icon: Mail,     label: "Email",    value: PORTFOLIO.contact.email,    href: `mailto:${PORTFOLIO.contact.email}` },
                { Icon: Phone,    label: "Phone",    value: PORTFOLIO.contact.phone,    href: `tel:${PORTFOLIO.contact.phone}` },
                { Icon: Github,   label: "GitHub",   value: "kushshah1554",             href: PORTFOLIO.contact.github },
                { Icon: Linkedin, label: "LinkedIn", value: "kush Shah",      href: PORTFOLIO.contact.linkedin },
              ].map(({ Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#0f1117] border border-white/[0.07] hover:border-[#00e5a035] group transition-all duration-300"
                >
                  <span className="w-10 h-10 rounded-xl bg-[#00e5a00e] flex items-center justify-center shrink-0 group-hover:bg-[#00e5a020] transition-colors">
                    <Icon className="w-4 h-4 text-[#00e5a0]" />
                  </span>
                  <div className="min-w-0">
                    <div className="mono-font text-[10px] text-[#4b5563] uppercase tracking-widest">{label}</div>
                    <div className="text-sm text-white group-hover:text-[#00e5a0] transition-colors truncate">{value}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#4b5563] ml-auto shrink-0 group-hover:text-[#00e5a0] transition-colors" />
                </a>
              ))}
            </div>

            {/* Form */}
            <form className="contact-form space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0f1117] border border-white/[0.07] text-white mono-font text-sm placeholder-[#4b5563] focus:outline-none focus:border-[#00e5a035] transition-colors duration-200"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0f1117] border border-white/[0.07] text-white mono-font text-sm placeholder-[#4b5563] focus:outline-none focus:border-[#00e5a035] transition-colors duration-200"
              />
              <textarea
                placeholder="Your Message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0f1117] border border-white/[0.07] text-white mono-font text-sm placeholder-[#4b5563] focus:outline-none focus:border-[#00e5a035] transition-colors duration-200 resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00e5a0] text-[#08090c] font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#00c98a] active:scale-[0.98] transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
              {formStatus.msg && (
                <p className={`mono-font text-sm text-center ${
                  formStatus.type === "ok" ? "text-[#00e5a0]" : "text-[#ff5757]"
                }`}>
                  {formStatus.msg}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer
        className="py-10 px-6 md:px-14 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}
      >
        <span className="display-font text-[#4b5563] text-sm tracking-widest uppercase">
          © {new Date().getFullYear()} {PORTFOLIO.name}
        </span>
        <span className="mono-font text-[11px] text-[#4b5563]">
          Built with React · GSAP · Tailwind CSS
        </span>
        <div className="flex gap-5">
          <a href={PORTFOLIO.contact.github}   target="_blank" rel="noopener noreferrer" className="text-[#4b5563] hover:text-white transition-colors"><Github    className="w-4 h-4" /></a>
          <a href={PORTFOLIO.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#4b5563] hover:text-white transition-colors"><Linkedin  className="w-4 h-4" /></a>
          <a href={`mailto:${PORTFOLIO.contact.email}`}                                  className="text-[#4b5563] hover:text-white transition-colors"><Mail      className="w-4 h-4" /></a>
        </div>
      </footer>
    </div>
  );
}