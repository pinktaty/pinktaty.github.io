import {useContext, useState} from "react";
import {LanguageContext} from "./LanguageContext";

function CV() {
    const [open, setOpen] = useState(false);

    const {languageData} = useContext(LanguageContext);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const download = () => {
        const link = document.createElement('a');
        if(languageData.definition === "no"){
            link.href = "./CV-no.pdf"
            link.download = 'LilithDiaz-CV-no.pdf';
        } else if(languageData.definition === "es"){
            link.href = "./CV-es.pdf"
            link.download = 'LilithDiaz-CV-es.pdf';
        } else {
            link.href = "./CV-en.pdf"
            link.download = 'LilithDiaz-CV-en.pdf';
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toggleMenu();
    }

    return (
        <div className="relative inline-block text-left">
            <button onClick={toggleMenu} className="flex items-center mr-1.5 font-mono">CV</button>
            <div className={`${open ? 'block' : 'hidden'} inline-block mt-1 w-22 sm:absolute sm:mt-3`}>
                <button onClick={() => download()}
                        className="w-full rounded-md hover:bg-gray-600 p-0.5">
                    <img className="h-5" src='/download.svg' alt="download"/>
                </button>
            </div>
        </div>
    );
}

export default CV;