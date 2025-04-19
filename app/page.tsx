import { FooterLarge } from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import KeyBenefits from "@/components/KeyBenefits";
import HomeStats from "@/components/HomeStats";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <Hero />
      <HowItWorks />
      <KeyBenefits />
      <HomeStats />
      <FooterLarge />
    </main>
  );
}
