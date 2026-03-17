const mongoose = require('mongoose');
const Chat = require('./models/chat.js');


connectToMongoDB()
 .then(() =>{
    console.log('Ready to interact with MongoDB')
 }) 
 .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  })

async function connectToMongoDB() {
    await mongoose.connect('mongodb://localhost:27017/whatsapp');
    console.log('Connected to MongoDB');
}





let chat2 =[{
 from: 'Charlie',    
        to: 'Dave',
        msg: 'Hey Dave, how are you?'
},
 {
        from: 'Eve',
        to: 'Frank',
        msg: 'Hi Frank, long time no see!'
    },
    {
        from: 'Grace',
        to: 'Heidi',
        msg: 'Hello Heidi, how have you been?'
    },
        {
        from: 'Ivan',
        to: 'Judy',
        msg: 'Hey Judy, are you free this weekend?'
    }
]
   
Chat.insertMany(chat2)
.then(()=>{
    console.log('Multiple chat messages inserted successfully');
})
.catch((error)=>{
    console.error('Error inserting multiple chat messages:', error);
});