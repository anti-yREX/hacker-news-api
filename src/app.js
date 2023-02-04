const axios = require('axios');
const express = require('express');
const cors = require('cors');
const { getTopTenStories } = require('./helpers/topStories');
const urls = require('./constants/urls');
const cache = require('./helpers/cache');

const app = express();

app.use(cors());

app.use(express.json());

app.use(cache)

app.get('/top-stories', (req, res) => {
	axios(`${urls.baseUrl}${urls.topStories}`).then((response) => {
        const responseList = [];
        response.data.forEach((current, index) => {
            axios(`${urls.baseUrl}${urls.getItem(current)}`).then((curStoryRes) => {
                responseList.push(curStoryRes.data);
                if (index === response.data.length - 1) {
                    const result = getTopTenStories(responseList);
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
