import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './accordion.component.css'

export class Icons extends SampleBase<{}, {}> {

  render () {
    function acrdnHeader1() {
      return (
        <div>Athletics</div>
      )
    }
    function acrdnHeader2() {
      return (
        <div>Water Games</div>
      )
    }
    function acrdnHeader3() {
      return (
        <div>Racing</div>
      )
    }
    function acrdnHeader4() {
      return (
        <div>Indoor Games</div>
      )
    }
    function athletics() {
      return(              
        <div id="athletics">
        <li>Marathon<span className='e-acrdn-icons e-content-icon marathon'></span></li>
        <li>Javelin Throw<span className='e-acrdn-icons e-content-icon javelin'></span></li>
        <li>Discus Throw<span className='e-acrdn-icons e-content-icon discus'></span></li>
        <li>High Jump<span className='e-acrdn-icons e-content-icon highjump'></span></li>
        <li>Long Jump<span className='e-acrdn-icons e-content-icon longjump'></span></li>  
        </div>        
    );
    }
    function water_games() {
      return(
        <div id="water_games">
        <li>Diving<span className='e-acrdn-icons e-content-icon dive'></span></li>
        <li>Swimming<span className='e-acrdn-icons e-content-icon swimming'></span></li>
        <li>Marathon Swimming<span className='e-acrdn-icons e-content-icon marathan_swim'></span></li>
        <li>Synchronized Swimming<span className='e-acrdn-icons e-content-icon sync_swim'></span></li>
        <li>Water Polo<span className='e-acrdn-icons e-content-icon waterpolo'></span></li>
      </div>             
    );
    }
    function racing_games() {
      return(       
        <div id="racing_games">
        <li>Cycling BMX<span className='e-acrdn-icons e-content-icon cycle_BMX'></span></li>
        <li>Cycling Mountain Bike <span className='e-acrdn-icons e-content-icon cycle_Mountain'></span></li>
        <li>Cycle Racing <span className='e-acrdn-icons e-content-icon cycle'></span></li>
        <li>Sailing <span className='e-acrdn-icons e-content-icon sailing'></span></li>
        <li>Rowing <span className='e-acrdn-icons e-content-icon rowing'></span></li>
      </div>
    );
    }

    function indoor_games() {
     return(
       <div id="indoor_games">
       <li>Table Tennis<span className='e-acrdn-icons e-content-icon tennis'></span> </li>
       <li>Badminton <span className='e-acrdn-icons e-content-icon badminton'></span> </li>
       <li>Volleyball <span className='e-acrdn-icons e-content-icon volleyball'></span> </li>
       <li>Boxing <span className='e-acrdn-icons e-content-icon boxing'></span></li>
       <li>Swimming <span className='e-acrdn-icons e-content-icon swimming_In'></span></li>
      </div>
    );
  }
    return (
      <div className='control-pane'>
        <div className='control-section accordion-control-section'>
          <div className= 'control Accordion-sample'  style = {{margin: '25px 0' }}>
          {/* Render the Accoridon Component */}
          <AccordionComponent>
             <AccordionItemsDirective>
                <AccordionItemDirective header= {acrdnHeader1} iconCss='e-athletics e-acrdn-icons' content={ athletics } expanded={true} />
                <AccordionItemDirective header= {acrdnHeader2} iconCss='e-water-game e-acrdn-icons' content={ water_games } />
                <AccordionItemDirective header= {acrdnHeader3} iconCss='e-racing-games e-acrdn-icons'content={ racing_games } />
                <AccordionItemDirective header= {acrdnHeader4} iconCss='e-indoor-games e-acrdn-icons' content={ indoor_games } />
             </AccordionItemsDirective>
          </AccordionComponent>
        </div></div>
        <div id="action-description">
    <p>
        This sample demonstrates the icon representation of the <code>Accordion</code>. Click on the header element to expand/collapse the corresponding Accordion panel, and displays its content.
    </p>
</div>
        <div id='description'>
     <p>
     <p>
        This Accordion is populated with icons which renders by mapping the <code>iconCss</code> field. This sample illustrates
        the some of the games list.
    </p>
    <p>
        More information about Accordion can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/accordion/getting-started/">
        documentation</a> section.
    </p>
     </p>
        </div>
      </div>

    );
  }
}