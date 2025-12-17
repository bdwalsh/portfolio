import Image from 'next/image';
import Link from 'next/link';
import { ProjectDetailsDataType } from "@/app/types/projects" 

const ProjectDetails = ({ id, title, description, featureImage, icons }: ProjectDetailsDataType) => {
    return (
        <div className="grid grid-cols-3 gap-x-8 mb-20">
            <div className={`relative ${id && id % 2 === 0 ? 'order-2' : ''}`}>
                <Image
                    src={featureImage}
                    alt="Studio Manager Preview Image"
                    fill={true}
                    className="col-span-1"
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <div className="col-span-2">
                <h2 className="text-heading-h2 mb-2">{title}</h2>
                {description && <p>{description}</p>}
                <ul className="flex mt-2">
                    {icons?.map((icon, index) => (
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

                <Link href="">
                    Video Highlights
                </Link>
            </div>
        </div>
    );
}

export default ProjectDetails;