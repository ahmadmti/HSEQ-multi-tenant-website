const express = require('express');

const router = express.Router();


router.get('/get-company', (req, res) => {
    res.send('vfcd');
})



module.exports = router;