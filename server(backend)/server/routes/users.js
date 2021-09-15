var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers'); 

/* GET users */
router.get('/', (req, res) => {
  
  database.table('users as u')
  .withFields([
    'u.id',
    'u.fullnames',
    'u.username',
    'u.email',
    'u.password'
  ])
  .sort({id: .1})
  .getAll()
  .then(usr => {
      if (usr.length > 0) {
          res.status(200).json({
              user: usr
          });
      } else {
          res.json({message: "No users found"});
      }
  })
  .catch(err => console.log(err));
  
});

//Get single user
router.get('/:id', (req,res) => {
  let user = req.params.id;

  database.table('users as u')
      .withFields([
        'u.id',
        'u.fullnames',
        'u.username',
        'u.email',
        'u.password'    
      ])
      .filter({'u.id' : user})
      .get()
      .then(usr => {
          if (usr) {
              res.status(200).json(usr);
          } else {
              res.json({message: `User id ${user} is not found`});
          }
      })
      .catch(err => console.log(err));
});

//Create user
router.post('/addUser', (req, res)=> {




  

    let fullNames = req.body.fullnames;
    let userName = req.body.username;
    let emailAddress = req.body.email;
    let passwd =  req.body.password;

    database.table('users')
    .insert({
        fullnames: fullNames,
        username: userName,
        email: emailAddress,
        password: passwd
    })
    .then(data => {
      if (data != undefined) {
          res.status(200).json({
              message: 'data inserted'
          });
      } else {
          res.json({message: "Data not inserted"});
      }
  })
  .catch(err => console.log(err));
});

//Update user
router.put('/:id', (req,res) => {
  let uId = req.body.id
  database.table('users')
  .update({
    fullnames: req.body.fullnames,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .filter({id: uId})
  .then(()=> res.send('success'))

})


//Delete User
router.delete("/:id", (req, res) => {
  let userId = req.params.id;

  if (!isNaN(userId)) {
    database.table("users")
      .filter({id: userId })
      .remove()
        .then(successNum => {
            if (successNum == 1) {
                res.status(200).json({
                    message: `Record deleted with user id ${userId}`,
                    status: 'success'
                });
            } else {
                res.status(500).json({status: 'failure', message: 'Cannot delete user'});
          }
      })
      .catch((err) => res.status(500).json(err));
  } else {
    res
      .status(500)
      .json({ message: "ID is not a valid number", status: "failure" });
  }
});







module.exports = router;
