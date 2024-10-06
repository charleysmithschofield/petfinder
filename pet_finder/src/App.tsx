import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { PetList } from './components/PetList';

function App() {
  return (
    <div className="App">
      <Header/>
      <PetList/>
    </div>
  );
}

export default App;
