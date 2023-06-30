import { useState, useRef , useEffect} from "react";

import "./fourth.css";
import img1 from "./assets/Step-1.jpg"
import img2 from "./assets/Step-2.jpg"
import img3 from "./assets/Step-3.jpg"

import circle from "./assets/circle.png"
import circleG from "./assets/circle-g.png"

import laptop from "./assets/laptopImg.png"
import arrow from "./assets/arrow.png"

import logo from "./assets/Logo-blk.png"

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

function setVisibility(text, lastPos) {
    const divs = document.querySelectorAll(".slamout-container");
    const divsVisible = document.querySelectorAll(".slamout-container-visible");

    for (const d of divs) {
        const paras = d.querySelectorAll('p');
        let matching = false;

        for (const para of paras) {
            if (para.textContent.trim() === text) {
                matching = true;
                break;
            }
        }
        if (matching) {
            d.classList.remove("slamout-container");
            d.classList.add("slamout-container-visible");
        }
    }

    for (const d of divsVisible) {
        const paras = d.querySelectorAll('p');
        let matching = false;

        for (const para of paras) {
            if (para.textContent.trim() === text) {
                matching = true;
                break;
            }
        }
        if (!matching) {
            d.classList.add("slamout-container");
            d.classList.remove("slamout-container-visible");
        }
    }
}

function SlamOut({text}) {
    const textRef = useRef(null);
    const divRef = useRef(null);
    const [divStyle, setDivStyle] = useState({});
    
    var lastPos = 0;
    var isMovingDown = true;
    var opacity = 0;
    var scale = 0;
    var toReduce = false;

    const handleScroll = () => {
        if (lastPos < window.scrollY) {
            isMovingDown = true
        } else if (lastPos > window.scrollY) {
            isMovingDown = false
        }
        lastPos = (window.scrollY);

        if (isElementInViewportCenter(textRef.current)) {
            setVisibility(text);
            
        } else {
            divRef.current.classList.add("slamout-container");
            divRef.current.classList.remove("slamout-container-visible");
            opacity = 0;
            scale = 0;
        }

        if (divRef.current.classList.contains("slamout-container-visible")) {
            console.log("YES");
            var sign = 1;
            var opChange = 0.004 * 2 * 2 * 2;
            var scChange = 0.2;
            if (!isMovingDown) {
                sign = -1;
            }
            if (scale < 0) {
                scale = 19.9;
            }
            if (scale < 20) {
                if (opacity < 1 && !toReduce) {
                    scale += 0.2 * sign;
                    opacity += opChange * sign;
                } else {
                    toReduce = true;
                    scale += 0.2 * sign;
                    opacity -= opChange*sign;
                }
                if (opacity < 0) {
                    opacity = 0;
                }
                setDivStyle({
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    position: "sticky"
                });
            } else {
                scale = 0;
                opacity = 0;
                setDivStyle({});
            }
        } else {
            setDivStyle({});
        }

        
        //console.log(`OPACITY: ${opacity}, SCALE: ${scale} `)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [])
    return (
        <div ref={divRef} className={"slamout-container"}
        >
            <p ref={textRef} className="slamout-text" style={divStyle}>{text}</p>
        </div>
    );
    
}

function FadeIn(props) {
    const [isVisible, setIsVisible] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting))
        });
        observer.observe(ref.current);
    }, []);

    return (
        <div ref={ref} className={`fade-in-cont ${isVisible ? "fade-in-cont-visible" : ""}`}>
            {props.children};
        </div>
    );
}

