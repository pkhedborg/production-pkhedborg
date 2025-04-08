"use client";

import { useTranslation } from "react-i18next";
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
      {/* Hero Section with Optimized Image - No Animation */}
      <section className="relative h-[60vh] md:h-screen">
        <div className="absolute inset-0">
          <HistoryImage />
          {/* Fixed overlay opacity */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center px-8">
          <div className="relative z-20 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
              {t("history.heroTitle")}
            </h1>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            {t("history.impactTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: 500, text: "history.projectsSponsored" },
              { value: 1500000, text: "history.grantsDistributed", decimal: 2 },
              { value: 40, text: "history.yearsOfSupport" }
            ].map((stat, index) => (
              <div
                key={index}
                className="transition-transform duration-200 hover:-translate-y-1"
              >
                <h3 className="text-5xl font-bold text-red-600">
                  <NumberTicker value={stat.value} decimalPlaces={stat.decimal} />
                </h3>
                <p className="text-lg">{t(stat.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foundation History Section */}
      <section className="py-20 px-4 lg:px-8 bg-gray-100 text-left">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto mb-16 text-left">
            <h2 className="text-4xl font-bold mb-6 text-left">{t("history.foundationTitle")}</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-left">{t("history.foundationText1")}</p>
            <p className="text-lg text-gray-700 leading-relaxed mt-6 text-left">{t("history.foundationText2")}</p>
            <p className="text-lg text-gray-700 leading-relaxed mt-6 text-left">{t("history.foundationText3")}</p>
          </div>

          <div className="max-w-3xl mx-auto mb-16 text-left">
            <h2 className="text-4xl font-bold mb-6 text-left">{t("history.karlErikTitle")}</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-left">{t("history.karlErikText1")}</p>
            <p className="text-lg text-gray-700 leading-relaxed mt-6 text-left">{t("history.karlErikText2")}</p>
            <p className="text-lg text-gray-700 leading-relaxed mt-6 text-left">{t("history.karlErikText3")}</p>
          </div>

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
              <h2 className="text-3xl font-bold mb-6 text-center">
                {t("history.boardTitle")}
              </h2>
              <p className="text-lg text-gray-500 mb-12 text-center">
                {t("history.boardDescription")}
              </p>

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
                    <div className="transition-transform duration-200 group-hover:-translate-y-2">
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default History;