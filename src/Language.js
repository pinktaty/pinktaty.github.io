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
            <button onClick={toggleMenu} className="flex items-center mr-1.5">{languageData.language.title}</button>
            <div className={`${open ? 'block': 'hidden'} absolute right-0 mt-3 w-22`}>
                <button onClick={() => changeLanguageAux("en")} className=" w-full my-1  text-center rounded-md p-1.5 text-sm hover:bg-gray-600 hover:text-white">{languageData.language.types[0]}</button>
                <button onClick={() => changeLanguageAux("es")} className="w-full my-1 text-center rounded-md p-1.5 text-sm hover:bg-gray-600 hover:text-white">{languageData.language.types[1]}</button>
                <button onClick={() => changeLanguageAux("no")} className="w-full my-1 text-center rounded-md p-1.5 text-sm hover:bg-gray-600 hover:text-white">{languageData.language.types[2]}</button>
            </div>
        </div>
    );
}
export default MenuLanguages;