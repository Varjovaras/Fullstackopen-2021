const User = require('../models/user');
const Blog = require('../models/blog');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  for (let i = 0; i < blogs.length; i++) {
    likes += blogs[i].likes;
  }
  return likes;
};

const favoriteBlog = (blogs) => {
  let favorite = {
    title: '',
    author: '',
    likes: 0,
  };
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes) {
      favorite = {
        title: blogs[i].title,
        author: blogs[i].author,
        likes: blogs[i].likes,
      };
    }
  }
  return favorite;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const firstId = async () => {
  const users = await usersInDb();
  return users[0].id;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  usersInDb,
  blogsInDb,
  firstId,
};
