import { ProjectDetailsDataType } from "@/app/types/projects" 

const projectDetailsData: ProjectDetailsDataType[] = [
    {
        id: 1,
        title: 'Studio Manager - Pixieset',
        description: 'A business management tool for photographers. Users can create contracts, invoices, questionnaires, and other documents. Additional features include a unified inbox that allows users to manage their email communications in a chat-like interface, as well as a payment management system. This platform was built with Vue 3, JavaScript, and Laravel, and tested with Jest.',
        featureImage: '/images/studio-manager-screenshots.png',
        icons: [
            "/images/icons/vue-js-icon.svg",
            "/images/icons/javascript-icon.svg",
            "/images/icons/jest-js-icon.svg",
            "/images/icons/laravel-icon.svg",
        ],
        altText: "Studio Manager Feature Images"
    },
    {
        id: 2,
        title: 'Studio Manager Mobile App - Pixieset',
        description: 'A mobile application version of the Studio Manager photography business management tool. The project involved creating mobile workflows for contracts, messaging, and project management. In addition, a brand-new Tap to Pay payment system and payment reporting graphs were built specifically for this app. The app was built with Vue 3, TypeScript, Ionic, Vite, and Vitest.',
        featureImage: '/images/studio-manager-mobile-screenshots.png',
        icons: [
            "/images/icons/vue-js-icon.svg",
            "/images/icons/typescript-icon.svg",
            "/images/icons/ionic-icon.svg",
            "/images/icons/vitest-icon.svg",
            "/images/icons/vite-icon.svg",
        ],
         altText: "Studio Manager Mobile Feature Images"
    },
    {
        id: 3,
        title: 'TAdvantage Website Platform - AutoTrader',
        description: 'A website builder platform for car dealerships. This project involved creating WordPress plugins and custom widgets that allow dealerships to customize their websites. Integrated into the platform was a vehicle listing and details page that could be filtered by various parameters. The platform was built using Vue 2, JavaScript, PHP, WordPress, and MySQL.',
        featureImage: '/images/tadvantage-screenshots.png',
        icons: [
            "/images/icons/vue-js-icon.svg",
            "/images/icons/javascript-icon.svg",
            "/images/icons/php-icon.svg",
            "/images/icons/wordpress-icon.svg",
            "/images/icons/mysql-icon.svg"
        ],
         altText: "TAdvantage feature images"
    }
]

export {
    projectDetailsData
}