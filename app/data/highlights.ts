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
                videoWidth: '700',
            },
            {
                title: 'Booking Portal',
                description: 'An inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox component',
                videoLink: '/videos/sm-booking-video.mp4',
                videoWidth: '700',
            },
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
                videoLink: '/videos/smm-revenue-chart-video.mp4',
                videoWidth: '300',
            },
            {
                title: 'Calendar',
                description: 'An inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox component',
                videoLink: '/videos/smm-calendar-video.mp4',
                videoWidth: '300',
            }
        ]
    },
    {
        id: 3,
        projectId: 3,
        title: 'TAdvantage Website Platform Highlights',
        highlights:  [
            {
                title: 'Vehicle Search Results Page',
                description: 'An inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox component',
                videoLink: '/videos/tadvantage-srp-video.mp4',
                videoWidth: '700',
            },
            {
                title: 'Homepage Widgets',
                description: 'An inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox componentAn inbox component',
                videoLink: '/videos/tadvantage-homepage-video.mp4',
                videoWidth: '700',
            }
        ]
    }
]

export {
    projectHighlightsData
}