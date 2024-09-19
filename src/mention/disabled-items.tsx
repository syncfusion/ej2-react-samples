/**
 * Mention Disabled Items Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './disabled-items.css';
import * as data from './dataSource.json';

export class DisabledItems extends SampleBase<{}, {}> {

  private temp:string = 'emailData2';
  private emailData: { [key: string]: Object }[] = data[this.temp];
  private disabledTarget:string = '#disabledMention';
  private disabledFields: Object = { text: 'Name', disabled: 'State' };

  private itemTemplate(data: any): JSX.Element {
    return (
      <div className="disabled_listItems">
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
              <div id='mention_disabled'>
                <table>
                   <tr>
                      <td>
                          <label className="disabled-size">Compose your content</label>
                          <div id="disabledMention" placeholder="Type @ and tag user"></div>
                      </td>
                  </tr>
                </table>

                <MentionComponent dataSource={this.emailData} target={this.disabledTarget} fields={this.disabledFields} itemTemplate={this.itemTemplate} displayTemplate={this.displayTemplate} noRecordsTemplate={"No item related to the search"} popupWidth={250} popupHeight={200}></MentionComponent>

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
}
