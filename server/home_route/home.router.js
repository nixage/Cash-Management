const express = require('express');
const homeRouter = express.Router();
const mysqlConnection = require('../database/database');

const {isAuthenticated} = require('../passport/passport.config')


// </RETURN USER FINANCE INFORMATION>==================================================================================
homeRouter.get("/user/:id/finance", isAuthenticated, function(req, res){
    const id = req.params.id
    const selectFinance = `select * from user_finance where id =?`;
    mysqlConnection.query(selectFinance, [id], (err, result) =>{
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        res.json(result[0])
    })    
})

homeRouter.post("/user/:id/update/balance", isAuthenticated, function(req, res){
    const id = req.params.id;
    const {balance} = req.body
    console.log(balance)
    const selectFinance = `update user_finance SET balance = ? where user_id = ?`;
    mysqlConnection.query(selectFinance, [balance,id], (err, result) =>{
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        res.json(result)
    })    
})
homeRouter.post("/user/:id/update/expenses", isAuthenticated, function(req, res){
    const id = req.params.id;
    const {expenses} = req.body
    console.log(expenses)
    const selectFinance = `update user_finance SET expenses = ? where user_id = ?`;
    mysqlConnection.query(selectFinance, [expenses,id], (err, result) =>{
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        res.json(result)
    })    
})
homeRouter.post("/user/:id/update/income", isAuthenticated, function(req, res){
    const id = req.params.id;
    const {income} = req.body
    console.log(income)
    const selectFinance = `update user_finance SET income = ? where user_id = ?`;
    mysqlConnection.query(selectFinance, [income,id], (err, result) =>{
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        res.json(result)
    })    
})
homeRouter.post("/user/:id/create/default-finance", isAuthenticated, function(req, res) {
    const user_id = +req.param.id;
    const insert = `insert into user_finance (balance, expenses, income, user_id) values('0', '0', '0', '${user_id}')`;
    mysqlConnection.query(insert, (err, result) => {
        if (err) {return res.status(500).json({msg:'Server error, try again later'})}
        res.json(result)
    })
})
// </RETURN USER FINANCE INFORMATION>================================================================================



// <RETURN USER SAVING INFORMATION>==================================================================================
// RETURN USER ALL SAVINGS
homeRouter.get("/user/:id/savings", isAuthenticated, function(req, res){
    const id = req.params.id
    const select = `select * from user_savings where user_id =?`;
    mysqlConnection.query(select, [id], (err, result) =>{
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        res.json(result)
    }) 
})
// RETURN USER SAVING BY ID
homeRouter.get("/user/:id/savings/:saving_id", isAuthenticated, function(req, res){
    const id = req.params.id;
    const saving_id = req.params.saving_id;
    const select = `select * from user_savings where user_id =? and id=?`;
    mysqlConnection.query(select, [id, saving_id], (err, result) =>{
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        res.json(result[0])
    }) 
})
// USER ADD SAVING
homeRouter.post("/user/:id/add/savings",isAuthenticated, function(req, res){
    const {name, img, amount} = req.body;
    const id = req.params.id
    const insert = `insert into user_savings (name, img, amount, user_id) value ('${name}', '${img}', '${amount}', '${id}')`;
    mysqlConnection.query(insert, (err, result) => {
        if (err){
            res.status(500).json({msg:'Server error, try again later'})
        }
        if (result){
            res.json(result)
        }
    })
})
// USER UPDATE SAVING
homeRouter.post("/user/:id/update/savings", isAuthenticated, function(req, res){
    const user_id = req.params.id;
    const amount = Math.floor(req.body.amount);
    const id = req.body.id
    const update = `update user_savings SET amount = ? where user_id = ? and id = ?`;
    mysqlConnection.query(update, [amount, user_id, id], (err, result) =>{
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        res.json(result)
    }) 
})
homeRouter.delete("/user/:user_id/delete/savings/:id", isAuthenticated, function(req, res){
    const user_id = req.params.user_id;
    const id = req.params.id
    const deleteSaving = `delete from user_savings where id = ? and user_id = ?`;
    mysqlConnection.query(deleteSaving, [id, user_id], (err, result) =>{
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        res.json(result)
    }) 
})
// <RETURN USER SAVING INFORMATION>==================================================================================



// <RETURN USER SPEND INFORMATION>==================================================================================
// RETURN USER ALL SPENDS
homeRouter.get("/user/:id/spends", isAuthenticated, function(req, res){
    const id = req.params.id
    const select = `select * from user_spends where user_id =?`;
    mysqlConnection.query(select, [id], (err, result) =>{
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        res.json(result)
    })  
});
// RETURN USER SPENDS BY ID
homeRouter.get("/user/:id/spends/:spends_id", isAuthenticated, function(req, res){
    const id = req.params.id;
    const spends_id = req.params.spends_id;
    const select = `select * from user_spends where user_id =? and id=?`;
    mysqlConnection.query(select, [id, spends_id], (err, result) =>{
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        res.json(result[0])
    }) 
})
// USER ADD SPENDS
homeRouter.post("/user/:id/add/spends", isAuthenticated, function(req, res){
    const userId = req.params.id;
    const {name, img, amount, savingId} = req.body;
    const insert = `insert into user_spends (name, img, amount, savingId, user_id) value ('${name}', '${img}', '${amount}', '${savingId}', '${userId}')`;
    mysqlConnection.query(insert, (err, result) => {
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        res.json(result)
    })

})
// RETURN USER UPDATE SPENDS
homeRouter.post("/user/:id/update/spends", isAuthenticated, function(req, res){
    const user_id = req.params.id;
    const amount = Math.floor(req.body.amount);
    const id = req.body.id
    const update = `update user_spends SET amount = ? where user_id = ? and id = ?`;
    mysqlConnection.query(update, [amount, user_id, id], (err, result) =>{
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        res.json(result)
    }) 
})
homeRouter.delete("/user/:user_id/delete/spends/:id", isAuthenticated, function(req, res){
    const user_id = req.params.user_id;
    const id = req.params.id;
    const deleteSpend = `delete from user_spends where id = ? and user_id = ?`;
    mysqlConnection.query(deleteSpend, [id, user_id], (err, result) =>{
        if (err){
            res.status(500).json({msg: 'Server error, try again later'})
        }
        res.json(result)
    }) 
})
// </RETURN USER SPEND INFORMATION>==================================================================================

module.exports = {
  homeRouter: homeRouter
}
