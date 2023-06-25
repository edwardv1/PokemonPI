import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from './views/landing/Landing';
import Home from './views/home/Home';
import Detail from './views/detail/Detail';
import Create from './views/create/Create';
//import NavBar from './components/navbar/NavBar';
//import SearchBar from './components/searchBar/SearchBar';

function App() {

  async function onSearch(name) {

  }

  const location = useLocation();
  return (
    <div>
      {/* {
        location.pathname !== "/"
        ? <NavBar />
        : null
      }
      {
        location.pathname !== "/"
        ? <SearchBar onSearch={onSearch}/> 
        : null
      } */}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home/>} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/create" element={<Create />} />  
      </Routes>
    </div>
  );
}
export default App;

//detail: home/:id
