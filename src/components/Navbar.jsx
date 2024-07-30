

import React from 'react'
import logo from '../images/Group 52.svg'
import Image from 'next/image'

function Navbar() {
  return (
   <div className='flex justify-between items-center py-5 px-12'>
    <Image src={logo} width={34} height={18} alt="" />
    <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Download App
        </button>
   </div>
  )
}

export default Navbar
