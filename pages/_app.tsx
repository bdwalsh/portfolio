import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { clearHashOnLoad, setupScrollHash } from "@/app/helpers/scrollHash";

// Tell Font Awesome to skip adding the CSS automatically since it's already imported above
config.autoAddCss = false;

declare global {
  interface Window {
    particlesJS: {
      (tag_id: string, params: any): void;
      load: (tag_id: string, path_config_json: string, callback?: () => void) => void;
    };
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize AOS (Animate On Scroll)
      AOS.init();

      // Clear hash on page load/reload
      clearHashOnLoad();

      const cleanupScrollHash = setupScrollHash({ offset: 80 });

      // @ts-ignore - particles.js doesn't have type definitions
      import("particles.js").then(() => {
        if (window.particlesJS) {
          window.particlesJS.load('particles-js', '/particles.json', function() {
            console.log('callback - particles.js config loaded');
          });
        }
      });

      return () => {
        cleanupScrollHash();
      };
    }
  }, []);

  return <Component {...pageProps} />;
}
