const { name } = require('ejs');
const express = require('express');
const app = express();
const Path = require('path');
let port = 1112;
const {v4:uuidv4} = require('uuid');
var methodOverride = require('method-override');

app.set('view engine','ejs');
app.set('views',Path.join(__dirname,'views'));  // Set the views directory to the 'views' folder in the current directory

app.use(express.static(Path.join(__dirname,'public'))); // Serve static files from the 'public' folder in the current directory

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method')); // Middleware to override HTTP methods using query parameter '_method'


app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});


app.get('/',(req,res)=>{

    res.send('Hello World');
});

// List of user
let users = [
    { 
        id: uuidv4(),
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30
     },
     { 
            id: uuidv4(),
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        age: 25
    },
    {
        id: uuidv4(),
        name: 'Alice Johnson',
        email: 'alice@gm.com',
        age:28
    }
]

app.get('/users',(req,res) =>{
    res.render('index.ejs',{users});
    // res.send(users);
})


//add new user
app.get('/users/new',(req,res) =>{
    res.render('new.ejs');
});
app.post('/users',(req,res) =>{
    // Logic to add new user
    let id = uuidv4();
    let {name,email,age} = req.body;
    users.push({id, name, email, age});
    
    res.redirect('/users');
});

app.get('/users/:id/edit',(req,res) =>{
    let {id} = req.params;
    let user = users.find((u) => u.id === id);
    
res.render('edit.ejs',{user});
});

app.patch('/users/:id',(req,res) =>{
    let {id} = req.params;
    console.log(id);
    let {name,email,age} = req.body;
    let user = users.find((u) => u.id === id);
    user.name = name;
    user.email = email;
    user.age = age;
    res.redirect('/users');

});
app.delete('/users/:id',(req,res) =>{   
    let {id} = req.params;
    users = users.filter((u) => u.id !== id);
    res.redirect('/users');
});