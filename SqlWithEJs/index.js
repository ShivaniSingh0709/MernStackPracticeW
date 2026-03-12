const { faker, fa } = require('@faker-js/faker');
const express = require('express');
 const app = express();
const mysql      = require('mysql2');
const Path = require('path');
// const {v4:uuidv4} = require('uuid');
var methodOverride = require('method-override');

app.set('view engine','ejs');
app.set('views',Path.join(__dirname,'views'));  // Set the views directory to the 'views' folder in the current directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method')); // Middleware to override HTTP methods using query parameter '_method'


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root@123',
  database : 'practicedb'
});
let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
     faker.internet.email(),
     faker.internet.password(),
  ]

}

let q = 'INSERT INTO users (id, username, email, password) VALUES ?';
// let user = [ [1,'John Doe','john.doe@example.com','password123' ],
//              [2,'Jane','jane@example.com','password456'],
//    ];
// let user = [];
// for(let i=1; i<=100; i++){
//   user.push(createRandomUser());
// }


let port =2000;
app.listen(port,()=>{
  console.log(`server is running on port ${port}`)
})

app.get('/',(req,res) =>{
  res.send('hello world');
})
app.get('/users',(req,res) =>{
 let q1 = 'SELECT * FROM users';
  let q2 = 'SELECT COUNT(*) AS total FROM users';try {
  connection.query(q1, function (error, results) {
    if (error) throw error;
    connection.query(q2, function (error, countResults) {
      if (error) throw error;
      console.log('The solution is:', results);
      console.log('Total users:', countResults[0].total);
      res.render('home.ejs',{users: results, total: countResults[0].total});
    });
  });
} catch (error) {
  console.error('Error executing query:', error);
}
})
app.patch('/users/:id',(req,res) =>{
  let id = req.params.id;
  let {username,email} = req.body;
  // console.log(username,email);
let q = 'UPDATE users SET username = ?, email = ? WHERE id = ?';

let values = [username, email, id];
  connection.query(q,values, function (error, results) {
    if (error) throw error;
    console.log('The solution is:', results);
res.redirect('/users');
  });
})
app.get('/users/:id/edit',(req,res) =>{
  let id = req.params.id;
  let q = 'Select * from users where id = ?';
  connection.query(q,[id], function (error, results) {
    if (error) throw error;
    console.log('The solution is:', results);
    res.render('edit.ejs',{user: results[0]});
  });
})
app.delete('/users/:id',(req,res) =>{
  let id = req.params.id;
  let q = 'DELETE from users where id = ?';
  connection.query(q,[id], function (error, results) {
    if (error) throw error;
    console.log('The solution is:', results);
    res.redirect('/users');
  });
})
// connection.end();
