import { projectDetailsData } from "@/app/data/projects"
import ProjectDetails from "@/app/components/projects/ProjectDetails"
import AppButton from '@/app/components/app/AppButton'; 

const ProjectsSection = () => {
    return (
        <section 
            id="work" 
            className="bg-brand-primary flex flex-col items-center justify-center px-4 py-6 md:px-8 md:py-10 lg:px-[100px]"
        >
            <div className="w-full lg:max-w-[75rem]">
                <h1 className="text-white text-heading-h1 font-heading-h1-600">Projects I've Worked On</h1>
                <div className="h-2 w-8 bg-accent mb-12"></div>

                {projectDetailsData.map((project, index) => (
                    <ProjectDetails 
                        key={index} 
                        {...project}
                    />
                ))}
            </div>
            <div className="flex flex-col justify-center items-center mt-12">
                <p>This portolio site was build with <strong>React</strong>, <strong>Next.js</strong> and <strong>Tailwind</strong>. View the project on github here:</p>
                <AppButton 
                    className="mt-8"
                    target="blank"
                    href="https://github.com/bdwalsh/portfolio"                   
                >
                  <p>View my portfolio site on github</p>
                </AppButton>
            </div>
        </section>
    );
}

export default ProjectsSection;