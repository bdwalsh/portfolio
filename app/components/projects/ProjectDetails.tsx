"use client";

import Image from 'next/image';
import { useState } from 'react';
import { ProjectDetailsDataType } from "@/app/types/projects";
import AppButton from '@/app/components/app/AppButton'; 
import AppModal from '@/app/components/app/AppModal';
import ProjectHighlightsDisplay from '@/app/components/highlights/ProjectHighlightsDisplay'

const ProjectDetails = ({ id, title, description, featureImage, icons, altText }: ProjectDetailsDataType) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="grid grid-cols-6 gap-x-8 mb-20">
            <div className='col-span-6 md:col-span-3 lg:col-span-3 relative'>
                <Image
                    src={featureImage}
                    alt={altText}
                    width={750}
                    height={329}
                    className="col-span-1"
                />
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                <h2 className="text-heading-h2 mb-2">{title}</h2>
                {description && <p>{description}</p>}
                <ul className="flex mt-4">
                    {icons?.map((icon, index) => (
                        <li 
                            key={index} 
                            className="flex"
                        >
                            <Image
                                src={icon}
                                alt={altText}
                                width={25}
                                height={25}
                                className="mr-4"
                            />
                        </li> 
                    ))}
                </ul>
                <AppButton 
                    className="mt-8"
                    href="#work"                   
                    onClick={handleOpenModal}
                >
                  <p>Video Highlights</p>
                </AppButton>
            </div>
            <AppModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
            >
                <ProjectHighlightsDisplay projectId={id}/>
            </AppModal>
        </div>
    );
}

export default ProjectDetails;