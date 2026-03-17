const express = require('express');
const app = express();
let port =2121;
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
var methodOverride = require('method-override');


mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
.then(()=> console.log("MongoDB Connected"));

    app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));  
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/chats',async(req,res)=>{
    let chats =  await Chat.find();
    res.render('home.ejs',{ chats });
})
app.get('/chats/new',(req,res)=>{

    res.render('new.ejs');
})
app.get('/chats/:id/edit',(req,res)=>{
     let chatId = req.params.id;
        Chat.findById(chatId).then((chat)=>{
            if(chat){
                res.render('edit.ejs',{ chat });
            }else{
                res.status(404).send('Chat not found');
            }
        }).catch((error)=>{
            console.error('Error fetching chat:', error);
            res.status(500).send('Internal Server Error');
        });
    })

    app.patch('/chats/:id',(req,res)=>{
        let {from,to,msg} = req.body;
        let chatId = req.params.id;
        Chat.findByIdAndUpdate(chatId,{from,to,msg},{new:true})
        .then((updatedChat)=>{
            if(updatedChat){
                res.redirect('/chats');
            }else{
                res.status(404).send('Chat not found');
            }
        }).catch((error)=>{
            console.error('Error updating chat:', error);
            res.status(500).send('Internal Server Error');
        });
    })
    app.delete('/chats/:id/',async(req,res)=>{
        let id = req.params.id;
        let chatDeleted = await Chat.findByIdAndDelete(id);
        console.log(chatDeleted);
        // if(chatDeleted){
            res.redirect('/chats');
        // }else{
        //     res.status(404).send('Chat not found');
        // }
    })
 app.get('/chats/:id/view',(req,res)=>{
    let chatId = req.params.id;
    Chat.findById(chatId).then((chat)=>{
        if(chat){
            res.render('show.ejs',{ chat });
        }else{
            res.status(404).send('Chat not found');
        }
    }).catch((error)=>{
        console.error('Error fetching chat:', error);

        res.status(500).send('Internal Server Error');
    });
});
app.post('/chats',(req,res)=>{
    // let {from,to,msg} = req.body;
   let {from,to,msg} = req.body;
   let newChat = new Chat({
    from:from,
    to:to,
    msg:msg
   });
   newChat.save().then(()=>{
    console.log('Chat message saved successfully');
   }).catch((error)=>{
    console.error('Error saving chat message:', error);
   });

   res.redirect('/chats');

    console.log(from,to,msg);
})

app.get('/',(req,res)=>{
    
    res.send("hello");
})


app.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
});
