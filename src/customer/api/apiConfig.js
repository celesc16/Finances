import axios from "axios";

// URL base de la API
export const API_BASE_URL = "http://localhost:8080/api";
// Función para obtener el token de autenticación
const getAuthToken = () => {
  return localStorage.getItem("token"); // Obtén el token desde el localStorage
};

// Configuración común para las solicitudes
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a las cabeceras
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agrega el token a las cabeceras
  }
  return config;
});

export default axiosInstance; // Exporta la instancia configurada de axios