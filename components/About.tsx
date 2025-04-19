"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Starfield from "./ui/Starfield";
import React, { useEffect } from "react";
import '../app/globals.css';

export default function About() {
    //Section about className = about-images relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black text-white
  return (
    <section id="About" className="about-section">
          <h2 className = "about-title-text">ABOUT TRUTHCHAIN</h2>
          <div className = "about-all-content">
            <br></br>
            <p className="about-main-text">
            TruthChain is a platform dedicated to promoting transparency and trust. 
            Our mission is to provide users with verified information and tools to 
            make informed decisions.
            <br></br>
            <br></br>
            We believe that everyone should have access to reliable information, 
            and our platform is built with that as a core principle.
            </p>
      
        <div className="about-images-globe">
        <Image 
          src="/gemini_bigplanet_tech_purp_NOBG.png"
          alt="Big Globe"
          width={900}
          height={900}
          className="about-images"
          quality={100}
          priority
        />
        </div>
      </div>
            
      <Starfield
              starCount={2000}
              starColor={[255, 255, 255]}
              speedFactor={0.01}
              backgroundColor="black"
            />
    </section>
    
  );
}


