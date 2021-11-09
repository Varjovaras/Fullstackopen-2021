const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogRouter.post('/', async (request, response) => {
  const { body, user } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
);

blogRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const body = request.body;

  const content = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
    runValidators: true,
  });
  response.status(204).json(content);
});

module.exports = blogRouter;
