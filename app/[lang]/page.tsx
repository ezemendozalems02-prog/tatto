import Hero from "@/components/hero/Hero";
import Marquee from "@/components/sections/Marquee";
import Manifesto from "@/components/sections/Manifesto";
import About from "@/components/sections/About";
import Specialties from "@/components/sections/Specialties";
import Portfolio from "@/components/gallery/Portfolio";
import Worldwide from "@/components/events/Worldwide";
import Events from "@/components/events/Events";
import Testimonials from "@/components/sections/Testimonials";
import Safety from "@/components/sections/Safety";
import Booking from "@/components/booking/Booking";
import Press from "@/components/sections/Press";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <About />
      <Specialties />
      <Portfolio />
      <Worldwide />
      <Events />
      <Testimonials />
      <Safety />
      <Booking />
      <Press />
      <Contact />
    </>
  );
}
