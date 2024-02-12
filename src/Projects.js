import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {LanguageContext} from "./LanguageContext";
import ProjectCircle from "./ProjectCircle";

function Projects({setBodyColor}) {
    const timeOutFirstAnimation = useRef(null);
    const timeOutCompleteAnimation = useRef(null);
    const colors = ['#F59AF0', '#A980E4', '#59B4C3', '#A2E4A2', '#FDFFA3', 'black'];

    // Index Project es para saber quien es el proyector principal
    // (el que se muestra hasta el frente en el momento).
    const [indexProject, setIndexProject] = useState(0);
    const [degreesProject, setDegreesProject] = useState([0, 354, 348, 342, 336]);
    const [gotHovered, setGotHovered] = useState(false);
    const [upProject, setUpProject] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const {languageData} = useContext(LanguageContext);


    const createCircles = () => {
    const elements = [];
    for (let i = 0, j = 6; i < 6 && j > 0; i++, j--) {
        elements.push(
            <ProjectCircle
                backgroundColor={colors[j]}
                transformOrigin="12% 20%"
                transform={`rotate(${""}deg)`}
                onMouseEnter={updateHover}
            />
        );
    }

    return elements;

    }

    const updateClick = () => {
        if(!isClicked){
            setIsClicked(true);
        }
    }

    const updateHover = () => {
        if(!gotHovered){
            setUpProject(true);
            setGotHovered(true);
        }
    }

    const completeAnimation = useCallback( () => {
        setBodyColor(colors[indexProject]);
        if (degreesProject[indexProject] < 330) {
            timeOutCompleteAnimation.current = setTimeout(() => {
                setDegreesProject(prevState => {
                    const newDegrees = [...prevState];
                    newDegrees[indexProject] += 3;
                    return newDegrees;
                });}, 30);
        } else {
            setIsClicked(false);
        }
    }, [degreesProject, indexProject, timeOutCompleteAnimation, setBodyColor, colors]);

    const hoverAnimation = useCallback(() => {
        if (degreesProject[indexProject] < 70) {
            timeOutFirstAnimation.current = setTimeout(() => {
                setDegreesProject(prevState => {
                    const newDegrees = [...prevState];
                    if (upProject) {
                        newDegrees[indexProject] += 3;
                        if(newDegrees[indexProject] === 69){
                            setUpProject(false);
                        }
                    } else {
                        newDegrees[indexProject] -= 3;
                        if (degreesProject[indexProject] === 3) {
                            setGotHovered(false);
                        }
                    }
                    return newDegrees;
                });
            }, 50);
        }
    }, [degreesProject, indexProject,  setDegreesProject, timeOutFirstAnimation, upProject]);

    useEffect(() => {
        if(isClicked){
            completeAnimation();
        } else if(gotHovered){
            if(!isClicked) {
                hoverAnimation();
            }
        }
    }, [isClicked, gotHovered, indexProject, completeAnimation, hoverAnimation]);

    // TODO: realmente sólo necesito objetos que reciban los parametros grados
    // TODO: y color

    // TODO: volver todos los divs en componentes para poder tener una array que manejar
    // TODO: con el objetivo de poder manejar sus posiciones dinamicamente

    return(
        <div
            onClick={() => updateClick()}
            className="projects justify-center flex h-screen items-center"
        >
            <>
                {[...Array(5)].map((_, i) => (
                    <ProjectCircle
                        backgroundColor={colors[-i]}
                        transformOrigin="12% 20%"
                        transform={`rotate(${""}deg)`}
                        onMouseEnter={updateHover}
                    />
                ))}
            </>
        </div>
    );
}

export default Projects;