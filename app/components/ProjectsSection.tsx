import ProjectDetails from "@/app/components/projects/ProjectDetails"
import { projectDetailsData } from "@/app/components/projects/project-data/projects"

const ProjectsSection = () => {
    return (
        <section id="work" className="bg-brand-primary flex flex-col items-center justify-center px-4 py-6 md:px-8 md:py-10 lg:px-[100px]">
            <div className="w-full lg:max-w-[75rem]">
                <h1 className="text-white text-heading-h1 font-heading-h1-600">Projects I've Worked On</h1>
                <div className="h-2 w-8 bg-accent mb-12"></div>

                {projectDetailsData.map((project, index) => (
                    <ProjectDetails 
                        key={index} 
                        title={project.title} 
                        description={project.description}
                        id={project.id}
                        featureImage={project.featureImage}
                        icons={project.icons}
                    />
                ))}
            </div>
        </section>
    );
}

export default ProjectsSection;