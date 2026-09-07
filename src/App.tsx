import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { Work } from "./sections/Work";
import { Process } from "./sections/Process";
import { About } from "./sections/About";
import { Tutoring } from "./sections/Tutoring";
import { Stack } from "./sections/Stack";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-30 focus:rounded-pill focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <Work />
        <Process />
        <About />
        <Tutoring />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
