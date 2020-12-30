const express = require("express");
const router = express.Router();
let database = require("../../database");//importar bd



// @route   GET api/rides/recentRides
// @desc    Get  Recent rides
// @access  Public
router.get('/recentRides', async (req, res) => {
    try {
        let [result] = await database.getRecentCreatedRides();

        result = result.map(e => {
            if (e.passengers) {
                let passengers = e.passengers.split('|').map(p => {
                    let arr = p.split(',');
                    let id = arr[0];
                    let name = arr[1];
                    let state = arr[2];

                    return {
                        id_passengers: id,
                        user_name: name,
                        state
                    };
                });
                e.passengers = passengers;
            }
            return e;
        });
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
})


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

// @route   POST api/rides
// @desc    Add a Ride
// @access  Public
router.post('/', async (req, res) => {
    try {
        let { departure_time, arrival_time, departure_location,
            arrival_location, hitch_initial_text, num_seats, id_user_driver } = req.body; // Vai obter os dados do body

        let [rows, fields] = await database.insertHitchhike(departure_time, arrival_time, departure_location,
            arrival_location, hitch_initial_text, num_seats, id_user_driver);

        let id = rows.insertId;
        // let newHitchHike = {
        //     id: resultID,
        //     departure_time,
        //     arrival_time,
        //     departure_location,
        //     arrival_location,
        //     hitch_initial_text,
        //     num_seats,
        //     id_user_driver
        // };

        return res.json({ id });
    } catch (e) {
        return res.status(500).send(e.toString());
    }
});
// @route   GET api/rides/:id
// @desc    Get a Ride by id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params; // Vai obter o :id do url

        let [result] = await database.getHitchhikeByID(id);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
// @route   PUT api/rides/:id
// @desc    Update a Ride
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        let { id } = req.params; // obter id do url
        let { departure_time, arrival_time, departure_location,
            arrival_location, hitch_initial_text, num_seats, id_user_driver } = req.body; // Vai obter os dados do body

        let [result] = await database.updateHitchhikeByID(id, departure_time, arrival_time, departure_location,
            arrival_location, hitch_initial_text, num_seats, id_user_driver);

        res.json(result);

    } catch (e) {
        res.status(500).send(e.toString());
    }
});
// @route   DELETE api/rides/:id
// @desc    Delete a Ride
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;

        let [result] = await database.deleteHitchHikeByID(id);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

//fazer hitchhikes por condutor ou passageiro
module.exports = router;