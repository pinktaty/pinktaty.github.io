import React from "react";

function ProjectCircle({ backgroundColor, transformOrigin, transform, onMouseEnter }) {
    return (
        <div
            onMouseEnter={onMouseEnter}
            className="absolute circle rounded-full w-[24rem] h-[24rem] items-center flex justify-center"
            style={{ backgroundColor, transformOrigin, transform }}
        >
            <div>
                <h1 className="text-black">Projects</h1>
            </div>
        </div>
    );
}

export default ProjectCircle;
