import { useMemo } from 'react';
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
                    className={`flex flex-col lg:flex-row ${index !== currentProjectHighlights.highlights.length - 1 ? 'mb-14' : ''}`} 
                    key={highlight.id}
                >
                    <div className='relative md:mr-8 flex-shrink-0'>
                        <video 
                            autoPlay 
                            muted 
                            loop 
                            preload="none"
                            width={highlight.videoWidth}
                        >
                            <source 
                                src={highlight.videoLink} 
                                type="video/mp4" 
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="flex-1 min-w-0 mt-8 md:mt-8 lg:mt-0">
                        <h2 className="text-xl font-semibold">
                            {highlight.title || 'Title'}
                        </h2>
                        <div className="h-1 w-8 bg-accent my-3"></div>
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