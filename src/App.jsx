import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PaperPage from './pages/PaperPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Updated path parameter to support direct, unique file loading */}
        <Route path="/gate/:fileName" element={<PaperPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;