// let queryDb = (connection, query) => {
//     return new Promise((resolve, reject) => {//aceita ou rejeita. 
//         connection.query(query, (error, result) => {//callback(executada aqui dentro)
//             if (error) reject(error);
//             else resolve(result);
//         })
//     });
// }
module.exports = (connection) => {
    return {
        getAllHitchhikes: () => {//o atributo(propriedade) é uma função
            let query = `select h.id_hitchhikes,
            h.departure_time, 
            h.arrival_time,
            h.departure_location,
            h.arrival_location,
            h.hitch_initial_text,
            h.num_seats,
            u.user_name
            from hitchhikes h
            inner join users u on u.id_users = h.id_user_driver;`;
            // return queryDb(connection, query);
            return connection.query(query);
        },
        insertHitchhike: (departureTime, arrivalTime, departureLocation, arrivalLocation,
            hitchhikeInitialText, numSeats, idUserDriver) => {
            let query = `INSERT INTO hitchhikes(departure_time,arrival_time,departure_location,arrival_location
                    hitch_initial_text, num_seats, id_user_driver)
                    VALUES (?,?,?,?,?,?,?)
                    
                    SELECT LAST_INSERT_ID();`;

            return connection.execute(query, [
                departureTime,
                arrivalTime,
                departureLocation,
                arrivalLocation,
                hitchhikeInitialText,
                numSeats,
                idUserDriver
            ]);
        },
        getHitchhikeByID: (id) => {
            let query = `SELECT * FROM hitchhikes WHERE id_hitchhikes = ?`;
            return connection.execute(query, [id]);
        },
        updateHitchhikeByID: (id, departureTime, arrivalTime, departureLocation, arrivalLocation,
            hitchhikeInitialText, numSeats, idUserDriver) => {
            let query = `UPDATE hitchhikes
                    SET departure_time = ?, arrival_time = ?, departure_location = ?
                        arrival_location = ?, hitch_initial_text = ?, num_seats = ?, id_user_driver = ?
                    WHERE id_hitchhikes = ?
                    
                    SELECT * FROM hitchhikes WHERE id_hitchhikes = ?`;

            return connection.execute(query, [
                departureTime,
                arrivalTime,
                departureLocation,
                arrivalLocation,
                hitchhikeInitialText,
                numSeats,
                idUserDriver,
                id,
                id
            ]);
        },
        deleteHitchHikeByID: (id) => {
            let query = `DELETE FROM hitchhikes WHERE id_hitchhikes = ?`;
            return connection.execute(query, [id]);
        }
    };
}