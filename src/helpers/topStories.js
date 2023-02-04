const getTopTenStories = (list) => list.sort((a, b) => b.score - a.score).slice(0, 10);

module.exports = {
    getTopTenStories,
};
