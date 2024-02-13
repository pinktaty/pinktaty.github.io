import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {LanguageContext} from "./LanguageContext";

const colors = ['black','#FDFFA3','#A2E4A2','#59B4C3','#F59AF0'];

function Projects({setBodyColor}) {
    const timeOutFirstAnimation = useRef(null);
    const timeOutCompleteAnimation = useRef(null);

    // Index project es el proyecto que se puede mover.
    const [indexProject, setIndexProject] = useState(4);
    const [degreesProject, setDegreesProject] = useState([336, 342, 348, 354, 0]);
    const [gotHovered, setGotHovered] = useState([false, false, false, false]);
    const [upProject, setUpProject] = useState([false, false, false, false, false]);
    const [isClicked, setIsClicked] = useState([false, false, false, false, false]);

    const {languageData} = useContext(LanguageContext);

    const updateClick = () => {
        if (!isClicked[indexProject]) {
            const newIsClicked = [...isClicked];
            newIsClicked[indexProject] = true;
            setIsClicked(newIsClicked);
        }
    }

    const updateHover = () => {
        if (!gotHovered[indexProject]) {
            setUpProject(prevState => {
                const newUpProject = [...prevState];
                newUpProject[indexProject] = true;
                return newUpProject;
            });
            setGotHovered(prevState => {
                const newGotHovered = [...prevState];
                newGotHovered[indexProject] = true;
                return newGotHovered;
            });
        }
    }

    const createCircles = (numCircles) => {
        // El último en ser creado es el que estará hasta arriba.
        const circles = [];

        for(let i = 0; i < numCircles; i++){
           circles.push(
               <div
                   onMouseEnter={() => updateHover(i)}
                   className="absolute circle rounded-full w-[24rem] h-[24rem] items-center flex justify-center"
                   style={{
                       backgroundColor: colors[i],
                       transformOrigin: "12% 20%",
                       transform: `rotate(${degreesProject[i]}deg)`
                   }}
               >
                   <div>
                       <h1 className="text-black">Projects</h1>
                   </div>
               </div>
           );
        }

        return circles;
    }

    const completeAnimation = useCallback(() => {
        setBodyColor(colors[indexProject]);
        if (degreesProject[indexProject] < 330) {
            timeOutCompleteAnimation.current = setTimeout(() => {
                setDegreesProject(prevState => {
                    const newDegrees = [...prevState];
                    newDegrees[indexProject] += 3;
                    return newDegrees;
                });}, 30);
        } else {
            setIsClicked(prevState => {
                const newIsClicked  = [...prevState];
                newIsClicked[indexProject] = false;
                return newIsClicked;
            });
        }
    }, [degreesProject, indexProject, timeOutCompleteAnimation, setBodyColor]);

    const hoverAnimation = useCallback(() => {
        if (degreesProject[indexProject] < 70) {
            timeOutFirstAnimation.current = setTimeout(() => {
                setDegreesProject(prevState => {
                    const newDegrees = [...prevState];
                    if (upProject[indexProject]) {
                        newDegrees[indexProject] += 3;
                        if(newDegrees[indexProject] === 69){
                            setUpProject(prevState => {
                                const newUpProject = [...prevState];
                                newUpProject[indexProject] = false;
                                return newUpProject;
                            });
                        }
                    } else {
                        newDegrees[indexProject] -= 3;
                        if (degreesProject[indexProject] === 3) {
                            setGotHovered(prevState => {
                                const newGotHovered = [...prevState];
                                newGotHovered[indexProject] = false;
                                return newGotHovered;
                            });
                        }
                    }
                    return newDegrees;
                });
            }, 50);
        }
    }, [degreesProject, indexProject,  setDegreesProject, timeOutFirstAnimation, upProject]);

    useEffect(() => {
        if(isClicked[indexProject]){
            completeAnimation();
        } else if(gotHovered[indexProject]){
            if(!isClicked[indexProject]) {
                hoverAnimation();
            }
        }
    }, [isClicked, gotHovered, indexProject, completeAnimation, hoverAnimation]);

    return(
        <div
            onClick={() => updateClick()}
            className="projects justify-center flex h-screen items-center"
        >
            {createCircles(5)}
        </div>
    );
}

export default Projects;