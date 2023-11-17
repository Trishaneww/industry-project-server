import './App.scss';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Header from './components/Header/Header';
import SearchMap from './components/SearchMap/SearchMap';
import Homepage from './components/homepage/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/rentals" element={<SearchMap />}/>
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
