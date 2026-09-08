import Nav from "@/components/nav/Nav";
import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import Agents from "@/components/agents/Agents";
import Benchmark from "@/components/benchmark/Benchmark";
import Pricing from "@/components/pricing/Pricing";
import Demo from "@/components/demo/Demo";
import Footer from "@/components/footer/Footer";
import Partners from "@/components/partners/Partners";
import Stories from "@/components/stories/Stories";
import RoiWrapper from "@/components/roi/RoiWrapper";

export default function Home() {
  return (
    <RoiWrapper>
      <Nav />
      <Hero />
      <Features />
      <Agents />
      <Benchmark />
      <Pricing />
      <Partners />
      <Stories />
      <Demo />
      <Footer />
      <main className="flex-1" />
    </RoiWrapper>
  );
}
