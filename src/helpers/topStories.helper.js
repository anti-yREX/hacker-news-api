const getTopTenStories = (list) => {
    const result = list.map((cur) => {
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
    });
    return result.sort((a, b) => b.score - a.score).slice(0, 10);
}

module.exports = {
    getTopTenStories,
};
