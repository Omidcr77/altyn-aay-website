// server/routes/leads.routes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { Parser } = require('json2csv');
const Lead = require('../models/lead.model');
const router = express.Router();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});

// Simple i18n for validation messages
const messages = {
  en: { required: 'is required', invalidZip: 'A valid zip code is required' },
  dr: { required: 'لازم است', invalidZip: 'کد پستی معتبر لازم است' }
};

router.post('/check', apiLimiter, 
  [ body('address').not().isEmpty(), body('zipCode').not().isEmpty() ], 
  async (req, res) => {
    const lang = req.headers['accept-language'] === 'dr' ? 'dr' : 'en'; // Detect language
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const field = errors.array()[0].param;
        return res.status(400).json({ message: `${field} ${messages[lang].required}` });
    }
    try {
        await Lead.create({ address: req.body.address, zipCode: req.body.zipCode });
        res.status(201).json({ message: 'Lead captured.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
  }
);

router.get('/export', async (req, res) => {
    if (req.query.apiKey !== process.env.ADMIN_API_KEY) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const leads = await Lead.find({}, '-_id -__v').lean();
        const csv = new Parser().parse(leads);
        res.header('Content-Type', 'text/csv');
        res.attachment(`leads-${Date.now()}.csv`);
        res.send(csv);
    } catch (error) {
        res.status(500).send('Error exporting data.');
    }
});

module.exports = router;