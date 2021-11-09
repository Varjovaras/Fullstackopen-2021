const mongoose = require('mongoose');
const supertest = require('supertest');
const listHelper = require('../utils/list_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const initialBlogs = require('./blogs.js');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

// test('blogs are json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/);
// });

// test('blog has unique identifier', async () => {
//   const blog = await api.get('/api/blogs');
//   expect(blog.body[0].id).toBeDefined();
// });

// test('blog is added', async () => {
//   const newBlog = {
//     title: 'Jorman seikkailut',
//     author: 'Markku Markkula',
//     url: 'http://localhost/api/blog/4',
//     likes: 55,
//     username: 'idiot',
//   };
//   let response = await api.get('/api/blogs');

//   const blogsLength = response.body.length;

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(200)
//     .expect('Content-Type', /application\/json/);

//   response = await api.get('/api/blogs');

//   const contents = response.body.map((content) => content.title);

//   expect(response.body).toHaveLength(blogsLength + 1);
//   expect(contents).toContain('Jorman seikkailut');
// });

// test('likes default to 0', async () => {
//   const newBlog = {
//     title: 'Jorman seikkailut',
//     author: 'Markku Markkula',
//     url: 'http://localhost/api/blog/4',
//   };

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(200)
//     .expect('Content-Type', /application\/json/);

//   const blog = await api.get('/api/blogs');

//   expect(blog.body[2].likes).toBeDefined();
//   expect(blog.body[2].likes).toBe(0);
// });

// test('test if title and url missing gives 400', async () => {
//   const newBlog = {
//     author: 'Jorma Jormala',
//   };

//   await api.post('/api/blogs').send(newBlog).expect(400);
// });

// test('deletion of a single blog', async () => {
//   const response = await api.get('/api/blogs');
//   const blog = response.body;

//   await api.delete(`/api/blogs/${blog[0].id}`).expect(204);
// });

// test('update the property likes of a single blog', async () => {
//   const response = await api.get('/api/blogs');

//   const blog = response.body;
//   blog[0].likes = 20;

//   await api.put(`/api/blogs/${blog[0].id}`).send(blog).expect(204);
// });

// describe('when there is initially one user at db', () => {
//   beforeEach(async () => {
//     await User.deleteMany({});

//     const passwordHash = await bcrypt.hash('sekret', 10);
//     const user = new User({ username: 'root', passwordHash });

//     await user.save();
//   });

//   test('creation succeeds with a fresh username', async () => {
//     const usersAtStart = await listHelper.usersInDb();

//     const newUser = {
//       username: 'mluukkai',
//       name: 'Matti Luukkainen',
//       password: 'salainen',
//     };

//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(200)
//       .expect('Content-Type', /application\/json/);

//     const usersAtEnd = await listHelper.usersInDb();
//     expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

//     const usernames = usersAtEnd.map((u) => u.username);
//     expect(usernames).toContain(newUser.username);
//   }),
//     50000;
// });

describe('addition of a new blog', () => {
  beforeAll(async () => {
    await User.deleteMany({});

    const testUser = await new User({
      username: 'Jarmo Jarmostaja',
      passwordHash: await bcrypt.hash('Jormalainen', 10),
    }).save();

    const userForToken = { username: 'Jarmo Jarmostaja', id: testUser.id };
    token = jwt.sign(userForToken, process.env.SECRET);
    return token;
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Jorman seikkailut',
      author: 'Jorma jormala',
      url: 'Jorma.org',
      likes: 642042,
      userId: '5295195395193',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const AddedBlog = await listHelper.blogsInDb();

    const contents = AddedBlog.map((blog) => blog.title);
    expect(contents).toContain('Jorman seikkailut');

    expect(AddedBlog).toHaveLength(initialBlogs.length + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
