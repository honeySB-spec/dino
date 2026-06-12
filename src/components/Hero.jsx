import { motion } from 'motion/react'
import HeroBadge from './HeroBadge'
import BottomLeftCard from './BottomLeftCard'
import BottomRightCorner from './BottomRightCorner'

const Hero = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center pt-8 px-6 text-center max-w-4xl">
        <HeroBadge />
        <motion.h1 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal text-[#5E6470] mb-2 tracking-tight leading-[1.05]"
        >
          Fluid Asset Streams
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg text-[#5E6470] opacity-80 leading-relaxed max-w-xl font-normal"
        >
          Access Smart Vaults, stake RIVR, NFTs, transform rigid holdings into liquid cash instantly.
        </motion.p>
      </div>

      <BottomLeftCard />
      <BottomRightCorner />
    </>
  )
}

export default Hero
