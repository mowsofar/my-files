import './App.scss';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import TopPanel from './components/TopPanel';
import DirContent from './components/DirContent';
import ListOfFiles from './components/ListOfFiles';


const App = () => {
  return (
      <div>
        <TopPanel/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/main' element={<ListOfFiles/>}/>
          <Route path='/myFiles/:dir' element={<DirContent/>}/>
        </Routes>
      </div>
  );
}

export default App;