function Workflow({title, subtitle, image}) {


    return (
        <div className="workflow-container">
            <FadeIn>
            <p className="workflow-title">{title}</p>
            </FadeIn>
            <FadeIn>
            <p className="workflow-sub">{subtitle}</p>
            </FadeIn>
            <FadeIn>
            <img className="workflow-img" src={image}></img>
            </FadeIn>
        </div>
    );
}
const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    var text1 = [`We were struggling with the non-SCORM knowledge pieces generated by multiple 
    stakeholders and departments in the form of presentations and PDF's with SVASU we 
    could transform and add knowledge checks into all to publish responsive SCORM 1.2 packages. 
    Now everything is deployed on our LMS and we could see great value addition to our Learning Library.  
    `, `I have been a trainer for over 35 years and have never thought of transforming my classroom training into eLearning modules. 
    I found myself in disbelief when I learned about SVASU, this was the most economical solution I have ever come across. 
    I am happy with my experimentation package and produced 2 online courses already without any help. 
    Congratulations to the SVASU team for this wonderful simple to use Rapid Online Learning creation platform.
    `,
`We have been producing Video-based learning modules for diverse educational platforms. 
SVASU has added a completely new dimension to our product portfolio. 
We could open new direct corporate segments for our content by transforming Videos into interactive SCORM objects. 
This is an excellent Video to an engaging and responsive online learning creation platform which can be used by our trainers themselves 
without any training . 
`];
    var text2 = ["Learning Director - Global Pharmaceutical Company", "Leadership Trainer", "Video-based learning content library provider"];

    return (
      <div className="carousel">
        <p className="carousel-text">{text1[currentSlide]}</p>
        <p className="carousel-text-bold">{text2[currentSlide]}</p>
  
        <div className="carousel-buttons">
            <img src={(currentSlide === 0) ? circle : circleG} className="circle-img" onClick={()=> setCurrentSlide(0)}></img>

            <img src={(currentSlide === 1) ? circle : circleG} className="circle-img" onClick={()=> setCurrentSlide(1)}></img>

            <img src={(currentSlide === 2) ? circle : circleG} className="circle-img" onClick={()=> setCurrentSlide(2)}></img>

        </div>
      </div>
    );
  };

function Testimonial() {
    return (
        <div className="testimonial-container">
        <p className="workflow-title" style={{fontSize: "110px", fontWeight: 700}}>Testimonials</p>
        <Carousel/>
    </div>
    );
}

function Tutorial() {

    return (
        <div className="tutorial-container">
            <a href="https://www.youtube.com/watch?v=0IqF1MHqX8w&feature=shares">
            <img className="laptop-img" src={laptop}></img>
            </a>
            <div className="text-container">
                <p className="tutorial-text">{`Discover in fewer than two minutes everything that the SVASU platform has to offer and how you may use it. 
                Also, acquire the knowledge necessary to provide the quality of training that your staff demand`}</p>

                <div className="book-demo">
                    <a className="arrow-text">Book a Demo</a>
                    <a><img className="arrow-img" src={arrow}></img></a>
                </div>
            </div>
        </div>
    );
}

function Packages() {

    function Option({subtitle, text}) {
        
        return (
            <div className="option-container">
                <img className="option-logo" src={logo}></img>
                <p className="option-subtitle">{subtitle}</p>
                <p className="option-text">{text}</p>
                <button className="option-button">Choose Plan</button>
            </div>
        );
    }

    return (
        <div className="package-container">
            <p className="package-title">Our Packages</p>
            <p className="package-subtitle">It costs only One Coffee per month</p>

            <div className="options-container">
                <Option subtitle={"With Cloud Space"} text={`Create scorm-based courses/packages and save them on the SVASU CLOUD server.
Be relaxed about the safety and security of your data.
Focus specifically on your training.`}/>
                <Option subtitle={"Without Cloud Space"} text={`You are free to create SVASU scorms and download them to your 
                local system for further use.
We will not be having any copy of your package/course`}/>
            </div>

            <p className="package-footer">Corporate users looking for specific customization and configurations in file size limits may <span><a className="contact-link" href="https://svasu.cloud/contact-us.html">contact us.</a></span></p>
            <p className="package-footer">Maximum size limit per course - 50 MB</p>
        </div>
    );
}

function Fourth() {

    return (
        <div className="fourth-container">
            <p className="fourth-title">Instantly Convert <br></br> Your PowerPoint/PDF/ <br></br> Video Training <br></br> to Interactive Course</p>
            
            <div className="fourth-inner-container">
            <SlamOut text={"Add Branding"}/>
            <SlamOut text={"Add Image"}/>
            <SlamOut text={"Add Audio"}/>
            <SlamOut text={"Add Video"}/>
            <SlamOut text={"Add Assessment"}/>
            <SlamOut text={"Add Interactive Templates"}/>
            <SlamOut text={"SVASU Scorm Package"}/>
            </div>

            <p className="fourth-title">3 Simple Work Flows</p>
            <Workflow title={"Svasu Scorm Work Flow 1"} subtitle={"Create Using Our Existing Templates"} image={img1}></Workflow>
            <Workflow title={"Svasu Scorm Work Flow 2"} subtitle={"Create Using Your Existing Files"} image={img2}></Workflow>
            <Workflow title={"Svasu Scorm Work Flow 3"} subtitle={"Create using your existing Training VIDEO"} image={img3}></Workflow>

            <Testimonial/>

           <FadeIn>
           <p className="how-it-works">How SVASU Works</p>
           </FadeIn>

           <FadeIn>
           <Tutorial/>
           </FadeIn>

           <Packages/>
        </div>
    );
}


export default Fourth;