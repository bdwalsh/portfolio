import { useMemo, useState, useRef, useEffect } from 'react';
import { projectHighlightsData } from '@/app/data/highlights';

export interface ProjectHighlightsDisplayProps  {
    projectId: number,
}

const ProjectHighlightsDisplay = ({projectId}: ProjectHighlightsDisplayProps) => {
    const currentProjectHighlights = useMemo(() => {
       return projectHighlightsData.find(
            (highlightItem) => highlightItem.projectId === projectId
       );
    }, [projectId]); 

    if (!currentProjectHighlights?.highlights[0]) {
        return null;
    }

    return (
        <>
            {currentProjectHighlights?.highlights.map((highlight, index) => (
                <div 
                    className="grid grid-cols-6 gap-x-8 mb-20" 
                    key={index}
                >
                    <div className='col-span-6 md:col-span-4 lg:col-span-4 relative'>
                        <video 
                            autoPlay 
                            muted 
                            loop 
                            preload="none"
                        >
                            <source 
                                src={highlight.videoLink} 
                                type="video/mp4" 
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="col-span-6 md:col-span-2 lg:col-span-2">
                        <h2>
                            {highlight.title || 'Title'}
                        </h2>
                        <div>
                            {highlight.description || 'Description'}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ProjectHighlightsDisplay;