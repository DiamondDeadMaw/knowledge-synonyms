import { useState, useEffect } from 'react'

import './App.css'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import First from "./first.jsx"
import Second from "./second.jsx"
import Third from "./third.jsx"
import Fourth from "./fourth.jsx"

function Home() {
  return (
<>
      <First />
      <Second />
      <Third />
      <Fourth />
      </>
  );
}

function OtherPage() {

  useEffect(() => {
    console.log("rendering");
  }, []);

  return (
    <div className='other-div'>
      <h1 style={{color: "black"}}>This is another page</h1>
      <Link to="/" style={{color: "black"}}>Click to go back</Link>
    </div>
  );
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/other" element={<OtherPage/>}/>
    </Routes>
  );
}

export default App
