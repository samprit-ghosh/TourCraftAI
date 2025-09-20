import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const heroDestinations = [
  {
    id: 1,
    name: "Kerala",
    tagline: "God's Own Country",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&h=1080&fit=crop&auto=format&q=80",
    description: "Drift through tranquil backwaters and lush spice gardens.",
    accent: "from-emerald-400 to-green-600",
  },
  {
    id: 2,
    name: "Kashmir",
    tagline: "Paradise on Earth",
    image:
      "https://images.unsplash.com/photo-1685716271205-83a5ac2ba63b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Snow-capped peaks, serene lakes and alpine valleys await.",
    accent: "from-blue-400 to-indigo-600",
  },
  {
    id: 3,
    name: "Goa",
    tagline: "Beach Capital of India",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop&auto=format&q=80",
    description: "Sun-soaked shores, lively culture and laid-back vibes.",
    accent: "from-yellow-300 to-orange-400",
  },
];

const AUTO_PLAY_INTERVAL = 5000;
const RESUME_AFTER = 10000;

const HeroSection = ({ onDiscoverTours, onAIRecommender }) => {
  const [index, setIndex] = useState(0);
  const [displayBgIndex, setDisplayBgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const resumeTimerRef = useRef(null);
  const playIntervalRef = useRef(null);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Preload all images in background
  useEffect(() => {
    heroDestinations.forEach((d) => {
      const img = new Image();
      img.src = d.image;
    });
  }, []);

  // Ensure background only switches after the new image has loaded
  useEffect(() => {
    let cancelled = false;
    const nextSrc = heroDestinations[index]?.image;
    if (!nextSrc) return;
    const img = new Image();
    img.src = nextSrc;
    img.onload = () => {
      if (!cancelled) setDisplayBgIndex(index);
    };
    img.onerror = () => {
      if (!cancelled) setDisplayBgIndex(index);
    };
    return () => {
      cancelled = true;
    };
  }, [index]);

  // Auto-play logic
  const startAutoPlay = useCallback(() => {
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }
    playIntervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % heroDestinations.length);
    }, AUTO_PLAY_INTERVAL);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
      playIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => {
      clearInterval(playIntervalRef.current);
      clearTimeout(resumeTimerRef.current);
    };
  }, [startAutoPlay]);

  const pauseAndResume = useCallback(() => {
    stopAutoPlay();
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      startAutoPlay();
    }, RESUME_AFTER);
  }, [startAutoPlay, stopAutoPlay]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        pauseAndResume();
        setIndex((i) => (i - 1 + heroDestinations.length) % heroDestinations.length);
      } else if (e.key === "ArrowRight") {
        pauseAndResume();
        setIndex((i) => (i + 1) % heroDestinations.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pauseAndResume]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Minimum swipe distance to trigger navigation
    if (Math.abs(diff) > 50) {
      pauseAndResume();
      if (diff > 0) {
        // Swipe left - go to next
        setIndex((i) => (i + 1) % heroDestinations.length);
      } else {
        // Swipe right - go to previous
        setIndex((i) => (i - 1 + heroDestinations.length) % heroDestinations.length);
      }
    }

    touchStartX.current = null;
  };

  // Parallax mouse move for desktop only
  useEffect(() => {
    if (isMobile) return;

    const el = containerRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y };
      el.style.setProperty("--mx", (x - 0.5).toFixed(3));
      el.style.setProperty("--my", (y - 0.5).toFixed(3));
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  const goTo = (i) => {
    setIndex(i);
    pauseAndResume();
  };

  const current = heroDestinations[index];
  const bg = heroDestinations[displayBgIndex];

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden select-none pt-2 md:pt-20 sm:20"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={() => {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => startAutoPlay(), RESUME_AFTER);
      }}
      onFocus={stopAutoPlay}
      onBlur={() => {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => startAutoPlay(), RESUME_AFTER);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
    >
      {/* Background crossfade */}
      <div className="absolute inset-0 transform-gpu will-change-transform">
        <AnimatePresence mode="wait">
          <motion.img
            key={bg?.id ?? "bg-fallback"}
            initial={{ opacity: 0.5, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.4, scale: 0.98 }}
            transition={{ duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
            src={bg?.image}
            alt={bg?.name ?? ""}
            className="absolute inset-0 w-full h-full object-cover bg-center filter saturate-105"
            style={{ willChange: "opacity, transform" }}
          />
        </AnimatePresence>

        <div
          className="absolute inset-0 bg-gradient-to-r opacity-70 pointer-events-none"
          style={{ background: `linear-gradient(90deg, rgba(6,6,23,0.6), rgba(0,0,0,0.2))` }}
        />
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
          style={{
            background: `linear-gradient(120deg, rgba(255,255,255,0.02), transparent 30%), linear-gradient(90deg, var(--accent-start, rgba(255,255,255,0.02)), transparent)`,
          }}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex items-center justify-center h-full px-2 xs:px-3 sm:px-6 mt-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full max-w-5xl"
        >
          <div
            aria-hidden="true"
            style={{
              ["--accent-start"]: "rgba(255,255,255,0.02)",
            }}
            className="rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-blur-md md:backdrop-blur-xl bg-gradient-to-r from-white/6 to-white/4 border border-white/6 shadow-2xl overflow-hidden mx-1 xs:mx-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4 md:gap-6 items-center p-3 xs:p-4 md:p-8 lg:p-12">
              <div className="flex flex-col gap-3 xs:gap-4 md:gap-6 order-2 md:order-1">
                <div>
                  <span className="inline-flex items-center gap-1.5 xs:gap-2 px-2 xs:px-3 py-1 rounded-full bg-white/6 text-[10px] xs:text-xs md:text-sm text-white/90 shadow-sm">
                    <Icon name="Sparkles" size={12} className="xs:size-4" />
                    AI Curated
                  </span>
                </div>

                <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight text-white">
                  TourCraft{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                    AI
                  </span>
                </h1>

                <p className="text-xs xs:text-sm sm:text-base md:text-lg text-white/80 max-w-[16rem] xs:max-w-xs sm:max-w-xl">
                  {current.tagline} — {current.description}
                </p>

                <div className="flex flex-wrap gap-2 xs:gap-3 mt-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      onDiscoverTours?.();
                    }}
                    className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold shadow-lg px-3 xs:px-5 py-1.5 xs:py-2 text-xs xs:text-sm md:text-base"
                    iconName="Compass"
                    iconSize={14}
                  >
                    Explore Tours
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => {
                      onAIRecommender?.();
                    }}
                    className="relative overflow-hidden rounded-full 
                   px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm md:text-base 
                   text-white font-medium shadow-lg 
                   bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                   hover:from-purple-500 hover:via-indigo-500 hover:to-pink-500
                   transition-all duration-500 ease-in-out
                   border border-white/10"
                    iconName="Sparkles"
                    iconSize={14}
                  >
                    <span className="relative z-10">AI Recommendations</span>
                    {/* Glow effect layer */}
                    <span className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-70 animate-pulse"></span>
                  </Button>
                </div>

                <div className="flex items-center gap-2 xs:gap-3 md:gap-4 mt-3">
                  <div className="flex items-center gap-1.5 xs:gap-2" role="tablist" aria-label="Destinations">
                    {heroDestinations.map((d, i) => {
                      const active = i === index;
                      return (
                        <button
                          key={d.id}
                          onClick={() => goTo(i)}
                          aria-pressed={active}
                          aria-label={`Show ${d.name}`}
                          className={`w-7 h-7 xs:w-8 xs:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden border border-white/8 flex-none transition-transform ${active ? "scale-105 ring-2 ring-white/25" : "opacity-70 hover:scale-105"
                            }`}
                          title={d.name}
                        >
                          <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                        </button>
                      );
                    })}
                  </div>

                  <div className="ml-auto flex items-center gap-1 xs:gap-2 text-white/80">
                    <button
                      onClick={() => {
                        pauseAndResume();
                        setIndex((i) => (i - 1 + heroDestinations.length) % heroDestinations.length);
                      }}
                      className="p-1 xs:p-1.5 md:p-2 rounded-md hover:bg-white/6"
                      aria-label="Previous"
                    >
                      <Icon name="ChevronLeft" size={14} className="xs:size-4 md:size-5 text-yellow-400" />
                    </button>

                    <button
                      onClick={() => {
                        pauseAndResume();
                        setIndex((i) => (i + 1) % heroDestinations.length);
                      }}
                      className="p-1 xs:p-1.5 md:p-2 rounded-md hover:bg-white/6"
                      aria-label="Next"
                    >
                      <Icon name="ChevronRight" size={14} className="xs:size-4 md:size-5 text-yellow-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative rounded-lg xs:rounded-xl md:rounded-2xl overflow-hidden bg-black/10 mt-4 md:mt-0 order-1 md:order-2">
                <AnimatePresence>
                  <motion.div
                    key={current.id}
                    initial={{ x: isMobile ? 0 : 20, opacity: 0, scale: 1.02 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: isMobile ? 0 : -20, opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full h-40 xs:h-48 sm:h-56 md:h-72 lg:h-80 xl:h-96 relative"
                    aria-hidden
                  >
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-full h-full object-cover transform-gpu"
                      style={{
                        transform: isMobile
                          ? 'none'
                          : `translate3d(calc(var(--mx,0) * -8px), calc(var(--my,0) * -8px), 0) scale(1.03)`,
                      }}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${current.accent} mix-blend-soft-light opacity-40`}
                      aria-hidden
                    />
                    <div className="absolute left-3 bottom-3 right-3 xs:left-4 xs:bottom-4 xs:right-4 md:left-6 md:bottom-6 md:right-6 flex items-end justify-between">
                      <div>
                        <h3 className="inline-block px-2 py-0.5 text-base xs:text-lg md:text-xl lg:text-2xl font-bold 
                       text-yellow-400 drop-shadow-md bg-black/40 backdrop-blur-sm rounded">
                          {current.name}
                        </h3>

                        <p className="relative text-[10px] xs:text-xs md:text-sm mt-1 
                      text-white 
                      bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                      px-2 py-0.5 
                      rounded-full 
                      shadow-[0_4px_15px_rgba(255,0,255,0.3),0_0_8px_rgba(255,255,255,0.2)] 
                      border border-white/20 
                      backdrop-blur-sm">
                          {current.tagline}
                        </p>
                      </div>

                      <div className="hidden md:flex items-center gap-2 
                        px-3 py-2 rounded-full 
                        bg-black/40 backdrop-blur-sm 
                        text-white text-xs md:text-sm 
                        font-semibold cursor-pointer 
                        shadow-[0_4px_12px_rgba(0,0,0,0.4),0_0_6px_rgba(255,255,255,0.1)]
                        hover:scale-105 transition-transform duration-300 ease-in-out">
                        <Icon
                          name="Location"
                          size={14}
                          className="md:size-4 text-pink-500 drop-shadow-[0_0_4px_rgba(255,0,255,0.7)]"
                        />
                        <span>Explore now</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute left-0 right-0 bottom-4 xs:bottom-6 md:bottom-8 flex justify-center z-20 pointer-events-none">
        <div className="text-white/70 text-[10px] xs:text-xs md:text-sm flex items-center gap-0.5 xs:gap-1 md:gap-2 backdrop-blur-sm bg-black/10 px-2 xs:px-3 py-0.5 xs:py-1 rounded-full">
          <span className="hidden sm:inline">Scroll to explore more</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <Icon name="ChevronDown" size={14} className="xs:size-4 md:size-5" />
          </motion.span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;