// lógica para realizar la solicitud de inicio de sesión al servidor utilizando Axios. 
import axios from "axios";
import { base_url } from "../../utils/base_url";

const login = async (user) => {
    const response = await axios.post(`${base_url}user/admin-login`, user);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const getOrders = async () => {
    const response = await axios.get(`${base_url}user/get-orders`);
    return response.data;
};

const authService = {
    login,
    getOrders
};
export default authService;