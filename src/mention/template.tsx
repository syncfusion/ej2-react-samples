/**
 * Mention template Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './template.css';
import * as data from './dataSource.json';

export class Template extends SampleBase<{}, {}> {

  private temp:string = 'emailData';
  private emailData: { [key: string]: Object }[] = data[this.temp];
  private templateTarget:string = '#templateMention';
  private templateFields: Object = { text: 'Name' };

  private itemTemplate(data: any): JSX.Element {
    return (
      <div className="template_listItems">
          <img className="mentionEmpImage" src={"src/mention/Employees/" + data['Eimg'] +".png"} alt="employee"/>
          <span className="person">{data.Name}</span>
          <span className="email">{data.EmailId}</span>
      </div>
      );
  }

  private displayTemplate(data: any): JSX.Element {
    return (
      <React.Fragment>
        {data.Name}
      </React.Fragment>
      );
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
            <div className="content-wrapper">
              <div id='mention_template'>
                <table>
                  <tbody>
                    <tr>
                        <td>
                            <label className="template-size">Compose your content</label>
                            <div id="templateMention" placeholder="Type @ and tag user"></div>
                        </td>
                    </tr>
                  </tbody>
                </table>

                <MentionComponent dataSource={this.emailData} target={this.templateTarget} fields={this.templateFields} itemTemplate={this.itemTemplate} displayTemplate={this.displayTemplate} noRecordsTemplate={"No item related to the search"} popupWidth={250} popupHeight={200}></MentionComponent>

              </div>
            </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the template functionalities of the Mention component. Type the <code>@</code> character in the editable element and select or tag the user from the customized suggestion list.</p>
        </div>
            
        <div id="description">
          <p>In the above sample, for the template rendering the following are used</p>
          <ul>
              <li><code>itemTemplate</code> - It is used for displaying customized lists.</li>
              <li><code>displayTemplate</code> - It is used to display, how the the value selected is previewed in the element.</li>
              <li><code>noRecordsTemplate</code> - It is used to display a message if a user searches for irrelevant data in the data source bound.</li>
          </ul>
        </div>
      </div>
    );
  }
}
