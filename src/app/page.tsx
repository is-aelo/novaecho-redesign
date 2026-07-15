import Nav from "@/components/nav/Nav";
import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import Trusted from "@/components/trusted/Trusted";
import Agents from "@/components/agents/Agents";
import Benchmark from "@/components/benchmark/Benchmark";
import Pricing from "@/components/pricing/Pricing";
import Partners from "@/components/partners/Partners";
import Stories from "@/components/stories/Stories";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <Trusted />
      <Agents />
      <Benchmark />
      <Pricing />
      <Partners />
      <Stories />
      <main className="flex-1" />
    </>
  );
}
