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
            u.user_name,
            u.id_users,
            GROUP_CONCAT(distinct pa.id_passengers, ',', pa.user_name, ',', pa.state, ',', pa.id_user
                        SEPARATOR '|') 'passengers',
            GROUP_CONCAT(distinct m.id_messages, ',', m.user_name, ',', m.mns_date, ',', m.mns_text
                        order by m.mns_date asc
                        SEPARATOR '|') 'messages'
            from hitchhikes h
            inner join users u on u.id_users = h.id_user_driver
            left join (SELECT p.id_passengers, u.user_name, p.state, p.id_hitchhike, p.id_user
                        FROM passengers p
                       INNER JOIN users u ON u.id_users = p.id_user) pa on pa.id_hitchhike = h.id_hitchhikes
            left join (SELECT m.id_hitchhike, u.user_name, m.mns_date, m.mns_text, m.id_messages
                       FROM messages m                      
                      INNER JOIN users u on m.id_user = u.id_users) m on m.id_hitchhike = h.id_hitchhikes 
            GROUP BY h.id_hitchhikes;`;
            // return queryDb(connection, query);
            return connection.query(query);
        },
        insertHitchhike: (departureTime, arrivalTime, departureLocation, arrivalLocation,
            hitchhikeInitialText, numSeats, idUserDriver) => {
            let query = `
            INSERT INTO hitchhikes(departure_time,arrival_time,departure_location,arrival_location,
                hitch_initial_text, num_seats, id_user_driver)
                VALUES (?,?,?,?,?,?,?); `;

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
        },
        deleteMessagesByHitchhicke: (id_hitchhickes) => {
            let query = `DELETE FROM messages
            WHERE id_hitchhike = ?;`;
            return connection.execute(query, [id_hitchhickes]);
        },
        deletePassengersByHitchhicke: (id_hitchhickes) => {
            let query = `DELETE FROM passengers
            WHERE id_hitchhike = ?;`;
            return connection.execute(query, [id_hitchhickes]);
        },
        getAllPassengers: () => {
            let query = `SELECT * FROM passengers`;
            return connection.query(query);
        },
        getPassengersByHitchhikeId: (idHitchhike) => {
            let query = `SELECT * FROM passengers WHERE id_hitchhike = ?`;
            return connection.execute(query, [idHitchhike]);
        },
        getHitchhikesByUserId: (idUser) => {
            let query = `SELECT h.id_hitchhikes,
            h.departure_time,
            h.arrival_time,
            h.departure_location,
            h.arrival_location,
            h.hitch_initial_text,
            h.num_seats,
            h.id_user_driver,
            u.user_name 'driver',
            p.id_passengers,
            p.user_name 'passenger',
            p.state
     FROM hitchhikes h
     INNER JOIN (SELECT * FROM passengers p
                INNER JOIN users u ON u.id_users = p.id_user) p ON p.id_hitchhike = h.id_hitchhikes
     INNER JOIN users u ON h.id_user_driver = u.id_users
     WHERE h.id_user_driver = ? OR p.id_user = ?`;
            return connection.execute(query, [idUser, idUser]);
        },
        checkIfUserExists: (email) => {
            //let query = `select count (*) as total from users where email = ?;`
            let query = `select id_users, user_name, user_password, email from users where email = ?;`
            return connection.execute(query, [email]);
        },
        createUser: (user_name, user_password, email) => {
            let query = `INSERT INTO users (user_name, user_password, email) VALUES (?,?,?);`;

            return connection.execute(query, [user_name, user_password, email]);
        },
        findUserById: (id_users) => {
            let query = `SELECT user_name FROM users WHERE id_users = ?`

            return connection.execute(query, [id_users]);
        },
        getRecentCreatedRides: () => {
            let query = `select h.id_hitchhikes,
            h.departure_time, 
            h.arrival_time,
            h.departure_location,
            h.arrival_location,
            h.hitch_initial_text,
            h.num_seats,
            u.user_name,
            u.id_users,
            GROUP_CONCAT(distinct pa.id_passengers, ',', pa.user_name, ',', pa.state
                        SEPARATOR '|') 'passengers',
            GROUP_CONCAT(distinct m.id_messages, ',', m.user_name, ',', m.mns_date, ',', m.mns_text
                order by m.mns_date asc
                SEPARATOR '|') 'messages'
            from hitchhikes h
            inner join users u on u.id_users = h.id_user_driver
            left join (SELECT p.id_passengers, u.user_name, p.state, p.id_hitchhike
                        FROM passengers p
                       INNER JOIN users u ON u.id_users = p.id_user) pa on pa.id_hitchhike = h.id_hitchhikes
            left join (SELECT m.id_hitchhike, u.user_name, m.mns_date, m.mns_text, m.id_messages
                       FROM messages m
                      INNER JOIN users u on m.id_user = u.id_users) m on m.id_hitchhike = h.id_hitchhikes
            GROUP BY h.id_hitchhikes
            order by h.id_hitchhikes desc 
            limit 10;`;

            return connection.query(query);
        },
        getRidesByUser: (id_users) => {
            let query = `select h.id_hitchhikes,
            h.departure_time, 
            h.arrival_time,
            h.departure_location,
            h.arrival_location,
            h.hitch_initial_text,
            h.num_seats,
            u.user_name,
            u.id_users,
            GROUP_CONCAT(DISTINCT pa.id_passengers, ',', pa.user_name, ',', pa.state
                SEPARATOR '|') 'passengers',
            GROUP_CONCAT(distinct m.id_messages, ',', m.user_name, ',', m.mns_date, ',', m.mns_text
                order by m.mns_date asc 
                SEPARATOR '|') 'messages'
            from hitchhikes h
            inner join users u on u.id_users = h.id_user_driver
            left join (SELECT p.id_passengers, u.user_name, p.state, p.id_hitchhike
                        FROM passengers p
                       INNER JOIN users u ON u.id_users = p.id_user) pa on pa.id_hitchhike = h.id_hitchhikes
            left join (SELECT m.id_hitchhike, u.user_name, m.mns_date, m.mns_text, m.id_messages
                       FROM messages m
                      INNER JOIN users u on m.id_user = u.id_users) m on m.id_hitchhike = h.id_hitchhikes
            WHERE h.id_hitchhikes IN (SELECT h.id_hitchhikes FROM hitchhikes h
                                     LEFT JOIN passengers p on p.id_hitchhike = h.id_hitchhikes
                                     WHERE h.id_user_driver = ? OR p.id_user = ?)
            GROUP BY h.id_hitchhikes;`;

            return connection.execute(query, [id_users, id_users]);
        },
        createPassenger: (id_user, id_hitchhike) => {
            let query = `INSERT INTO passengers (state, id_user, id_hitchhike) VALUES ("Pendente",?,?);`;

            return connection.execute(query, [id_user, id_hitchhike]);
        },
        createMessage: (mns_text, id_user, id_hitchhike) => {
            let query = `insert into messages (mns_text, id_user, id_hitchhike) values(?, ?, ?);`;

            return connection.execute(query, [mns_text, id_user, id_hitchhike]);
        },
        alterPassengerState: (id_passengers, state) => {
            let query = `update passengers set state = ? where id_passengers = ?;`;

            return connection.execute(query, [state, id_passengers]);
        }

    };
}
