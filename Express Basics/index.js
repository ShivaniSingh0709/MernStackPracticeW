const express = require('express');
const app = express();

let port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// app.use((req,res) => {
//     console.log('Request received');
//     res.send('Hello World');
// }   );

app.get('/shivani', (req,res) => {
    res.send('shivani your successfull in Uk visa ballot?');
});

app.get('/:username/:id', (req,res) => {
    console.log(req.params);
    res.send('shivani your successfull in Uk visa ballot !!!Congratulations');
});

app.get('/search', (req,res) => {
    console.log(req.query);
    res.send('search result found');
});