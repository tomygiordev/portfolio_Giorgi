import { motion } from "framer-motion";
import {
    GraduationCap,
    ShieldCheck,
    ExternalLink,
    Briefcase,
    ArrowUpRight,
} from "lucide-react";
import {
    SiCplusplus,
    SiMysql,
    SiPhp,
    SiHtml5,
    SiDotnet,
    SiPostgresql,
    SiReact,
    SiTailwindcss,
    SiDocker,
    SiGit,
} from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

const techStack = [
    { name: "C++", color: "from-blue-400 to-blue-600", icon: SiCplusplus },
    { name: "SQL", color: "from-orange-400 to-orange-600", icon: SiMysql },
    { name: "PHP", color: "from-indigo-400 to-indigo-600", icon: SiPhp },
    { name: "HTML", color: "from-red-400 to-red-500", icon: SiHtml5 },
    { name: ".NET", color: "from-violet-400 to-purple-600", icon: SiDotnet },
    { name: "PostgreSQL", color: "from-sky-400 to-blue-600", icon: SiPostgresql },
    { name: "React", color: "from-cyan-300 to-cyan-500", icon: SiReact },
    { name: "Tailwind", color: "from-teal-300 to-teal-500", icon: SiTailwindcss },
    { name: "Docker", color: "from-blue-300 to-blue-500", icon: SiDocker },
    { name: "Git", color: "from-orange-300 to-red-500", icon: SiGit },
];

interface AboutSlideProps {
    onNavigate?: (index: number) => void;
}

const AboutSlide = ({ onNavigate }: AboutSlideProps) => {
    const { t, language } = useLanguage();

    const titleParts = language === 'es'
        ? { start: "Sobre", highlight: "Mí" }
        : { start: "About", highlight: "Me" };

    return (
        <section id="about" className="slide-section">
            <div className="w-full h-full overflow-y-auto">
                <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-16 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5"
                    >
                        {/* Bio - Spans 2 rows on desktop */}
                        <div className="lg:col-span-7 lg:row-span-2 bento-card p-6 md:p-7 flex flex-col justify-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-5 tracking-tight">
                                {titleParts.start} <span className="violet-gradient-text">{titleParts.highlight}</span>
                            </h2>
                            <p className="text-[13px] md:text-[15px] text-white/55 leading-[1.75] mb-3 md:mb-4">
                                {language === 'es'
                                    ? "Tengo 20 años y estoy terminando la carrera de Análisis de Sistemas. En la facultad mi base fue C++, SQL, PHP y HTML, pero por curiosidad propia me metí de lleno en .NET, PostgreSQL, React, Tailwind y Docker. Incluso sumé una certificación de Cisco en Ciberseguridad para entender mejor la protección de datos."
                                    : "I am 20 years old and finishing my Systems Analysis degree. At university, my foundation was C++, SQL, PHP, and HTML, but out of my own curiosity, I dove deep into .NET, PostgreSQL, React, Tailwind, and Docker. I even added a Cisco Cybersecurity certification to better understand data protection."
                                }
                            </p>
                            <p className="text-[13px] md:text-[15px] text-white/55 leading-[1.75]">
                                {language === 'es'
                                    ? "Me considero más que un programador: soy un arquitecto de sistemas. Me apasiona analizar los problemas desde cero y tengo muy buen criterio para resolverlos. Mi fuerte es la rápida adaptación; me desenvuelvo en cualquier contexto y siempre busco ampliar mi stack según el desafío lo requiera."
                                    : "I consider myself more than just a programmer: I am a systems architect. I am passionate about analyzing problems from scratch and have excellent judgment for solving them. My strength is rapid adaptation; I thrive in any context and always seek to expand my stack as the challenge requires."
                                }
                            </p>
                        </div>

                        {/* Experience */}
                        <div className="lg:col-span-5 bento-card p-5 md:p-6">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] violet-gradient-text mb-3 md:mb-4">
                                {t.about.experience.title}
                            </h3>
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Briefcase size={14} className="text-amber-400 md:w-4 md:h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[13px] md:text-[14px] font-semibold text-white">
                                            WP Steel Frame
                                        </p>
                                        <p className="text-[11px] md:text-[12px] text-white/40 mt-0.5 leading-relaxed">
                                            {t.about.experience.items[0].description}
                                        </p>
                                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                                            <button
                                                onClick={() => onNavigate?.(2)}
                                                className="inline-flex items-center gap-1 text-[10px] md:text-[11px] font-medium text-amber-400 hover:text-amber-300 transition-colors"
                                            >
                                                <ArrowUpRight size={10} />
                                                {language === 'es' ? "Diseño Web" : "Web Design"}
                                            </button>
                                            <button
                                                onClick={() => onNavigate?.(1)}
                                                className="inline-flex items-center gap-1 text-[10px] md:text-[11px] font-medium text-amber-400 hover:text-amber-300 transition-colors"
                                            >
                                                <ArrowUpRight size={10} />
                                                {language === 'es' ? "Gestión de Sistema" : "System Management"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-sky-500/15 border border-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Briefcase size={14} className="text-sky-400 md:w-4 md:h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[13px] md:text-[14px] font-semibold text-white">
                                            GeoCimenta
                                        </p>
                                        <p className="text-[11px] md:text-[12px] text-white/40 mt-0.5 leading-relaxed">
                                            {language === 'es' ? "App de Seguimiento de Pilotes. Diseñé toda la arquitectura desde cero para registro en tiempo real." : "Pile Tracking App. I designed the entire architecture from scratch for real-time logging."}
                                        </p>
                                        <div className="mt-1.5">
                                            <button
                                                onClick={() => onNavigate?.(5)}
                                                className="inline-flex items-center gap-1 text-[10px] md:text-[11px] font-medium text-sky-400 hover:text-sky-300 transition-colors"
                                            >
                                                <ArrowUpRight size={10} />
                                                {language === 'es' ? "Ver App" : "View App"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="lg:col-span-5 bento-card p-5 md:p-6">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] violet-gradient-text mb-3 md:mb-5">
                                {t.about.education.title}
                            </h3>
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl violet-gradient-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <GraduationCap size={16} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] md:text-[14px] font-semibold text-white">
                                            {language === 'es' ? "Análisis de Sistemas" : "Systems Analysis"}
                                        </p>
                                        <p className="text-[11px] md:text-[12px] text-white/40 mt-0.5">
                                            {language === 'es' ? "FCYT UADER — Cursando etapa final" : "FCYT UADER — Final stage"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <ShieldCheck size={16} className="text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] md:text-[14px] font-semibold text-white">
                                            Junior Cybersecurity Analyst
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <p className="text-[11px] md:text-[12px] text-white/40">Cisco</p>
                                            <a
                                                href="https://www.credly.com/badges/408e4626-6713-406b-9360-40b469327d83/public_url"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-[10px] md:text-[11px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                                            >
                                                <ExternalLink size={10} />
                                                {language === 'es' ? "Verificar credencial" : "Verify credential"}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack - Full width bottom */}
                        <div className="lg:col-span-12 bento-card p-5 md:p-6 mt-1 mb-8">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] violet-gradient-text mb-3 md:mb-4">
                                {language === 'es' ? "Stack Tecnológico" : "Tech Stack"}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {techStack.map((tech) => (
                                    <span
                                        key={tech.name}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] md:text-[11px] font-bold tracking-wide rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/70 hover:text-white hover:border-white/15 transition-all duration-300"
                                    >
                                        <tech.icon size={12} className="text-current opacity-70" />
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSlide;
