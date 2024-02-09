import {createContext, useState} from "react";

export let LanguageContext = createContext(require('./data/english.json'));

function MenuLanguages() {
    const [open, setOpen] = useState(false);
    // We use a functio to make sure the value will be assigned when exists and not before
    const [language, setLanguage] = useState(() => LanguageContext);

    //TODO: take provider to the app level and change functions to make it possible

    const toggleMenu = () => {
        setOpen(!open);
    };

    const changeLanguage = async (selectedLanguage) => {
        try {
            let newLanguage = require(`./data/${selectedLanguage}.json`);
            setLanguage(newLanguage);
            toggleMenu();
        } catch (e){
            console.error(`Cannot load ${selectedLanguage}`);
        }
    };

    return (
        <LanguageContext.Provider value={language}>
        <div className="relative inline-block text-left">
            <button onClick={toggleMenu} className="flex items-center mr-1.5">Language</button>
            <div className={`${open ? 'block': 'hidden'} absolute right-0 mt-3 w-22`}>
                <button onClick={() => changeLanguage("english")} className=" w-full my-1  text-center rounded-md px-4 py-2 text-sm hover:bg-gray-600 hover:text-white">English</button>
                <button onClick={() => changeLanguage("espaniol")} className="w-full my-1 text-center rounded-md px-4 py-2 text-sm hover:bg-gray-600 hover:text-white">Español</button>
                <button onClick={() => changeLanguage("norsk")} className="w-full my-1 text-center rounded-md px-4 py-2 text-sm hover:bg-gray-600 hover:text-white">Norsk</button>
            </div>
        </div>
        </LanguageContext.Provider>
    );
}

export default MenuLanguages;