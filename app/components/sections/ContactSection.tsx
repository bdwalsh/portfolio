import Image from 'next/image';

const ContactSection = () => {
  return (
    <section 
      id="contact" 
      className="bg-brand-primary flex flex-col items-center justify-center px-4 pt-6 pb-30 md:px-8 md:pt-14 lg:px-[100px]"
    >
        <div className="w-full lg:max-w-[75rem]">
            <div className="flex flex-col items-center">
              <h1 className="text-heading-h2 font-heading-h2-600 mb-2">Get in Touch!</h1>
              <p>
                <a className="text-heading-h3 hover:text-accent" href="mailto:bdwalsh075@gmail.com">
                  bdwalsh075@gmail.com
                </a>
              </p>
              <div className="flex text-heading-h3">                            
                <Image
                    src="/images/icons/linkedin-icon.svg"
                    alt="LinkedIn logo"
                    width={25}
                    height={25}
                    className="mr-4"
                />
                <a 
                  className="hover:text-accent" 
                  href="www.linkedin.com/in/brendanwalsh3" 
                  target="_blank"
                >
                  www.linkedin.com/in/brendanwalsh3
                </a>
              </div>
              <div className="flex text-heading-h3">                            
                <Image
                    src="/images/icons/github-white-icon.svg"
                    alt="LinkedIn logo"
                    width={25}
                    height={25}
                    className="mr-4"
                />
                <a 
                  className="hover:text-accent" 
                  href="https://github.com/bdwalsh" 
                  target="_blank"
                >
                  https://github.com/bdwalsh
                </a>
              </div>
            </div>
        </div>
    </section>
  );
};

export default ContactSection;