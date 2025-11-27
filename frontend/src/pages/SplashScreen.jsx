import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');

        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div id="container">
            <div className="tab-buttons">
                <button className="tab-btn" content-id="1">
                    testee
                </button>
            </div>
        </div>
    );
}

export default SplashScreen;