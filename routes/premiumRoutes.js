const express = require('express');
const { getPremiumController, postPremiumController, getDashboardController } = require('../controllers/premiumController');
const { extractToken } = require('../middleware/extractToken');
const router = express.Router();

router.get('/',extractToken, getPremiumController)
router.post('/', extractToken, postPremiumController)
router.get('/dashboard', extractToken, getDashboardController)

module.exports = router;