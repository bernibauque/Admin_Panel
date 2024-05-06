import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const getBlogCategories = async () => {
    const response = await axios.get(`${base_url}blogcategory/`);
    return response.data;
};

const createBlogCategory = async (bcat) => {
    const response = await axios.post(`${base_url}blogcategory/`, bcat, config);
    return response.data;
};

const bcategoryService = {
    getBlogCategories,
    createBlogCategory
};
export default bcategoryService;