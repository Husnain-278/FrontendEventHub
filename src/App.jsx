import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Venues from './pages/Venues';
import BookEvent from './pages/BookEvent';
import Menu from './pages/Menu';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/venues' element={<Venues />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/bookings' element={<BookEvent />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
