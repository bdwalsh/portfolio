import { ProjectDetailsDataType } from "@/app/types/projects" 

const projectDetailsData: ProjectDetailsDataType[] = [
    {
        id: 1,
        title: 'Studio Manager - Pixieset',
        description: 'A business management tool for photographers. Users can create contracts, invoices, questionniaires and other documents. Other features inclused a unified inbox that lets users manage their email communications in a chat like interface as well as a payment management system. This platform was built with Vue 3, Javascript, Laravel and tested with jest.',
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
        description: 'A mobile application version of the studio manager photography business management tool. The project involved creating mobile flows for contracts, messaging and project management. As well as this, a brand new Tap to Pay payment system and payment reporting graphs were built specifically for this app. This app was built with Vue 3, Typescript, Ionic, Vite and Vitest.',
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
        description: 'A website builder platform for car dealership. This project involved creating wordpress plugins and custom widgets the allow dealership to customize thier websites. Integrated into this platform was a vehicle listing and details page that could be filtered by different parameters. This platform was build using Vue 2, Javascript, PHP, Wordpress and MySQL.',
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