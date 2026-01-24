import { ProjectHighlightsDataType } from "@/app/types/highlights" 

const projectHighlightsData: ProjectHighlightsDataType[] = [
    {
        id: 1,
        projectId: 1,
        title: 'Studio Manager Highlights',
        highlights:  [
            {
                title: 'Unified Inbox',
                description: 'The unified inbox feature is a messenger-like chat interface that allows users to send and receive emails. It was built using JavaScript and Vue, leveraging an internal REST API to retrieve data. WebSockets were also implemented to update message status in real time.',
                videoLink: '/videos/sm-inbox-video.mp4',
                videoWidth: '700',
            },
            {
                title: 'Booking Portal',
                description: 'A booking portal layout page that allows photographers to sell their offerings on a store-like page. The main focus for this page was styling it to meet specific design specifications created by the designers using Tailwind. Data is persisted throughout the flow and submitted at the end, triggering an email to be sent to both the user and the photographer.',
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
                description: 'Built using Chart.js and Typescript, this component displays aggregate revenue data tracked by the payment system. Data is retrieved from the backend and formatted for use in the chart. Care was taken to ensure the data remains reactive as the user adjusts the filters.',
                videoLink: '/videos/smm-revenue-chart-video.mp4',
                videoWidth: '300',
            },
            {
                title: 'Calendar',
                description: 'Built using Ionic, this component displays the user’s booked sessions, events, and blocked-off time. Detailed styling and interactions were added to clearly convey the purpose of each event on the calendar.',
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
                description: 'A search results page for finding vehicles at a specific dealership based on desired parameters. Built using Vue and PHP, data was retrieved through API calls as the user updated the filters. Care was taken to ensure a good user experience when displaying loading states.',
                videoLink: '/videos/tadvantage-srp-video.mp4',
                videoWidth: '700',
            },
            {
                title: 'Homepage Widgets',
                description: 'Custom functionality built into WordPress that allowed developers to create customizable widgets for dealership websites. Widgets ranged from hero videos to featured vehicle carousels.',
                videoLink: '/videos/tadvantage-homepage-video.mp4',
                videoWidth: '700',
            }
        ]
    }
]

export {
    projectHighlightsData
}