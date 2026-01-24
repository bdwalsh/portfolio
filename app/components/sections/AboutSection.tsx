import Image from 'next/image';
import AppContentWrapper from '@/app/components/app/AppContentWrapper'; 

const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="bg-brand-primary flex flex-col items-center justify-center px-4 py-6 md:px-8 md:py-14 lg:px-[100px]"
    >
        <AppContentWrapper>
            <h1 className="text-white text-heading-h1 font-heading-h1-600">About Brendan</h1>
            <div className="h-2 w-8 bg-accent mb-12"></div>
            <div className="flex flex-col items-center justify-content-center">
                <div className="w-[250px] h-[250px] overflow-hidden mb-8 rounded-full">
                    <Image src="/images/profile-image.jpg" alt="profile-image" width="250" height="200"/>
                </div>
                <p className="text-center">
                  Brendan Walsh has been working as a software developer since 2016. Before starting his professional career, he attended the British Columbia Institute of Technology, where he received his diploma in Digital Design and Development. While at BCIT, he developed a love for creating user interfaces.<br/><br/> After graduating, he got a job at the automotive marketing company Convertus (later acquired by AutoTrader). This is where he first honed his technical skills, using JavaScript, Vue, and PHP to create comprehensive websites that enabled car dealers to market and sell their vehicles. After serving in a number of roles at Convertus and AutoTrader from Full-Stack Developer to Team Lead Brendan decided he was ready for a new challenge.<br/><br/>
                  In 2021, he joined the Vancouver-based photography SaaS company Pixieset as a dedicated Front-End Developer. While at Pixieset, Brendan has worked on many major features for their photography business management software, including a booking portal and a messaging platform. He also played a significant role in the creation of Pixieset’s first mobile application. During his time at Pixieset, Brendan has shifted his specialization to TypeScript, implementing new patterns and practices to ensure stability and performance.<br/><br/>
                  Brendan hopes to continue refining his skills and contributing to more exciting projects in the future.</p>
            </div>
        </AppContentWrapper>
    </section>
  );
};

export default AboutSection;