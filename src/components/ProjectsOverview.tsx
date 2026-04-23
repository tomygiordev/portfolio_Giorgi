import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  techStack: string[];
  features?: string[];
  role?: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectsOverviewProps {
  projects: Project[];
}

const featuredTechByProject: Record<string, string[]> = {
  wpSteel: ["C#", ".NET", "Supabase"],
  wpWeb: ["JavaScript", "CSS", "HTML"],
  nictech: ["React", "Node.js", "Supabase"],
  apiarioOs: ["Next.js", "Node.js", "TypeScript"],
  ragy: ["Python", "FastAPI", "LangChain"],
  integrative: ["JavaScript", "HTML", "CSS"],
  ritual: ["PHP", "MySQL", "JavaScript"],
  geocimenta: ["Google Apps Script", "JavaScript", "AppSheet"],
  y2kMp3Ripper: ["Tauri v2", "Rust", "JavaScript"],
  gatekeeper: ["C++", "QT"],
};

const globalStackHighlights = [
  "React",
  ".NET",
  "Node.js",
  "Next.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "Tauri v2",
  "Rust",
  "C++",
];

const getFeaturedStack = (project: Project) =>
  featuredTechByProject[project.id] ?? project.techStack.slice(0, 3);

const ProjectDetail = ({
  project,
  projectNumber,
  onClose,
}: {
  project: Project;
  projectNumber: number;
  onClose: () => void;
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const { language, t } = useLanguage();

  useEffect(() => {
    setActiveImage(0);
  }, [project.id]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (project.images.length > 1 && event.key === "ArrowLeft") {
        setActiveImage((current) => (current - 1 + project.images.length) % project.images.length);
      }
      if (project.images.length > 1 && event.key === "ArrowRight") {
        setActiveImage((current) => (current + 1) % project.images.length);
      }
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, project.images.length]);

  const showGalleryControls = project.images.length > 1;

  const showPreviousImage = () => {
    setActiveImage((current) => (current - 1 + project.images.length) % project.images.length);
  };

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % project.images.length);
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/90 px-4 py-5 backdrop-blur-xl md:px-8 md:py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="project-detail-shell mx-auto grid max-h-[calc(100vh-2.5rem)] w-full max-w-6xl gap-5 overflow-y-auto p-4 md:max-h-[calc(100vh-4rem)] md:grid-cols-[1.08fr_0.92fr] md:p-5 lg:p-6"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/50 transition hover:bg-white/10 hover:text-white"
            aria-label={language === "es" ? "Cerrar detalle" : "Close detail"}
          >
            <X size={20} />
          </button>

          <div className="space-y-3">
            <div className="project-detail-image">
              {project.images.length > 0 ? (
                <>
                  <img
                    src={project.images[activeImage]}
                    alt={`${project.title} screenshot ${activeImage + 1}`}
                    className="h-full w-full object-cover"
                  />

                  {showGalleryControls && (
                    <>
                      <button
                        onClick={showPreviousImage}
                        className="gallery-arrow left-3"
                        aria-label={language === "es" ? "Imagen anterior" : "Previous image"}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={showNextImage}
                        className="gallery-arrow right-3"
                        aria-label={language === "es" ? "Imagen siguiente" : "Next image"}
                      >
                        <ChevronRight size={20} />
                      </button>
                      <span className="gallery-counter">
                        {activeImage + 1} / {project.images.length}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-white/35">
                  <ImageIcon size={34} />
                </div>
              )}
            </div>

            {project.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
                {project.images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setActiveImage(index)}
                    className={`project-thumb ${index === activeImage ? "is-active" : ""}`}
                    aria-label={`Screenshot ${index + 1}`}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex min-h-0 flex-col justify-between gap-6 p-1 md:p-2">
            <div className="space-y-5">
              <div className="space-y-3 pr-10">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] violet-gradient-text">
                    {t.projects.title} {String(projectNumber).padStart(2, "0")}
                  </span>
                  <span className="h-px w-12 bg-white/10" />
                </div>

                <div>
                  <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                      {project.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-[15px] leading-[1.75] text-white/60">{project.description}</p>

              {project.role && (
                <div className="rounded-lg border border-white/[0.07] bg-white/[0.035] px-4 py-3">
                  <p className="text-[13px] italic leading-relaxed text-white/60">"{project.role}"</p>
                </div>
              )}

              {project.features && project.features.length > 0 && (
                <div className="grid gap-2 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <div key={feature} className="project-detail-feature">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full violet-gradient-bg" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>

              {(project.liveUrl || project.githubUrl) && (
                <div className="flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action primary"
                    >
                      <ExternalLink size={16} />
                      {t.projects.visitSite}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action"
                    >
                      <Github size={16} />
                      {t.projects.repository}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

const ProjectsOverview = ({ projects }: ProjectsOverviewProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { language } = useLanguage();

  const availableStacks = new Set(projects.flatMap((project) => project.techStack));
  const highlightedStacks = globalStackHighlights.filter((tech) => availableStacks.has(tech));
  const selectedProjectIndex = selectedProject
    ? projects.findIndex((project) => project.id === selectedProject.id)
    : -1;

  return (
    <>
      <section id="projects" className="slide-section">
        <div className="h-full w-full overflow-y-auto">
          <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col justify-center px-5 py-24 pb-36 md:px-12 lg:px-16">
            <motion.div
              className="mb-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-end"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] violet-gradient-text">
                  {language === "es" ? "Mapa de trabajo" : "Work map"}
                </p>
                <h2 className="max-w-2xl text-3xl font-bold leading-[1.05] text-white md:text-5xl">
                  {language === "es" ? "Proyectos en una vista general." : "Projects in one overview."}
                </h2>
                <p className="max-w-2xl text-[15px] leading-[1.7] text-white/50">
                  {language === "es"
                    ? "Una lectura rápida de alcance, stack y resultados. Cada tarjeta abre el caso completo con screenshots, features, rol y enlaces."
                    : "A fast read of scope, stack, and outcomes. Each card opens the full case with screenshots, features, role, and links."}
                </p>
              </div>

              <div className="project-overview-meta">
                <div>
                  <span className="block text-3xl font-bold text-white">{projects.length}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-white/40">
                    {language === "es" ? "Proyectos" : "Projects"}
                  </span>
                </div>
                <div className="hidden h-10 w-px bg-white/10 sm:block" />
                <div className="flex min-w-0 flex-wrap gap-2">
                  {highlightedStacks.map((tech) => (
                    <span key={tech} className="project-stack-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="project-overview-grid">
              {projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="project-overview-card group"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.25), ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="project-overview-media">
                    {project.images[0] ? (
                      <img src={project.images[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <ImageIcon size={26} className="text-white/30" />
                    )}
                    <span className="project-overview-number">{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col gap-3 p-4 text-left">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold leading-tight text-white">{project.title}</h3>
                        <ArrowUpRight size={17} className="mt-0.5 flex-shrink-0 text-white/35 transition group-hover:text-white" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {getFeaturedStack(project).map((tech) => (
                          <span key={tech} className="project-stack-chip compact featured">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <p className="line-clamp-3 text-[12px] leading-[1.55] text-white/50">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          projectNumber={selectedProjectIndex + 1}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default ProjectsOverview;
