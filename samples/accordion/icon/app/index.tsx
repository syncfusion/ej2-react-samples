import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from './sample-base';


export class Icons extends SampleBase<{}, {}> {

  render () {
    return (
      <div className='control-pane'>
        <div className='control-section accordion-control-section'>
         <div id ="athletics" style = {{display : 'none'}}>
              <li><span className="e-acrdn-icons e-content-icon marathon"></span> Marathon</li>
               <li><span className="e-acrdn-icons e-content-icon javelin"></span> Javelin Throw</li>
               <li><span className="e-acrdn-icons e-content-icon discus"></span> Discus Throw</li>
               <li><span className="e-acrdn-icons e-content-icon highjump"></span> High Jump</li>
               <li><span className="e-acrdn-icons e-content-icon longjump"></span> Long Jump</li>
         </div>
          <div id ="water_games" style = {{display : 'none'}}>
                <li><span className="e-acrdn-icons e-content-icon dive"></span> Diving</li>
                <li><span className="e-acrdn-icons e-content-icon swimming"></span> Swimming</li>
                <li><span className="e-acrdn-icons e-content-icon marathan_swim"></span> Marathon Swimming</li>
                <li><span className="e-acrdn-icons e-content-icon sync_swim"></span> Synchronized Swimming</li>
                <li><span className="e-acrdn-icons e-content-icon waterpolo"></span> Water Polo</li>
         </div>
         <div id ="racing_games" style = {{display : 'none'}}>
                <li><span className="e-acrdn-icons e-content-icon cycle_BMX"></span> Cycling BMX</li>
                <li><span className="e-acrdn-icons e-content-icon cycle_Mountain"></span> Cycling Mountain Bike</li>
                <li><span className="e-acrdn-icons e-content-icon cycle"></span> Cycle Racing</li>
                <li><span className="e-acrdn-icons e-content-icon sailing"></span> Sailing</li>
                <li><span className="e-acrdn-icons e-content-icon rowing"></span> Rowing</li>
         </div>
         <div id ="indoor_games" style = {{display : 'none'}}>
               <li><span className="e-acrdn-icons e-content-icon tennis"></span> Table Tennis</li>
               <li><span className="e-acrdn-icons e-content-icon badminton"></span> Badminton</li>
               <li><span className="e-acrdn-icons e-content-icon volleyball"></span> Volleyball</li>
               <li><span className="e-acrdn-icons e-content-icon boxing"></span> Boxing</li>
               <li><span className="e-acrdn-icons e-content-icon swimming_In"></span> Swimming</li>
         </div>
          <div className= 'control Accordion-sample'  style = {{margin: '25px 0' }}>
          {/* Render the Accoridon Component */}
          <AccordionComponent>
             <AccordionItemsDirective>
              <AccordionItemDirective header = 'Athletics' iconCss = 'e-athletics e-acrdn-icons' content = '#athletics' expanded = {true}/>
              <AccordionItemDirective header = 'Water Games' iconCss = 'e-water-game e-acrdn-icons' content = '#water_games'/>
              <AccordionItemDirective header = 'Racing' iconCss = 'e-racing-games e-acrdn-icons' content = '#racing_games'/>
              <AccordionItemDirective header = 'Indoor Games' iconCss = 'e-indoor-games e-acrdn-icons' content = '#indoor_games'/>
             </AccordionItemsDirective>
          </AccordionComponent>
        </div></div>
      </div>

    );
  }
}
ReactDOM.render(<Icons />, document.getElementById('sample'));