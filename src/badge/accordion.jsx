import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { createElement } from '@syncfusion/ej2-base';
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective } from '@syncfusion/ej2-react-navigations';
import './accordion.css';
export class Accordion extends SampleBase {
    constructor() {
        super(...arguments);
        // Assigning badge data
        this.badgeContent = ['7 New', '27 New', '2 New', '14 New'];
    }
    accordionTemplate() {
        return (<div>
                <li className='msg'>
                    <span className='e-acrdn-icons e-content-icon people'></span>
                    Message Thread
                </li>
                <li className='msg'>
                    <span className='e-acrdn-icons e-content-icon people'></span>
                    Message Thread
                </li>
            </div>);
    }
    onCreated() {
        // Appending Badge component after the accordion rendered in created event
        let element = document.getElementById('accordion');
        let iconElement = Array.prototype.slice.call(element.querySelectorAll('.e-toggle-icon'));
        for (let i = 0; i < iconElement.length; i++) {
            // Success Badge Element
            let badge = createElement('span', { className: 'e-badge e-badge-success' });
            badge.textContent = this.badgeContent[i];
            iconElement[i].appendChild(badge);
        }
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section badge-samples'>
                    <div className="sample_container badge-accordion">
                        <AccordionComponent id="accordion" created={this.onCreated.bind(this)}>
                            <AccordionItemsDirective>
                                <AccordionItemDirective header='Robert' iconCss='e-people e-acrdn-icons' expanded={true} content={this.accordionTemplate}/>
                                <AccordionItemDirective header='Kevin' iconCss='e-people e-acrdn-icons' content={this.accordionTemplate}/>
                                <AccordionItemDirective header='Eric' iconCss='e-people e-acrdn-icons' content={this.accordionTemplate}/>
                                <AccordionItemDirective header='Peter' iconCss='e-people e-acrdn-icons' content={this.accordionTemplate}/>
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
            </div>);
    }
}
