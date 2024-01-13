import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--background-color', isDarkMode ? '#282D35' : '#D6D6D6');
        root.style.setProperty('--nav-background-color', isDarkMode ? '#21222A' : '#B9B9B9');
        root.style.setProperty('--text-color', isDarkMode ? '#DEEBF8' : '#CCCCCC');
        root.style.setProperty('--main-color', isDarkMode ? 'white' : 'black');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <div>
            <button onClick={toggleTheme}>
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
        </div>
    );
};

export default ThemeSwitcher;