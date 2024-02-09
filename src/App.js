import './App.css';
import {NavLink, Route, Routes} from "react-router-dom";
import AboutMe from './AboutMe';
import Projects from './Projects';
import Cv from './CV'
import ContactMe from './ContactMe';
import MenuLanguages from "./Language";

function App() {
  return (
      <div>
          <nav className="navbar m-8 p-2">
            <div>
                <ul className="flex space-x-8 justify-end text-white sm:flex">
                    <li className="list-none"><NavLink to="/">About me</NavLink></li>
                    <li className="list-none"><NavLink to="/Projects">Projects</NavLink></li>
                    <li className="list-none"><NavLink to="/CV">CV</NavLink></li>
                    <li className="list-none"><NavLink to="/Contact-me">Contact me</NavLink></li>
                    <li className="list-none"><MenuLanguages /></li>
                </ul>
            </div>
          </nav>
          <div className="content">
              <Routes>
                  <Route exact path="/" element={<AboutMe/>}/>
                  <Route path="/Projects" element={<Projects/>}/>
                  <Route path="/CV" element={<Cv/>}/>
                  <Route path="/Contact-me" element={<ContactMe/>}/>s
              </Routes>
          </div>
      </div>
  );
}

export default App;