// create a web server

Suggestion 1

// create a web server that can accept incoming request and respond to them

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// const comments = require('./comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    console.log(req.body);
    comments.push(req.body);
    res.json(comments);
});

app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    comments.splice(id, 1);
    res.json(comments);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});