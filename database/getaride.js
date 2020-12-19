let queryDb = (connection, query) => {
    return new Promise((resolve, reject) => {//aceita ou rejeita. 
        connection.query(query, (error, result) => {//callback(executada aqui dentro)
            if (error) reject(error);
            else resolve(result);
        })
    });
}
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
            return queryDb(connection, query);
        }

    };
}