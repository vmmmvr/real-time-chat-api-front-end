import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { redirect, usePathname } from 'next/navigation';

interface AppContextType {
    leftDrawerStatus: boolean;
    toggleLeftDrawer: () => void;
    rightDrawerStatus: boolean;
    toggleRightDrawer: () => void;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [leftDrawerStatus, setLeftDrawerStatus] = useState<boolean>(false);
    const [rightDrawerStatus, setRightDrawerStatus] = useState<boolean>(false);

    const toggleLeftDrawer = useCallback(
        () => setLeftDrawerStatus(prevState => !prevState), // Use prevState to ensure you are working with the latest value
        [], // Dependencies
    );

    const toggleRightDrawer = useCallback(
        () => setRightDrawerStatus(prevState => !prevState), // Same for right drawer
        [], // Dependencies
    );



    return (
        <AppContext.Provider value={{
            leftDrawerStatus,
            toggleLeftDrawer,
            rightDrawerStatus,
            toggleRightDrawer
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


