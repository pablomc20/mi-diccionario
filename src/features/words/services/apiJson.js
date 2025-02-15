import axios from "axios";

const apiOpenAI = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Usa la URL del entorno
    timeout: 8000, // Tiempo de espera de 5 segundos
    headers: { "Content-Type": "application/json" }
});

// Interceptor para manejar errores globalmente
apiOpenAI.interceptors.response.use(
    // (config) => {
    //     const token = localStorage.getItem("token"); // O donde almacenes el token
    //     if (token) {
    //         config.headers.Authorization = `Bearer ${token}`;
    //     }
    //     return config;
    // },
    response => response,
    error => {
        console.error("Error en la API:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiOpenAI;
