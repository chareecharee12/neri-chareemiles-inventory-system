import { getProducts, deleteProducts, updateProducts } from "../api/products";
import { useEffect, useState } from "react";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        product_id: "",
        product_name: "",
        quantity: "",
        unit: "",
        price: ""
    });

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const response = await getProducts();
        setProducts(response);
    }

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    }

    const handleDelete = async (productId) => {
        try {
            await deleteProducts(productId);
            alert('Product deleted successfully');
            getAllProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product');
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({
            ...currentProduct,
            [name]: value
        });
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProducts(currentProduct, currentProduct.product_id);
            alert('Product updated successfully');
            setIsEditing(false);
            getAllProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product');
        }
    }

    return (
        <div className="bg-gray-950">
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/IMG_0744.JPEG')" }}>
            <div className="text-3xl mb-6 text-black bg-cyan-300">Sample Inventory</div>
            <div className="m-2">
                <button className="p-2 rounded bg-blue-900 text-white hover:bg-white-500"><a href ="http://localhost:5173/add-product">Add Product</a></button>
            </div>
            <div className="w-full flex justify-center">
                <table className="table-auto border-collapse border-4 border-yellow-900 w-3/4 bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-yellow-700">
                            <th className="border border-yellow-900 px-4 py-2">Product ID</th>
                            <th className="border border-yellow-900 px-4 py-2">Product Name</th>
                            <th className="border border-yellow-900 px-4 py-2">Quantity</th>
                            <th className="border border-yellow-900 px-4 py-2">Unit</th>
                            <th className="border border-yellow-900 px-4 py-2">Price</th>
                            <th className="border border-yellow-900 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className="hover:bg-gray-100 border-5">
                                <td className="border border-yellow-600 bg-yellow-950 text-slate-50 px-4 py-2">{product.product_id}</td>
                                <td className="border border-yellow-600 bg-yellow-950 text-slate-50 px-4 py-2">{product.product_name}</td>
                                <td className="border border-yellow-600 bg-yellow-950 text-slate-50 px-4 py-2">{product.quantity}</td>
                                <td className="border border-yellow-600 bg-yellow-950 text-slate-50 px-4 py-2">{product.unit}</td>
                                <td className="border border-yellow-600 bg-yellow-950 text-slate-50 px-4 py-2">{product.price}</td>
                                <td className="border border-yellow-600 bg-yellow-700 text-slate-50px-4 py-2  ">
                                    
                                    <button onClick={() => handleEdit(product)} className="bg-teal-500 text-white px-2 py-1 rounded">Edit</button>
                                    <button onClick={() => handleDelete(product.product_id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isEditing && (
                <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-content bg-teal-500 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4">Edit Product</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Product Name:</label>
                                <input
                                    type="text"
                                    name="product_name"
                                    value={currentProduct.product_name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Quantity:</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={currentProduct.quantity}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Unit:</label>
                                <input
                                    type="text"
                                    name="unit"
                                    value={currentProduct.unit}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Price:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={currentProduct.price}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}

export default Inventory;
