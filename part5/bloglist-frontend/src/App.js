import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      content: newBlog,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog('');
    });
  };

  const handleBlogChange = (event) => {
    console.log(event.target.value);
    setNewBlog(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('=)');
      setTimeout(() => {
        console.log('(=');
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input value={newBlog} onChange={handleBlogChange} />
      <button type="submit">save</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <h2>Login</h2>
        {user === null ? (
          loginForm()
        ) : (
          <div>
            <p>{user.username} logged in</p>
            {blogForm()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {/* {logout()} */}
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
