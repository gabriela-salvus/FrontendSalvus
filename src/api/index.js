import { getToken } from '../storage/auth';
import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Authorization': `Bearer ${getToken()}`
    }
});

export default api;


