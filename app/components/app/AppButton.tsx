import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

export interface AppButtonProps {
    href: string;
    className?: string;
}

const AppButton: React.FC<PropsWithChildren<AppButtonProps>> = ({ href, className, children }) => {
    return (
        <Link 
            className={`bg-accent text-black text-link font-semibold inline-block duration-300 hover:bg-accent-hover px-10 py-3.5 ${className || ''}`}
            href={href} 
        > 
            {children}
        </Link>
    );
}

export default AppButton;