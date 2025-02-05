import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button className="btn btn-outline-primary" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
        </button>
    );
};

export default ThemeToggle;
