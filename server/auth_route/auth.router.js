const express = require('express');
const authRouter = express.Router();
const mysqlConnection = require('../database/database');

const passport = require('passport');

// Register User
authRouter.post("/sign-up", function(req, res){
    const {firstName, lastName, email, login, password } = req.body

    const sql = `INSERT INTO USERS (first_name, last_name, email, login, password ) values ("${firstName}", "${lastName}", "${email}", "${login}", "${password}")`
    mysqlConnection.query(sql, (err, result) => {
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        const insert = `insert into user_finance (balance, expenses, income, user_id) values('0', '0', '0', '${result.insertId}')`;
        mysqlConnection.query(insert, (err, result) => {
          if (err) {return res.status(500).json({msg:'Server error, try again later'})}
          res.json({msg: 'User registered'})
        })
    })
})
// Log OUT()
authRouter.get("/log-out", (req, res) => {
  req.logOut();
  req.session.destroy(function (err) {
    if (err) { return next(err); }
    // The response should indicate that the user is no longer authenticated.
    return res.send({ authenticated: req.isAuthenticated() });
  });
})
// -===
// LOG IN======
authRouter.post('/sign-in', function(req, res, next){
  passport.authenticate('local', function(err,user,info){
    if(err){return next(err)}
    if(!user){
      return res.json({msg: "User not found"})
    }
    req.logIn(user, (err)=>{
      if(err){return next(err)};
      return res.json(user)
    })
  })(req,res,next)
})
// ==========
/* Is AUTHENTICATED */
authRouter.get("/is-authenticated", (req, res) => {
  return res.json({ authenticated: req.isAuthenticated() });
})

module.exports = {
  authRouter: authRouter,
}
