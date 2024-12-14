/**
 * Mention template Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import './template.css';
import * as data from './dataSource.json';

const Template = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const temp: string = 'emailData';
  const emailData: { [key: string]: Object }[] = data[temp];
  const templateTarget: string = '#templateMention';
  const templateFields: Object = { text: 'Name' };

  const itemTemplate = (data: any) => {
    return (
      <div className="template_listItems">
        <img className="mentionEmpImage" src={"src/mention/Employees/" + data['Eimg'] + ".png"} alt="employee" />
        <span className="person">{data.Name}</span>
        <span className="email">{data.EmailId}</span>
      </div>
    );
  }

  const displayTemplate = (data: any) => {
    return (
      <React.Fragment>
        {data.Name}
      </React.Fragment>
    );
  }

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-12'>
          <div className="content-wrapper">
            <div id='mention_template'>
              <table>
                <tr>
                  <td>
                    <label className="template-size">Compose your content</label>
                    <div id="templateMention" placeholder="Begin writing here..!"></div>
                  </td>
                </tr>
              </table>

              <MentionComponent dataSource={emailData} target={templateTarget} fields={templateFields} itemTemplate={itemTemplate} displayTemplate={displayTemplate} noRecordsTemplate={"No item related to the search"} popupWidth={250} popupHeight={200}></MentionComponent>

            </div>
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
export default Template;
