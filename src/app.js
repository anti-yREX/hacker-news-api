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
	axios(`${urls.baseUrl}${urls.topStories}`).then(async (response) => {
        const responseList = await Promise.all(
            response.data.map(async (current) => {
                const res = await axios(`${urls.baseUrl}${urls.getItem(current)}`).then((curStoryRes) => {
                    return curStoryRes.data;
                });
                return res;
            })
        );
        const result = getTopTenStories(responseList);
        res.send(result.map((cur) => {
            const {
                id,
                title,
                url,
                score,
                time,
                by,
            } = cur;
            return {
                id,
                title,
                url,
                score,
                creationTime: time,
                user: by,
            };
        }));
        setNewStoryInDB(result);
	});
});

app.get('/past-stories', async (req, res) => {
    res.send(await getAllPastStories());
});

app.get('/comments', async (req, res) => {
    if (req.query?.id) {
        res.send(await getCommentsByStoryId(req.query.id));
    } else {
        res.status(400).send({
            message: 'Error: Required \'id\' query parameter'
        });
    }
});

module.exports = app;
