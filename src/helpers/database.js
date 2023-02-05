const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();

const dbUsername = process.env.DATABASE_USERNAME;
const dbPassword = process.env.DATABASE_PASSWORD;

mongoose.set('strictQuery', true)

mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@hacker-news-rituraj.zswis0i.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const storySchema = new Schema({
    _id: Schema.Types.Number,
    storyId: Schema.Types.Number,
    by: Schema.Types.String,
    time: Schema.Types.Date,
    url: Schema.Types.String,
    score: Schema.Types.Number,
    title: Schema.Types.String,
});

const Story = mongoose.model('Story', storySchema);


const setNewStoryInDB = (list) => {
    list.forEach(async (current) => {
        const {
            id,
            by,
            time,
            url,
            score,
            title,
        } = current;
        const isNew = !(await Story.exists({ _id: id }));
        if (isNew) {
            const story = new Story({
                _id: id,
                storyId: id,
                by,
                time,
                url,
                score,
                title,
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