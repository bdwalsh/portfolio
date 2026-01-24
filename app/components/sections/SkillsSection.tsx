import { skillsData } from '@/app/data/skills';
import AppContentWrapper from '@/app/components/app/AppContentWrapper'; 

const SkillsSection = () => {
  return (
    <section 
      id="skills" 
      className="bg-brand-primary flex flex-col items-center justify-center px-4 py-6 md:px-8 md:py-14 lg:px-[100px]"
    >
        <AppContentWrapper>
            <h1 className="text-white text-heading-h1 font-heading-h1-600">Skills</h1>
            <div className="h-2 w-8 bg-accent mb-12"></div>
            <div className="relative flex flex-col flex-wrap justify-center w-full lg:h-auto xl:h-[1000px]">
                {skillsData.map((skill) => (
                    <div 
                        key={skill.id}
                        className={`skill-bubble ${skill.animation || ''} ${skill.width || ''} ${skill.height || ''}`}                  
                        style={{ top: skill.top, left: skill.left }}
                        data-aos="fade-up" 
                        data-aos-duration="1000"
                    >
                        <h3 className="text-heading-h3 xl:text-heading-h2 font-heading-h1-600">{skill.name}</h3>
                    </div>
                ))}
            </div>
        </AppContentWrapper>
    </section>
  );
};

export default SkillsSection;