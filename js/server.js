// server.js
require('dotenv').config();  // Lädt die Umgebungsvariablen aus .env oder GitHub Secrets
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

// Deinen API-Key aus den Umgebungsvariablen abrufen
const apiKey = process.env.API_KEY_OPENEXCHANGERATES;

// Die Website-Dateien aus dem 'public'-Ordner bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// API-Route: Das Frontend fragt hier die Währungsumrechnung an
app.get('/convert', async (req, res) => {
    const { from, to } = req.query;  // Währungen aus den Query-Parametern erhalten

    // Open Exchange Rates API-URL vorbereiten
    const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&base=${from}`;

    try {
        // Anfrage an die Open Exchange Rates API
        let response = await fetch(url);
        let data = await response.json();

        // Sicherstellen, dass die Zielwährung existiert
        if (data.rates && data.rates[to]) {
            const conversionRate = data.rates[to];
            res.json({ conversion_rate: conversionRate });
        } else {
            res.status(400).json({ error: 'Ungültige Währung oder Währungsumrechnung nicht verfügbar' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Fehler bei der API-Anfrage' });
    }
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
