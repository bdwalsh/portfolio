import { useState } from 'react';
const AppMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
      setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center items-center flex-col bg-brand-primary fixed w-full top-0 z-100 py-3">
      <button
        onClick={handleClick}
        className="block sm:hidden flex flex-col justify-center h-[25px]"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className={`bg-accent block transition-all duration-300 ease-out 
                        h-0.5 w-6 rounded-sm ${isOpen ? 
                        'rotate-45 translate-y-1' : '-translate-y-0.5'
                        }`} >
        </span>
        <span className={`bg-accent block transition-all duration-300 ease-out 
                        h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 
                        'opacity-0' : 'opacity-100'
                        }`} >
        </span>
        <span className={`bg-accent block transition-all duration-300 ease-out 
                        h-0.5 w-6 rounded-sm ${isOpen ? 
                        '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                        }`} >
        </span>    
      </button>
      <div className={`flex justify-center sm:block w-full lg:max-w-[75rem] ${isOpen ? 'block' : 'hidden'}`}>
          <nav className="flex flex-col sm:flex-row justify-center items-center" aria-label="Primary">
              <a className="px-4 py-2 hover:text-accent" href="#home">Home</a>
              <a className="px-4 py-2 hover:text-accent" href="#projects">Projects</a>
              <a className="px-4 py-2 hover:text-accent" href="#skills">Skills</a>
              <a className="px-4 py-2 hover:text-accent" href="#about">About</a>
              <a className="px-4 py-2 hover:text-accent" href="#contact">Contact</a>
          </nav>
      </div>
    </div>
  );
};

export default AppMenu;