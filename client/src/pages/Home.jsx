import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context';
import axios from 'axios';
import classes from './styles.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const fetchListOfBlogs = async () => {
    setPending(true);
    const response = await axios.get('http://localhost:8000/api/blogs/');
    const result = await response.data;

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  };

  const handleDeleteBlog = async (getCurrentId) => {
    const response = await axios.delete(
      `http://localhost:8000/api/blogs/delete/${getCurrentId}`
    );
    const result = await response.data;

    if (result?.message) {
      fetchListOfBlogs();
    }
  };

  const handleEdit = async (getCurrentBlogItem) => {
    console.log(getCurrentBlogItem);
    navigate('/add-blog', { state: { getCurrentBlogItem } });
  };

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading Blogs! Please wait</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div key={blogItem._id}>
                <p>{blogItem.title}</p>
                <p>{blogItem.description}</p>
                <FaEdit onClick={() => handleEdit(blogItem)} size={30} />
                <FaTrash
                  onClick={() => handleDeleteBlog(blogItem._id)}
                  size={30}
                />
              </div>
            ))
          ) : (
            <h3>Nothing to see yet.</h3>
          )}
        </div>
      )}
    </div>
  );
};
export default Home;
