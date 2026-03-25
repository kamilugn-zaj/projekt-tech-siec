const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const app = express();

app.set('trust proxy', 1);

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { error: 'Nie spamuj! Poczekaj minutę.' }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/', apiLimiter);

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
