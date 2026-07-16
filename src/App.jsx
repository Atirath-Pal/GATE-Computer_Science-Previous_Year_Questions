import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PaperPage from './pages/PaperPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gate/:year" element={<PaperPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
