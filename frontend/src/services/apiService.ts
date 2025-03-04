import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const login = async (username: string, password: string): Promise<string | undefined> => {
    try {
        // await apiService.get('/health');
        const response = await apiService.post('/login', { username, password });
        return response.data.token;
    } catch (error) {
        handleError(error, 'Login Failed')
    }
};


export const signup = async (email: string, username: string, password: string) => {
    try {
        await apiService.post('/signup', { email, username, password });
        return;
    } catch (error) {
        handleError(error, 'Signup Failed')
    }
};


// Utility function for error handling
const handleError = (error: unknown, defaultMessage: string): never => {
    if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || defaultMessage;
        throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
};

export default apiService;