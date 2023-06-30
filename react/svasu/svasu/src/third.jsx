import { useState, useRef , useEffect} from "react";

import logo from "./assets/Logo-blk.png"



import "./third.css"


function SlamIn({text, max, min}) {
    const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const currentPosition = window.pageYOffset;
    setScrollPosition(currentPosition);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return(
    <p className="slam-in" style={{fontSize: `${195- (((Math.min(scrollPosition, max)- min)*100) / 500)}px`}}>{text}</p>
  );
}

function isElementInViewportCenter(element) {
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    const elementCenter = (elementTop + elementBottom) / 2;
  
    const viewportCenter = viewportHeight / 2;
  
    const threshold = 100; 
    const isCentered = Math.abs(viewportCenter - elementCenter) <= threshold;
  
    return isCentered;
  }

  
function BlackBorderText({text}) {
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 880px)").matches);

  useEffect(() => {
    window.matchMedia("(min-width: 880px)").addEventListener("change", e=> setMatches(e.matches)); 
  }, []);

    const elementRef = useRef(null);
    const [isCentered, setIsCentered] = useState(false);

    useEffect(() => {
        function handleScroll() {
          if (elementRef.current) {
            const isElementCentered = isElementInViewportCenter(elementRef.current);
            setIsCentered(isElementCentered);
          }
        }
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    
    return (
      <div className={isCentered ? "black-border" : "white-border"} ref={elementRef}>
      {matches && (<p className={isCentered ? "black-text" : "white-text"}>{text}</p>)}
      {!matches && (<p className={isCentered ? "black-text-sm" : "white-text-sm"}>{text}</p>)}
  </div>
    );
} 

function Third() {
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 440px)").matches);

  useEffect(() => {
    window.matchMedia("(min-width: 440px)").addEventListener("change", e=> setMatches(e.matches)); 
  }, []);

    return (
        <div className="third-container">
        <p className={!matches ? "title-sm" : "title"}>Who all can benefit <br></br> from <img className={!matches ? "inline-image-sm" : "inline-image"} src={logo}></img> Scorm</p>
        <SlamIn text={"SVASU For Individuals"} max={2000} min={1600} />
        <BlackBorderText text={"Self create your truly responsive, interactive, media rich content."} />
        <BlackBorderText text={"Convert pdf to scorm convert ppt to scorm convert scorm to pdf convert video to scorm with best elearning authoring tools"}/>

        <button className="oval-button">ASK US HOW</button>

        <SlamIn text={"SVASU For Trainers"} min={3000} max={3600}/>

        <BlackBorderText text={"Self-create your truely responsive, interactive and media-rich content with our best authoring tool, Svasu."}/>
        <BlackBorderText text={"Transform your PPT / PDF / Word document into an online course with our course management software, Svasu."}/>
        <BlackBorderText text={"Add assessments, media, images, videos."}/>
        <BlackBorderText text={"Create SVASU Scorm output (ready to deploy on any of your client's LMS)."}/>

        <button className="oval-button">ASK US HOW</button>

        <SlamIn text={"SVASU For Corporate User"} min={4700} max={5400}/>

        <BlackBorderText text={"Transform your training content into responsive mobile format"}/>
        <BlackBorderText text={"Transform your classroom training into eLearning with your internal team"}/>
        <BlackBorderText text={"Transform your student guides into SVASU Scorm format"}/>
        <BlackBorderText text={"Create Video-based learning with interactive templates and assessments"}/>

        <button className="oval-button">ASK US HOW</button>
    </div>
    );
}

export default Third;