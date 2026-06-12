import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="w-full h-screen flex items-center justify-center p-3 md:p-5 bg-[#f0f0f0]">
      <section className="relative w-full max-w-[1536px] h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-none flex flex-col items-center bg-white/10 group">
        
        {isHome && (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4" type="video/mp4" />
          </video>
        )}

        <Navbar />

        <div className="relative z-10 w-full h-full flex flex-col items-center flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </section>
    </div>
  )
}

export default Layout
