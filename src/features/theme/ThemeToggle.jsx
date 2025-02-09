import { useTheme } from "./ThemeContext";
import { Button } from "react-bootstrap";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button variant="outline-success" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
        </Button>
    );
};

export default ThemeToggle;
