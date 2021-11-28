import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const handleTitleChange = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value });
  };
  const handleAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value });
  };
  const handleUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value });
  };

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };
    createBlog(blogObject);

    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
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
};

export default BlogForm;
