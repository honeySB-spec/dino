import { motion } from "motion/react";
import { Sparkles, ArrowRight, BookOpen, Users, Compass, Mail } from "lucide-react";

export default function Learn() {
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
          <span>[ 04 ] Education & Resources</span>
        </div>
        <h1 className="text-[3.2rem] md:text-[5.5rem] font-normal tracking-tight leading-[1] text-[#111]">
          LEARNING PORTAL
        </h1>
      </div>

      {/* Grid of tracks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        
        {/* Track 1: Schools */}
        <div className="border border-gray-200 rounded-xl p-8 bg-white/40 flex flex-col justify-between hover:border-black transition-all duration-300 group">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center bg-white">
              <BookOpen size={20} className="text-gray-800" />
            </div>
            <h3 className="text-2xl font-medium tracking-tight text-[#111]">
              Schools & Teachers
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Book a school trip or explore resources developed by science experts to support classrooms. From virtual workshops to physical gallery tours.
            </p>
          </div>
          <button className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase font-bold text-gray-800 hover:text-black group-hover:gap-3 transition-all mt-8">
            <span>Explore Schools Program</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Track 2: Families */}
        <div className="border border-gray-200 rounded-xl p-8 bg-white/40 flex flex-col justify-between hover:border-black transition-all duration-300 group">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center bg-white">
              <Compass size={20} className="text-gray-800" />
            </div>
            <h3 className="text-2xl font-medium tracking-tight text-[#111]">
              Families & Kids
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Dinosaur adventure trails, weekend events, and sleepovers under our iconic fossils. Discover hands-on science games and activities at home.
            </p>
          </div>
          <button className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase font-bold text-gray-800 hover:text-black group-hover:gap-3 transition-all mt-8">
            <span>Explore Family Trails</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Track 3: Adults */}
        <div className="border border-gray-200 rounded-xl p-8 bg-white/40 flex flex-col justify-between hover:border-black transition-all duration-300 group">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center bg-white">
              <Users size={20} className="text-gray-800" />
            </div>
            <h3 className="text-2xl font-medium tracking-tight text-[#111]">
              Adults & Academics
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Attend debates and late-night museum events, join courses on taxonomy and mineralogy, or register for public lectures by visiting researchers.
            </p>
          </div>
          <button className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase font-bold text-gray-800 hover:text-black group-hover:gap-3 transition-all mt-8">
            <span>Explore Adult Learning</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* Newsletter Block */}
      <div className="border border-gray-200 rounded-xl p-8 md:p-12 bg-[#111] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-24 -translate-y-24" />
        
        <div className="relative z-10 space-y-4 md:max-w-md text-left">
          <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 flex items-center gap-2">
            <Mail size={12} />
            <span>Museum Bulletin</span>
          </span>
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight">
            Unlock planetary insights
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Subscribe to receive discoveries from our research labs, event invitations, ticket alerts, and details on upcoming exhibitions.
          </p>
        </div>

        {/* Form field */}
        <div className="relative z-10 w-full md:max-w-sm flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 bg-white/10 border border-white/20 px-4 py-3 rounded text-xs text-white outline-none placeholder-gray-500 focus:border-white transition-colors"
          />
          <button className="bg-white text-black text-xs font-mono tracking-widest uppercase font-bold px-6 py-3 rounded hover:bg-gray-200 transition-colors cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>

    </motion.div>
  );
}
