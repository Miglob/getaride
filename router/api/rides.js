const express = require("express");
const router = express.Router();
let database = require("../../database");//importar bd



router.post('/createPassengers', async (req, res) => {
    try {
        let { id_user, id_hitchhike } = req.body; // Vai obter os dados do body
        let [pass] = await database.createPassenger(id_user, id_hitchhike);

        let [result] = await database.getAllHitchhikes();

        result = result.map(e => {
            if (e.passengers) {
                let passengers = e.passengers.split('|').map(p => {
                    let arr = p.split(',');
                    let id = arr[0];
                    let name = arr[1];
                    let state = arr[2];
                    let id_user = arr[3];

                    return {
                        id_passengers: id,
                        user_name: name,
                        state,
                        id_user
                    };
                });
                e.passengers = passengers;
            }

            if (e.messages) {
                let messages = e.messages.split('|').map(p => {
                    let arr = p.split(',');
                    let id_messages = arr[0];
                    let name = arr[1];
                    let mns_date = arr[2];
                    let mns_text = arr[3];

                    return {
                        mns_date,
                        mns_text,
                        user_name: name,
                        id_messages
                    };
                });
                e.messages = messages;
            }
            return e;
        })/*.filter(e => {
            let current = new Date();
            let date = new Date(e.departure_time);
            return (Math.ceil((current - date)/10e2) < 0); 
        }); */

        return res.json(result);
    } catch (e) {
        return res.status(500).send(e.toString());
    }
});

router.post('/createMessage', async (req, res) => {
    try {
        let { mns_text, id_user, id_hitchhike, myRide } = req.body; // Vai obter os dados do body

        let [pass] = await database.createMessage(mns_text, id_user, id_hitchhike);
       
        let coisa = await database.getRidesByUser(id_user);
        let coisa2 = await database.getAllHitchhikes();
        let [result] = myRide ? coisa : coisa2;
       

        result = result.map(e => {
            if (e.passengers) {
                let passengers = e.passengers.split('|').map(p => {
                    let arr = p.split(',');
                    let id = arr[0];
                    let name = arr[1];
                    let state = arr[2];
                    let id_user = arr[3];

                    return {
                        id_passengers: id,
                        user_name: name,
                        state,
                        id_user
                    };
                });
                e.passengers = passengers;
            }

            if (e.messages) {
                let messages = e.messages.split('|').map(p => {
                    let arr = p.split(',');
                    let id_messages = arr[0];
                    let name = arr[1];
                    let mns_date = arr[2];
                    let mns_text = arr[3];

                    return {
                        mns_date,
                        mns_text,
                        user_name: name,
                        id_messages
                    };
                });
                e.messages = messages;
            }
            return e;
        })/*.filter(e => {
            let current = new Date();
            let date = new Date(e.departure_time);
            return (Math.ceil((current - date)/10e2) < 0); 
        }); */

        return res.json(result);
    } catch (e) {
        return res.status(500).send(e.toString());
    }
});


router.post('/alterPassengerState', async (req, res) => {
    try {
        let { id_user, id_passengers, state } = req.body; // Vai obter os dados do body

        let [pass] = await database.alterPassengerState(id_passengers, state);
       
        let [result] = await database.getRidesByUser(id_user);
        
        result = result.map(e => {
            if (e.passengers) {
                let passengers = e.passengers.split('|').map(p => {
                    let arr = p.split(',');
                    let id = arr[0];
                    let name = arr[1];
                    let state = arr[2];
                    let id_user = arr[3];

                    return {
                        id_passengers: id,
                        user_name: name,
                        state,
                        id_user
                    };
                });
                e.passengers = passengers;
            }

            if (e.messages) {
                let messages = e.messages.split('|').map(p => {
                    let arr = p.split(',');
                    let id_messages = arr[0];
                    let name = arr[1];
                    let mns_date = arr[2];
                    let mns_text = arr[3];

                    return {
                        mns_date,
                        mns_text,
                        user_name: name,
                        id_messages
                    };
                });
                e.messages = messages;
            }
            return e;
        })/*.filter(e => {
            let current = new Date();
            let date = new Date(e.departure_time);
            return (Math.ceil((current - date)/10e2) < 0); 
        }); */

        return res.json(result);
    } catch (e) {
        return res.status(500).send(e.toString());
    }
});


