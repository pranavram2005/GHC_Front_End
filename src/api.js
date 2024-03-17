import axios from 'axios';
const api = axios.create({
    baseURL: 'https://ghc-applications-api.vercel.app/',
});

export default api;