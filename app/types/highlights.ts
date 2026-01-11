export interface HighlightItem {
    title: string;
    description: string;
    videoLink: string;
    videoWidth: string;
}

export interface ProjectHighlightsDataType {
    id: number;
    projectId: number;
    title: string;
    highlights: HighlightItem[];
}
