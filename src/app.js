const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/top-stories', (req, res) => {
    res.send('top-stories');
});

app.get('/past-stories', (req, res) => {
    res.send('past-stories');
});

app.get('/comments', (req, res) => {
    res.send('comments');
});

module.exports = app;
