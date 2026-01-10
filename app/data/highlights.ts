import { ProjectHighlightsDataType } from "@/app/types/highlights" 

const projectHighlightsData: ProjectHighlightsDataType[] = [
    {
        id: 1,
        projectId: 1,
        title: 'Studio Manager Highlights',
        highlights:  [
            {
                title: 'Unified Inbox',
                description: 'An inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox component',
                videoLink: '/videos/sm-inbox-video.mp4',
            },
            {
                title: 'Booking Portal',
                description: 'An inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox component',
                videoLink: '/videos/sm-booking-video.mp4',
            }
        ]
    },
    {
        id: 2,
        projectId: 2,
        title: 'Studio Manager Mobile Highlights',
        highlights:  [
            {
                title: 'Payment Graph',
                description: 'An inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox component',
                videoLink: '/videos/sm-inbox-video.mp4',
            }
        ]
    }
]

export {
    projectHighlightsData
}