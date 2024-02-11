import {useCallback, useEffect, useRef, useState} from "react";

function Projects({setBodyColor}) {
    const timeOutFirstAnimation = useRef(null);
    const timeOutCompleteAnimation = useRef(null);
    const colors = ['#F59AF0', '#A980E4', '#59B4C3', '#A2E4A2', '#FDFFA3', 'black'];

    const [indexProject, setIndexProject] = useState(0);
    const [degreesProject, setDegreesProject] = useState([0, 352, 344, 336, 328]);
    const [gotHovered, setGotHovered] = useState(false);
    const [upProject, setUpProject] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

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
        if (degreesProject[indexProject] < 360) {
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

    return(
        <div
            onClick={() => updateClick()}
            className="projects justify-center flex h-screen items-center"
        >
            <div
                onMouseEnter={() => updateHover()}
                className="absolute circle rounded-full w-[24rem] h-[24rem] items-center flex justify-center"
                style={{backgroundColor: colors[indexProject+4], transformOrigin: "12% 20%", transform: `rotate(${degreesProject[4]}deg)`}}
            >
                <div>
                    <h1 className="text-black">Projects</h1>
                </div>
            </div>
            <div
                onMouseEnter={() => updateHover()}
                className="absolute circle rounded-full w-[24rem] h-[24rem] items-center flex justify-center"
                style={{backgroundColor: colors[indexProject+3], transformOrigin: "12% 20%", transform: `rotate(${degreesProject[3]}deg)`}}
            >
                <div>
                    <h1 className="text-black">Projects</h1>
                </div>
            </div>
            <div
                onMouseEnter={() => updateHover()}
                className="absolute circle rounded-full w-[24rem] h-[24rem] items-center flex justify-center"
                style={{backgroundColor: colors[indexProject+2], transformOrigin: "12% 20%", transform: `rotate(${degreesProject[2]}deg)`}}
            >
                <div>
                    <h1 className="text-black">Projects</h1>
                </div>
            </div>
            <div
                onMouseEnter={() => updateHover()}
                className="absolute circle rounded-full w-[24rem] h-[24rem] items-center flex justify-center"
                style={{backgroundColor: colors[indexProject+1], transformOrigin: "12% 20%", transform: `rotate(${degreesProject[1]}deg)`}}
            >
                <div>
                    <h1 className="text-black">Projects</h1>
                </div>
            </div>
            <div
                onMouseEnter={() => updateHover()}
                className="absolute circle rounded-full w-[24rem] h-[24rem] items-center flex justify-center"
                style={{backgroundColor: colors[indexProject], transformOrigin: "12% 20%", transform: `rotate(${degreesProject[0]}deg)`}}
            >
                <div>
                    <h1 className="text-black">Projects</h1>
                </div>
            </div>
        </div>
    );
}

export default Projects;