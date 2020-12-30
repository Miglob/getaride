const express = require("express");
const router = express.Router();
const encrypt = require("../../middleware/encrypt");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

let database = require("../../database");

/*
{ // example of what could come in the request body
    "name": something,
    "email" : something@something
    "password" : something to encript,
}
*/

// @route   POST api/auth/signUp
// @desc    Register new user
// @access  Public
router.post("/signUp", encrypt, async (req, res) => {
  const { user_name, email, user_password } = req.body;

  //Simple validation
  if (!user_name || !email || !user_password) {
    return res.status(400).send("Credenciais inválidas");
  }

  //Check for existing user
  //verificar se utilizador existe
  try {

    let [result] = await database.checkIfUserExists(email);

    console.log(result);

    if (Array.isArray(result) && result.length) {
      return res.status(500).send("Email já em uso!");
    }

    let [resultId] = await database.createUser(user_name, user_password, email);

    if (!!resultId && resultId.insertId > 0) {
      return res.send(`Utilizador inserido com sucesso e com o id: ${resultId.insertId}`);
    }

  } catch (e) {
    return res.status(500).send(e.toString());

  }

});

// @route   POST api/auth/signIn
// @desc    Authenticate user
// @access  Public
router.post("/signIn", async (req, res) => {

  const { email, user_password } = req.body;

  //Simple validation

  if (!email || !user_password) {
    return res.status(500).send("Credenciais inválidas");
  }

  try {
    let [result] = await database.checkIfUserExists(email);
    console.log(result);
    if (Array.isArray(result) && result.length) {
      authenticate(req, res, result[0].id_users, result[0].user_name, user_password, result[0].user_password)
    } else {

      return res.status(500).send("Utilizador não existente!");
    }

  } catch (e) {
    console.log(e);
    return res.status(500).send(e.toString());

  }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, async (req, res) => {

  try {

    let [result] = await database.findUserById(req.user.id);

    return res.json({
      id_users: req.user.id,
      user_name: result[0].user_name
    });

  } catch (e) {
    return res.status(500).send(e.toString());

  }
});

let authenticate = (req, res, user_id, user_name, user_password, bd_password) => {
  console.log("bosta");
  // Validate password

  bcrypt.compare(user_password, bd_password) // plain text, hased text
    .then(isMatch => {
      if (!isMatch) {
        //return res.status(500).json({msg:"Credenciais inválidas"});
        return res.status(500).send("Credenciais inválidas");
      }

      jwt.sign(//se calhar não se utiliza os tokens
        { id: user_id },
        config.get("jwtSecret"),
        { expiresIn: 3600 }, // token expire time
        (err, token) => {
          if (err) throw err; // ver se é preciso enviar um erro para o cliente

          res.json({
            token: token,
            user: {
              id_users: user_id,
              user_name: user_name
            }
          });
        }
      );
    });
};

module.exports = router; 