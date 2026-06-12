import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, usePresence } from "motion/react";
import { 
  ArrowRight, 
  Plus, 
  ArrowUpRight, 
  Bone, 
  Dna, 
  Gem, 
  Leaf, 
  BookOpen 
} from "lucide-react";

// Import Sub-Pages
import Visit from "./pages/Visit.jsx";
import Exhibitions from "./pages/Exhibitions.jsx";
import Discover from "./pages/Discover.jsx";
import Learn from "./pages/Learn.jsx";
import About from "./pages/About.jsx";

// --- DATA ---
const chaptersData = [
  { name: "Age of Dinosaurs", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624247/01_udnber.png" },
  { name: "Fossils of Ancient Life", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624374/02_pmvxxl.png" },
  { name: "Reptiles of the Mesozoic", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624236/03_hcp3jc.png" },
  { name: "Marine Fossil Gallery", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624256/04_get63z.png" },
  { name: "Prehistoric Giants", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624251/05_kz1tyu.png" }
];

// --- ANIMATION VARIANTS ---
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const letterBlock = {
  initial: { y: 120, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

// Header and SVG animation variants
const headerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const h1Variants = {
  initial: { scale: 1.03 },
  animate: {
    scale: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    }
  }
};

const leftSidebarVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.6,
    }
  }
};

const rightSidebarVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.9,
    }
  }
};

