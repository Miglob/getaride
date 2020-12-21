const express = require("express");
const router = express.Router();
const encrypt = require("../../middleware/encrypt");

let database = require("../../database");

/*
{ // example of what could come in the request body
    "name": something,
    "email" : something@something
    "password" : something to encript,
}
*/

// @route   POST api/auth/signIn
// @desc    Register new user
// @access  Public
router.post("/signIn", encrypt, async (req, res) => {
  const { user_name, email, user_password } = req.body;

  //Simple validation
  if (!user_name || !email || !user_password) {
    return res.status(400).send("Credenciais inválidas");
  }

  // Check for existing user
  //verificar se utilizador existe
  let [result] = await database.checkIfUserExists(email);

  if(result[0].total > 0){
    return res.status(500).send("Email já em uso!");
  }
  console.log(req.user_password);
  return res.json(result);

});

module.exports = router; 