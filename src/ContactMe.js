import {useContext, useState} from "react";
import {LanguageContext} from "./LanguageContext";

function ContactMe() {
    const [open, setOpen] = useState(false);
    const {languageData} = useContext(LanguageContext);

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <div className="relative inline-block text-left">
            <button onClick={toggleMenu} className="flex items-center mr-1.5 font-mono">{languageData.contactMe.title}</button>
            <div className={`${open ? 'block' : 'hidden'} inline-block mt-1 w-22 sm:absolute sm:mt-3`}>
                <a href="https://www.linkedin.com/in/diaz-lilith04" target="_blank" rel="noopener noreferrer">
                    <button onClick={() => toggleMenu()}
                            className="rounded-md hover:bg-gray-600 p-1.5 sm:ml-6">
                        <img className="w-5" src='/linkedin.svg' alt="linkedin"/>
                    </button>
                </a>
                <a href="https://github.com/pinktaty" target="_blank" rel="noopener noreferrer">
                    <button onClick={() => toggleMenu()}
                            className="ml-2 rounded-md hover:bg-gray-600 p-1 sm:ml-6 sm:mt-2">
                        <img className="w-6" src='/github.svg' alt="github"/>
                    </button>
                </a>
            </div>
        </div>
    );
}

export default ContactMe;
