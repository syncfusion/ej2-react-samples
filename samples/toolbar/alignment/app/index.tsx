import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from './sample-base';


 const sample_CSS: string = `{ width: 100% }`;

export class Alignment extends SampleBase<{}, {}> {

  render () {
    let template: string = '<div class= "e-folder"><div class = "e-folder-name">Inbox(33)</div>';
    template = template +  '<div class ="e-mail-id">user@example.com</div></div> ';
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className= 'control'  style = {{margin: '25px 0' }}>
          {/* Render the Toolbar Component */}
          <ToolbarComponent>
            <ItemsDirective>
              <ItemDirective prefixIcon = 'e-tbar-menu-icon tb-icons' tooltipText = 'Menu'></ItemDirective>
              <ItemDirective template = {template} align = 'center'></ItemDirective>
              <ItemDirective prefixIcon = 'e-tbar-search-icon tb-icons' tooltipText = 'Search' align = 'right'></ItemDirective>
              <ItemDirective prefixIcon = 'e-tbar-settings-icon tb-icons' tooltipText = 'Popup' align = 'right'></ItemDirective>
            </ItemsDirective>
          </ToolbarComponent>
          <div className='e-mail-items'>
            <div className='e-mail-item'>
              <div className='e-mail-image'>
                <div className="e-def-avator"><span>MA</span></div>
              </div>
              <div className='e-mail-content'><span className="e-mail-header">Maria Anders</span>
                <span className='e-mail-time'>11:27AM</span>
                <div
                  className="e-mail-subject"> Sales Representative </div>
                <div className="e-mail-description"> Can we schedule Meeting Appointment for today? </div>
              </div>
            </div>
            <div className='e-mail-item'>
              <div className='e-mail-image'>
                <div className="e-def-avator"><span>VA</span></div>
              </div>
              <div className='e-mail-content'>
                <span className="e-mail-header">Victoria Ashworth</span><span className="e-mail-time">Fri 7:50AM</span>
                <div
                  className="e-mail-subject"> Sales Representative </div>
                <div className="e-mail-description"> Yes we are available for meeting tomorrow </div>
              </div>
            </div>
            <div className='e-mail-item'>
              <div className='e-mail-image'>
                <div className="e-def-avator"><span>TH</span></div>
              </div>
              <div className='e-mail-content'>
                <span className="e-mail-header">Thomas Hardey</span><span className="e-mail-time">Fri 7:50AM</span>
                <div
                  className="e-mail-subject"> Sales Representative </div>
                <div className="e-mail-description"> 
                  Customer has accepted our proposal. Would it be possible for arrange meeting tomorrow? </div>
              </div>
            </div>
          </div>
          </div>
        </div>
         </div>

    );
  }
}
ReactDOM.render(<Alignment />, document.getElementById('sample'));