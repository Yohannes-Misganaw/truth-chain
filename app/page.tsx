import { FooterLarge } from "@/components/Footer";
import Hero from "@/components/Hero";

import HowItWorks from "@/components/HowItWorks";
import KeyBenefits from "@/components/KeyBenefits";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <Hero />
      <HowItWorks />
      {/* <KeyBenefits />
      <Testimonials /> */}
      <FooterLarge />
    </main>
  );
}
