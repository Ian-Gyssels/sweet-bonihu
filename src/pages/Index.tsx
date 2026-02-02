import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import RoomsPreview from "@/components/RoomsPreview";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { useLanguageSync } from "@/hooks/useLanguageSync";

const Index = () => {
  useLanguageSync();
  
  return (
    <div className="min-h-screen bg-background font-sans">
      <SEOHead 
        titleKey="meta.home.title"
        descriptionKey="meta.home.description"
        pageKey="home"
      />
      <StructuredData type="home" />
      <Header />
      <main>
        <Hero />
        <About />
        <RoomsPreview />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
