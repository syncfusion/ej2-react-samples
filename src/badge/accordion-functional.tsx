import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { createElement } from '@syncfusion/ej2-base';
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective } from '@syncfusion/ej2-react-navigations';
import './accordion.css';

const Accordion = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    // Assigning badge data
    const badgeContent: string[] = ['7 New', '27 New', '2 New', '14 New'];

    const accordionTemplate = () => {
        return (
            <div>
                <ul>
                    <li className='msg'>
                        <span className='e-acrdn-icons e-content-icon people'></span>
                        Message Thread
                    </li>
                    <li className='msg'>
                        <span className='e-acrdn-icons e-content-icon people'></span>
                        Message Thread
                    </li>
                </ul>
            </div>
        );
    }

    const onCreated = () => {
        // Appending Badge component after the accordion rendered in created event
        let element: HTMLElement = document.getElementById('accordion');
        let iconElement: HTMLElement[] = Array.prototype.slice.call((element as HTMLElement).querySelectorAll('.e-toggle-icon'));
        for (let i: number = 0; i < iconElement.length; i++) {
            // Success Badge Element
            let badge: HTMLSpanElement = createElement('span', { className: 'e-badge e-badge-success' });
            badge.textContent = badgeContent[i];
            iconElement[i].appendChild(badge);
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section badge-samples'>
                <div className="sample_container badge-accordion">
                    <AccordionComponent id="accordion" created={onCreated.bind(this)}>
                        <AccordionItemsDirective>
                            <AccordionItemDirective header='Robert' iconCss='e-people e-acrdn-icons' expanded={true} content={accordionTemplate} />
                            <AccordionItemDirective header='Kevin' iconCss='e-people e-acrdn-icons' content={accordionTemplate} />
                            <AccordionItemDirective header='Eric' iconCss='e-people e-acrdn-icons' content={accordionTemplate} />
                            <AccordionItemDirective header='Peter' iconCss='e-people e-acrdn-icons' content={accordionTemplate} />
                        </AccordionItemsDirective>
                    </AccordionComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the integration of badges into the accordion component to display the thread notification count.</p>
            </div>

            <div id="description">
                <p>The badge can be integrated into the accordion with the help of templates to display the count of new messages in the
                    message thread. Here, the success badge is used in the accordion. To add success badge, add the
                    <code>.e-badge-success</code> class.
                </p>
            </div>
        </div>
    )
}
export default Accordion;
