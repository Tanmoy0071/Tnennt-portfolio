

import React from 'react'
import logo from '../images/Group 52.svg'
import Image from 'next/image'
import { DockDemo } from './magicui/Dockdemo'

function Navbar() {
  return (
   <div className='flex justify-between  py-5 px-12'>
    <Image src={logo} width={34} height={18} alt="" />
    <div className='mt-[-1.25%]'>
    <DockDemo/>
    </div>
   </div>
  )
}

export default Navbar
