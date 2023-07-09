import React from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from './views/landing/Landing';
import Home from './views/home/Home';
import Detail from './views/detail/Detail';
import Create from './views/create/Create';


function App() {

  //const location = useLocation();
  return (
    <div>
      {/* {
        location.pathname !== "/"
        ? <NavBar />
        : null
      }
      {
        location.pathname !== "/"
        ? <SearchBar/> 
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

