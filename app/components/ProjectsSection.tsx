import ProjectDetails from "@/app/components/projects/ProjectDetails"

const ProjectsSection = () => {
    return (
        <section id="work" className="bg-brand-primary flex flex-col items-center justify-center px-4 py-6 md:px-8 md:py-10 lg:px-[100px]">
            <div className="w-full lg:max-w-[75rem]">
                <h1 className="text-white text-heading-h1 font-heading-h1-600">Projects I've Worked On</h1>
                <div className="h-2 w-8 bg-accent mb-12"></div>

                <ProjectDetails title="Studio Manager - Pixieset" description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur"/>
            </div>
        </section>
    );
}

export default ProjectsSection;