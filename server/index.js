const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/twiwwer');
const tweews = db.get('tweews');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hewwo~'
    });
});

function isValidTweew(tweew){
    return tweew.name && tweew.name.toString().trim() !== ''
    &&
    tweew.stuff && tweew.stuff.toString().trim() !== ''
}

app.post('/tweews', (req, res) => {
    
    if (isValidTweew(req.body)) {
        const tweew = {
            name: req.body.name.toString(),
            stuff: req.body.stuff.toString(),
            created: new Date()
        };
        // console.log(tweew);
        tweews
            .insert(tweew)
            .then(createdTweew => {
                res.json(createdTweew);
            });

    } else {
        res.status(422);
        res.json({
            message: 'Hey! Name and Stuff are required.'
        });
    }
});

app.listen(5000, () => {
    console.log('Listening to http://localhost:5000');
});