import { useState, useRef , useEffect} from "react";

import "./second.css"

import logo from "./assets/Logo-blk.png"



function FadeInContent() {
    const [isVisible, setVisible] = useState(false);

    const domR = useRef();

    useEffect( () => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
          });

        observer.observe(domR.current);
        return () => observer.unobserve(domR.current);
    }, [] );

    return (
        <div className={`fade-in ${isVisible ? "is-visible" : ""}`} ref={domR}>
            <img src={logo} alt="" />
            <p>is a simple to use platform to <br></br>
transform your knowledge <br></br>
into <span className="black">Digital Learning</span></p>
        </div>
    );
}


function Second() {
    

    return (
        <div className="second-container">
            <FadeInContent />
        </div>
    );
}

export default Second;