// @route   GET api/myRides
// @desc    Get   rides by id user
// @access  Public
router.get('/myRides/:id', async (req, res) => {
    try {
        let id_users = req.params.id;
        let [result] = await database.getRidesByUser(id_users);

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

            if (e.messages) {
                let messages = e.messages.split('|').map(p => {
                    let arr = p.split(',');
                    let id_messages = arr[0];
                    let name = arr[1];
                    let mns_date = arr[2];
                    let mns_text = arr[3];

                    return {
                        mns_date,
                        mns_text,
                        user_name: name,
                        id_messages
                    };
                });
                e.messages = messages;
            }
            return e;
        })
        // }).filter(e => {
        //     let current = new Date();
        //     let date = new Date(e.departure_time);
        //     return (Math.ceil((current - date) / 10e2) < 0);
        // });
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

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

            if (e.messages) {
                let messages = e.messages.split('|').map(p => {
                    let arr = p.split(',');
                    let id_messages = arr[0];
                    let name = arr[1];
                    let mns_date = arr[2];
                    let mns_text = arr[3];

                    return {
                        mns_date,
                        mns_text,
                        user_name: name,
                        id_messages
                    };
                });
                e.messages = messages;
            }
            return e;
        })/*.filter(e => {
            let current = new Date();
            let date = new Date(e.departure_time);
            return (Math.ceil((current - date)/10e2) < 0);  
        });*/
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
})


// @route   GET api/rides
// @desc    Get All Rides
// @access  Public
router.get("/", async (req, res) => {//comunicação com a bd, para await o async
    try {
        let [result] = await database.getAllHitchhikes();

        result = result.map(e => {
            if (e.passengers) {
                let passengers = e.passengers.split('|').map(p => {
                    let arr = p.split(',');
                    let id = arr[0];
                    let name = arr[1];
                    let state = arr[2];
                    let id_user = arr[3];

                    return {
                        id_passengers: id,
                        user_name: name,
                        state,
                        id_user
                    };
                });
                e.passengers = passengers;
            }

            if (e.messages) {
                let messages = e.messages.split('|').map(p => {
                    let arr = p.split(',');
                    let id_messages = arr[0];
                    let name = arr[1];
                    let mns_date = arr[2];
                    let mns_text = arr[3];

                    return {
                        mns_date,
                        mns_text,
                        user_name: name,
                        id_messages
                    };
                });
                e.messages = messages;
            }
            return e;
        })/*.filter(e => {
            let current = new Date();
            let date = new Date(e.departure_time);
            return (Math.ceil((current - date)/10e2) < 0); 
        }); */
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
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
router.delete('/', async (req, res) => {
    try {

        let { id_users, id_hitchhikes } = req.body; // Vai obter os dados do body
        let [m] = await database.deleteMessagesByHitchhicke(id_hitchhikes);
        let [p] = await database.deletePassengersByHitchhicke(id_hitchhikes);
        let [h] = await database.deleteHitchHikeByID(id_hitchhikes);
        let [result] = await database.getRidesByUser(id_users);

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

            if (e.messages) {
                let messages = e.messages.split('|').map(p => {
                    let arr = p.split(',');
                    let id_messages = arr[0];
                    let name = arr[1];
                    let mns_date = arr[2];
                    let mns_text = arr[3];

                    return {
                        mns_date,
                        mns_text,
                        user_name: name,
                        id_messages
                    };
                });
                e.messages = messages;
            }
            return e;
        })/*.filter(e => {
            let current = new Date();
            let date = new Date(e.departure_time);
            return (Math.ceil((current - date)/10e2) < 0); 
        }); */

        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});





//fazer hitchhikes por condutor ou passageiro
module.exports = router;