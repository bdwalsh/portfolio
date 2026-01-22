import React, { PropsWithChildren } from 'react';

const AppContentWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="w-full lg:max-w-[75rem]"> 
            {children}
        </div>
    );
}

export default AppContentWrapper;