// --- CUSTOM SAND TRANSITION IMAGE COMPONENT ---
function SandTransitionImage({ src, alt, className }) {
  const [isPresent, safeToRemove] = usePresence();
  const filterIdRef = useRef(`sand-filter-${Math.random().toString(36).substring(2, 9)}`);
  
  const isEntering = isPresent;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime = null;
    const duration = 900; // 900ms
    let animationFrameId;

    const tick = (now) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      // Easing: 
      // entering = quartic ease-out (1 - Math.pow(1-t, 4))
      // exiting = cubic (Math.pow(t, 3))
      const easeVal = isEntering 
        ? 1 - Math.pow(1 - t, 4) 
        : Math.pow(t, 3);
        
      setProgress(easeVal);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        if (!isPresent) {
          safeToRemove();
        }
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPresent, isEntering, safeToRemove]);

  // Distortion factor goes 1 -> 0 on enter, and 0 -> 1 on exit
  const k = isEntering ? (1 - progress) : progress;

  const scale = 150 * k;
  const dy = (isEntering ? -80 : 120) * k;
  const dx = (isEntering ? -30 : 30) * k;
  const blur = 6 * k;
  const opacity = Math.max(0, Math.min(1, 1 - k * 1.2));

  const filterId = filterIdRef.current;

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="1.8" 
              numOctaves="4" 
              result="noise" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale={scale} 
              xChannelSelector="R" 
              yChannelSelector="G" 
              result="displacement" 
            />
            <feOffset 
              dx={dx} 
              dy={dy} 
              in="displacement" 
              result="offset" 
            />
            <feGaussianBlur 
              stdDeviation={blur} 
              in="offset" 
              result="blur" 
            />
            <feColorMatrix 
              type="matrix" 
              values={`
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 ${opacity} 0
              `} 
              in="blur" 
            />
          </filter>
        </defs>
      </svg>
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ filter: `url(#${filterId})` }}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    </>
  );
}

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [showVideo, setShowVideo] = useState(false);
  const [activeChapter, setActiveChapter] = useState(2); // starts at "Reptiles of the Mesozoic"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const timerRef = useRef(null);

  // Router listener for URL hashchanges
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (["visit", "exhibitions", "discover", "learn", "about"].includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo(0, 0);
      } else {
        setCurrentPage("home");
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // 2800ms delay to display the background video
  useEffect(() => {
    const videoTimer = setTimeout(() => {
      setShowVideo(true);
    }, 2800);
    return () => clearTimeout(videoTimer);
  }, []);

  // 3500ms auto-cycle timer for activeChapter
  const startCycle = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setActiveChapter((prev) => (prev + 1) % 5);
    }, 3500);
  };

  useEffect(() => {
    startCycle();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const handleChapterSelect = (index) => {
    setActiveChapter(index);
    startCycle(); // reset the interval duration
  };

  return (
    <div className="w-full flex flex-col bg-[#fcfcfc] text-[#111] selection:bg-black selection:text-white overflow-x-hidden font-sans min-h-screen">
      
      {/* 1A. HEADER & SVG LOGO */}
      <motion.header
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className="pt-6 px-6 md:px-16 z-40 w-full flex flex-col relative bg-[#fcfcfc]"
      >
        <motion.h1 variants={h1Variants} className="w-full">
          <a href="#" aria-label="NHM Home">
            <svg viewBox="0 0 840 100" className="w-full h-auto fill-[#111]">
              {/* Letter N */}
              <g transform="translate(0, 0)">
                <motion.polygon points="0,0 14,0 14,100 0,100" variants={letterBlock} />
                <motion.polygon points="200,0 214,0 214,100 200,100" variants={letterBlock} />
                <motion.polygon points="0,0 33,0 214,100 181,100" variants={letterBlock} />
              </g>
              {/* Letter H */}
              <g transform="translate(280, 0)">
                <motion.polygon points="0,0 14,0 14,100 0,100" variants={letterBlock} />
                <motion.polygon points="200,0 214,0 214,100 200,100" variants={letterBlock} />
                <motion.polygon points="14,43 200,43 200,57 14,57" variants={letterBlock} />
              </g>
              {/* Letter M */}
              <g transform="translate(560, 0)">
                <motion.polygon points="0,0 14,0 14,100 0,100" variants={letterBlock} />
                <motion.polygon points="266,0 280,0 280,100 266,100" variants={letterBlock} />
                <motion.polygon points="0,0 26,0 153,100 127,100" variants={letterBlock} />
                <motion.polygon points="254,0 280,0 153,100 127,100" variants={letterBlock} />
              </g>
            </svg>
          </a>
        </motion.h1>

        {/* 1B. SUB-NAV BAR */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-between items-start mt-8 text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-gray-800"
        >
          {/* Left Column */}
          <div className="w-[15%] hidden md:block leading-relaxed">
            <p>Natura</p>
            <p>History</p>
            <p>Museum</p>
          </div>

          {/* Separator 1 */}
          <div className="w-[5%] hidden md:flex justify-center pt-1 text-gray-400">
            <ArrowRight size={14} strokeWidth={1} />
          </div>

          {/* Center Column */}
          <div className="flex-1 md:w-[30%] md:flex-none text-gray-800 leading-relaxed font-mono">
            <p className="hidden md:block">
              Exploring the story of life on earth<br />
              through science, discovery<br />
              and wonder.
            </p>
            <p className="block md:hidden max-w-[280px]">
              Exploring the<br />
              story of life on earth<br />
              through science,<br />
              discovery & wonder.
            </p>
          </div>

          {/* Separator 2 */}
          <div className="w-[5%] hidden md:flex justify-center pt-1 text-gray-400">
            <ArrowRight size={14} strokeWidth={1} />
          </div>

          {/* Right Column */}
          <div className="w-[15%] hidden md:flex flex-col space-y-1">
            {['Visit', 'Exhibitions', 'Discover', 'Learn', 'About'].map((link) => {
              const isActive = currentPage === link.toLowerCase();
              return (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={`transition-colors block ${
                    isActive 
                      ? "text-[#111] font-bold underline underline-offset-4 decoration-1 decoration-black" 
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  {link}
                </a>
              );
            })}
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="z-50 flex flex-col items-end gap-[6px] cursor-pointer group p-2 -mr-2 relative"
            aria-label="Toggle Menu"
          >
            <div
              className={`h-[1.5px] bg-black transition-all duration-300 ${
                isMobileMenuOpen 
                  ? "w-8 rotate-45 translate-y-[3.75px]" 
                  : "w-8 group-hover:w-6"
              }`}
            />
            <div
              className={`h-[1.5px] bg-black transition-all duration-300 ${
                isMobileMenuOpen 
                  ? "w-8 -rotate-45 -translate-y-[3.75px]" 
                  : "w-8 group-hover:w-10"
              }`}
            />
          </button>
        </motion.div>
      </motion.header>

      {/* 1C. MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-[120px] left-0 w-full bg-[#fcfcfc] border-b border-gray-200 shadow-xl z-30 md:hidden py-10 px-8"
          >
            <nav className="flex flex-col space-y-6 font-mono text-sm tracking-[0.2em] uppercase">
              {['Visit', 'Exhibitions', 'Discover', 'Learn', 'About'].map((link) => {
                const isActive = currentPage === link.toLowerCase();
                return (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`transition-colors block ${
                      isActive ? "text-black font-semibold" : "text-gray-400 hover:text-black"
                    }`}
                  >
                    {link}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DYNAMIC ROUTED VIEWPORT */}
      <AnimatePresence mode="wait">
        {currentPage === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* HERO BODY AREA */}
            <div className="relative w-full min-h-[calc(100vh-180px)] flex flex-col justify-between overflow-hidden">
              
              {/* 1D. BACKGROUND VIDEO */}
              <AnimatePresence>
                {showVideo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      src="https://res.cloudinary.com/dsdxaxkiz/video/upload/v1779624998/magnific_use-img-2-as-the-exact-ba_Piu3X0W42C_wnrc8f.mp4"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Left / Right Sidebars */}
              <div className="flex-1 flex flex-col md:flex-row md:justify-between items-start px-6 md:px-16 pb-12 z-10 w-full">
                
                {/* 1E. LEFT SIDEBAR CONTENT */}
                <motion.div
                  variants={leftSidebarVariants}
                  initial="initial"
                  animate="animate"
                  className="flex flex-col items-start gap-8 mt-20 sm:mt-28 md:mt-32 w-[320px]"
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-3 text-xs font-mono text-gray-500">
                    <span>01</span>
                    <div className="w-16 h-[1.5px] bg-black/20" />
                  </motion.div>

                  <motion.h2
                    variants={fadeUp}
                    className="text-[3.5rem] md:text-[5rem] font-normal tracking-tight leading-[1] text-[#111]"
                  >
                    TIMELESS<br />WONDERS
                  </motion.h2>

                  <motion.p
                    variants={fadeUp}
                    className="text-[13px] md:text-[14px] text-gray-700 w-[240px] leading-[1.6]"
                  >
                    Step into the natural world and<br />
                    discover the stories written<br />
                    millions of years ago.
                  </motion.p>

                  <motion.button
                    variants={fadeUp}
                    className="bg-[#1a1a1a] px-6 py-3.5 border border-[#1a1a1a] rounded-md shadow-sm relative overflow-hidden group cursor-pointer flex items-center gap-4 transition-all duration-300 hover:-translate-y-[0.5px] hover:shadow-[3px_3px_0px_rgba(17,17,17,0.5)] active:translate-y-0 active:shadow-sm"
                  >
                    <div className="absolute inset-0 bg-[#fcfcfc] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                    <span className="text-[15px] font-medium text-white group-hover:text-[#111] transition-colors duration-500 z-10">
                      Explore Now
                    </span>
                    <div className="z-10 text-white group-hover:text-[#111] transition-colors duration-500">
                      <svg
                        className="w-5 h-5 transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-12 group-hover:-translate-y-1 fill-current stroke-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C12 2 4 10 4 16C4 20.4 7.6 24 12 24C16.4 24 20 20.4 20 16C20 10 12 2 12 2Z" opacity="0.2" />
                        <path d="M12 2C12 2 6 9 6 15C6 18.3 8.7 21 12 21C15.3 21 18 18.3 18 15C18 9 12 2 12 2Z" opacity="0.5" />
                        <path d="M12 2C12 2 8 8 8 14C8 16.2 9.8 18 12 18C14.2 18 16 16.2 16 14C16 8 12 2 12 2Z" />
                        <path d="M12 24V14" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </motion.button>
                </motion.div>

                {/* 1F. RIGHT SIDEBAR */}
                <motion.div
                  variants={rightSidebarVariants}
                  initial="initial"
                  animate="animate"
                  className="hidden md:flex flex-col gap-8 w-[200px] mt-12 md:mt-20 self-end text-left"
                >
                  <motion.div variants={fadeUp} className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold font-mono tracking-widest uppercase text-gray-800">
                      Tyrannosaurus Rex
                    </span>
                    <span className="text-[12px] text-gray-600 leading-[1.6]">
                      Late Cretaceous period<br />
                      68-66 million years ago
                    </span>
                  </motion.div>

                  <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500">Length</p>
                      <p className="text-[13px] font-medium text-gray-800">12.3 m</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500">Height</p>
                      <p className="text-[13px] font-medium text-gray-800">4.0 m</p>
                    </div>
                  </motion.div>

                  <motion.button 
                    variants={fadeUp} 
                    className="flex items-center gap-3 cursor-pointer group text-left w-fit"
                  >
                    <div className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center group-hover:border-black group-hover:bg-[#111] transition-all duration-300 text-gray-800 group-hover:text-white">
                      <Plus size={16} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-gray-600 group-hover:text-black transition-colors duration-300">
                      View Details
                    </span>
                  </motion.button>
                </motion.div>

              </div>

              {/* 1G. BOTTOM-LEFT "SCROLL TO EXPLORE" */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-10 left-[2.5rem] md:left-[4rem] hidden md:flex items-center gap-4 z-10"
              >
                <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center">
                  <div className="flex gap-[4px]">
                    <div className="w-[1px] h-[12px] bg-gray-600" />
                    <div className="w-[1px] h-[12px] bg-gray-600" />
                  </div>
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 font-semibold">
                  Scroll to explore
                </span>
              </motion.div>

            </div>

            {/* SECTION 2: EXPLORE OUR WORLD */}
            <section className="relative w-full min-h-[75vh] md:min-h-screen bg-[#fcfcfc] flex flex-col items-center pt-24 md:pt-32 pb-0 z-20">
              
              <div className="text-[10px] md:text-[11px] font-mono tracking-[0.2em] mb-12 uppercase">
                <span className="text-gray-500">[ 02 ]</span>{" "}
                <span className="text-gray-900 font-bold">Explore Our World</span>
              </div>

              <motion.h2
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[2.2rem] md:text-[3.5rem] lg:text-[4.2rem] leading-[1.1] font-medium tracking-tight text-[#111] max-w-[1000px] text-center px-6"
              >
                Unearth the stories of our planet's past<br className="hidden md:block" /> through fossils, minerals, and ancient wonders.
              </motion.h2>

              <div className="h-12" />

              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3,
                    }
                  }
                }}
                className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-24 max-w-2xl px-6"
              >
                {[
                  { icon: Bone, label: "Dinosaurs" },
                  { icon: Dna, label: "Ancient Life" },
                  { icon: Gem, label: "Minerals" },
                  { icon: Leaf, label: "Fossils" },
                  { icon: BookOpen, label: "Learn More" }
                ].map(({ icon: Icon, label }) => (
                  <motion.button
                    key={label}
                    variants={pillVariants}
                    className="rounded-full border border-gray-300 text-[11px] font-medium uppercase tracking-wider bg-white/50 backdrop-blur-sm text-gray-800 px-5 py-2.5 flex items-center gap-2 transition-all duration-300 cursor-pointer hover:border-black hover:bg-black hover:text-white"
                  >
                    <Icon size={14} strokeWidth={2} />
                    <span>{label}</span>
                  </motion.button>
                ))}
              </motion.div>

              <div className="min-h-[220px] md:min-h-[450px] w-full" />

              <div className="absolute bottom-0 left-0 w-full px-8 md:px-16 pb-8 md:pb-12 hidden md:flex justify-between pointer-events-none text-[10px] font-mono tracking-widest uppercase text-gray-500 font-medium">
                <span>WE DON'T JUST TELL STORIES.</span>
                <span>PALEONTOLOGY (C) 2026</span>
              </div>
            </section>

            {/* SECTION 3: ANCIENT COLLECTION */}
            <section className="relative w-full bg-[#0a0a0a] text-white flex flex-col z-20">
              
              <motion.img
                src="https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779625001/ChatGPT_Image_May_23_2026_12_24_44_PM_1_lv1dne.png"
                alt="Pterodactyl Fossil"
                initial={{ y: "-65%", opacity: 0, x: "-50%" }}
                whileInView={{ y: "-78%", opacity: 1, x: "-50%" }}
                viewport={{ margin: "100px", once: true }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="absolute top-0 left-1/2 pointer-events-none z-0 w-[160vw] md:w-[1100px] max-w-none"
              />

              <div className="px-8 md:px-16 pt-32 md:pt-48 mb-16 z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
                <h2 className="text-[1.8rem] md:text-[3rem] lg:text-[3.8rem] xl:text-[4rem] leading-[1.15] font-medium tracking-tight text-white max-w-[900px] text-left">
                  Curated from millions of years of wonder{" "}
                  <span className="inline-flex gap-2 md:gap-3 align-middle mx-2 md:mx-4 -translate-y-[4px]">
                    {[Bone, Dna, Leaf].map((Icon, idx) => (
                      <span
                        key={idx}
                        className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-600 bg-black text-gray-400 flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                      >
                        <Icon className="w-4 h-4 md:w-[22px] md:h-[22px]" />
                      </span>
                    ))}
                  </span>{" "}
                  & discovery.
                </h2>

                <div className="flex flex-col items-start xl:items-end text-left">
                  <p className="text-[9px] md:text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-6 leading-relaxed xl:text-right">
                    WE DON'T JUST DISPLAY FOSSILS<br />
                    WE SHARE EARTH'S STORY
                  </p>
                  <div className="flex gap-2 md:gap-3 flex-wrap">
                    {["Educational", "Authentic", "Inspiring"].map((label) => (
                      <span
                        key={label}
                        className="px-5 py-2 rounded-full border border-gray-600 text-[9px] font-mono tracking-widest uppercase text-gray-300 cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full border-t border-gray-800 flex flex-col lg:flex-row z-10">
                <div className="w-full lg:w-[35%] border-b lg:border-b-0 lg:border-r border-gray-800 min-h-[400px] md:min-h-[500px] flex flex-col justify-between p-8 relative">
                  <div className="text-gray-500 text-xl tracking-[0.3em] font-mono">
                    ***
                  </div>

                  <div className="relative w-full h-full flex-1 min-h-[300px]">
                    <AnimatePresence mode="wait">
                      <SandTransitionImage
                        key={activeChapter}
                        src={chaptersData[activeChapter].image}
                        alt={chaptersData[activeChapter].name}
                        className="absolute inset-0 w-[80%] h-[80%] m-auto object-contain mix-blend-lighten"
                      />
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center text-[10px] font-mono tracking-widest uppercase text-[#888]">
                    <div className="h-[15px] overflow-hidden relative w-6">
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={activeChapter}
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -15, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="absolute inset-0 flex justify-start items-center text-[#888]"
                        >
                          {String(activeChapter + 1).padStart(2, '0')}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <span className="text-[#333] mx-2">/</span>
                    <span>05</span>
                  </div>
                </div>

                <div className="w-full lg:w-[65%] flex flex-col">
                  <div className="border-b border-gray-800 p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono text-gray-400 tracking-widest uppercase gap-4">
                    <span>Explore the past. Understand the present.</span>
                    <div className="overflow-hidden relative h-[15px] w-28 flex justify-end">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={activeChapter}
                          initial={{ y: 12, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -12, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-white block"
                        >
                          CHAPTER 0{activeChapter + 1}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    {chaptersData.map((chapter, idx) => {
                      const isActive = activeChapter === idx;
                      return (
                        <div
                          key={chapter.name}
                          onClick={() => handleChapterSelect(idx)}
                          className={`border-b border-gray-800/85 py-8 px-8 flex justify-between items-center cursor-pointer transition-all duration-300 ${
                            isActive 
                              ? "text-white bg-[#0e0e0e]/40" 
                              : "text-[#444] hover:text-[#999]"
                          }`}
                        >
                          <span className="text-2xl md:text-[2rem] font-medium tracking-tight transition-colors duration-300">
                            {chapter.name}
                          </span>
                          <div className="w-8 h-8 flex items-center justify-center">
                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.6, x: -10 }}
                                  animate={{ opacity: 1, scale: 1, x: 0 }}
                                  exit={{ opacity: 0, scale: 0.6, x: 10 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ArrowUpRight size={22} strokeWidth={1} className="text-gray-400" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 w-full px-8 py-8 text-[10px] font-mono tracking-widest text-gray-500 uppercase bg-[#0a0a0a]">
                DIGGING INTO OUR PLANET'S PAST
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {currentPage === "visit" && <Visit />}
            {currentPage === "exhibitions" && <Exhibitions />}
            {currentPage === "discover" && <Discover />}
            {currentPage === "learn" && <Learn />}
            {currentPage === "about" && <About />}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Sub-component animation variants helpers
const pillVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};
