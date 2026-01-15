import Image from 'next/image';
import { skillsData } from '@/app/data/skills';

const SkillsSection = () => {

  return (
    <section 
      id="skills" 
      className="bg-brand-primary flex flex-col items-center justify-center px-4 py-6 md:px-8 md:py-12 lg:px-[100px]"
    >
        <div className="w-full lg:max-w-[75rem]">
            <h1 className="text-white text-heading-h1 font-heading-h1-600">Skills</h1>
            <div className="h-2 w-8 bg-accent mb-12"></div>
            <div className="relative flex flex-wrap justify-center w-full lg:h-auto xl:h-[1000px]">
                {skillsData.map((skill, index) => (
                    <div 
                        key={index}
                        className={`lg:initial xl:absolute flex items-center justify-center bg-accent overflow-hidden mb-8 rounded-full text-black shadow-accent ${skill.animation || ''} w-[200px] ${skill.width || ''} h-[200px] ${skill.height || ''}`}                  
                        style={{ top: skill.top, left: skill.left }}
                        data-aos="fade-up" 
                        data-aos-duration="2000"
                    >
                        <h3 className="text-heading-h2 font-heading-h1-600">{skill.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default SkillsSection;