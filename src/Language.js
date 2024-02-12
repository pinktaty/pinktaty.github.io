import {useContext, useState} from "react";
import {LanguageContext} from "./LanguageContext";


function MenuLanguages() {
    const [open, setOpen] = useState(false);
    const {changeLanguage} = useContext(LanguageContext);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const changeLanguageAux = (language) => {
        changeLanguage(language);
        toggleMenu();
    }

    const {languageData} = useContext(LanguageContext);

    return (
        <div className="relative inline-block text-left">
            <button onClick={toggleMenu} className="flex items-center mr-1.5 font-mono">{languageData.language.title}</button>
            <div className={`${open ? 'block': 'hidden'} absolute mt-2 right-0 w-22 sm:mt-3`}>
                <button onClick={() => changeLanguageAux("en")}
                        className="sm:my-1 w-full text-center rounded-md p-1.5 text-sm hover:bg-gray-600 hover:text-white font-mono">
                    <img className="w-5" src='/es.svg' alt={`${languageData.language.types[0]}`}/>
                    es
                </button>
                <button onClick={() => changeLanguageAux("es")}
                        className="sm:my-1 w-full text-center rounded-md p-1.5 text-sm hover:bg-gray-600 hover:text-white font-mono">
                    <img className="w-5" src='/en.svg' alt={`${languageData.language.types[1]}`}/>
                    en
                </button>
                <button onClick={() => changeLanguageAux("no")}
                        className="sm:my-1 w-full text-center rounded-md p-1.5 text-sm hover:bg-gray-600 hover:text-white font-mono">
                    <img className="w-5" src='/no.svg' alt={`${languageData.language.types[2]}`}/>
                    no
                </button>
            </div>
        </div>
    );
}

export default MenuLanguages;