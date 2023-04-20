import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Loading.css';
interface Props {
    children: React.ReactNode;
}

const LoadingPage: React.FC = () => {
    return (
        <div className="loader-container">
            <div className="typewriter">
                <div className="slide"><i></i></div>
                <div className="paper"></div>
                <div className="keyboard"></div>
            </div>
        </div>
    );
};

const DelayedContent: React.FC<Props> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return isLoading ? <LoadingPage /> : <>{children}</>;
};

export default DelayedContent;
