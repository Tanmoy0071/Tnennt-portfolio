"use client"

import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Highlights from '@/components/Highlights'
import Bentogrid from '@/components/Bentogrid'
import Theproblem from '@/components/Theproblem'
import { StickyScrollRevealDemo } from '@/components/magicui/Stickyscrollmain'
import { BentoGridDemo } from '@/components/Realbento'
import { AnimatedBeamMultipleOutputDemo } from '@/components/Animatedbeam'
import { LayoutGridDemo } from '@/components/Layoutgridmain'
import { ContainerScroll } from '@/components/magicui/container-scroll'
import { HeroScrollDemo } from '@/components/Comingsoon'

function page() {
  return (
    <>
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 h-[30vw] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
        <Hero />
      </div>
      <Highlights />
      <Bentogrid />
    <StickyScrollRevealDemo/>
   <BentoGridDemo/>
   <div className='flex justify-between px-12 items-center mt-12'>
   <AnimatedBeamMultipleOutputDemo/>
   <LayoutGridDemo/>
   </div>
   <HeroScrollDemo/>
    </>
  )
}

export default page