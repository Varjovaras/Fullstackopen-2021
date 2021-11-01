const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  for (let i = 0; i < blogs.length; i++) {
    likes += blogs[i].likes;
  }
  return likes;
};

const favoriteBlog = (blogs) => {
  let favorite = {
    title: '',
    author: '',
    likes: 0,
  };
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes) {
      favorite = {
        title: blogs[i].title,
        author: blogs[i].author,
        likes: blogs[i].likes,
      };
    }
  }
  return favorite;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
