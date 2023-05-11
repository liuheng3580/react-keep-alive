import React, { lazy, useCallback } from 'react';
import './App.css';
import { HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Home from './page/Home/index'
import FromComponent from './page/From/index'
import { KeepAliveProvider, withKeepAlive } from "./keepAlive";

const From1 = withKeepAlive(FromComponent, { keepAliveId: "From" })
const Home1 = withKeepAlive(Home, { keepAliveId: "Home" })
function App() {
  return (
    <div className="App">
      <KeepAliveProvider>
        <HashRouter>
          <ul>
            <li>
              <Link to={'/'}>主页</Link>
            </li>
            <li>
              <Link to={'/from'}>from</Link>
            </li>
          </ul>
          <ul>
            <Routes>
              <Route path='/' element={<Home1 />}></Route>
              <Route path='/from' element={<From1 />}></Route>
              <Route path='*' element={<Navigate to="/" />}></Route>
            </Routes>
          </ul>

        </HashRouter>
      </KeepAliveProvider>
    </div>
  );
}

export default App;
