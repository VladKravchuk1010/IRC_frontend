import { Api } from './Api';
import axios, { type AxiosInstance } from 'axios'


export const axiosInstance: AxiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const sessionKey = localStorage.getItem('session_key');
        
        if (sessionKey) {
            config.headers['X-Session-Key'] = sessionKey;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const api = new Api({
    baseURL: '/api',
    
}, axiosInstance);
