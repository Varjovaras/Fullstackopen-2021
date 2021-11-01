const listHelper = require('../utils/list_helper');
const blogs = require('./blogs.js');

describe('total likes', () => {
  test('total likes', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(38);
  });
});
