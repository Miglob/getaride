const express = require("express");
const router = express.Router();
let database = require("../../database");//importar bd


router.get("/", async (req, res) => {
    try {
        let [result] = await database.getAllPassengers();
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:idHitchhike", async (req, res) => {
    try {
        let {idHitchhike} = req.params;

        let [result] = await database.getPassengersByHitchhikeId(idHitchhike);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router;