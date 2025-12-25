import React, { createContext, useContext, useState } from 'react';

interface OverlayContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    isSuccess: boolean;
    setIsSuccess: (success: boolean) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const OverlayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <OverlayContext.Provider value={{ isLoading, setIsLoading, isSuccess, setIsSuccess }}>
            {children}
        </OverlayContext.Provider>
    );
};

export const useOverlay = () => {
    const context = useContext(OverlayContext);
    if (!context) {
        throw new Error('useOverlay must be used within an OverlayProvider');
    }
    return context;
};
