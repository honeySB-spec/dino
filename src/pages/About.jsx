import { motion } from "motion/react";
import { Sparkles, Calendar, Award, Globe, Users } from "lucide-react";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen pt-32 px-6 md:px-16 pb-24"
    >
      {/* Page Header */}
      <div className="mb-16">
        <div className="text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-gray-500 mb-4 flex items-center gap-2">
          <Sparkles size={12} className="text-black" />
          <span>[ 05 ] Institutional Profile</span>
        </div>
        <h1 className="text-[3.2rem] md:text-[5.5rem] font-normal tracking-tight leading-[1] text-[#111]">
          ABOUT THE MUSEUM
        </h1>
      </div>

      {/* Mission Quote Block */}
      <div className="border-t border-b border-gray-200 py-12 mb-20">
        <p className="text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed tracking-tight text-gray-800 max-w-5xl text-left">
          “Our mission is to inspire a love for the natural world and unlock answers for the big questions facing humanity. We custody a collection of <span className="text-[#111] font-semibold">80 million specimens</span> spanning 4.5 billion years of planetary history.”
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        
        {/* Left: Section descriptor */}
        <div className="lg:col-span-4 text-left">
          <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 block mb-2">
            Historical Journey
          </span>
          <h3 className="text-2xl font-medium tracking-tight text-[#111]">
            Unveiling milestones that shaped natural science.
          </h3>
        </div>

        {/* Right: Timeline items */}
        <div className="lg:col-span-8 space-y-8">
          {[
            {
              year: "1881",
              title: "A Cathedral of Nature Opens",
              description: "Designed by Alfred Waterhouse, the landmark South Kensington building opens its doors to the public, establishing a dedicated home for natural history collections."
            },
            {
              year: "1963",
              title: "Constitutional Independence",
              description: "The British Museum Act of 1963 formally separates the Natural History Museum from the British Museum, establishing an independent Board of Trustees."
            },
            {
              year: "2026",
              title: "A Global Center for Planetary Health",
              description: "NHM leads international coalitions in biodiversity monitoring, genomic classification, and carbon mitigation studies, using AI tools on its immense specimen library."
            }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6 items-start border-b border-gray-100 pb-6 last:border-0 last:pb-0 text-left">
              <div className="text-2xl font-mono text-gray-800 font-bold shrink-0 w-16">
                {item.year}
              </div>
              <div>
                <h4 className="text-lg font-medium text-[#111]">{item.title}</h4>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Impact metrics grid */}
      <div className="border-t border-gray-200 pt-16">
        <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 block mb-8 text-left">
          Key Statistics
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="text-left space-y-2 border-l border-gray-200 pl-4">
            <Globe size={18} className="text-gray-400" />
            <h4 className="text-3xl font-normal text-[#111]">80M+</h4>
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500">Specimens</p>
          </div>

          <div className="text-left space-y-2 border-l border-gray-200 pl-4">
            <Users size={18} className="text-gray-400" />
            <h4 className="text-3xl font-normal text-[#111]">350+</h4>
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500">Researchers</p>
          </div>

          <div className="text-left space-y-2 border-l border-gray-200 pl-4">
            <Calendar size={18} className="text-gray-400" />
            <h4 className="text-3xl font-normal text-[#111]">5.3M</h4>
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500">Annual Visitors</p>
          </div>

          <div className="text-left space-y-2 border-l border-gray-200 pl-4">
            <Award size={18} className="text-gray-400" />
            <h4 className="text-3xl font-normal text-[#111]">140+</h4>
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500">Years of History</p>
          </div>

        </div>
      </div>

    </motion.div>
  );
}
