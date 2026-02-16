import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface ProjectSlideProps {
  title: string;
  subtitle?: string;
  description: string;
  techStack: string[];
  features?: string[];
  role?: string;
  images: string[];
  index: number;
}

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 30
  });
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <div className="relative group w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <div className="carousel-image-wrapper aspect-[16/10] mx-1 bg-black/20 flex items-center justify-center">
                <img
                  src={img}
                  alt={`Screenshot ${i + 1}`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
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
              className={`rounded-full transition-all duration-400 ${i === currentIndex
                ? "w-6 h-1.5 violet-gradient-bg"
                : "w-1.5 h-1.5 bg-white/15 hover:bg-white/30"
                }`}
            />
          ))}
        </div>
      )}
    </div>
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
}: ProjectSlideProps) => {
  return (
    <section className="slide-section flex items-start md:items-center justify-center py-20 md:py-0">
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
                  Proyecto {String(index).padStart(2, "0")}
                </span>
                <div className="h-px w-10 violet-gradient-bg opacity-30" />
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                {title}
              </h2>

              {subtitle && (
                <p className="text-xs font-semibold violet-gradient-text uppercase tracking-[0.15em]">
                  {subtitle}
                </p>
              )}

              {/* Description */}
              <p className="text-[15px] text-white/50 leading-[1.7]">
                {description}
              </p>

              {/* Role */}
              {role && (
                <div className="py-3 px-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-[13px] text-white/60 leading-relaxed italic">
                    "{role}"
                  </p>
                </div>
              )}

              {/* Features */}
              {features && features.length > 0 && (
                <div className="space-y-3 pt-1">
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-[13px] text-white/55"
                      >
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
              {images.length > 0 && <ImageCarousel images={images} />}

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
  );
};

export default ProjectSlide;
