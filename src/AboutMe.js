import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "./LanguageContext";

function AboutMe() {
    const {languageData} = useContext(LanguageContext);
    const adjectives = [languageData.aboutMe.adjectives[0], languageData.aboutMe.adjectives[1], languageData.aboutMe.adjectives[2]];
    const baseText = "";

    const [presentation, setPresentation] = useState(baseText);
    const [typing, setTyping] = useState(true);
    const [selectedText, setSelectedText] = useState(baseText);
    const [indexAdjectives, setIndexAdjectives] = useState(0);
    const [indexWord, setIndexWord] = useState(0);

    useEffect(() =>{
        setPresentation(baseText);
        setTyping(true);
        setSelectedText(baseText);
        //setIndexAdjectives(0);
        setIndexWord(0);
    }, [languageData])

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
        const intervalAnimation = setTimeout(animation, 200);
        return () => clearTimeout(intervalAnimation);
    }, [typing, indexWord, indexAdjectives, adjectives, presentation]);

    return(
        <div className="about-me ml-9">
            <h1 className="md:text-3xl text-xl text-white mt-[10rem] font-press-start mr-7">
                {languageData.aboutMe.presentation} {presentation}
                <span>|</span><span
                className="bg-gray-100 text-black font-press-start">{selectedText}</span></h1>
            <h1 className="md:text-3xl text-xl  text-white mt-[5rem] mr-7 font-press-start">{languageData.aboutMe.description} Lilith Díaz</h1>
        </div>
    );
}


export default AboutMe;
