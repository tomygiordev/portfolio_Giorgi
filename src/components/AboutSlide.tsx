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
    return (
        <section id="about" className="slide-section flex items-end justify-center">
            <div className="w-full max-w-6xl mx-auto px-8 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5"
                >
                    {/* Bio - Spans 2 rows on desktop */}
                    <div className="lg:col-span-7 lg:row-span-2 bento-card p-7 flex flex-col justify-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-5 tracking-tight">
                            Sobre <span className="violet-gradient-text">Mí</span>
                        </h2>
                        <p className="text-[14px] md:text-[15px] text-white/55 leading-[1.75] mb-4">
                            Tengo 20 años y estoy terminando la carrera de Análisis de Sistemas. En la
                            facultad mi base fue C++, SQL, PHP y HTML, pero por curiosidad
                            propia me metí de lleno en .NET, PostgreSQL, React, Tailwind y
                            Docker. Incluso sumé una certificación de Cisco en Ciberseguridad
                            para entender mejor la protección de datos.
                        </p>
                        <p className="text-[14px] md:text-[15px] text-white/55 leading-[1.75]">
                            Me considero más que un programador: soy un arquitecto de
                            sistemas. Me apasiona analizar los problemas desde cero y tengo
                            muy buen criterio para resolverlos. Mi fuerte es la rápida
                            adaptación; me desenvuelvo en cualquier contexto y siempre busco
                            ampliar mi stack según el desafío lo requiera.
                        </p>
                    </div>

                    {/* Experience - Now on top right */}
                    <div className="lg:col-span-5 bento-card p-6">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] violet-gradient-text mb-4">
                            Experiencia
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Briefcase size={16} className="text-amber-400" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[14px] font-semibold text-white">
                                        WP Steel Frame
                                    </p>
                                    <p className="text-[12px] text-white/40 mt-0.5 leading-relaxed">
                                        Desarrollador integral con total libertad de arquitectura.
                                    </p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                                        <button
                                            onClick={() => onNavigate?.(2)}
                                            className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 transition-colors"
                                        >
                                            <ArrowUpRight size={11} />
                                            Diseño Web
                                        </button>
                                        <button
                                            onClick={() => onNavigate?.(1)}
                                            className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 transition-colors"
                                        >
                                            <ArrowUpRight size={11} />
                                            Sistema de Gestión
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Briefcase size={16} className="text-sky-400" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[14px] font-semibold text-white">
                                        GeoCimenta
                                    </p>
                                    <p className="text-[12px] text-white/40 mt-0.5 leading-relaxed">
                                        App de Seguimiento de Pilotes. Diseñé toda la
                                        arquitectura desde cero para registro en tiempo real.
                                    </p>
                                    <div className="mt-2">
                                        <button
                                            onClick={() => onNavigate?.(5)}
                                            className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-400 hover:text-sky-300 transition-colors"
                                        >
                                            <ArrowUpRight size={11} />
                                            Ver App
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formation - Now on bottom right */}
                    <div className="lg:col-span-5 bento-card p-6">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] violet-gradient-text mb-5">
                            Formación
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-xl violet-gradient-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <GraduationCap size={18} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-[14px] font-semibold text-white">
                                        Análisis de Sistemas
                                    </p>
                                    <p className="text-[12px] text-white/40 mt-0.5">
                                        FCYT UADER — Cursando etapa final
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <ShieldCheck size={18} className="text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-[14px] font-semibold text-white">
                                        Junior Cybersecurity Analyst
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <p className="text-[12px] text-white/40">Cisco</p>
                                        <a
                                            href="#"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                                        >
                                            <ExternalLink size={10} />
                                            Verificar credencial
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack - Full width bottom */}
                    <div className="lg:col-span-12 bento-card p-6 mt-1 mb-24">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] violet-gradient-text mb-4">
                            Stack Tecnológico
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {techStack.map((tech) => (
                                <span
                                    key={tech.name}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold tracking-wide rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/70 hover:text-white hover:border-white/15 transition-all duration-300"
                                >
                                    <tech.icon size={13} className="text-current opacity-70" />
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSlide;
