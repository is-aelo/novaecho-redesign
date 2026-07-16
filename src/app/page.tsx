import Nav from "@/components/nav/Nav";
import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import Trusted from "@/components/trusted/Trusted";
import Agents from "@/components/agents/Agents";
import Benchmark from "@/components/benchmark/Benchmark";
import Pricing from "@/components/pricing/Pricing";
import Demo from "@/components/demo/Demo";
import Footer from "@/components/footer/Footer";
import Partners from "@/components/partners/Partners";
import Stories from "@/components/stories/Stories";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Trusted />
      <Features />
      <Agents />
      <Benchmark />
      <Pricing />
      <Partners />
      <Stories />
      <Demo />
      <Footer />
      <main className="flex-1" />
    </>
  );
}
