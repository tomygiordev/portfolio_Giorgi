import { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import HeroSlide from "./HeroSlide";
import AboutSlide from "./AboutSlide";
import ProjectsOverview from "./ProjectsOverview";
import ScrollNav from "./ScrollNav";
import { motion } from "framer-motion";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";

const projectImageModules = import.meta.glob<string>(
  "/src/assets/projects/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF,gif,GIF}",
  { eager: true, query: "?url", import: "default" }
);

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getProjectImages = (imagePrefix: string) => {
  const imagePattern = new RegExp(
    `^${escapeRegExp(imagePrefix)}-(\\d+)\\.(png|jpe?g|webp|avif|gif)$`,
    "i"
  );

  return Object.entries(projectImageModules)
    .map(([path, url]) => {
      const filename = path.split("/").pop() ?? "";
      const match = filename.match(imagePattern);
      return match ? { index: Number(match[1]), url } : null;
    })
    .filter((image): image is { index: number; url: string } => image !== null)
    .sort((a, b) => a.index - b.index)
    .map((image) => image.url);
};

// Static project details are keyed by id so copy/order changes never desync images or stacks.
const projectDetails = {
  wpSteel: {
    techStack: ["C#", ".NET", "WinForms", "Supabase", "PostgreSQL"],
    imagePrefix: "wp-steel",
    liveUrl: undefined,
    githubUrl: undefined,
  },
  wpWeb: {
    techStack: ["JavaScript", "HTML", "CSS", "SEO"],
    imagePrefix: "wp-web",
    liveUrl: "https://www.wpconstrucciones.com/",
    githubUrl: undefined,
  },
  nictech: {
    techStack: ["React", "Node.js", "Supabase", "Tailwind CSS", "JavaScript"],
    imagePrefix: "nictech",
    liveUrl: "https://nictech.vercel.app/",
    githubUrl: "https://github.com/tomygiordev/nictech",
  },
  apiarioOs: {
    techStack: ["Next.js", "Node.js", "TypeScript", "Server Actions", "SQLite/libSQL", "Tailwind CSS"],
    imagePrefix: "apiario-os",
    liveUrl: undefined,
    githubUrl: "https://github.com/tomygiordev/Apiario-OS",
  },
  ragy: {
    techStack: ["Python", "FastAPI", "LangChain", "ChromaDB", "React", "Ollama", "Poetry", "Gemini"],
    imagePrefix: "ragy",
    liveUrl: undefined,
    githubUrl: "https://github.com/0tomi/IA-TP1",
  },
  integrative: {
    techStack: ["JavaScript", "HTML", "CSS", "SEO"],
    imagePrefix: "integrative",
    liveUrl: "https://integrative.help/",
    githubUrl: "https://github.com/tomygiordev/Integrative",
  },
  ritual: {
    techStack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    imagePrefix: "ritual",
    liveUrl: undefined,
    githubUrl: "https://github.com/tomygiordev/Ritual_Web",
  },
  geocimenta: {
    techStack: ["Google Apps Script", "JavaScript", "AppSheet"],
    imagePrefix: "geocimenta",
    liveUrl: undefined,
    githubUrl: undefined,
  },
  y2kMp3Ripper: {
    techStack: ["Tauri v2", "Rust", "JavaScript", "HTML", "CSS"],
    imagePrefix: "y2k-mp3-ripper",
    liveUrl: undefined,
    githubUrl: "https://github.com/tomygiordev/ytArg",
  },
  gatekeeper: {
    techStack: ["QT", "C++"],
    imagePrefix: "gatekeeper",
    liveUrl: undefined,
    githubUrl: "https://github.com/tomygiordev/myGatekeeper",
  },
} as const;

const PortfolioContent = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 35
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language, setLanguage, t } = useLanguage();

  const projects = t.projects.items.map((item) => ({
    ...item,
    ...projectDetails[item.id as keyof typeof projectDetails],
    images: getProjectImages(projectDetails[item.id as keyof typeof projectDetails].imagePrefix)
  }));

  const TOTAL_SLIDES = 3;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollToSlide = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const handlePrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]);

  // Wheel scroll navigation between slides
  const wheelCooldown = useRef(false);
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't hijack scroll if user is scrolling inside an overflow container
      const target = e.target as HTMLElement;
      if (target.closest('.overflow-y-auto')) {
        const scrollable = target.closest('.overflow-y-auto') as HTMLElement;
        const isAtTop = scrollable.scrollTop === 0;
        const isAtBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 2;
        // Only intercept if at the edges of the scrollable area
        if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
          return;
        }
      }

      e.preventDefault();
      if (wheelCooldown.current) return;

      const threshold = 30;
      if (Math.abs(e.deltaY) < threshold) return;

      wheelCooldown.current = true;
      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setTimeout(() => {
        wheelCooldown.current = false;
      }, 800);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleNext, handlePrev]);

  return (
    <div className="relative h-screen bg-background overflow-hidden text-white/50">
      {/* Global Language Switcher */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-[100]">
        <div
          className="relative flex items-center bg-white/10 rounded-full p-1 cursor-pointer w-[76px] h-[36px] border border-white/10 shadow-lg backdrop-blur-sm"
          onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
        >
          {/* Sliding Pill */}
          <motion.div
            className="absolute top-1 bottom-1 bg-violet-600 rounded-full shadow-md z-10"
            initial={false}
            animate={{
              left: language === 'es' ? 4 : 38,
              width: 32
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />

          {/* Text Labels */}
          <div className={`flex-1 text-center text-[11px] font-bold z-20 transition-colors duration-300 ${language === 'es' ? 'text-white' : 'text-white/40'}`}>
            ES
          </div>
          <div className={`flex-1 text-center text-[11px] font-bold z-20 transition-colors duration-300 ${language === 'en' ? 'text-white' : 'text-white/40'}`}>
            EN
          </div>
        </div>
      </div>

      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {/* Hero Slide */}
          <div className="flex-[0_0_100%] min-w-0">
            <HeroSlide onAboutClick={() => scrollToSlide(TOTAL_SLIDES - 1)} />
          </div>

          {/* Projects Overview */}
          <div className="flex-[0_0_100%] min-w-0">
            <ProjectsOverview projects={projects} />
          </div>

          {/* About Slide */}
          <div className="flex-[0_0_100%] min-w-0">
            <AboutSlide onNavigate={scrollToSlide} />
          </div>
        </div>
      </div>

      <ScrollNav
        total={TOTAL_SLIDES}
        current={currentSlide}
        onNavigate={scrollToSlide}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

const Portfolio = () => {
  return (
    <LanguageProvider>
      <PortfolioContent />
    </LanguageProvider>
  );
};

export default Portfolio;
