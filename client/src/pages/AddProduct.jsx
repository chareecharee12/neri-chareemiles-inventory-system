import React, { useState } from "react";

const AddProduct = () => {
    const [product_id, setProductId] = useState('');
    const [product_name, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState('');

    const handleAdd = async () => {
        try {
            const response = await fetch('http://localhost:3000/products/add-product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product_id, product_name, quantity, unit, price })
            });
            if (response.ok) {
                alert('Product added successfully');
                clearFields();
            } else {
                alert('Error adding product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const clearFields = () => {
        setProductId('');
        setProductName('');
        setQuantity('');
        setUnit('');
        setPrice('');
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-950">
            <div className="p-5 border border-yellow-800 rounded bg-white">
                <div className="p-2 flex flex-col gap-4">
                    <div className="text-3xl text-center text-slate-950 bg-cyan-800 hover:bg-white-500">Add Product</div>
                    <div className="grid grid-cols-2 gap-3">
                        <label className="text-md">Product ID</label>
                        <input type="text" value={product_id} onChange={(e) => setProductId(e.target.value)} className="rounded border border-gray-500" />

                        <label className="text-md">Product Name</label>
                        <input type="text" value={product_name} onChange={(e) => setProductName(e.target.value)} className="rounded border border-gray-500" />

                        <label className="text-md">Quantity</label>
                        <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="rounded border border-gray-500" />

                        <label className="text-md">Unit</label>
                        <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded border border-gray-500" />

                        <label className="text-md">Price</label>
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="rounded border border-gray-500" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button onClick={handleAdd} className="border border-blue-500 rounded bg-blue-500 text-white p-3 hover:bg-blue-700"><a href ="http://localhost:5173/Inventory">Add Product</a></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
