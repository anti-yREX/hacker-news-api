class CacheStore {
    data = {};

    get = (key) => {
        return this.data[key];
    }

    set = (key, value, ttl = 900000) => {
        try {
            this.data[key] = JSON.stringify(value);
            setTimeout(() => {
                delete this.data[key];
            }, ttl);
        } catch (e) {
            throw e;
        }
    }
}

const cacheStore = new CacheStore();

const topStoriesKey = 'topStories';

const cache = (req, res, next) => {
    if (req.method !== 'GET') {
        return next();
    }
    const cachedResponse = cacheStore.get(topStoriesKey);
    if (cachedResponse) {
        res.send(cachedResponse);
    } else {
        res.orginalSend = res.send;
        res.send = body => {
            res.orginalSend(body);
            cacheStore.set(topStoriesKey, body, 900000);
        }
        next();
    }
}

module.exports = cache;
