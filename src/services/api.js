// import axios  from "axios";

// const api = axios.create({
//     baseURL: 'http://0.0.0.0:0'
// });

// export default api;

import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

const api = axios.create({
    baseURL: `${apiUrl}:${apiPorta}` // ip e porta do servidor
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// console.log(`${apiUrl}:${apiPorta}`);

export default api;