
import {useState} from "react";

function CV() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const download = () => {
        const link = document.createElement('a');
        link.href = '/pdf.pdf';
        link.download = 'CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toggleMenu();
    }

    return (
        <div className="relative inline-block text-left">
            <button onClick={toggleMenu} className="flex items-center mr-1.5">CV</button>
            <div className={`${open ? 'block' : 'hidden'} absolute mt-3 w-22`}>
                <button onClick={() => download()}
                        className="w-full rounded-md hover:bg-gray-600 p-0.5">
                    <img src='/download.svg' alt="download"/>
                </button>
            </div>
        </div>
    );
}

export default CV;