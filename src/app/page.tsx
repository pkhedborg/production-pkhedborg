"use client";
  
import Link from 'next/link';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from "react-i18next";

// Dynamically import sections with loading boundary
const FoundationSection = dynamic(() => import('@/components/sections/foundation-section'), {
  loading: () => <div className="animate-pulse bg-gray-100 h-96" />
});

const ProjectSection = dynamic(() => import('@/components/sections/projects-section'), {
  loading: () => <div className="animate-pulse bg-gray-100 h-96" />
});

// Simplified animations for mobile
const fadeInUp = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Detect if user is on mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const videoVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 1.2
    }
  }
};

const BackgroundVideo = ({ isLoaded, onLoaded }: { isLoaded: boolean; onLoaded: () => void }) => (
  <video
    className={`w-full h-[600px] md:h-[800px] object-cover ${!isLoaded ? 'invisible' : ''}`}
    src="/video/hero.webm"
    autoPlay
    loop
    muted
    playsInline
    onLoadedData={onLoaded}
    style={{ transform: 'translate3d(0, 0, 0)' }}
  />
);

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { t } = useTranslation();

  // Simplified animations for mobile
  const mobileVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.section 
      id="hero" 
      className="relative bg-white w-full"
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto w-full">
        <div className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
          {/* Video Background */}
          <BackgroundVideo 
            isLoaded={isVideoLoaded}
            onLoaded={() => setIsVideoLoaded(true)}
          />
          
          {/* Gradient Overlay */}
          <motion.div 
            variants={videoVariants}
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
            aria-hidden="true"
          />
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8">
            <motion.div 
              className="relative z-20 max-w-3xl sm:text-center"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { duration: 0.5 }
                }
              }}
            >
              <div className="space-y-6 sm:space-y-8">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extralight text-white tracking-tight leading-none">
                  <motion.span 
                    className="block hover:translate-x-2 transition-transform duration-700"
                    variants={isMobile ? mobileVariants : fadeInUp}
                  >
                    Bridging
                  </motion.span>
                  <motion.span 
                    className="block font-light hover:translate-x-4 transition-transform duration-700"
                    variants={isMobile ? mobileVariants : fadeInUp}
                  >
                    Belgium
                  </motion.span>
                  <motion.span 
                    className="block font-light hover:translate-x-6 transition-transform duration-700"
                    variants={isMobile ? mobileVariants : fadeInUp}
                  >
                    & Sweden
                  </motion.span>
                </h1>
                
                <motion.div
                  variants={isMobile ? mobileVariants : fadeInUp}
                >
                  <Link 
                    href="/application"
                    className="inline-block text-base sm:text-lg md:text-xl text-white font-light tracking-wide 
                      bg-[#252932] px-4 sm:px-6 py-2 sm:py-3 shadow-xl hover:bg-[#212632]/90 transition-all 
                      duration-300 hover:translate-x-2 hover:shadow-2xl"
                  >
                    {t("home.applicationClosing")}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Home = () => {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div 
        className="w-full"
        initial="hidden"
        animate="visible"
      >
        <HeroSection />
        
        {/* Foundation Section with Intersection Observer */}
        <motion.section 
          className="py-3 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FoundationSection />
          </div>
        </motion.section>

        {/* Project Section with Intersection Observer */}
        <motion.section 
          className="py-8 sm:py-16 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mx-auto max-w-[1550px] px-4 sm:px-6 lg:px-8">
            <ProjectSection />
          </div>
        </motion.section>
      </motion.div>
    </LazyMotion>
  );
};

export default Home;