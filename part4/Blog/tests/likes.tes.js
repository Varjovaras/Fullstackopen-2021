const listHelper = require('../utils/list_helper');
const blogs = require('./blogs.js');

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('favorite blog is 14', () => {
    const result = listHelper.favoriteBlog(blogs);

    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 14,
    });
  });
});
