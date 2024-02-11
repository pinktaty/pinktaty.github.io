import {useContext, useState} from "react";
import {LanguageContext} from "./LanguageContext";


function MenuLanguages() {
    const [open, setOpen] = useState(false);
    const {changeLanguage} = useContext(LanguageContext);

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <div className="relative inline-block text-left">
            <button onClick={toggleMenu} className="flex items-center mr-1.5">Language</button>
            <div className={`${open ? 'block': 'hidden'} absolute right-0 mt-3 w-22`}>
                <button onClick={() => changeLanguage("en")} className=" w-full my-1  text-center rounded-md px-4 py-2 text-sm hover:bg-gray-600 hover:text-white">English</button>
                <button onClick={() => changeLanguage("es")} className="w-full my-1 text-center rounded-md px-4 py-2 text-sm hover:bg-gray-600 hover:text-white">Español</button>
                <button onClick={() => changeLanguage("no")} className="w-full my-1 text-center rounded-md px-4 py-2 text-sm hover:bg-gray-600 hover:text-white">Norsk</button>
            </div>
        </div>
    );
}
export default MenuLanguages;