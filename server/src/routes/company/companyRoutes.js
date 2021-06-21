const express = require('express');

const router = express.Router();


router.get('/get-item', (req, res) => {
    res.send('vfcd');
})



module.exports = router;