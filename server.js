const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/cats', async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Blad serwera' });
    }
});

app.listen(3000, () => {
    console.log('Serwer dziala na http://localhost:3000');
});