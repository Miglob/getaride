const express = require("express");
const router = express.Router();
let database = require("../../database");//importar bd

// @route   GET api/rides
// @desc    Get All Rides
// @access  Public
router.get("/", async (req, res) => {//comunicação com a bd, para await o async
    try {//todos os hitch em formato json

        let [result] = await database.getAllHitchhikes();
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        let { departure_time, arrival_time, departure_location,
            arrival_location, hitch_initial_text, num_seats, id_user_driver } = req.body; // Vai obter os dados do body

        let resultID = await database.insertHitchhike(departure_time, arrival_time, departure_location,
            arrival_location, hitch_initial_text, num_seats, id_user_driver)[0];

        let newHitchHike = {
            id: resultID,
            departure_time,
            arrival_time,
            departure_location,
            arrival_location,
            hitch_initial_text,
            num_seats,
            id_user_driver
        };

        res.json(newHitchHike);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/:id', async (req, res) => {
    try {
        let id = req.params; // Vai obter o :id do url

        let result = await database.getHitchhikeByID(id);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.put('/:id', async (req, res) => {
    try {
        let id = req.params; // obter id do url
        let { departure_time, arrival_time, departure_location,
            arrival_location, hitch_initial_text, num_seats, id_user_driver } = req.body; // Vai obter os dados do body

        let result = await database.updateHitchhikeByID(id, departure_time, arrival_time, departure_location,
            arrival_location, hitch_initial_text, num_seats, id_user_driver);

        res.json(resul);

    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params;

        let result = await database.deleteHitchHikeByID(id);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

module.exports = router;