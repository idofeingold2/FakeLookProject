const Post = require('../models/post');

exports.createPost = (user, post) => {
    user.createPost(post)
        .then(result => {
            console.log('post created');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.deletePost = (id) => {
    Post.destroy({ where: { id } })
        .then(result => {
            console.log('post deleted');
        })
        .catch(err => {
            console.log(err);
        });
}