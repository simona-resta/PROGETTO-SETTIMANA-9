import { useState } from 'react';
import MyNavbar from './components/Navbar'; 
import TvShows from './components/TvShows';
import MyFooter from './components/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <MyNavbar setSearchQuery={setSearchQuery} />
      <TvShows searchQuery={searchQuery} />
      <MyFooter />
    </>
  );
}

export default App;