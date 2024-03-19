import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, AddNewBlog } from './pages';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/add-blog' element={<AddNewBlog />} />
      </Routes>
    </div>
  );
}

export default App;
