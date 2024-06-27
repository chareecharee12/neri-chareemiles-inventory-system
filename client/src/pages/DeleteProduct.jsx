import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const DeleteProduct = () => {
    const { id } = useParams();
    const [product_id, setProductId] = useState('');

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/products/delete-product/${product_id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                alert('Product deleted successfully');
                setProductId('');
            } else {
                alert('Error deleting product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h2>Delete Product</h2>
            <label>Product ID</label>
            <input type="text" value={product_id} onChange={(e) => setProductId(e.target.value)} />
            <button onClick={handleDelete}>Delete Product</button>
        </div>
    );
};

export default DeleteProduct;
