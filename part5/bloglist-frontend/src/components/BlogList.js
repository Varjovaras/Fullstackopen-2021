import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, setBlogs, handleDeleteBlog, user }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return sortedBlogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      setBlogs={setBlogs}
      handleDeleteBlog={handleDeleteBlog}
      user={user}
    />
  ));
};

export default BlogList;
