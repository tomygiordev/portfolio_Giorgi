
export const translations = {
    es: {
        hero: {
            role: "Desarrollador de Software",
            description: "Desarrollador web y desktop junior con enfoque en el diseño de sistemas, la resolución de problemas y la creación de estructuras sólidas. Combino habilidades de comunicación clara con un pensamiento arquitectónico para transformar necesidades en soluciones técnicas eficientes.",
            buttons: {
                curriculum: "Currículum",
                about: "Sobre mí"
            },
            cvLink: "/CV_Tomas_Roldan_Giorgi_Sistemas.pdf"
        },
        about: {
            title: "Sobre mí",
            experience: {
                title: "Experiencia",
                current: "Actual",
                items: [
                    {
                        title: "WP Steel Frame",
                        period: "Dic 2023 - Actualidad",
                        description: "Desarrollador integral con total libertad de arquitectura. Selección de stack tecnológico, diseño de bases de datos y desarrollo end-to-end de soluciones web y de escritorio."
                    },
                    {
                        title: "Desarrollador Full Stack",
                        company: "Ritual",
                        period: "2023 - 2024",
                        description: "Lideré el desarrollo del frontend y colaboré activamente en el backend. Implementación de nuevas funcionalidades y optimización de la experiencia de usuario."
                    },
                    {
                        title: "Desarrollador Junior",
                        company: "No Country",
                        period: "2023 - 2024",
                        description: "Participación en simulaciones de entorno laboral real. Desarrollo ágil en equipo, cumplimiento de plazos y presentaciones de MVP."
                    }
                ]
            },
            education: {
                title: "Educación",
                items: [
                    {
                        title: "Tecnicatura en Programación",
                        institution: "Universidad Tecnológica Nacional",
                        period: "2024 - Presente",
                        description: "Formación académica rigurosa en fundamentos de la programación, lógica y arquitecturas de software."
                    },
                    {
                        title: "Desarrollador Full Stack",
                        institution: "SoyHenry",
                        period: "2023 - 2024",
                        description: "Bootcamp intensivo de +800 horas. Dominio de tecnologías web modernas (PERN Stack) y metodologías ágiles."
                    }
                ]
            },
            certifications: {
                title: "Certificaciones",
                items: [
                    {
                        title: "EF SET Certificate",
                        issuer: "EF Standard English Test",
                        grade: "C2 Proficient",
                        date: "2023"
                    },
                    {
                        title: "Introduction to Cybersecurity",
                        issuer: "Cisco",
                        link: "https://www.credly.com/badges/408e4626-6713-406b-9360-40b469327d83/public_url"
                    }
                ]
            }
        },
        projects: {
            title: "Proyecto",
            visitSite: "Visitar Sitio",
            repository: "Repositorio",
            items: [
                {
                    id: "wpSteel",
                    title: "WP Steel Frame Software",
                    description: "Software de escritorio para gestión de inventario orientado a la industria del Steel Frame. Permite administrar materiales, stock y movimientos de forma eficiente.",
                    features: [
                        "Gestión de inventario",
                        "Control de stock",
                        "Reportes de movimientos",
                        "Interfaz desktop nativa"
                    ]
                },
                {
                    id: "wpWeb",
                    title: "WP STEEL FRAME WEB",
                    description: "Sitio web corporativo con estructura multipágina, personalización visual con HTML, CSS y JavaScript, diseño responsive y branding profesional.",
                    features: [
                        "Más de 5 subpáginas",
                        "Branding profesional",
                        "Diseño responsive",
                        "Personalización custom"
                    ]
                },
                {
                    id: "nictech",
                    title: "NicTech Store",
                    description: "Plataforma e-commerce completa con landing page de marketing, tienda online, módulo de seguimiento de reparaciones y sección de blog.",
                    features: [
                        "Landing page con marketing hooks",
                        "Tienda e-commerce",
                        "Módulo de seguimiento de reparaciones",
                        "Sección de blog"
                    ]
                },
                {
                    id: "apiarioOs",
                    title: "Apiario OS",
                    description: "Sistema operativo web para salas de extracción apícola: gestiona productores, apiarios, turnos, DTEs, tambores, lotes, stock y liquidaciones con trazabilidad completa.",
                    features: [
                        "Arquitectura Next.js con Server Actions",
                        "Modelo relacional SQLite/libSQL",
                        "Autenticación con sesiones y roles",
                        "QR scanner, auditoría y liquidaciones"
                    ]
                },
                {
                    id: "ragy",
                    title: "Ragy: Tu asistente Académico",
                    description: "Asistente RAG académico construido con LangChain y una interfaz web en React para consultar planes de estudio y programas de cátedra. Implementa carga de PDFs, chunking configurable, embeddings, búsqueda vectorial y respuestas controladas por contexto.",
                    features: [
                        "Frontend conversacional en React",
                        "Vector store con ChromaDB",
                        "Retrieval similarity/MMR/threshold",
                        "Evaluación automática con métricas"
                    ]
                },
                {
                    id: "integrative",
                    title: "Integrative",
                    description: "Sitio multipágina para una agencia digital, con identidad visual propia, páginas comerciales, landings de servicios y showcase de productos SaaS verticales.",
                    features: [
                        "Landing responsive de alto contraste",
                        "Arquitectura estática multipágina",
                        "Secciones SaaS y servicios",
                        "Branding, copy y conversión"
                    ]
                },
                {
                    id: "ritual",
                    title: "RITUAL Red Social",
                    description: "Plataforma de microblogging con funcionalidades sociales completas. Permite publicar, responder, personalizar perfiles y explorar usuarios.",
                    role: "Responsable de todo el Frontend y colaboré en el desarrollo del Backend.",
                    features: [
                        "Publicaciones y respuestas",
                        "Personalización de perfil",
                        "Perfiles de usuario",
                        "Feed social"
                    ]
                },
                {
                    id: "geocimenta",
                    title: "AppGeoCimenta",
                    description: "Aplicación de registro y automatización para el logging de pilotes. Automatiza el envío de notas de entrega en PDF por email.",
                    features: [
                        "Registro de pilotes",
                        "Automatización de PDFs",
                        "Envío por email",
                        "Logging en campo"
                    ]
                },
                {
                    id: "y2kMp3Ripper",
                    title: "Y2K MP3 Ripper",
                    description: "Aplicación de escritorio para descargar YouTube como MP3 de alta calidad con interfaz retro Y2K. Migrada de Electron a Tauri: 347 MB → 1.4 MB.",
                    features: [
                        "Interfaz retro Y2K con animaciones CRT",
                        "Backend en Rust compilado",
                        "Control de calidad 320/192/128 kbps",
                        "Barra de progreso en tiempo real"
                    ]
                },
                {
                    id: "gatekeeper",
                    title: "myGatekeeper Game",
                    description: "Juego de control fronterizo con temática de skate donde el jugador debe identificar y dejar pasar a los skaters genuinos.",
                    features: [
                        "Control fronterizo temático",
                        "Identificación de skaters",
                        "Mecánica de decisión",
                        "Interfaz gráfica QT"
                    ]
                }
            ]
        }
    },
    en: {
        hero: {
            role: "Software Developer",
            description: "Junior web and desktop developer with a focus on system design, problem solving, and building solid structures. I combine clear communication skills with architectural thinking to transform needs into efficient technical solutions.",
            buttons: {
                curriculum: "Resume",
                about: "About Me"
            },
            cvLink: "/CV_Tomas_Roldan_Giorgi_ENG.pdf"
        },
        about: {
            title: "About Me",
            experience: {
                title: "Experience",
                current: "Current",
                items: [
                    {
                        title: "WP Steel Frame",
                        period: "Dec 2023 - Present",
                        description: "Comprehensive developer with full architectural freedom. Tech stack selection, database design, and end-to-end development of web and desktop solutions."
                    },
                    {
                        title: "Full Stack Developer",
                        company: "Ritual",
                        period: "2023 - 2024",
                        description: "Led frontend development and actively collaborated on backend. Implementation of new features and user experience optimization."
                    },
                    {
                        title: "Junior Developer",
                        company: "No Country",
                        period: "2023 - 2024",
                        description: "Participation in real-world work simulations. Agile team development, deadline compliance, and MVP presentations."
                    }
                ]
            },
            education: {
                title: "Education",
                items: [
                    {
                        title: "Programming Technician",
                        institution: "National Technological University (UTN)",
                        period: "2024 - Present",
                        description: "Rigorous academic training in programming fundamentals, logic, and software architectures."
                    },
                    {
                        title: "Full Stack Developer",
                        institution: "SoyHenry",
                        period: "2023 - 2024",
                        description: "Intensive +800 hour bootcamp. Mastery of modern web technologies (PERN Stack) and agile methodologies."
                    }
                ]
            },
            certifications: {
                title: "Certifications",
                items: [
                    {
                        title: "EF SET Certificate",
                        issuer: "EF Standard English Test",
                        grade: "C2 Proficient",
                        date: "2023"
                    },
                    {
                        title: "Introduction to Cybersecurity",
                        issuer: "Cisco",
                        link: "https://www.credly.com/badges/408e4626-6713-406b-9360-40b469327d83/public_url"
                    }
                ]
            }
        },
        projects: {
            title: "Project",
            visitSite: "Visit Site",
            repository: "Repository",
            items: [
                {
                    id: "wpSteel",
                    title: "WP Steel Frame Software",
                    description: "Desktop software for inventory management oriented to the Steel Frame industry. Efficiently manages materials, stock, and movements.",
                    features: [
                        "Inventory management",
                        "Stock control",
                        "Movement reports",
                        "Native desktop interface"
                    ]
                },
                {
                    id: "wpWeb",
                    title: "WP STEEL FRAME WEB",
                    description: "Corporate multipage website with custom visual work in HTML, CSS, and JavaScript, responsive design, and professional branding.",
                    features: [
                        "Over 5 subpages",
                        "Professional branding",
                        "Responsive design",
                        "Custom personalization"
                    ]
                },
                {
                    id: "nictech",
                    title: "NicTech Store",
                    description: "Complete e-commerce platform with marketing landing page, online store, repair tracking module, and blog section.",
                    features: [
                        "Landing page with marketing hooks",
                        "E-commerce store",
                        "Repair tracking module",
                        "Blog section"
                    ]
                },
                {
                    id: "apiarioOs",
                    title: "Apiario OS",
                    description: "Web operating system for honey extraction rooms: manages producers, apiaries, appointments, DTEs, drums, batches, stock, and settlements with end-to-end traceability.",
                    features: [
                        "Next.js architecture with Server Actions",
                        "SQLite/libSQL relational model",
                        "Session auth and role management",
                        "QR scanner, audit log, and settlements"
                    ]
                },
                {
                    id: "ragy",
                    title: "Ragy: Your Academic Assistant",
                    description: "Academic RAG assistant built with LangChain and a React web interface to query study plans and course programs. It implements PDF ingestion, configurable chunking, embeddings, vector search, and context-bounded answers.",
                    features: [
                        "Conversational React frontend",
                        "ChromaDB vector store",
                        "Similarity/MMR/threshold retrieval",
                        "Automated evaluation with metrics"
                    ]
                },
                {
                    id: "integrative",
                    title: "Integrative",
                    description: "Multipage website for a digital agency, with a custom visual identity, commercial pages, service landings, and a showcase for vertical SaaS products.",
                    features: [
                        "High-contrast responsive landing",
                        "Static multipage architecture",
                        "SaaS and service sections",
                        "Branding, copy, and conversion"
                    ]
                },
                {
                    id: "ritual",
                    title: "RITUAL Social Network",
                    description: "Microblogging platform with complete social features. Allows posting, replying, profile customization, and user exploration.",
                    role: "Responsible for all Frontend and collaborated on Backend development.",
                    features: [
                        "Posts and replies",
                        "Profile customization",
                        "User profiles",
                        "Social feed"
                    ]
                },
                {
                    id: "geocimenta",
                    title: "AppGeoCimenta",
                    description: "Registration and automation app for pile logging. Automates sending delivery notes (PDF) via email.",
                    features: [
                        "Pile registration",
                        "PDF automation",
                        "Email sending",
                        "Field logging"
                    ]
                },
                {
                    id: "y2kMp3Ripper",
                    title: "Y2K MP3 Ripper",
                    description: "Desktop app to download YouTube as high-quality MP3 with a retro Y2K interface. Migrated from Electron to Tauri: 347 MB → 1.4 MB.",
                    features: [
                        "Retro Y2K UI with CRT animations",
                        "Compiled Rust backend",
                        "Quality control 320/192/128 kbps",
                        "Real-time progress bar"
                    ]
                },
                {
                    id: "gatekeeper",
                    title: "myGatekeeper Game",
                    description: "Skate-themed border control game where the player must identify and let genuine skaters pass.",
                    features: [
                        "Themed border control",
                        "Skater identification",
                        "Decision mechanic",
                        "QT graphical interface"
                    ]
                }
            ]
        }
    }
};
