import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const getBlogs = async () => {
    const response = await axios.get(`${base_url}blog/`);
    return response.data;
};

const createBlog = async (blog) => {
    const response = await axios.post(`${base_url}blog/`, blog, config);
    return response.data;
};

const updateBlog = async (brand) => {
    const response = await axios.put(
        `${base_url}blog/${blog.id}`,
        { title: brand.brandData.title },
        config
    );
    return response.data;
};

const getBlog = async (id) => {
    const response = await axios.get(`${base_url}blog/${id}`, config);
    return response.data;
};

const deleteBlog = async (id) => {
    const response = await axios.delete(`${base_url}blog/${id}`, config);
    return response.data;
};

const blogService = {
    getBlogs,
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog,
};
export default blogService;