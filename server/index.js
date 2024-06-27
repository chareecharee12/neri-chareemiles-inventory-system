import express from 'express';
import cors from 'cors';
import { checkConnection } from './db._config.js';

const app = express();
const PORT = 3000;

const connection = checkConnection();

app.use(express.json());
app.use(cors({credentials: true, origin: ["http://localhost:5173"] }));





app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username=? AND password=? LIMIT 1';

    connection.query(query, [username, password], (error, results, fields)=>{
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length > 0) {
            res.json(true)
        } else {
            res.json(false);
        }
    });
});



app.get('/products/get-all', async (req, res) => {


    const query = 'SELECT * FROM products';

    connection.query(query, (error, results, fields)=>{
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json(results);

    });
});


app.post('/products/add-product', (req, res) => {
    const { product_id, product_name, quantity, unit, price } = req.body;
    const query = 'INSERT INTO products (product_id, product_name, quantity, unit, price) VALUES (?, ?, ?, ?, ?)';

    connection.query(query, [product_id, product_name, quantity, unit, price], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            res.status(500).send('Error adding product');
            return;
        }
        res.status(200).send('Product added successfully');
    });
});





app.delete('/products/delete-product/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE product_id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            res.status(500).send('Error deleting product');
            return;
        }
        res.status(200).send('Product deleted successfully');
    });
});

app.put('/products/update-product/:id', (req, res) => {
    const { id } = req.params;
    const { product_name, quantity, unit, price } = req.body;
    const query = 'UPDATE products SET product_name = ?, quantity = ?, unit = ?, price = ? WHERE product_id = ?';

    console.log('Updating product:', { id, product_name, quantity, unit, price });

    connection.query(query, [product_name, quantity, unit, price, id], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            res.status(500).send('Error updating product');
            return;
        }
        console.log('Update result:', result);
        res.status(200).send('Product updated successfully');
    });
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
