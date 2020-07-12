const express = require('express');
const router = express.Router();

const shortenerService = require('../config/shortenerServiceConfig');

router.post('/shorten', (req, res) => {
    console.info('Request received: POST /shorten');
    console.info(JSON.stringify(req.body));
    shortenerService.generate(req.body.url, (err, result, code) => {
        if (err) {
            console.error(JSON.stringify(err));
            return res.status(500).json({ 'error': 'Internal Server Error' });
        }
        return res.status(201).json({ code });
    });
});

router.get('/:code', (req, res) => {
    console.info('Request received: GET /:code');
    console.info(JSON.stringify(req.params));
    shortenerService.get(req.params.code, (err, value) => {
        if (err) {
            console.error(JSON.stringify(err));
            return res.status(500).json({ 'error': 'Internal Server Error' });
        }
        if (!value) {
            return res.sendStatus(404);
        }
        return res.status(200).json({ url: value });
    });
});

module.exports = router;