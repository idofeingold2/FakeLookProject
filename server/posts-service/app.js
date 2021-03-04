const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const Post = require('./models/post');
const Comment = require('./models/comment');
const Tag = require('./models/tag');
const UserLikedPost = require('./models/user-liked-post');
const UserLikedComment = require('./models/user-liked-comment');
const TagInPost = require('./models/tag-in-post');

const PORT = 4002;

const app = express();

app.use(bodyParser.json());

Comment.belongsTo(Post, { constraints: true, onDelete: 'CASCADE' });
UserLikedPost.belongsTo(Post, { constraints: true, onDelete: 'CASCADE' });
UserLikedComment.belongsTo(Comment, { constraints: true, onDelete: 'CASCADE' });
Tag.belongsToMany(Post, {through: TagInPost});

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });