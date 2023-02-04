const baseUrl = 'https://hacker-news.firebaseio.com/v0';

const urls = {
    baseUrl,
    getItem: (id) => (`/item/${id}.json?print=pretty`),
    topStories: '/topstories.json?print=pretty',
};

module.exports = urls;