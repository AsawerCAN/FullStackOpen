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

const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return null;
  }
  const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1;
    return counts;
  }, {});

  let topAuthor = null;
  let maxBlogs = 0;
  for (const [author, count] of Object.entries(authorCounts)) {
    if (count > maxBlogs) {
      topAuthor = author;
      maxBlogs = count;
    }
  }
  return { author: topAuthor, blogs: maxBlogs };
};

const mostLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return null;
  }

  const authorLikes = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + (blog.likes || 0);
    return likes;
  }, {});
  let topAuthor = null;
  let maxLikes = 0;

  for (const [author, likes] of Object.entries(authorLikes)) {
    if (likes > maxLikes) {
      topAuthor = author;
      maxLikes = likes;
    }
  }
  return { author: topAuthor, likes: maxLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
