"use client";

import { useTranslation } from "react-i18next";
import Image from 'next/image';
import { motion } from 'framer-motion';
import NumberTicker from "@/components/ui/number-ticker";
import HistoryImage from "@/components/Images/OptimizedHistoryImage";
import BoardImage from "@/components/Images/OptimizedBoardImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const History = () => {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const boardMembers = [
    { image: "urban", name: "urban" },
    { image: "thomas", name: "thomas" },
    { image: "eva", name: "eva" },
    { image: "lars-owe", name: "larsOwe" },
    { image: "niclas", name: "niclas" },
    { image: "oliver", name: "oliver" }
  ];

  return (
    <div className="history-page w-full">
      {/* Hero Section with Optimized Image */}
      <motion.section
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[60vh] md:h-screen bg-[#252932]"
      >
        <div className="absolute inset-0">
          <HistoryImage />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-20 max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
              {t("history.heroTitle")}
            </h1>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-8"
            variants={fadeInUp}
          >
            {t("history.impactTitle")}
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[
              { value: 500, text: "history.projectsSponsored" },
              { value: 1500000, text: "history.grantsDistributed", decimal: 2 },
              { value: 40, text: "history.yearsOfSupport" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-5xl font-bold text-red-600">
                  <NumberTicker value={stat.value} decimalPlaces={stat.decimal} />
                </h3>
                <p className="text-lg">{t(stat.text)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Foundation History Section */}
      <motion.section 
        className="py-20 px-4 lg:px-8 bg-gray-100 text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto mb-16 text-left"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-6 text-left">{t("history.foundationTitle")}</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-left">{t("history.foundationText1")}</p>
            <p className="text-lg text-gray-700 leading-relaxed mt-6 text-left">{t("history.foundationText2")}</p>
            <p className="text-lg text-gray-700 leading-relaxed mt-6 text-left">{t("history.foundationText3")}</p>
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto mb-16 text-left"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-6 text-left">{t("history.karlErikTitle")}</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-left">{t("history.karlErikText1")}</p>
            <p className="text-lg text-gray-700 leading-relaxed mt-6 text-left">{t("history.karlErikText2")}</p>
            <p className="text-lg text-gray-700 leading-relaxed mt-6 text-left">{t("history.karlErikText3")}</p>
          </motion.div>

          <motion.div 
            className="w-full h-px bg-gray-200 my-12"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          {/* Board Section */}
          <section className="py-20 px-4 lg:px-8 bg-gray-100">
            <div className="container mx-auto">
              <motion.h2 
                className="text-3xl font-bold mb-6 text-center"
                variants={fadeInUp}
              >
                {t("history.boardTitle")}
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-500 mb-12 text-center"
                variants={fadeInUp}
              >
                {t("history.boardDescription")}
              </motion.p>

              {/* Mobile View */}
              <div className="block md:hidden">
                <Carousel>
                  <CarouselContent className="-ml-4">
                    {boardMembers.map((member, index) => (
                      <CarouselItem key={`mobile-${index}`} className="pl-4 basis-full">
                        <div className="w-full px-4">
                          <div className="flex flex-col items-center">
                            <div className="relative w-full aspect-square max-w-[400px] mb-6">
                              <BoardImage 
                                member={member.image}
                                alt={t(`history.boardMembers.${member.name}.name`)}
                              />
                            </div>
                            <div className="text-center">
                              <h3 className="text-2xl font-semibold mb-2">
                                {t(`history.boardMembers.${member.name}.name`)}
                              </h3>
                              <p className="text-gray-500">
                                {t(`history.boardMembers.${member.name}.role`)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-4" />
                  <CarouselNext className="mr-4" />
                </Carousel>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-3 gap-8">
                {boardMembers.map((member, index) => (
                  <div 
                    key={`desktop-${index}`}
                    className="text-center group"
                  >
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="transform transition-transform duration-200 group-hover:-translate-y-2"
                    >
                      <div className="relative w-64 h-64 mx-auto mb-4">
                        <BoardImage 
                          member={member.image}
                          alt={t(`history.boardMembers.${member.name}.name`)}
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold">
                          {t(`history.boardMembers.${member.name}.name`)}
                        </h3>
                        <p className="text-gray-500">
                          {t(`history.boardMembers.${member.name}.role`)}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </motion.section>
    </div>
  );
};

export default History;
