import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from '../config/axios';
import { HOST } from '../config/variables';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    product_name: '',
    quantity: '',
    unit: '',
    price: '',
  });

  useEffect(() => {
    // Fetch the current product details
    const fetchProduct = async () => {
      try {
        const response = await Axios.get(`${HOST}/products/${id}`);
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          alert('Error fetching product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    console.log('Product data to update:', product);
    try {
      const response = await Axios.put(`${HOST}/products/update-product/${id}`, product);
      if (response.status === 200) {
        alert('Product updated successfully');
        navigate('/inventory'); // Redirect to inventory page
      } else {
        alert('Error updating product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form>
        <label>Product Name</label>
        <input type="text" name="product_name" value={product.product_name} onChange={handleChange} />

        <label>Quantity</label>
        <input type="text" name="quantity" value={product.quantity} onChange={handleChange} />

        <label>Unit</label>
        <input type="text" name="unit" value={product.unit} onChange={handleChange} />

        <label>Price</label>
        <input type="text" name="price" value={product.price} onChange={handleChange} />

        <button type="button" onClick={handleUpdate}>Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
