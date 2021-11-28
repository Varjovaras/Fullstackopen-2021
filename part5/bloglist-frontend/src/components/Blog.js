import React from 'react';
import Togglable from './Togglable';
import blogService from '../services/blogs';

const Blog = ({ blog, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikes = async (event) => {
    event.preventDefault();
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    console.log(updatedBlog);
    await blogService.update(blog.id, updatedBlog);
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}{' '}
        <Togglable buttonLabel="view" cancelLabel={'hide'}>
          <p> {blog.author}</p>
          <p> {blog.author}</p>
          <p>
            {' '}
            {blog.likes} <button onClick={handleLikes}>like</button>
          </p>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
