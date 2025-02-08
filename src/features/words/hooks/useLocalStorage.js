import { useState } from "react";

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting localStorage', error);
        }
    };

    const removeValue = () => {
        try {
          window.localStorage.removeItem(key);
          setStoredValue(initialValue); // Si deseas restablecer el estado a su valor inicial
        } catch (error) {
          console.error('Error removing from localStorage', error);
        }
      };

    return [storedValue, setValue, removeValue];
}

export default useLocalStorage;