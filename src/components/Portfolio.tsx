import { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import HeroSlide from "./HeroSlide";
import AboutSlide from "./AboutSlide";
import ProjectSlide from "./ProjectSlide";
import ScrollNav from "./ScrollNav";
import { motion } from "framer-motion";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";

// Project images
import wpSteel1 from "@/assets/projects/wp-steel-1.jpg";
import wpSteel2 from "@/assets/projects/wp-steel-2.jpg";
import wpSteel3 from "@/assets/projects/wp-steel-3.jpg";
import wpSteel4 from "@/assets/projects/wp-steel-4.jpg";
import wpSteel5 from "@/assets/projects/wp-steel-5.jpeg";
import wpWeb1 from "@/assets/projects/wp-web-1.jpg";
import wpWeb2 from "@/assets/projects/wp-web-2.jpg";
import wpWeb3 from "@/assets/projects/wp-web-3.jpg";
import wpWeb4 from "@/assets/projects/wp-web-4.jpg";
import wpWeb5 from "@/assets/projects/wp-web-5.jpg";
import nictech1 from "@/assets/projects/nictech-1.jpg";
import nictech2 from "@/assets/projects/nictech-2.jpg";
import nictech3 from "@/assets/projects/nictech-3.jpg";
import nictech4 from "@/assets/projects/nictech-4.jpg";
import nictech5 from "@/assets/projects/nictech-5.jpg";
import nictech6 from "@/assets/projects/nictech-6.jpg";
import nictech7 from "@/assets/projects/nictech-7.jpg";
import ritual1 from "@/assets/projects/ritual-1.jpg";
import ritual2 from "@/assets/projects/ritual-2.jpg";
import ritual3 from "@/assets/projects/ritual-3.jpg";
import ritual4 from "@/assets/projects/ritual-4.jpg";
import ritual5 from "@/assets/projects/ritual-5.jpg";
import geocimenta1 from "@/assets/projects/geocimenta-1.jpg";
import geocimenta2 from "@/assets/projects/geocimenta-2.jpg";
import gatekeeper1 from "@/assets/projects/gatekeeper-1.jpg";

// Define a map of project technical details (stack, images, links) that shouldn't change with language
// The text content (title, description, features) will come from translations based on index
const projectDetails = [
  {
    techStack: [".NET", "WinForms", "Supabase"],
    images: [wpSteel1, wpSteel2, wpSteel3, wpSteel4, wpSteel5],
    liveUrl: undefined,
    githubUrl: undefined,
  },
  {
    techStack: ["Squarespace", "HTML", "CSS", "JavaScript"],
    images: [wpWeb1, wpWeb2, wpWeb3, wpWeb4, wpWeb5],
    liveUrl: "https://www.wpconstrucciones.com/",
    githubUrl: undefined,
  },
  {
    techStack: ["React", "Tailwind CSS", "Supabase"],
    images: [nictech1, nictech2, nictech3, nictech4, nictech5, nictech6, nictech7],
    liveUrl: "https://nictech.vercel.app/",
    githubUrl: "https://github.com/tomygiordev/nictech",
  },
  {
    techStack: ["PHP", "MySQL"],
    images: [ritual1, ritual2, ritual3, ritual4, ritual5],
    liveUrl: undefined,
    githubUrl: "https://github.com/tomygiordev/Ritual_Web",
  },
  {
    techStack: ["AppSheet", "AppScript", "JavaScript"],
    images: [geocimenta1, geocimenta2],
    liveUrl: undefined,
    githubUrl: undefined,
  },
  {
    techStack: ["QT", "C++"],
    images: [gatekeeper1],
    liveUrl: undefined,
    githubUrl: "https://github.com/tomygiordev/myGatekeeper",
  },
];

const PortfolioContent = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 35
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language, setLanguage, t } = useLanguage();

  // Combine static tech details with translated text content
  const projects = t.projects.items.map((item, index) => ({
    ...item,
    ...projectDetails[index]
  }));

  const TOTAL_SLIDES = 2 + projects.length;

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

          {/* Project Slides */}
          {projects.map((project, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <ProjectSlide {...project} index={i + 1} />
            </div>
          ))}

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
