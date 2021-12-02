import React from 'react';
import Togglable from './Togglable';
import blogService from '../services/blogs';

const Blog = ({ blog, setBlogs, handleDeleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const DeleteButton = () => {
    if (!blog.user) {
      return <></>;
    } else if (user === blog.user.username) {
      return (
        <>
          <button onClick={() => handleDeleteBlog(blog.title)}>delete</button>{' '}
        </>
      );
    } else {
      return <div></div>;
    }
  };

  const handleLikes = async (event) => {
    event.preventDefault();

    const updatedBlog = {
      user: blog.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    await blogService.update(updatedBlog.user, updatedBlog);
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  return (
    <div style={blogStyle}>
      <div className="blog">
        {blog.title}{' '}
        <Togglable buttonLabel="view" cancelLabel={'hide'}>
          <p> {blog.author}</p>
          <p> {blog.author}</p>
          <p className="likeP">
            {' '}
            {blog.likes} likes <button onClick={handleLikes}>like</button>
          </p>
        </Togglable>
        <DeleteButton />
      </div>
    </div>
  );
};

export default Blog;
