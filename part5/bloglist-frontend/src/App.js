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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (event) => {
    console.log(newBlog);
    event.preventDefault();
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      date: new Date().toISOString(),
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog('');
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      // setErrorMessage('wrong credentials');
      setTimeout(() => {
        console.log('TIMEOUT ERROR');
        // setErrorMessage(null);
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

  const handleTitleChange = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value });
  };
  const handleAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value });
  };
  const handleUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value });
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>
        Title:
        <input value={newBlog.title} onChange={handleTitleChange} />
      </div>
      <div>
        Author:
        <input value={newBlog.author} onChange={handleAuthorChange} />
      </div>
      <div>
        Url:
        <input value={newBlog.url} onChange={handleUrlChange} />
      </div>
      <button type="submit">create</button>
    </form>
  );

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const logout = () => {
    return (
      <form onSubmit={logoutHandler}>
        <p>
          {user.username} logged in <button type="submit">logout</button>
        </p>
      </form>
    );
  };

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
          {logout()}
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
