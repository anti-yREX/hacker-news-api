const axios = require('axios');
const urls = require('../constants/urls');

const getCommentsByStoryId = async (id) => {
	const commentsList = await axios(`${urls.baseUrl}${urls.getItem(id)}`).then((res) => {
        return res.data.kids;
    });

	const top10CommentIds = await Promise.all(commentsList.map(async (curId) => {
        const res = await axios(`${urls.baseUrl}${urls.getItem(curId)}`).then((res) => {
            return res.data;
        });
        return res;
    }));

    return top10CommentIds
        .sort((a, b) => ((b.kids?.length || 0) - (a.kids?.length || 0)))
        .slice(0, 10)
        .map(({ text, by }) => ({
            text,
            user: by,
        }));
}

module.exports = {
    getCommentsByStoryId,
};
