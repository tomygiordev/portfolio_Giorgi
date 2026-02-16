import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import HeroSlide from "./HeroSlide";
import AboutSlide from "./AboutSlide";
import ProjectSlide from "./ProjectSlide";
import ScrollNav from "./ScrollNav";

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
import ritual1 from "@/assets/projects/ritual-1.jpg";
import geocimenta1 from "@/assets/projects/geocimenta-1.jpg";
import gatekeeper1 from "@/assets/projects/gatekeeper-1.jpg";

const projects = [
  {
    title: "WP Steel Frame Software",
    description:
      "Software de escritorio para gestión de inventario orientado a la industria del Steel Frame. Permite administrar materiales, stock y movimientos de forma eficiente.",
    techStack: [".NET", "WinForms", "Supabase"],
    features: [
      "Gestión de inventario",
      "Control de stock",
      "Reportes de movimientos",
      "Interfaz desktop nativa",
    ],
    images: [wpSteel1, wpSteel2, wpSteel3, wpSteel4, wpSteel5],
  },
  {
    title: "WP STEEL FRAME WEB",
    subtitle: "Sitio web corporativo",
    description:
      "Sitio web corporativo construido con Squarespace, personalizado con HTML, CSS y JavaScript. Cuenta con más de 5 subpáginas y branding profesional.",
    techStack: ["Squarespace", "HTML", "CSS", "JavaScript"],
    features: [
      "Más de 5 subpáginas",
      "Branding profesional",
      "Diseño responsive",
      "Personalización custom",
    ],
    images: [wpWeb1, wpWeb2, wpWeb3, wpWeb4, wpWeb5],
  },
  {
    title: "NicTech Store",
    description:
      "Plataforma e-commerce completa con landing page de marketing, tienda online, módulo de seguimiento de reparaciones y sección de blog.",
    techStack: ["React", "Tailwind CSS", "Supabase"],
    features: [
      "Landing page con marketing hooks",
      "Tienda e-commerce",
      "Módulo de seguimiento de reparaciones",
      "Sección de blog",
    ],
    images: [nictech1],
  },
  {
    title: "RITUAL Red Social",
    description:
      "Plataforma de microblogging con funcionalidades sociales completas. Permite publicar, responder, personalizar perfiles y explorar usuarios.",
    techStack: ["PHP", "MySQL"],
    role: "Responsable de todo el Frontend y colaboré en el desarrollo del Backend.",
    features: [
      "Publicaciones y respuestas",
      "Personalización de perfil",
      "Perfiles de usuario",
      "Feed social",
    ],
    images: [ritual1],
  },
  {
    title: "AppGeoCimenta",
    description:
      "Aplicación de registro y automatización para el logging de pilotes. Automatiza el envío de notas de entrega en PDF por email.",
    techStack: ["AppSheet", "AppScript", "JavaScript"],
    features: [
      "Registro de pilotes",
      "Automatización de PDFs",
      "Envío por email",
      "Logging en campo",
    ],
    images: [geocimenta1],
  },
  {
    title: "myGatekeeper Game",
    description:
      "Juego de control fronterizo con temática de skate donde el jugador debe identificar y dejar pasar a los skaters genuinos.",
    techStack: ["QT", "C++"],
    features: [
      "Control fronterizo temático",
      "Identificación de skaters",
      "Mecánica de decisión",
      "Interfaz gráfica QT",
    ],
    images: [gatekeeper1],
  },
];

const TOTAL_SLIDES = 2 + projects.length;

const Portfolio = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 35
  });
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
    <div className="relative h-screen bg-background overflow-hidden">
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {/* Hero Slide */}
          <div className="flex-[0_0_100%] min-w-0">
            <HeroSlide onAboutClick={() => scrollToSlide(TOTAL_SLIDES - 1)} />
          </div>

          {/* Project Slides */}
          {projects.map((project, i) => (
            <div key={project.title} className="flex-[0_0_100%] min-w-0">
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

export default Portfolio;
