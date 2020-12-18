const express = require('express');
const router = express.Router();

// import routers

router.use("/rides", require("./api/rides"));

module.exports = router;