const express = require('express');
const { getPremiumController, postPremiumController, getDashboardController } = require('../controllers/premiumController');
const router = express.Router();

const extractToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('token extracted');
    if (typeof token !== "undefined") {
        req.token = token;
        next();
    }
    else {
        res.status(403).send({ message: 'invalid authentication' })
    }
}

router.get('/', getPremiumController)
router.post('/', extractToken, postPremiumController)
router.get('/dashboard', extractToken, getDashboardController)

module.exports = router;