import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "./Language";

function AboutMe() {
    const language = useContext(LanguageContext);
    const adjectives = ["programmer", "web developer", "hacker", "scientist"];
    const baseText = "";

    // Use states to manage the variables that affect the component's renderization
    const [presentation, setPresentation] = useState(baseText);
    // State that tells if the function will write or delete
    const [typing, setTyping] = useState(true);
    // State that preserves the selected text
    const [selectedText, setSelectedText] = useState(baseText);
    // Index of array adjectives
    const [indexAdjectives, setIndexAdjectives] = useState(0);
    // Index of the letters from an object from the array adjectives
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

        setTimeout(animation, 220);
    });

    return(
        <div className="about-me ml-10">
            <h1 className="text-6xl text-white mt-[8rem]">{language.aboutMe.presentation} {presentation}<span>|</span><span
                className="bg-gray-100 text-black">{selectedText}</span></h1>
            <h1 className="text-6xl text-white mt-[5rem]">I am Lilith Díaz</h1>
            <p className="text-xl text-white ml-[12rem] mt-4">(@pinktaty)</p>
        </div>
    );
}


export default AboutMe;
