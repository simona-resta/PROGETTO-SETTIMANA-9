import { useState } from 'react';
import MyNavbar from './components/Navbar'; 
import TvShows from './components/TvShows';
import MyFooter from './components/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("carousel");

  return (
    <>
      <MyNavbar setSearchQuery={setSearchQuery} viewMode={viewMode} setViewMode={setViewMode} />
      <TvShows searchQuery={searchQuery} viewMode={viewMode} />
      <MyFooter />
    </>
  );
}

export default App;