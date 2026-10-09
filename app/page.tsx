import { About } from "@/components/About";
import { Advantages } from "@/components/Advantages";
import { Booking } from "@/components/Booking";
import { Contacts } from "@/components/Contacts";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { MobileBar } from "@/components/MobileBar";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { getContacts } from "@/lib/clinic";

export default function Home() {
  const { phone } = getContacts();

  return (
    <>
      <Header phone={phone} />
      <main id="main">
        <Hero />
        <Advantages />
        <Services />
        <About />
        <Booking />
        <Reviews />
        <Gallery />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
      <MobileBar />
      <JsonLd />
    </>
  );
}
