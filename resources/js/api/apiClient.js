import axios from 'axios';

const apiClient = (path, params = {}) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${path}`;
    return axios.get(url, {
        params: {
            api_key: apiKey,
            ...params,
        }
    });
};

export default apiClient;
