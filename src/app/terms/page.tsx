import Nav from "@/components/nav/Nav";
import Terms from "@/components/terms/Terms";
import Footer from "@/components/footer/Footer";

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Terms />
      </main>
      <Footer />
    </>
  );
}
