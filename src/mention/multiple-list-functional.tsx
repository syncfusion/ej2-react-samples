/**
 * Mention Multiple List Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';
import { updateSampleSection } from '../common/sample-base';
import './multiple-list.css';
import * as data from './dataSource.json';

const MultipleList = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const projectTemp = 'projects';
  const useCostTemp = 'useCosts';
  const statusTemp = 'status';
  const remotedata = new DataManager({
    url: 'https://ej2services.syncfusion.com/react/development/api/Employees',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });
  const query = new Query().select(['FirstName', 'EmployeeID']).requiresCount();
  const projects = data[projectTemp];
  const useCosts = data[useCostTemp];
  const status = data[statusTemp];
  const commonTarget = '#multipleList';
  const dataFields = { text: 'FirstName', value: 'EmployeeID' };
  const localFields = { text: 'Value' };

  const projectsDisplayTemplate = (data: any) => {
    return (
      <React.Fragment>
        <span className="e-success">{data.Value}</span>
      </React.Fragment>
    );
  }

  const costDisplayTemplate = (data: any) => {
    return (
      <React.Fragment>
        <span className="e-error">{data.Value}</span>
      </React.Fragment>
    );
  }

  const statusDisplayTemplate = (data: any) => {
    return (
      <React.Fragment>
        <span className="e-warning">{data.Value}</span>
      </React.Fragment>
    );
  }

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-12'>
          <div className="content-wrapper">
            <div id='mention_multiplelist'>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label id="label" className="multiple">Start typing <code>@</code>, <code>#</code>, <code>$</code> or <code>%</code> to select the respective values</label>
                      <div id="multipleList" placeholder="Type here..!"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <MentionComponent dataSource={remotedata} target={commonTarget} fields={dataFields} suggestionCount={15} query={query} popupWidth={250} allowSpaces={true}></MentionComponent>

              <MentionComponent dataSource={projects} requireLeadingSpace={false} mentionChar={'#'} target={commonTarget} displayTemplate={projectsDisplayTemplate} fields={localFields}></MentionComponent>

              <MentionComponent dataSource={useCosts} mentionChar={'$'} target={commonTarget} displayTemplate={costDisplayTemplate} fields={localFields}></MentionComponent>

              <MentionComponent dataSource={status} mentionChar={'%'} target={commonTarget} displayTemplate={statusDisplayTemplate} fields={localFields}></MentionComponent>
            </div>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the different mentioned characters that are used to render the suggestion list. Type the <code>@</code> or <code>#</code> or <code>$</code> or <code>%</code> characters to select or tag the name from respective suggestion lists.</p>
      </div>

      <div id="description">
        <p>
          The <code>requireLeadingSpace</code> property in Mention controls whether a space is needed before triggering the Mention suggestion popup.
          When set to <code>false</code>, it activates without a space; when set to <code>true</code>, a space is required before the Mention character. To see this feature in action, start typing with <code>#</code>.
        </p>
        <p>In the above sample, the following are configured for the contenteditable div element with @mention integrated.</p>
        <ul>
          <li><code>@</code> - Typing <code>@</code> lists out the suggestions of the employee names.</li>
          <li><code>#</code> - Typing <code>#</code> lists the project names.</li>
          <li><code>$</code> - Typing <code>$</code> lists out the cost of the project.</li>
          <li><code>%</code> - Typing <code>%</code> lists the status of the project.</li>
        </ul>
      </div>
    </div>
  );
}
export default MultipleList;
