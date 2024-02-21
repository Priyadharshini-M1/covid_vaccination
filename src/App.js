import React from 'react';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Front from './Front';
import Main from './Main';
import Regform from './Regform';
import Admin from './Admin';
import Adminselection from './Adminselection';
import Table from './Table';
import Component3 from './Component3';
function App() {



  return (
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Front/>}/>
  <Route path="Main" element={<Main/>}/>
  <Route path="Regform" element ={<Regform/>}/>
  <Route path="Admin" element ={<Admin/>}/>
  <Route path="Adminselection" element={<Adminselection/>}/>
  <Route path="Table" element={<Table/>}/>
  <Route path='Component3' element={<Component3/>}/>
  </Routes>
  
  
  </BrowserRouter>                   

  );
}

export default App;
