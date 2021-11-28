import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, setBlogs }) => {
  return blogs.map((blog) => (
    <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
  ));
};

export default BlogList;
