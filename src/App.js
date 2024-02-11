import './App.css';
import {NavLink, Route, Routes} from "react-router-dom";
import {useContext, useState} from "react";
import AboutMe from './AboutMe';
import Projects from './Projects';
import CV from './CV'
import ContactMe from './ContactMe';
import MenuLanguages from "./Language";
import {LanguageContext} from "./LanguageContext";

function App() {
    const {languageData} = useContext(LanguageContext);
    const [bodyColor, setBodyColor] = useState('black');

  return (
      <div
          className="h-[115vh]"
          style={{backgroundColor: bodyColor}}
      >
          <nav className="navbar p-8">
            <div>
                <ul className="flex space-x-8 justify-end text-white sm:flex">
                    <li className="list-none"><NavLink to="/">{languageData.aboutMe.title}</NavLink></li>
                    <li className="list-none"><NavLink to="/Projects">{languageData.projects.title}</NavLink></li>
                    <li className="list-none"><CV /></li>
                    <li className="list-none"><ContactMe /></li>
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