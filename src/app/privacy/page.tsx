import type { Metadata } from "next";
import Nav from "@/components/nav/Nav";
import Privacy from "@/components/privacy/Privacy";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Nova Echo AI | Privacy",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Privacy />
      </main>
      <Footer />
    </>
  );
}
