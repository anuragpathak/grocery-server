const express =  require('express');
const cors =  require('cors');

let appData = require('./products.json');  // App Data

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.static('public'));

app.get('/products' , (req,res) => {  
    res.send(appData);
});

app.post('/upvote/:id' , (req,res) => {  
    appData = appData.map(grocery => {
        if(Number(grocery.id) === Number(req.params.id)) {
            grocery.vote++;
        }
        return grocery;
    });
    
    res.send(appData);
});

app.post('/downvote/:id' , (req,res) => {  
    appData = appData.map(grocery => {
        if(Number(grocery.id) === Number(req.params.id)) {
            grocery.vote--;
        }
        return grocery;
    });
    res.send(appData);
});

app.listen(PORT, () => { console.log(`Server started on Server at port ${PORT}`)});

