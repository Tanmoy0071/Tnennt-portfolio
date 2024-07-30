import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import { useAnimate } from "framer-motion";
import Image from 'next/image'
import FloatingPhone from './Phone'
import { motion } from 'framer-motion'
import logo from '../images/Group 52.svg'
import { RetroGridDemo } from './Retrogrid'


function RotatingCube() {
  const meshRef = useRef()

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2
    meshRef.current.rotation.y += delta * 0.3
  })

  return (
    <Box ref={meshRef} args={[3, 3, 3]} scale={[1, 1, 1]}>
      <meshStandardMaterial color="#ff6b6b" wireframe />
    </Box>
  )
}

function Hero() {
  const underlineRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to('#herotitle', { opacity: 1, delay: 1.5 })
      .from('#herosubtitle', { y: 50, opacity: 0, duration: 1 }, '-=0.5')
      .from(underlineRef.current, { 
        strokeDashoffset: 1000, 
        opacity: 0, 
        duration: 1.5, 
        ease: 'power2.out' 
      }, '-=0.5')
  }, [])

  return (
    <>
    
    <section className=' nav-height relative'>
  

      
      <div className=' flex-center flex-col'>
        <p id='herotitle' className='text-center font-semibold text-2xl text-black 
        opacity-0 max-md:mb-10 mt-5'><span className='text-[#094446]'> Apno </span>ka <span className='text-[#094446]'> online</span> store,<br/><span className='text-[#094446]'>Apno </span> ke liye</p>
        <h2 id='herosubtitle' className='text-center text-[15vw] font-bold opacity-20 relative'>
          Tnennt.
    
        </h2>
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 2, // Delay the phone animation to start after the text animations
          }}
          className="absolute ml-12 top-[7vw] left-[38vw]" // Add some margin to separate it from the text
        >
          <FloatingPhone />
        </motion.div>
      </div>
    </section>
    </>
  )
}

const MouseImageTrail = ({
    children,
    // List of image sources
    images,
    // Will render a new image every X pixels between mouse moves
    renderImageBuffer,
    // images will be rotated at a random number between zero and rotationRange,
    // alternating between a positive and negative rotation
    rotationRange,
  }) => {
    const [scope, animate] = useAnimate();
  
    const lastRenderPosition = useRef({ x: 0, y: 0 });
    const imageRenderCount = useRef(0);
  
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
  
      const distance = calculateDistance(
        clientX,
        clientY,
        lastRenderPosition.current.x,
        lastRenderPosition.current.y
      );
  
      if (distance >= renderImageBuffer) {
        lastRenderPosition.current.x = clientX;
        lastRenderPosition.current.y = clientY;
  
        renderNextImage();
      }
    };
  
    const calculateDistance = (x1, y1, x2, y2) => {
      const deltaX = x2 - x1;
      const deltaY = y2 - y1;
  
      // Using the Pythagorean theorem to calculate the distance
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
      return distance;
    };
  
    const renderNextImage = () => {
      const imageIndex = imageRenderCount.current % images.length;
      const selector = `[data-mouse-move-index="${imageIndex}"]`;
  
      const el = document.querySelector(selector);
  
      el.style.top = `${lastRenderPosition.current.y}px`;
      el.style.left = `${lastRenderPosition.current.x}px`;
      el.style.zIndex = imageRenderCount.current.toString();
  
      const rotation = Math.random() * rotationRange;
  
      animate(
        selector,
        {
          opacity: [0, 1],
          transform: [
            `translate(-50%, -25%) scale(0.5) ${
              imageIndex % 2
                ? `rotate(${rotation}deg)`
                : `rotate(-${rotation}deg)`
            }`,
            `translate(-50%, -50%) scale(1) ${
              imageIndex % 2
                ? `rotate(-${rotation}deg)`
                : `rotate(${rotation}deg)`
            }`,
          ],
        },
        { type: "spring", damping: 15, stiffness: 200 }
      );
  
      animate(
        selector,
        {
          opacity: [1, 0],
        },
        { ease: "linear", duration: 0.5, delay: 5 }
      );
  
      imageRenderCount.current = imageRenderCount.current + 1;
    };
  
    return (
      <div
        ref={scope}
        className="relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {children}
  
        {images.map((img, index) => (
          <img
            className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
            src={img}
            alt={`Mouse move image ${index}`}
            key={index}
            data-mouse-move-index={index}
          />
        ))}
      </div>
    );
  };

export default Hero