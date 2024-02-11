import './App.css';
import {NavLink, Route, Routes} from "react-router-dom";
import AboutMe from './AboutMe';
import Projects from './Projects';
import Cv from './CV'
import ContactMe from './ContactMe';
import MenuLanguages from "./Language";
import {useState} from "react";
import CV from "./CV";

function App() {
    const [bodyColor, setBodyColor] = useState('black');

  return (
      <div
          className="h-screen"
          style={{backgroundColor: bodyColor}}
      >
          <nav className="navbar p-8">
            <div>
                <ul className="flex space-x-8 justify-end text-white sm:flex">
                    <li className="list-none"><NavLink to="/">About me</NavLink></li>
                    <li className="list-none"><NavLink to="/Projects">Projects</NavLink></li>
                    <li className="list-none"><CV /></li>
                    <li className="list-none"><NavLink to="/Contact-me">Contact me</NavLink></li>
                    <li className="list-none"><MenuLanguages /></li>
                </ul>
            </div>
          </nav>
          <div className="content">
              <Routes>
                  <Route exact path="/" element={<AboutMe/>}/>
                  <Route path="/Projects" element={<Projects setBodyColor={setBodyColor} />}/>
                  <Route path="/Contact-me" element={<ContactMe/>}/>s
              </Routes>
          </div>
      </div>
  );
}

export default App;