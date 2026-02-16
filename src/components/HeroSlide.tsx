import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, FileText, User } from "lucide-react";
import profileNormal from "@/assets/perfil.png";
import profilePink from "@/assets/perfil-violeta.png";

// The CV will be placed in the public folder for direct access
const cvLink = "/cv_tomas_roldan_giorgi_english.html";

interface HeroSlideProps {
  onAboutClick?: () => void;
}

const HeroSlide = ({ onAboutClick }: HeroSlideProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="slide-section flex items-center justify-center py-20 md:py-0">
      <div className="w-full max-w-6xl mx-auto px-10 md:px-16 flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-20">
        {/* Left content */}
        <motion.div
          className="space-y-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.05, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-center md:text-left">
            <span className="text-white">Tomás Roldán </span>
            <span className="violet-gradient-text">Giorgi</span>
          </h1>

          <p className="text-[15px] md:text-[16px] text-white/50 leading-[1.] max-w-xl text-center md:text-left mx-auto md:mx-0">
            Desarrollador web y desktop junior con enfoque en el diseño de sistemas,
            la resolución de problemas y la creación de estructuras sólidas.
            Combino habilidades de comunicación clara con un pensamiento
            arquitectónico para transformar necesidades en soluciones técnicas eficientes.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
            <button
              onClick={onAboutClick}
              className="icon-btn"
            >
              <User size={18} className="md:w-[23px] md:h-[23px]" />
              <span>Sobre mí</span>
            </button>
            <a
              href="https://www.linkedin.com/in/tom%C3%A1sroldangiorgi/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
            >
              <Linkedin size={18} className="md:w-[23px] md:h-[23px]" />
              <span>Linkedin</span>
            </a>
            <a
              href="https://github.com/tomygiordev"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
            >
              <Github size={18} className="md:w-[23px] md:h-[23px]" />
              <span>Github</span>
            </a>
            <a
              href={cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
            >
              <FileText size={18} className="md:w-[23px] md:h-[23px]" />
              <span>Currículum</span>
            </a>
          </div>
        </motion.div>

        {/* Right profile */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.05, delay: 0.05, ease: "easeOut" }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="profile-circle transition-all duration-100 hover:scale-105">
            <img
              src={isHovered ? profilePink : profileNormal}
              alt="Tomás Roldán Giorgi"
              className="w-full h-full object-cover transition-opacity duration-100"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSlide;
