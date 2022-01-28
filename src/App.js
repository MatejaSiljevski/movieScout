import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Trending from './Pages/Trending'
import SingleMoviePage from './Pages/SingleMoviePage';


function App() {
  return (
    <BrowserRouter>
      <div className="app">
            <Routes>  
              <Route path="/" element={<Trending />} />
              <Route path='/single-movie/:id' element={<SingleMoviePage/>} />
            </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
