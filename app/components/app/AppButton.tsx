import Link from 'next/link';
import React, { PropsWithChildren, MouseEvent } from 'react';

export interface AppButtonProps {
    href: string;
    target?: string;
    rel?: string;
    className?: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const AppButton: React.FC<PropsWithChildren<AppButtonProps>> = ({ href, target, rel, className, onClick, children }) => {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <Link 
            className={`bg-accent text-black text-link font-semibold inline-block duration-300 hover:bg-accent-hover px-10 py-3.5 ${className || ''}`}
            href={href} 
            target={target}
            rel={rel}
            onClick={handleClick}
        > 
            {children}
        </Link>
    );
}

export default AppButton;