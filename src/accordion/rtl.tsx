import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './accordion.component.css'

export class RTL extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section accordion-control-section'>
          <div id="athletics" style={{ display: 'none' }}>
            <li>Marathon<span className='e-acrdn-icons e-content-icon marathon'></span></li>
            <li>Javelin Throw<span className='e-acrdn-icons e-content-icon javelin'></span></li>
            <li>Discus Throw<span className='e-acrdn-icons e-content-icon discus'></span></li>
            <li>High Jump<span className='e-acrdn-icons e-content-icon highjump'></span></li>
            <li>Long Jump<span className='e-acrdn-icons e-content-icon longjump'></span></li>
          </div>
          <div id="water_games" style={{ display: 'none' }}>
            <li>Diving<span className='e-acrdn-icons e-content-icon dive'></span></li>
            <li>Swimming<span className='e-acrdn-icons e-content-icon swimming'></span></li>
            <li>Marathon Swimming<span className='e-acrdn-icons e-content-icon marathan_swim'></span></li>
            <li>Synchronized Swimming<span className='e-acrdn-icons e-content-icon sync_swim'></span></li>
            <li>Water Polo<span className='e-acrdn-icons e-content-icon waterpolo'></span></li>
          </div>
          <div id="racing_games" style={{ display: 'none' }}>
            <li>Cycling BMX<span className='e-acrdn-icons e-content-icon cycle_BMX'></span></li>
            <li>Cycling Mountain Bike <span className='e-acrdn-icons e-content-icon cycle_Mountain'></span></li>
            <li>Cycle Racing <span className='e-acrdn-icons e-content-icon cycle'></span></li>
            <li>Sailing <span className='e-acrdn-icons e-content-icon sailing'></span></li>
            <li>Rowing <span className='e-acrdn-icons e-content-icon rowing'></span></li>
          </div>
          <div id="indoor_games" style={{ display: 'none' }}>
            <li>Table Tennis<span className='e-acrdn-icons e-content-icon tennis'></span> </li>
            <li>Badminton <span className='e-acrdn-icons e-content-icon badminton'></span> </li>
            <li>Volleyball <span className='e-acrdn-icons e-content-icon volleyball'></span> </li>
            <li>Boxing <span className='e-acrdn-icons e-content-icon boxing'></span></li>
            <li>Swimming <span className='e-acrdn-icons e-content-icon swimming_In'></span></li>
          </div>
          <div className='control Accordion-sample' style={{ margin: '25px 0' }}>
            {/* Render the Accoridon Component */}
            <AccordionComponent enableRtl={true}>
              <AccordionItemsDirective>
                <AccordionItemDirective header='Athletics' iconCss='e-athletics e-acrdn-icons' content='#athletics' expanded={true} />
                <AccordionItemDirective header='Water Games' iconCss='e-water-game e-acrdn-icons' content='#water_games' />
                <AccordionItemDirective header='Racing' iconCss='e-racing-games e-acrdn-icons' content='#racing_games' />
                <AccordionItemDirective header='Indoor Games' iconCss='e-indoor-games e-acrdn-icons' content='#indoor_games' />
              </AccordionItemsDirective>
            </AccordionComponent>
          </div></div>
          <div id="action-description">
    <p>
        This sample demonstrates the RTL mode of the <code>Accordion</code>. Click on the header element to expand/collapse the corresponding Accordion panel, and displays its content.
    </p>
</div>
        <div id='description'>
          <p>
            The RTL sample illustrates the direction of the Accordion from right to left.
    </p>
          <p>
            More information about Accordion can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/accordion/getting-started.html">
              documentation</a> section.
    </p>
        </div>
      </div>

    );
  }
}