const axios = require('axios');
const express = require('express');
const cors = require('cors');
const urls = require('./constants/urls');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/top-stories', (req, res) => {
	axios(`${urls.baseUrl}${urls.topStories}`).then((response) => {
        const responseList = [];
        response.data.forEach((current, index) => {
            axios(`${urls.baseUrl}${urls.getItem(current)}`).then((curStoryRes) => {
                const {
                    title,
                    url,
                    score,
                    time,
                    by,
                } = curStoryRes.data;
                responseList.push({
                    title,
                    url,
                    score,
                    creationTime: time,
                    createdBy: by,
                });
                if (index === response.data.length - 1) {
                    res.send(result);
                }
            });
        });
	});
});

app.get('/past-stories', (req, res) => {
    res.send('past-stories');
});

app.get('/comments', (req, res) => {
    res.send('comments');
});

module.exports = app;
