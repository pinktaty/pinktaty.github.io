import {useState} from "react";

function ContactMe() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <div className="relative inline-block text-left">
            <button onClick={toggleMenu} className="flex items-center mr-1.5">Contact me</button>
            <div className={`${open ? 'block' : 'hidden'} absolute mt-3 w-22`}>
                <a href="https://www.linkedin.com/in/diaz-lilith04" target="_blank" rel="noopener noreferrer">
                  <button onClick={() => toggleMenu()}
                          className=" rounded-md hover:bg-gray-600 p-1.5 ml-6">
                      <img className="w-6" src='/linkedin.svg' alt="linkedin"/>
                  </button>
                </a>
            </div>
        </div>
    );
}

export default ContactMe;
