import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { PetList } from './components/PetList';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router> 
        <Header />  
        <Routes>
          <Route path="/" element={<PetList></PetList>}></Route>
          {/* <Route path="/details/:id" element={<PetDetails></PetDetails>}></Route> */}
        </Routes> 
        <Header/>
      </Router>
    </div>
  );
}

export default App;
