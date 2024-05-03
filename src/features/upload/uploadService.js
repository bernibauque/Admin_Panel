import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const uploadImg = async (data) => {
    try {
        const response = await axios.post(`${base_url}upload/`, data, config);
        return response.data;
    } catch (error) {
        throw error; // Lanza el error nuevamente para que sea manejado por createAsyncThunk
    }
};

const deleteImg = async (id) => {
    try {
        const response = await axios.delete(`${base_url}upload/delete-img/${id}`, config);
        return response.data;
    } catch (error) {
        throw error; // Lanza el error nuevamente para que sea manejado por createAsyncThunk
    }
};

const uploadService = {
    uploadImg,
    deleteImg
};

export default uploadService;


/* ORIGINAL
const uploadImg = async (data) => {
    const response = await axios.post(`${base_url}upload/`, data, config);
    return response.data;
};
const deleteImg = async (id) => {
    const response = await axios.delete(
        `${base_url}upload/delete-img/${id}`,

        config
    );
    return response.data;
};

const uploadService = {
    uploadImg,
    deleteImg
};

export default uploadService; */