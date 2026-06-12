import { motion } from "motion/react";
import { MapPin, Clock, Calendar, HelpCircle, Phone, Mail, Sparkles } from "lucide-react";

export default function Visit() {
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
          <span>[ 01 ] Visitor Information</span>
        </div>
        <h1 className="text-[3.2rem] md:text-[5.5rem] font-normal tracking-tight leading-[1] text-[#111]">
          PLAN YOUR VISIT
        </h1>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Hours & Location */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* opening hours block */}
          <div className="border-t border-gray-200 pt-6">
            <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 block mb-4">
              Opening Hours
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xl font-medium text-[#111]">Open Daily 10.00 – 17.50</p>
                <p className="text-sm text-gray-600 mt-1">Last entry is at 17.15. Closed 24–26 December.</p>
              </div>
              <div className="px-3 py-1 bg-black text-white text-[10px] font-mono tracking-widest uppercase rounded-full w-fit flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open Today
              </div>
            </div>
          </div>

          {/* Location details */}
          <div className="border-t border-gray-200 pt-6">
            <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 block mb-4">
              Address & Location
            </span>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-gray-700" />
              </div>
              <div>
                <p className="text-lg font-medium text-[#111]">Natural History Museum</p>
                <p className="text-sm text-gray-600 mt-1">
                  Cromwell Road, South Kensington<br />
                  London SW7 5BD, United Kingdom
                </p>
                <p className="text-xs font-mono text-gray-400 mt-2">
                  51.4967° N, 0.1764° W
                </p>
              </div>
            </div>
          </div>

          {/* Getting here grid */}
          <div className="border-t border-gray-200 pt-6">
            <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 block mb-4">
              Transport Links
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 border border-gray-200 rounded-lg bg-white/40">
                <p className="text-xs font-mono tracking-wider uppercase text-gray-800 font-bold mb-2">
                  By Underground
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  South Kensington station (District, Circle, and Piccadilly lines) is a five-minute walk from the main entrance via a pedestrian subway.
                </p>
              </div>
              <div className="p-5 border border-gray-200 rounded-lg bg-white/40">
                <p className="text-xs font-mono tracking-wider uppercase text-gray-800 font-bold mb-2">
                  By Bus & Cycle
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Routes 14, 49, 70, 74, 345, and C1 stop near the museum. Public cycle docks are located outside the main exhibition roads.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Reservation & Quick Info Card */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Reservation Card */}
          <div className="bg-[#1a1a1a] text-white p-8 rounded-lg shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 -translate-y-12 transition-transform duration-500 group-hover:scale-110" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2 text-[9px] font-mono tracking-widest uppercase text-gray-400">
                <Calendar size={12} />
                <span>Ticket Reservations</span>
              </div>
              
              <h3 className="text-2xl font-medium tracking-tight">Admission is completely free</h3>
              
              <p className="text-xs text-gray-400 leading-relaxed">
                General admission tickets are free and give you access to our permanent collection galleries. Pre-booking online secures your entry slot.
              </p>

              <button className="w-full bg-[#fcfcfc] text-[#111] py-4 rounded-md text-xs font-mono uppercase tracking-widest font-bold shadow-md hover:bg-black hover:text-white hover:border hover:border-white transition-all duration-300 cursor-pointer">
                Book Free Ticket
              </button>

              <p className="text-[10px] text-gray-500 text-center">
                * Selected temporary exhibitions may require paid tickets.
              </p>
            </div>
          </div>

          {/* Guidelines Grid */}
          <div className="border border-gray-200 rounded-lg bg-white/50 p-6 space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-gray-800">
              Visitor Guidelines
            </h4>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <HelpCircle size={14} className="text-gray-500 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Accessibility:</strong> Level access is available via the Exhibition Road entrance. Wheelchairs can be borrowed free of charge.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <Clock size={14} className="text-gray-500 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Cloakroom:</strong> Small bags and coats can be checked. Large luggage items exceeding 56x45x25cm cannot be accepted.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex flex-col gap-2 text-[10px] font-mono text-gray-500">
              <div className="flex items-center gap-2">
                <Phone size={12} />
                <span>+44 (0)20 7942 5000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} />
                <span>info@nhm.ac.uk</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
