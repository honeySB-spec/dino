import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Sparkles, Calendar, MapPin } from "lucide-react";

const exhibitionsData = {
  current: [
    {
      id: 1,
      title: "Titanosaur: Life as the Biggest Dinosaur",
      category: "Featured Exhibition",
      date: "Until 31 August 2026",
      location: "Waterhouse Gallery, South Hall",
      description: "Step into the colossal world of Patagotitan mayorum, one of the largest creatures to ever walk the Earth. Learn about its massive scale and how it survived.",
      image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624251/05_kz1tyu.png",
      featured: true
    },
    {
      id: 2,
      title: "Wildlife Photographer of the Year",
      category: "Photography Exhibition",
      date: "Until 14 October 2026",
      location: "East Wing Galleries",
      description: "Discover the natural world in all its beauty, diversity and vulnerability through 100 stunning award-winning photographs from across the globe.",
      image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624256/04_get63z.png",
      featured: false
    },
    {
      id: 3,
      title: "Birds: Brilliant and Bizarre",
      category: "Science Gallery",
      date: "Until 22 November 2026",
      location: "Special Exhibition Gallery 2",
      description: "Explore the fascinating and sometimes weird evolution of birds, from their dinosaur ancestors to modern-day masters of the skies.",
      image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624236/03_hcp3jc.png",
      featured: false
    }
  ],
  upcoming: [
    {
      id: 4,
      title: "Secrets of the Abyssal Ocean",
      category: "New Discovery",
      date: "Opening 12 January 2027",
      location: "Jerwood Gallery",
      description: "An immersive journey into the pitch-black depths of our oceans, displaying bizarre newly discovered species and geological hydrothermal vents.",
      image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624374/02_pmvxxl.png",
      featured: true
    },
    {
      id: 5,
      title: "Meteorites: Cosmic Catastrophes",
      category: "Space Science",
      date: "Opening 18 February 2027",
      location: "Earth Galleries, Red Zone",
      description: "Examine ancient fragments of stardust and meteorites that shaped our planet, containing clues to the origins of organic life in the universe.",
      image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624247/01_udnber.png",
      featured: false
    }
  ]
};

export default function Exhibitions() {
  const [activeTab, setActiveTab] = useState("current");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen pt-32 px-6 md:px-16 pb-24"
    >
      {/* Page Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-gray-500 mb-4 flex items-center gap-2">
            <Sparkles size={12} className="text-black" />
            <span>[ 02 ] Galleries & Events</span>
          </div>
          <h1 className="text-[3.2rem] md:text-[5.5rem] font-normal tracking-tight leading-[1] text-[#111]">
            EXHIBITIONS
          </h1>
        </div>

        {/* Tab Selectors */}
        <div className="flex gap-1.5 p-1 bg-gray-100 rounded-full w-fit font-mono text-[10px] tracking-wider uppercase">
          {["current", "upcoming"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 font-semibold ${
                activeTab === tab 
                  ? "bg-black text-white shadow-sm" 
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab} Exhibitions
            </button>
          ))}
        </div>
      </div>

      {/* Exhibitions Content Grid */}
      <div className="space-y-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            {exhibitionsData[activeTab].map((exhibit) => {
              if (exhibit.featured) {
                // Featured Colossal Banner Card
                return (
                  <div 
                    key={exhibit.id}
                    className="col-span-12 border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-black transition-all duration-300 group flex flex-col lg:flex-row"
                  >
                    {/* Left content block */}
                    <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between space-y-8">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest uppercase px-3 py-1 bg-black text-white rounded-full w-fit">
                          {exhibit.category}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-medium tracking-tight mt-6 text-[#111]">
                          {exhibit.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                          {exhibit.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-col gap-2 text-xs font-mono text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{exhibit.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            <span>{exhibit.location}</span>
                          </div>
                        </div>

                        <button className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase font-bold text-gray-800 hover:text-black group-hover:underline pt-2">
                          <span>View Exhibit Details</span>
                          <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Right Image Block */}
                    <div className="lg:w-1/2 h-[300px] lg:h-auto overflow-hidden relative bg-[#0e0e0e]/5">
                      <img 
                        src={exhibit.image} 
                        alt={exhibit.title}
                        className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700 mix-blend-lighten"
                      />
                    </div>
                  </div>
                );
              }

              // Standard Regular Cards
              return (
                <div 
                  key={exhibit.id}
                  className="col-span-12 md:col-span-6 border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-black transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="h-[250px] overflow-hidden bg-[#0e0e0e]/5 relative">
                    <img 
                      src={exhibit.image} 
                      alt={exhibit.title}
                      className="w-full h-full object-contain p-6 group-hover:scale-103 transition-transform duration-700 mix-blend-lighten"
                    />
                  </div>
                  
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-gray-500">
                        {exhibit.category}
                      </span>
                      <h4 className="text-xl font-medium tracking-tight mt-2 text-[#111] group-hover:underline">
                        {exhibit.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                        {exhibit.description}
                      </p>
                    </div>

                    <div className="space-y-4 border-t border-gray-100 pt-4">
                      <div className="flex flex-col gap-1.5 text-[10px] font-mono text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar size={12} />
                          <span>{exhibit.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={12} />
                          <span>{exhibit.location}</span>
                        </div>
                      </div>

                      <button className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase font-bold text-gray-800">
                        <span>Read More</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
