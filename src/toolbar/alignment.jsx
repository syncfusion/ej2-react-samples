import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './toolbar.component.css';
const sample_CSS = `{ width: 100% }`;
export class Alignment extends SampleBase {
    render() {
        function template() {
            return (<div className="e-folder">
          <div className="e-folder-name">Inbox(33)</div>
          <div className="e-mail-id">user@example.com</div>
        </div>);
        }
        return (<div className='control-pane'>
        <div className='control-section tbar-control-section'>
          <div className='control tbar-sample' style={{ margin: '25px 0' }}>
            
            <ToolbarComponent>
              <ItemsDirective>
                <ItemDirective prefixIcon='e-tbar-menu-icon tb-icons' tooltipText='Menu'></ItemDirective>
                <ItemDirective template={template} align='Center'></ItemDirective>
                <ItemDirective prefixIcon='e-tbar-search-icon tb-icons' tooltipText='Search' align='Right'></ItemDirective>
                <ItemDirective prefixIcon='e-tbar-settings-icon tb-icons' tooltipText='Popup' align='Right'></ItemDirective>
              </ItemsDirective>
            </ToolbarComponent>
            <div className='e-mail-items'>
              <div className='e-mail-item'>
                <div className='e-mail-image'>
                  <div className="e-def-avator"><span>MA</span></div>
                </div>
                <div className='e-mail-content'><span className="e-mail-header">Maria Anders</span>
                  <span className='e-mail-time'>11:27AM</span>
                  <div className="e-mail-subject"> Sales Representative </div>
                  <div className="e-mail-description"> Can we schedule Meeting Appointment for today? </div>
                </div>
              </div>
              <div className='e-mail-item'>
                <div className='e-mail-image'>
                  <div className="e-def-avator"><span>VA</span></div>
                </div>
                <div className='e-mail-content'>
                  <span className="e-mail-header">Victoria Ashworth</span><span className="e-mail-time">Fri 7:50AM</span>
                  <div className="e-mail-subject"> Sales Representative </div>
                  <div className="e-mail-description"> Yes we are available for meeting tomorrow </div>
                </div>
              </div>
              <div className='e-mail-item'>
                <div className='e-mail-image'>
                  <div className="e-def-avator"><span>TH</span></div>
                </div>
                <div className='e-mail-content'>
                  <span className="e-mail-header">Thomas Hardey</span><span className="e-mail-time">Fri 7:50AM</span>
                  <div className="e-mail-subject"> Sales Representative </div>
                  <div className="e-mail-description">
                    Customer has accepted our proposal. Would it be possible for arrange meeting tomorrow? </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates the aligning the <code>Toolbar</code> commands in left , right and center position.
    </p>
        </div>
        <div id="description">
          <p>
            <strong>Toolbar</strong> commands can be aligned in left , right and center positions. By default, all the
        commands are left aligned. User can customize the alignment of each toolbar item using <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/toolbar/item/#align">  align</a></code> property. Possible
      values are as follows.
    </p>
          <br></br>
          <table style={{ sample_CSS }}>
            <tr>
              <th><strong>Alignment Option</strong></th>
              <th><strong>Description</strong></th>
            </tr>
            <tr>
              <td><code>Left (default)</code> </td>
              <td>To align commands to the left side of the toolbar.</td>
            </tr>
            <tr>
              <td><code>Center</code> </td>
              <td>To align commands to the center of the toolbar.</td>
            </tr>
            <tr>
              <td><code>Right</code></td>
              <td>To align commands to the right side of the toolbar.</td>
            </tr>
          </table>
        </div>
      </div>);
    }
}
