const express= require("express");
const router = express.Router();

// @route   GET api/rides
// @desc    Get All Rides
// @access  Public
router.get("/", function (req, res) {//comunicação com a bd
    console.log("BOOOOOSTAAAAAAAAAAA");
    res.send("BOSSSSTAAAA");
});

module.exports = router;