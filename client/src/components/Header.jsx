import { Link } from 'react-router-dom';
import classes from './styles.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <h3>Mern Blog App</h3>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/add-blog'>Add</Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
