const mongoose = require('mongoose');
const Blog = require('../model/Blog');

// fetch list of blogs
const fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (error) {
    console.error(error);
  }

  if (!blogList) {
    return res.status(404).json({ message: 'No posts found' });
  }

  return res.status(200).json({ blogList });
};

// add a new blog
const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();

  const newlyCreatedBlog = new Blog({
    title,
    description,
    date: currentDate,
  });

  try {
    await newlyCreatedBlog.save();
  } catch (e) {
    console.error(e);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreatedBlog.save(session);
    session.commitTransaction();
  } catch (e) {
    return res.send(500).json({ message: e });
  }

  return res.status(200).json({ newlyCreatedBlog });
};

// delete a blog
const deleteABlog = async (req, res) => {
  const id = req.params.id;

  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    return res.status(200).json({ message: 'Successfully deleted.' });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: 'Unable to delete! Please try again.' });
  }
};

// update a blog
const updateABlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  let currentBlogToUpdate;

  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: 'Something went wrong while updating! Please try again.',
    });
  }

  if (!currentBlogToUpdate) {
    return res.status(500).json({ message: 'Unable to update' });
  }

  return res.status(200).json({ currentBlogToUpdate });
};

module.exports = { fetchListOfBlogs, addNewBlog, deleteABlog, updateABlog };
