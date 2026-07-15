import Nav from "@/components/nav/Nav";
import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <main className="flex-1" />
    </>
  );
}
