import { ProjectDetailsDataType } from "@/app/types/projects" 

const projectDetailsData: ProjectDetailsDataType[] = [
    {
        id: 1,
        title: 'Studio Manager - Pixieset',
        description: 'A business management tool for photographers. Users can create contracts, invoices, questionniaires and other documents. Other features inclused a unified inbox that lets users manage their email communications in a chat like interface as well as a payment management system. This platform was built with Vue 3, Typescript, Laravel and tested with jest.',
        featureImage: '/images/studio-manager-homepage-screen.png',
        icons: [
            "/images/icons/vue-js-icon.svg",
            "/images/icons/typescript-icon.svg",
            "/images/icons/jest-js-icon.svg",
            "/images/icons/laravel-icon.svg",
        ]
    },
    {
        id: 2,
        title: 'Studio Manager Mobile App - Pixieset',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur',
        featureImage: '/images/studio-manager-mobile-homepage-screen.png',
        icons: [
            "/images/icons/vue-js-icon.svg",
            "/images/icons/typescript-icon.svg",
            "/images/icons/ionic-icon.svg",
            "/images/icons/vitest-icon.svg",
            "/images/icons/vite-icon.svg",
        ]
    }
]

export {
    projectDetailsData
}