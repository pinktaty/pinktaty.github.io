import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "./LanguageContext";

function AboutMe() {
    const adjectives = ["programmer", "web developer", "hacker", "scientist"];
    const baseText = "";
    const {languageData} = useContext(LanguageContext);

    const [presentation, setPresentation] = useState(baseText);
    const [typing, setTyping] = useState(true);
    const [selectedText, setSelectedText] = useState(baseText);
    const [indexAdjectives, setIndexAdjectives] = useState(0);
    const [indexWord, setIndexWord] = useState(0);

    useEffect(() => {
        const animation = async () => {
            if (typing) {
                setIndexWord(prevState => prevState + 1);
                setPresentation(prevState => prevState + adjectives[indexAdjectives].charAt(indexWord));
                if(indexWord === adjectives[indexAdjectives].length - 1){
                    setTyping(false);
                }
            } else {
                setSelectedText(prevState => presentation.slice(indexWord-1, indexWord) + prevState);
                setPresentation(prevState => prevState.slice(0, indexWord-1));
                setIndexWord(prevState => prevState - 1);
                if(indexWord === 0){
                    setIndexAdjectives(prevState => (prevState + 1) % adjectives.length);
                    setPresentation(baseText);
                    setSelectedText(baseText);
                    setTyping(true);
                }
            }
        }
        setTimeout(animation, 200);
    });

    return(
        <div className="about-me ml-10">
            <h1 className="text-6xl text-white mt-[8rem]">
                {languageData.aboutMe.presentation} {presentation}
                <span>|</span><span
                className="bg-gray-100 text-black">{selectedText}</span></h1>
            <h1 className="text-6xl text-white mt-[5rem]">I am Lilith Díaz</h1>
            <p className="text-xl text-white ml-[12rem] mt-4 hover:text-fuchsia-300"><a href="https://github.com/pinktaty" target="_blank" rel="noopener noreferrer">@pinktaty</a></p>
        </div>
    );
}


export default AboutMe;
