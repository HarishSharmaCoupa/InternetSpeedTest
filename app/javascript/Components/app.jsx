import {
    BrowserRouter, Routes,Route, Link
} from 'react-router-dom'
import PlacesList from './places_list'
import ReactDOM from 'react-dom/client'
import React, { useState, useEffect } from 'react'
import NewInternetSpeed from './new_internet_speed'


export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PlacesList />}>
          </Route>
          <Route path="/new-internet-speed" element={<NewInternetSpeed />}>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);