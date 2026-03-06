const express = require('express');
const app = express();


let port = 8080;
app.set('view engine','ejs');
app.get('/shi',(req,res)=>{
    res.render('home.ejs');
})

app.get('/ig/:username',(req,res)=>{
 let name = req.params.username;
 console.log(name);
 res.render('instagram.ejs',{name});
});
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});