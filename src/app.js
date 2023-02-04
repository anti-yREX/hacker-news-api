const axios = require('axios');
const express = require('express');
const cors = require('cors');
const { getTopTenStories } = require('./helpers/topStories');
const urls = require('./constants/urls');
const cache = require('./helpers/cache');
const { setNewStoryInDB, getStoryById } = require('./helpers/database');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/top-stories', cache, (req, res) => {
	axios(`${urls.baseUrl}${urls.topStories}`).then((response) => {
        const responseList = [];
        response.data.forEach((current, index) => {
            axios(`${urls.baseUrl}${urls.getItem(current)}`).then((curStoryRes) => {
                responseList.push(curStoryRes.data);
                if (index === response.data.length - 1) {
                    const result = getTopTenStories(responseList);
                    console.log(result);
                    res.send(result.map((cur) => {
                        const {
                            title,
                            url,
                            score,
                            time,
                            by,
                        } = cur;
                        return {
                            title,
                            url,
                            score,
                            creationTime: time,
                            createdBy: by,
                        };
                    }));
                    setNewStoryInDB(result);
                }
            });
        });
	});
});

app.get('/past-stories', async (req, res) => {
    res.send(await getStoryById(34640351));
});

app.get('/comments', (req, res) => {
    res.send('comments');
});

module.exports = app;
