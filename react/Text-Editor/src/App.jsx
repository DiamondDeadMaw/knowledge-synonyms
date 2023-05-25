import { useState } from 'react'
import { useSpeechSynthesis } from "react-speech-kit";

import moon from "./assets/moon.png"
import './App.css'

import Calculator from "./calc.jsx"




const Navbar = ({toggleMode}) => {
  return (
    <div className="navbar">
      <div className="left-section">
        <span className="logo">TextUtils</span>
      </div>
      <div className="right-section">
        <button className="nav-button">Home</button>
        <button className="nav-button">About</button>
        <button className="nav-button">Services</button>
        <button className="nav-button">Contact</button>
        <button className="image-button" onClick={toggleMode}>
          <img src={moon} alt="Image Button" />
        </button>
      </div>
    </div>
  );
};

function MainContent({dMode}) {

  const [text, setText] = useState('');

  function hChange(e) {
    setText(e.target.value);
  }

  function convToUp() {
    setText(text.toUpperCase());
  }
  function convToLow() {
    setText(text.toLowerCase());
  }
  function capitalize() {
    var s = text;
    var r = s.charAt(0).toUpperCase();
    var toChange = false;
    for (var i = 1; i<s.length; i++) {
      if (toChange) {
        r += s.charAt(i).toUpperCase();
        toChange = false;
      } else {
        if (s.charAt(i) === ' ') {
          toChange = true;
        }
        r += s.charAt(i);
      }
    }
    setText(r);
  }

  function clr() {
    setText('');
  }

  function strp() {
    var l = 0;
    var r = 0;

    var leftEncountered = false;
    var rightEncountered = false;
    var ln = text.length;
    for (var i = 0; i < ln/2; i++) {
      if (!leftEncountered) {
        
        if (text.charAt(i) === " " ) {
          l +=1;
        } else {
          leftEncountered = true;
        }
      }
      if (!rightEncountered) {
        if (text.charAt(ln-i-1)=== " ") {
          r += 1;
        } else {
          rightEncountered = true;
        }
      }
      
    }

    setText(text.substring(l, (ln-r)));
  }
  const { spk } = useSpeechSynthesis();

  return (

    <div className='main-content'>
      <h2 className={dMode ? "head-dark" : "head"}>Text Formatting</h2>
      <textarea rows={5} cols={80} value={text} onChange={hChange} id='text-box'></textarea>

      <div className='buttons'>
        <button className={dMode ? "btn-dark":"btn"} onClick={() => {navigator.clipboard.writeText(text)}}>Copy text</button>
        <button className={dMode ? "btn-dark":"btn"} onClick={convToUp}>Convert to Uppercase</button>
        <button className={dMode ? "btn-dark":"btn"} onClick={convToLow}>Convert to Lowercase</button>
        <button className={dMode ? "btn-dark":"btn"} onClick={capitalize}>Capitalize Words</button>
        <button className={dMode ? "btn-dark":"btn"} onClick={clr}>Clear Text</button>
        <button className={dMode ? "btn-dark":"btn"} onClick={strp}>Remove Extra Space</button>
        <button className={dMode ? "btn-dark":"btn"} onClick={() => spk({ text: {text} })} >Speak</button>
      </div>
    </div>

  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  function toggleMode() {
    setDarkMode(!darkMode);
  }
  return (
    <div className={darkMode ? "container-dark" : "container"}>
      <Navbar toggleMode={toggleMode}/>
      <MainContent dMode={darkMode}/>
      <Calculator dMode={darkMode} />
    </div>
  );
}

export default App
