/**
 * Mention Multiple List Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import './multiple-list.css';
import * as data from './dataSource.json';

export class MultipleList extends SampleBase<{}, {}> {

  private projectTemp:string = 'projects';
  private useCostTemp:string = 'useCosts';
  private statusTemp:string = 'status';
  private data: DataManager = new DataManager({
        url: 'https://ej2services.syncfusion.com/react/development/api/Employees',
        adaptor: new WebApiAdaptor,
        crossDomain: true
  });
  private query: Query = new Query().select(['FirstName', 'EmployeeID']).requiresCount();
  private projects: { [key: string]: Object }[] = data[this.projectTemp];
  private useCosts: { [key: string]: Object }[] = data[this.useCostTemp];
  private status: { [key: string]: Object }[] = data[this.statusTemp];
  private commonTarget: string = '#multipleList';
  private dataFields: Object = { text: 'FirstName', value: 'EmployeeID' };
  public localFields: Object = { text: 'Value' };

  private projectsDisplayTemplate(data: any): JSX.Element {
    return (
      <React.Fragment>
          <span className="e-success">{data.Value}</span>
      </React.Fragment>
      );
  }
  private costDisplayTemplate(data: any): JSX.Element {
    return (
      <React.Fragment>
          <span className="e-error">{data.Value}</span>
      </React.Fragment>
      );
  }

  private statusDisplayTemplate(data: any): JSX.Element {
    return (
      <React.Fragment>
          <span className="e-warning">{data.Value}</span>
      </React.Fragment>
      );
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
            <div className="content-wrapper">
              <div id='mention_multiplelist'>
                <table>
                    <tr>
                      <td>
                          <label id="label" className="multiple">Start typing <code>@</code>, <code>#</code>, <code>$</code> or <code>%</code> to select the respective values</label>
                          <div id="multipleList" placeholder="Type here..!"></div>
                      </td>
                  </tr>
                </table>

                <MentionComponent dataSource={this.data} target={this.commonTarget} fields={this.dataFields} suggestionCount={15} query={this.query} popupWidth={250} popupHeight={250} allowSpaces={true}></MentionComponent>

                <MentionComponent dataSource={this.projects} mentionChar={'#'} target={this.commonTarget} displayTemplate={this.projectsDisplayTemplate} fields={this.localFields}></MentionComponent>

                <MentionComponent dataSource={this.useCosts} mentionChar={'$'} target={this.commonTarget} displayTemplate={this.costDisplayTemplate} fields={this.localFields}></MentionComponent>

                <MentionComponent dataSource={this.status} mentionChar={'%'} target={this.commonTarget} displayTemplate={this.statusDisplayTemplate} fields={this.localFields}></MentionComponent>
              </div>
            </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the different mentioned characters that are used to render the suggestion list. Type the <code>@</code> or <code>#</code> or <code>$</code> or <code>%</code> characters to select or tag the name from respective suggestion lists.</p>
        </div>
            
        <div id="description">
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
}
