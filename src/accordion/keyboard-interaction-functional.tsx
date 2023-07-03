import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective } from '@syncfusion/ej2-react-navigations';
import { updateSampleSection } from '../common/sample-base';

const KeyboardInteraction = () => {
    let accObj = useRef<AccordionComponent>(null);

    useEffect(() => {
        updateSampleSection();
        const handleKeyDown = (e) => {
            if (e.altKey && e.keyCode === 74 && accObj.current) {
                accObj.current.select(0);
            }
        };
        document.body.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    
    const acrdnheader1 = () => {
        return (
            <div>ASP.NET</div>
        );
    }
    const acrdnheader2 = () => {
        return (
            <div>ASP.NET MVC</div>
        );
    }
    const acrdnheader3 = () => {
        return (
            <div>JavaScript</div>
        );
    }
    const acrdnContent1 = () => {
        return (
            <div>Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services. ASP.NET pages execute on the server and generate markup such as HTML, WML, or XML that is sent to a desktop or mobile browser. ASP.NET pages use a compiled,event-driven programming model that improves performance and enables the separation of application logic and user interface.</div>
        );
    }
    const acrdnContent2 = () => {
        return (
            <div>The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller. The ASP.NET MVC framework provides an alternative to the ASP.NET Web Forms pattern for creating Web applications.The ASP.NET MVC framework is a lightweight, highly testable presentation framework that (as with Web Forms-based applications) is integrated with existing ASP.NET features, such as master pages and membership-based authentication.</div>
        );
    }
    const acrdnContent3 = () => {
        return (
            <div>JavaScript (JS) is an interpreted computer programming language.It was originally implemented as part of web browsers so that client-side scripts could interact with the user, control the browser, communicate asynchronously, and alter the document content that was displayed.More recently, however, it has become common in both game development and the creation of desktop applications.</div>
        );
    }

    return (
        <div className='control-pane'>
            <div className='control-section accordion-control-section'>
                <div className='control Accordion-sample' style={{ margin: '25px 0' }}>
                    {/* Render the Accoridon Component */}
                    <AccordionComponent ref={accObj}>
                        <AccordionItemsDirective>
                            <AccordionItemDirective header={acrdnheader1} expanded={true} content={acrdnContent1} />
                            <AccordionItemDirective header={acrdnheader2} content={acrdnContent2} />
                            <AccordionItemDirective header={acrdnheader3} content={acrdnContent3} />
                        </AccordionItemsDirective>
                    </AccordionComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This demo showcases the keyboard shortcuts applicable on <code>Accordion</code>.
                </p>
            </div>
            <div id="description">
                <i>Below key combinations can be used in Accordion to initiate various actions.</i>
                <ul>
                    <li>
                        <b>Focus</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Alt</kbd> + <kbd>J</kbd></span>
                                <span> - Focuses on the first component of the demo.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Home</kbd></span>
                                <span> - Focus the first Accordion header.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>End</kbd></span>
                                <span> - Focus the last Accordion header.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Down arrow</kbd></span>
                                <span> - Focus the next Accordion header.</span>
                            </li>
                            <li>
                                <span className="key-class"><kbd>Up arrow</kbd></span>
                                <span> - Focus the previous Accordion header.</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>Expand and Collapse</b>
                        <ul>
                            <li>
                                <span className="key-class"><kbd>Enter</kbd> or <kbd>Space</kbd></span>
                                <span> - Expand and collapse when the focus is on the Accordion header.</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
    
export default KeyboardInteraction;