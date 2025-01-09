import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const baseURL = import.meta.env.VITE_BASEURL;
    
const apiClient = axios.create({
    baseURL: `${baseURL}`
  });

export const get = (path) => {
    const url = `${path}?api_key=${apiKey}`;
    return apiClient.get(url);
};