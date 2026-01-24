import { projectDetailsData } from "@/app/data/projects"
import ProjectDetails from "@/app/components/projects/ProjectDetails"
import AppButton from '@/app/components/app/AppButton';
import AppContentWrapper from '@/app/components/app/AppContentWrapper'; 

const ProjectsSection = () => {
    return (
        <section 
            id="projects" 
            className="bg-brand-primary flex flex-col items-center justify-center px-4 py-6 md:px-8 md:py-14 lg:px-[100px]"
        >
            <AppContentWrapper>
                <h1 className="text-white text-heading-h1 font-heading-h1-600">Projects I've Worked On</h1>
                <div className="h-2 w-8 bg-accent mb-12"></div>

                {projectDetailsData.map((project) => (
                    <div key={project.id} data-aos-delay="0" data-aos="fade-right">
                        <ProjectDetails
                            {...project}
                        />
                    </div>
                ))}
                <div className="flex flex-col justify-center items-center mt-0 sm:mt-12">
                    <p>Curious about this site? This portolio site was build with <strong>React</strong>, <strong>Next.js</strong> and <strong>Tailwind</strong>. View the project on github here:</p>
                    <AppButton 
                        className="mt-8"
                        target="_blank"
                        rel="noreferrer noopener"
                        href="https://github.com/bdwalsh/portfolio"                   
                    >
                    <span>View my portfolio site on github</span>
                    </AppButton>
                </div>
            </AppContentWrapper>
        </section>
    );
}

export default ProjectsSection;