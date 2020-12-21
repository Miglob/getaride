const bcrypt = require("bcryptjs");

function encrypt(req, res, next) {

    const { user_password } = req.body;

    if (user_password) {

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user_password, salt, (err, hash) => {
                if (err) return res.status(500).send(err);

               req.user_password = hash;

                next();
            });
        });
    } else {
        next();
    }
}

module.exports = encrypt;