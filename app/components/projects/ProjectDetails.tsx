import Image from 'next/image'


interface ProjectDetailsProps {
    title: string;
    description?: string; 
    id?: number;
    featureImage?: string;
    icons?: string[];
}

const icons = [
    "/images/icons/vue-js-icon.svg",
    "/images/icons/laravel-icon.svg",
    "/images/icons/typescript-icon.svg",
    "/images/icons/jest-js-icon.svg",
]

const ProjectDetails = ({ title, description, id }: ProjectDetailsProps) => {
    return (
        <div className="grid grid-cols-3 gap-x-8">
            <Image
                src="/images/studio-manager-homepage-screen.png"
                alt="Studio Manager Preview Image"
                width={1920}
                height={958}
                className="col-span-1"
            />
            <div className="col-span-2">
                <h2 className="text-heading-h2 mb-2">{title}</h2>
                {description && <p>{description}</p>}
                {id && <p>ID: {id}</p>}
                <ul className="flex mt-2">
                    {icons.map((icon, index) => (
                        // Each child in a list should have a unique "key" prop
                        <li key={index}>
                            <Image
                                src={icon}
                                alt="Studio Manager Preview Image"
                                width={25}
                                height={25}
                                className="mr-4"
                            />
                        </li> 
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProjectDetails;