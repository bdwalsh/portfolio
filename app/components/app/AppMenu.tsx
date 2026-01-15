import Link from 'next/link';
import Image from 'next/image';
import AppButton from '@/app/components/app/AppButton';

const HeroSection = () => {
  return (
    <div className="flex justify-center bg-brand-primary fixed w-full top-0 z-100 py-6">
        <div className="flex justify-center w-full lg:max-w-[75rem]">
            <nav>
                <a className="px-4 py-2 hover:text-accent" href="#home">Home</a>
                <a className="px-4 py-2 hover:text-accent" href="#projects">Projects</a>
                <a className="px-4 py-2 hover:text-accent" href="#skills">Skills</a>
                <a className="px-4 py-2 hover:text-accent" href="#about">About</a>
                <a className="px-4 py-2 hover:text-accent" href="#contact">Contact</a>
            </nav>
        </div>
    </div>
  );
};

export default HeroSection;