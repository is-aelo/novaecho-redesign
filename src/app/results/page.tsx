import Nav from "@/components/nav/Nav";
import Results from "@/components/results/Results";
import Footer from "@/components/footer/Footer";

export default function ResultsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Results />
      </main>
      <Footer />
    </>
  );
}
