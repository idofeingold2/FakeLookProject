const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const Comment = require('./models/comment');
const UserLikedPost = require('./models/user-liked-post');
const UserLikedComment = require('./models/user-liked-comment');

const PORT = 4002;

const app = express();

app.use(bodyParser.json());

Comment.belongsTo(Post, { constraints: true, onDelete: 'CASCADE' });
UserLikedPost.belongsTo(Post, { constraints: true, onDelete: 'CASCADE' });
UserLikedComment.belongsTo(Comment, { constraints: true, onDelete: 'CASCADE' });

sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });