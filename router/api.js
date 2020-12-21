const express = require('express');
const router = express.Router();

// import routers
router.use("/rides", require("./api/rides"));
router.use("/passengers", require("./api/passengers"));
router.use("/auth", require("./api/auth"));

module.exports = router;