const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.json({ message: 'Disconnect with succes' });
});

module.exports = router;