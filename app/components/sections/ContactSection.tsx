import Image from 'next/image';
import AppContentWrapper from '@/app/components/app/AppContentWrapper';
import ContactForm from '@/app/components/forms/ContactForm';

const ContactSection = () => {
  return (
    <section 
      id="contact" 
      className="bg-transparent flex flex-col items-center justify-center px-4 pt-6 pb-30 md:px-8 md:pt-14 lg:px-[100px]"
    >
        <AppContentWrapper>
            <div className="flex flex-col items-center">
              <h1 className="text-heading-h2 font-heading-h2-600 mb-2">Get in Touch!</h1>
              <p className="text-center mb-6">
                Have a question or want to work together? Send me a message!
              </p>
              
              <ContactForm />
              
              <div className="mt-12 pt-8 border-t border-gray-600 w-full max-w-lg">
                <p className="text-center text-gray-400 mb-4">Or reach out directly:</p>
                <p className="text-center">
                  <a className="text-heading-h3 hover:text-accent" href="mailto:bdwalsh075@gmail.com">
                    bdwalsh075@gmail.com
                  </a>
                </p>
                <div className="flex justify-center mt-4 xl:text-heading-h3">                            
                  <Image
                      src="/images/icons/linkedin-icon.svg"
                      alt="LinkedIn logo"
                      width={25}
                      height={25}
                      className="mr-4"
                  />
                  <a 
                    className="hover:text-accent" 
                    href="https://linkedin.com/in/brendanwalsh3" 
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    www.linkedin.com/in/brendanwalsh3
                  </a>
                </div>
                <div className="flex justify-center mt-2 xl:text-heading-h3">                            
                  <Image
                      src="/images/icons/github-white-icon.svg"
                      alt="GitHub logo"
                      width={25}
                      height={25}
                      className="mr-4"
                  />
                  <a 
                    className="hover:text-accent" 
                    href="https://github.com/bdwalsh" 
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    https://github.com/bdwalsh
                  </a>
                </div>
              </div>
            </div>
        </AppContentWrapper>
    </section>
  );
};

export default ContactSection;