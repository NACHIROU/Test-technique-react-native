import React,{ createContext, useContext, useState, useEffect} from "react"; 
import { useColorScheme} from "react-native";
import { Themes } from "./colors";


// 1. Définition des types
type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    theme: typeof Themes.dark;
    mode: ThemeMode;
    toggleTheme: () => void;
}

// 2. Création du contexte
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Le Provider
export const ThemeProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [mode, setMode] = useState<ThemeMode>(systemColorScheme || 'dark');
    
    useEffect(() => {
        if (systemColorScheme) {
            setMode(systemColorScheme);
        }
    }, [systemColorScheme]);

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = Themes[mode];

    return (
        <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme doit etre utiliser dans un ThemeProvider");
    }
    return context;
};
