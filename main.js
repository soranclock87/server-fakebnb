const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs'); // Node.js File System module

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

// Read data from the JSON file
const data = JSON.parse(fs.readFileSync('backend-fakebnb.json'));

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route to get all listings
app.get('/listings', (req, res) => {
    res.json(data.listings);
});

// Route to get a single listing by ID
app.get('/listings/:id', (req, res) => {
    const id = req.params.id;
    const listing = data.listings.find(listing => listing.id === id);
    if (listing) {
        res.json(listing);
    } else {
        res.status(404).json({ error: 'Listing not found' });
    }
});

// Route to create a new listing (example)
app.post('/listings', (req, res) => {
    // Assuming req.body contains the new listing data
    const newListing = req.body;
    // Process the new listing data
    // For now, just pushing it to the existing data array
    data.listings.push(newListing);
    // Writing the updated data back to the JSON file
    fs.writeFileSync('backend-fakebnb.json', JSON.stringify(data, null, 2));
    res.json({ message: 'Listing created successfully', newListing });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
