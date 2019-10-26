const express = require('express');
const router = express.Router();
const Home=require('../action/home/home');

// --------Home------------------------------------------------
router.get('/v2/home/getactions',Home.GetActions);
router.post('/v2/home/deleteaction',Home.DeleteAction);
// --------Home------------------------------------------------

module.exports = router;