## How we can achieve pagination in node.js? Can you write the logic how to do this in node.js ?

----

### Implementing Pagination in Node.js

```js
// server.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pagination_example', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a schema and model
const itemSchema = new mongoose.Schema({
    name: String,
    value: Number
});

const Item = mongoose.model('Item', itemSchema);

// Middleware to parse JSON
app.use(express.json());

// Pagination endpoint
app.get('/items', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const items = await Item.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Item.countDocuments();

        res.json({
            items,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Endpoint to insert sample data
app.post('/items', async (req, res) => {
    const { name, value } = req.body;

    try {
        const newItem = new Item({ name, value });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

```js
// Testing

// Insert Sample Data: 
POST http://localhost:3000/items.

// Fetch Paginated Data: 
GET http://localhost:3000/items?page=2&limit=5.
```