"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Starfield from "./ui/Starfield";
import '../app/globals.css';

export default function Archive() {
  return (
    <section id="About" className="">
        <div>
            <h2 className = "about-title-text">ARCHIVE</h2>
            <br></br>
            <p className="about-main-text">
            TruthChain is a platform dedicated to promoting transparency and trust. 
            Our mission is to provide users with verified information and tools to 
            make informed decisions.
            </p>
        </div>
    </section>
    
  );
}


