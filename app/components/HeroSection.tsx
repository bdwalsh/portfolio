import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import AppButton from '@/app/components/app/AppButton';

const HeroSection = () => {
  return (
    <section className="h-screen bg-brand-primary flex flex-col items-center justify-center px-4 py-14 md:px-8 md:py-20 lg:px-[100px]">
        <div id="particles-js" className="absolute z-0 w-full h-full"></div>
        <div className="flex flex-col items-center justify-center w-full z-10">
            <div className="w-full lg:max-w-[75rem]">
                <strong className="text-white block mb-5">Frontend Software Developer</strong>
                <h1 className="text-white text-heading-h1 font-heading-h1-600" data-aos="zoom-in">Brendan Walsh</h1>
                <div className="h-2 w-8 bg-accent mb-5"></div>
                <p 
                  data-aos="fade-up" 
                  data-aos-duration="2000"
                >
                  Frontend developer focused on creating pixel perfect user interfaces and sensible system design
                </p>
                <div                    
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    data-aos-delay="800"  
                >
                  <AppButton href="#work">
                    <p>See What I've Worked On</p>
                  </AppButton>
                </div>
            </div>
            <Link className="animate-wiggle absolute bottom-0 text-accent font-semibold inline-block duration-300 hover:text-accent-hover mt-5 px-10 py-3.5" href={"#work"}>
              <FontAwesomeIcon size="3x" className="h-[60px] w-[60px]" icon={faChevronDown} />
            </Link>
        </div>
    </section>
  );
};

export default HeroSection;