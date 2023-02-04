const axios = require('axios');
const express = require('express');
const cors = require('cors');
const { getTopTenStories } = require('./helpers/topStories');
const urls = require('./constants/urls');
const cache = require('./helpers/cache');
const { setNewStoryInDB, getAllPastStories } = require('./helpers/database');
const { getCommentsByStoryId } = require('./helpers/comments');

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
                            user: by,
                        };
                    }));
                    setNewStoryInDB(result);
                }
            });
        });
	});
});

app.get('/past-stories', async (req, res) => {
    res.send(await getAllPastStories());
});

app.get('/comments', async (req, res) => {
    res.send(await getCommentsByStoryId(req.query.id));
});

module.exports = app;
