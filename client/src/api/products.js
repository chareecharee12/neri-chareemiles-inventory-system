import Axios from "../config/axios";
import { HOST } from "../config/variables";

export const getProducts = async () => {
    try {
        const response = await Axios.get(`${HOST}/products/get-all`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const addProducts = async (product) => {
    try {
        const response = await Axios.post(`${HOST}/products/add-product`, product);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateProducts = async (product, id) => {
    try {
        const response = await Axios.put(`${HOST}/products/update-product/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}


export const deleteProducts = async (productId) => {
    try {
        const response = await Axios.delete(`${HOST}/products/delete-product/${productId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
