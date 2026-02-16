import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X, ExternalLink, Github } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useLanguage } from "../context/LanguageContext";

interface ProjectSlideProps {
  title: string;
  subtitle?: string;
  description: string;
  techStack: string[];
  features?: string[];
  role?: string;
  images: string[];
  index: number;
  liveUrl?: string;
  githubUrl?: string;
}

const ImageCarousel = ({ images, onExpand }: { images: string[]; onExpand: (index: number) => void }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 30,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const mouseDownPos = useRef<{ x: number; y: number } | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (emblaApi) emblaApi.scrollPrev();
    },
    [emblaApi]
  );

  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (emblaApi) emblaApi.scrollNext();
    },
    [emblaApi]
  );

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!mouseDownPos.current) return;
    const dx = Math.abs(e.clientX - mouseDownPos.current.x);
    const dy = Math.abs(e.clientY - mouseDownPos.current.y);
    // Only expand if the mouse barely moved (it was a click, not a drag)
    if (dx < 5 && dy < 5) {
      onExpand(currentIndex);
    }
    mouseDownPos.current = null;
  };

  return (
    <div className="relative group w-full">
      <div
        className="overflow-hidden cursor-zoom-in"
        ref={emblaRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <div className="carousel-image-wrapper aspect-video mx-1 relative">
                <img
                  src={img}
                  alt={`Screenshot ${i + 1}`}
                  className="w-full h-full object-fill"
                  draggable={false}
                  loading="lazy"
                />
                {/* Expand Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <Maximize2 size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-white backdrop-blur-md transition-all z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-white backdrop-blur-md transition-all z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all duration-400 ${i === currentIndex ? "w-6 h-1.5 violet-gradient-bg" : "w-1.5 h-1.5 bg-white/15 hover:bg-white/30"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ──── Lightbox Modal (rendered via Portal to escape overflow:hidden) ──── */
const ImageLightbox = ({
  images,
  currentIndex,
  onClose,
  onChangeIndex,
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChangeIndex((currentIndex - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onChangeIndex((currentIndex + 1) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onChangeIndex, currentIndex, images.length]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-[10000]"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <X size={24} />
        </motion.button>

        {/* Image Container */}
        <motion.div
          className="relative w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt={`Screenshot ${currentIndex + 1} expanded`}
            className="w-full h-auto max-h-[85vh] object-contain mx-auto"
          />

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/60 text-xs font-medium">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Modal Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => onChangeIndex((currentIndex - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:bg-black/60 transition-all flex items-center justify-center backdrop-blur-md"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => onChangeIndex((currentIndex + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:bg-black/60 transition-all flex items-center justify-center backdrop-blur-md"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

const ProjectSlide = ({
  title,
  subtitle,
  description,
  techStack,
  features,
  role,
  images,
  index,
  liveUrl,
  githubUrl,
}: ProjectSlideProps) => {
  const [expandedImage, setExpandedImage] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <>
      <section className="slide-section flex items-start md:items-center justify-center pt-24 pb-40 md:py-0">
        <div className="w-full max-w-7xl mx-auto px-10 md:px-20">
          <div className="project-card p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left: Info */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* Project number */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold violet-gradient-text tracking-[0.2em] uppercase">
                    {t.projects.title} {String(index).padStart(2, "0")}
                  </span>
                  <div className="h-px w-10 violet-gradient-bg opacity-30" />
                </div>

                {/* Title */}
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                    {title}
                  </h2>

                  {/* Action Buttons */}
                  {(liveUrl || githubUrl) && (
                    <div className="flex flex-wrap gap-3 pt-2">
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-[13px] font-bold hover:bg-white/90 transition-all active:scale-95"
                        >
                          <ExternalLink size={16} />
                          {t.projects.visitSite}
                        </a>
                      )}
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] font-bold hover:bg-white/10 transition-all active:scale-95"
                        >
                          <Github size={16} />
                          {t.projects.repository}
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {subtitle && (
                  <p className="text-xs font-semibold violet-gradient-text uppercase tracking-[0.15em]">{subtitle}</p>
                )}

                {/* Description */}
                <p className="text-[15px] text-white/50 leading-[1.7]">{description}</p>

                {/* Role */}
                {role && (
                  <div className="py-3 px-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-[13px] text-white/60 leading-relaxed italic">"{role}"</p>
                  </div>
                )}

                {/* Features */}
                {features && features.length > 0 && (
                  <div className="space-y-3 pt-1">
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-[13px] text-white/55">
                          <span className="w-1 h-1 rounded-full violet-gradient-bg flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>

              {/* Right: Image + Tech */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* Carousel */}
                {images.length > 0 && (
                  <ImageCarousel images={images} onExpand={(idx) => setExpandedImage(idx)} />
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {techStack.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox — rendered via Portal on document.body to escape overflow:hidden */}
      {expandedImage !== null && (
        <ImageLightbox
          images={images}
          currentIndex={expandedImage}
          onClose={() => setExpandedImage(null)}
          onChangeIndex={(i) => setExpandedImage(i)}
        />
      )}
    </>
  );
};

export default ProjectSlide;
