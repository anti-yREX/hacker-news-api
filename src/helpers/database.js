const mongoose = require('mongoose');
const { Schema } = mongoose;

const dbUsername = process.env.DATABASE_USERNAME || 'hacker-news-db-admin';
const dbPassword = process.env.DATABASE_PASSWORD || 'hacker-news-db-admin';

mongoose.set('strictQuery', true)

mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@hacker-news-rituraj.zswis0i.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const storySchema = new Schema({
    _id: Schema.Types.Number,
    storyId: Schema.Types.Number,
    type: Schema.Types.String,
    by: Schema.Types.String,
    time: Schema.Types.Date,
    parent: Schema.Types.Number,
    kids: Schema.Types.Array,
    url: Schema.Types.String,
    score: Schema.Types.Number,
    title: Schema.Types.String,
    descendants: Schema.Types.Number,
});

const Story = mongoose.model('Story', storySchema);


const setNewStoryInDB = (list) => {
    list.forEach(async (current) => {
        const {
            id,
            type,
            by,
            time,
            parent,
            kids,
            url,
            score,
            title,
            descendants,
        } = current;
        const isNew = !(await Story.exists({ _id: id }));
        if (isNew) {
            const story = new Story({
                _id: id,
                storyId: id,
                type,
                by,
                time,
                parent,
                kids,
                url,
                score,
                title,
                descendants,
            });
            story.save((e) => {
                if (e) {
                    console.error(e);
                }
            });
        }
    });
}

const getAllPastStories = async (id) => {
    const story = await Story.find()
    return story.map((current) => {
        const {
            by,
            time,
            url,
            score,
            title,
        } = current;
        return {
            title,
            url,
            score,
            creationTime: time,
            user: by,
        };
    });
}

module.exports = {
    setNewStoryInDB,
    getAllPastStories,
}