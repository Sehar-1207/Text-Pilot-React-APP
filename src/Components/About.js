import React, { useState } from 'react';

export default function About() {

    const[mystyle, setMyStyle] = useState({
        color: 'black',
        backgroundColor: 'White',
    });
    const [btnText, setBtnText] = useState("Enable Dark Mode");
    const toogleMode = () => {
        if (mystyle.color === 'white') {
            setMyStyle({
                color: 'black',
                backgroundColor: 'white'
            });
            setBtnText("Enable Dark Mode");
        } else {
            setMyStyle({
                color: 'white',
                backgroundColor: 'black',
                border: '1px solid white'
            });
            setBtnText("Enable Light Mode");
        }
    };

    return (
        <>
            <div className="accordion p-2" style={mystyle} id="accordionExample">
                <h1 className="m-3">About Us</h1>
                <div className="accordion-item" >
                    <h2 className="accordion-header">
                        <button style={mystyle}
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" 
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            Accordion Item #1
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show" style={mystyle}
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <strong>This is the first item’s accordion body.</strong> It is
                            shown by default, until the collapse plugin adds the appropriate
                            classes that we use to style each element. These classes control
                            the overall appearance, as well as the showing and hiding via CSS
                            transitions. You can modify any of this with custom CSS or
                            overriding our default variables. It’s also worth noting that just
                            about any HTML can go within the <code>.accordion-body</code>,
                            though the transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
