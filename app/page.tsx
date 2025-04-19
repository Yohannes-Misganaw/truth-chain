import { FooterLarge } from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VerifiedNews from "@/components/VerifiedNews";
import Archive from "@/components/Archive";
import SubmitClaim from "@/components/SubmitClaim";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <Hero />
      <About />
      <VerifiedNews/>
      <Archive/>
      <SubmitClaim/>
      <FooterLarge />
    </main>
  );
}
