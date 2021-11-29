import React, { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import BlogList from './components/BlogList';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

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

  const blogFormRef = useRef();

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setInfoMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
      setTimeout(() => {
        setInfoMessage(null);
      }, 5000);
    });
  };

  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="info">{message}</div>;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogService.setToken(user.token);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      setUser(user);
      setInfoMessage(`${user.username} logged in`);
      setTimeout(() => {
        setInfoMessage(null);
      }, 5000);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setInfoMessage(`${user.username} logged out`);
    setUser(null);
    setTimeout(() => {
      setInfoMessage(null);
    }, 5000);
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

  const handleDeleteBlog = (title) => {
    const blog = blogs.find((p) => p.title === title);
    const id = blog.id;
    console.log(blog);
    const confirmDelete = window.confirm(`Delete ${blog.title} ?`);
    if (confirmDelete) {
      blogService.deleteBlog(id).then(() => {
        const filteredBlogs = blogs.filter((blog) => blog.title !== title);
        setBlogs(filteredBlogs);
        setInfoMessage(`Deleted blog  ${blog.name}`);
        setTimeout(() => {
          setInfoMessage(null);
        }, 5000);
      });
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <ErrorNotification message={errorMessage} />
      <Notification message={infoMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {logout()}
          <Togglable
            buttonLabel="new blog"
            cancelLabel="cancel"
            ref={blogFormRef}
          >
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <BlogList
            blogs={blogs}
            setBlogs={setBlogs}
            handleDeleteBlog={handleDeleteBlog}
            user={user.username}
          />
        </div>
      )}
    </div>
  );
};

export default App;
