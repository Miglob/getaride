const express = require("express");
const router = express.Router();
let database = require("../../database");//importar bd

// @route   GET api/rides
// @desc    Get All Rides
// @access  Public
router.get("/", async (req, res) => {//comunicação com a bd, para await o async
    try{//todos os hitch em formato json
        
        let  result = await database.getAllHitchhikes();
        res.json(result); 
    }
    catch(error){
        res.status(500).send(error);
    }
});

module.exports = router;