/**
 * Mention Disabled Item Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import './disabled-items.css';
import * as data from './dataSource.json';

const DisabledItems = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const temp: string = 'emailData2';
  const emailData: { [key: string]: Object }[] = data[temp];
  const disabledTarget: string = '#disabledMention';
  const disabledFields: Object = { text: 'Name', disabled: 'State' };

  const itemTemplate = (data: any) => {
    return (
      <div className="disabled_listItems">
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
        <div className='col-lg-8'>
          <div className="content-wrapper">
            <div id='mention_disabled'>
              <table>
                <tr>
                  <td>
                    <label className="disabled-size">Compose your content</label>
                    <div id="disabledMention" placeholder="Begin writing here..!"></div>
                  </td>
                </tr>
              </table>

              <MentionComponent dataSource={emailData} target={disabledTarget} fields={disabledFields} itemTemplate={itemTemplate} displayTemplate={displayTemplate} noRecordsTemplate={"No item related to the search"} popupWidth={250} popupHeight={200}></MentionComponent>

            </div>
          </div>
        </div>
      </div>
      <div id="action-description">
      <p>This sample showcases the disabled items of the Mention component. Type the <code>@</code> character in the editable element and you will notice that the disabled items are greyed out and cannot be selected.</p>
      </div>

      <div id="description">
      <p>The Mention provides options for individual items to be in either an enabled or disabled state for specific scenarios. Once an item is disabled, it cannot be select a particular item. To configure the disabled item columns, use the <b>fields.disabled</b> property.</p>
      </div>
    </div>
  );

}
export default DisabledItems;
