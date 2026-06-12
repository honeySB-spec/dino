import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, BookOpen, Search } from "lucide-react";

const articlesData = [
  {
    id: 1,
    title: "Space Dust and the Origins of our Solar System",
    category: "Space Science",
    date: "May 2026",
    readingTime: "5 min read",
    snippet: "Scientists analyze tiny particles of solar dust collected from deep space, revealing mineral secrets that predated the birth of the Sun.",
    image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624247/01_udnber.png"
  },
  {
    id: 2,
    title: "Uncovering Extreme Deep Sea Biodiversity",
    category: "Zoology",
    date: "April 2026",
    readingTime: "8 min read",
    snippet: "A deep sea expedition in the Mariana Trench captures photos and DNA samples of deep water ecosystems adapting to immense pressure.",
    image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624256/04_get63z.png"
  },
  {
    id: 3,
    title: "The Anthropocene: Documenting Human Footprint",
    category: "Mineralogy",
    date: "March 2026",
    readingTime: "6 min read",
    snippet: "Geologists discover new 'plastiglomerate' rocks, proposing a new geological epoch characterized by human-made synthetic minerals.",
    image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624374/02_pmvxxl.png"
  },
  {
    id: 4,
    title: "Evolutionary Secrets of Cretaceous Dinosaurs",
    category: "Palaeontology",
    date: "February 2026",
    readingTime: "10 min read",
    snippet: "How bone structure CT scans are clarifying the warm-blooded metabolism of Theropod dinosaurs during the late Cretaceous period.",
    image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624251/05_kz1tyu.png"
  },
  {
    id: 5,
    title: "Ancient Reptiles of the Mesozoic Seas",
    category: "Palaeontology",
    date: "January 2026",
    readingTime: "7 min read",
    snippet: "Reconstructing the movement of Plesiosaurs through hydro-dynamic computer models shows sophisticated underwater flight mechanisms.",
    image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624236/03_hcp3jc.png"
  }
];

const categories = ["All", "Palaeontology", "Zoology", "Mineralogy", "Space Science"];

export default function Discover() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = selectedCategory === "All"
    ? articlesData
    : articlesData.filter((article) => article.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen pt-32 px-6 md:px-16 pb-24"
    >
      {/* Page Header */}
      <div className="mb-12">
        <div className="text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-gray-500 mb-4 flex items-center gap-2">
          <Sparkles size={12} className="text-black" />
          <span>[ 03 ] Science & Collections</span>
        </div>
        <h1 className="text-[3.2rem] md:text-[5.5rem] font-normal tracking-tight leading-[1] text-[#111]">
          DISCOVER SCIENCE
        </h1>
      </div>

      {/* Filter Options */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200 pb-8 mb-12">
        
        {/* Categories Flex */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border text-[11px] font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Field representation */}
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full bg-white max-w-xs w-full text-gray-400">
          <Search size={14} />
          <input 
            type="text" 
            placeholder="Search our research..." 
            className="bg-transparent text-xs font-mono outline-none border-none w-full placeholder-gray-400 text-[#111]"
            readOnly
          />
        </div>
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredArticles.map((article) => (
            <motion.article
              layout
              key={article.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white/40 backdrop-blur-sm flex flex-col justify-between group hover:border-black transition-all duration-300"
            >
              <div>
                {/* Image display */}
                <div className="h-48 overflow-hidden bg-[#0e0e0e]/5 relative flex items-center justify-center">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-contain p-6 group-hover:scale-103 transition-transform duration-700 mix-blend-lighten"
                  />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-[#111] uppercase border border-gray-200">
                    {article.category}
                  </div>
                </div>

                {/* Text content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={10} />
                      {article.readingTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium tracking-tight text-[#111] leading-snug group-hover:underline">
                    {article.title}
                  </h3>
                  
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {article.snippet}
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="px-6 pb-6 pt-2">
                <button className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase font-bold text-gray-800 hover:text-black group-hover:gap-3 transition-all">
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </motion.article>
          ))}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
