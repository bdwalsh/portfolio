import type { NextPage } from "next";
import Head from "next/head";
import AppMenu from "@/app/components/app/AppMenu";
import AppFooter from "@/app/components/app/AppFooter"
import HeroSection from "@/app/components/sections/HeroSection";
import ProjectsSection from "@/app/components/sections/ProjectsSection"
import AboutSection from "@/app/components/sections/AboutSection";
import SkillsSection from "@/app/components/sections/SkillsSection";
import ContactSection from "@/app/components/sections/ContactSection";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Brendan Walsh - Frontend Software Developer</title>
        <meta name="description" content="Brendan Walsh is a frontend software developer with a passion for building pixel perfect websites and web applications." />
        <link rel="icon" href="/images/icons/favicon.png" />
      </Head>

      <main className="scroll-smooth">
        <AppMenu />
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
        <AppFooter />
      </main>
    </div>
  );
};

export default Home;
