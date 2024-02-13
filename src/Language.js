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

    const createButtons = (languages) => {
        const buttons = [];
        for(let i = 0; i < languages.length; i++) {
            buttons.push(
                <button onClick={() => changeLanguageAux(`${languageData.language.definition}`)}
                        className="sm:my-1 w-full text-center rounded-md p-1.5 text-sm hover:bg-gray-600 hover:text-white font-mono">
                    <img className="w-5 absolute" src={`/${languages[i]}.svg`} alt={`${languageData.language.types[i]}`}/>
                    <span className="ml-4">{languages[i]}</span>
                </button>
            );
        }
        return buttons;
    }

    return (
        <div className="relative inline-block text-left">
            <button onClick={toggleMenu}
                    className="flex items-center mr-1.5 font-mono">{languageData.language.title}</button>
            <div className={`${open ? 'block' : 'hidden'} absolute mt-2 right-0 w-22 sm:mt-3`}>
                {createButtons(["en", "es", "no"])}
            </div>
        </div>
    );
}

export default MenuLanguages;