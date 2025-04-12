/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0);
};

const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return null;
  }

  return blogs.reduce((favorite, current) => {
    return current.likes > favorite.likes ? current : favorite;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
