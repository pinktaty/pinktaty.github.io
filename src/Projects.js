import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {LanguageContext} from "./LanguageContext";

const colors = ['black','#FDFFA3','#A2E4A2','#59B4C3','#F59AF0'];
const initialDegrees = [-24, -18, -12, -6, 0];
const limits = [348, 342, 336, 330, 324];
const links = ["#", "https://github.com/pinktaty/DataStructures", "https://github.com/pinktaty/GatocinaPurrfecta", "https://pinktaty.github.io/iDeal-web", "#"]



function Projects({setBodyColor}) {
    const timeOutFirstAnimation = useRef(null);
    const timeOutCompleteAnimation = useRef(null);

    // Index project is the circle that can move at that time.
    const [indexProject, setIndexProject] = useState(4);
    const [degreesProject, setDegreesProject] = useState(initialDegrees);
    const [opacityProject, setOpacityProject] = useState([1, 1, 1, 1, 1]);
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

    const auxCreateTechs = (numProject) => {
        const project = languageData.projects.list[numProject];
        const techs = [];
        for (let i = 0; i < project.technologies.length; i++) {
            techs.push(
                <li className="list-none mx-2">{`${project.technologies[i]}`}</li>
            );
        }
        return techs;
    }

    const createCircles = (numCircles) => {
        // The last to be created is the one on top.
        const circles = [];

        for(let i = indexProject, j = 0; j < numCircles+1; i++, j++) {
           if(i === numCircles) i = 0;
            circles.push(
               <div
                   onMouseEnter={() => updateHover(i)}
                   className="absolute circle rounded-full w-[15rem] h-[15rem] sm:w-[24rem] sm:h-[24rem] items-center flex justify-center"
                   style={{
                       backgroundColor: colors[i],
                       opacity: opacityProject[i],
                       transformOrigin: "12% 20%",
                       transform: `rotate(${degreesProject[i]}deg)`
                   }}
               >
                   <div className="flex flex-col justify-center items-center">
                       <a href={links[i]} target="_blank" rel="noopener noreferrer">
                           <h1 className="text-white font-bold font-press-start text-xs sm:text-xl mx-6 text-center hover:text-black">{`${languageData.projects.list[i].title}`}</h1>
                       </a>
                       <div className="text-center ml-3 mr-3 font-mono">
                           <h3 className="text-xs sm:text-base mr-10 ml-10 mt-4">{`${languageData.projects.list[i].description}`}</h3>
                           <div className="flex justify-center items-center mt-8 mx-8">
                               <ul className="flex text-xs">
                                   {auxCreateTechs(i)}
                               </ul>
                           </div>
                       </div>
                   </div>
               </div>
           );
        }

        return circles;
    }

    const completeAnimation = useCallback(() => {
        setBodyColor(colors[indexProject]);

        if (degreesProject[indexProject] < limits[indexProject]) {
            timeOutCompleteAnimation.current = setTimeout(() => {
                setDegreesProject(prevState => {
                    const newDegrees = [...prevState];
                    newDegrees[indexProject] += 5;
                    // Make the behind circles move.
                    for(let i = indexProject, j = initialDegrees.length-1; j > 0; i--){
                        if(i === -1) i = initialDegrees.length-1;
                        if(i !== indexProject){
                            if(newDegrees[i] !== initialDegrees[j]){
                                newDegrees[i] += 1;
                            }
                            j--;
                        }
                    }
                    return newDegrees;
                });
                setOpacityProject( prevState => {
                    const newOpacity = [...prevState];
                    newOpacity[indexProject] -= 0.02;
                    return newOpacity;
                });
                setGotHovered(prevState => {
                    const newHovered = [...prevState];
                    newHovered[indexProject] = false;
                    return newHovered;
                })
                }, 30);
        } else {
            setIsClicked(prevState => {
                const newIsClicked  = [...prevState];
                newIsClicked[indexProject] = false;
                setDegreesProject(prevState => {
                    const newDegrees = [...prevState];
                    newDegrees[indexProject] = initialDegrees[0];
                    return newDegrees;
                })
                setOpacityProject( prevState => {
                    const newOpacity = [...prevState];
                    newOpacity[indexProject] = 1;
                    return newOpacity;
                });
                setIndexProject(prevState => {
                    return prevState !== 0 ? prevState - 1 : 4;
                });
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
            }, 35);
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
            className="projects justify-center flex h-[38rem] sm:h-screen items-center"
        >
            {createCircles(5)}
        </div>
    );
}

export default Projects;