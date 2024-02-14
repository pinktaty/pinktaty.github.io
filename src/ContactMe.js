import {useContext, useState} from "react";
import {LanguageContext} from "./LanguageContext";

function ContactMe() {
    const [open, setOpen] = useState(false);
    const {languageData} = useContext(LanguageContext);
    const socials = [
        {name: "linkedin", link: "https://www.linkedin.com/in/diaz-lilith04"},
        {name: "github", link: "https://github.com/pinktaty"}
    ]

    const toggleMenu = () => {
        setOpen(!open);
    };

    const createSocials = (socials) => {
        const socialsCreated = [];
        for (let i = 0; i < socials.length ; i++) {
            socialsCreated.push(
                <a className="ml-2" href={`${socials[i].link}`} target="_blank" rel="noopener noreferrer">
                    <button onClick={() => toggleMenu()}
                            className="rounded-md hover:bg-gray-600 p-1.5 sm:ml-6">
                        <img className="w-5 ml-2" src={`/${socials[i].name}.svg`} alt={`${socials[i].name}`}/>
                    </button>
                </a>
            );
        }
        return socialsCreated
    }

    return (
        <div className="relative inline-block text-left">
            <button onClick={toggleMenu} className="flex items-center mr-1.5 font-mono">{languageData.contactMe.title}</button>
            <div className={`${open ? 'block' : 'hidden'} inline-block mt-1 w-22 sm:absolute sm:mt-3`}>
                {createSocials(socials)}
            </div>
        </div>
    );
}

export default ContactMe;
