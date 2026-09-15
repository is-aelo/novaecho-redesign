import type { Metadata } from "next";
import Nav from "@/components/nav/Nav";
import ApiDocs from "@/components/api-docs/ApiDocs";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Nova Echo AI | API Docs",
};

export default function ApiDocsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <ApiDocs />
      </main>
      <Footer />
    </>
  );
}
