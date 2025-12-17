import type { NextPage } from "next";
import Head from "next/head";
import HeroSection from "@/app/components/HeroSection";
import ProjectsSection from "@/app/components/ProjectsSection"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Brendan Walsh - Frontend Software Developer</title>
        <meta name="description" content="Brendan Walsh is a frontend software developer with a passion for building pixel perfect websites and web applications." />
        <link rel="icon" href="/images/icons/favicon.png" />
      </Head>

      <main className="scroll-smooth">
        <HeroSection />
        <ProjectsSection />
      </main>
    </div>
  );
};

export default Home;
