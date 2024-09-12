import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Jobs from './components/Jobs';
import JobDetails from './components/JobDetails';
import Bookmarks from './components/Bookmarks';
import Home from './components/Home'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </Router>
  );
}

export default App;
