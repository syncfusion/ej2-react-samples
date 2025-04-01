/**
 * Mention default Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import './default.css';
import * as data from './dataSource.json';

export class Default extends SampleBase<{}, {}> {

  private temp:string = 'emailData';
  private emailData: { [key: string]: Object }[] = data[this.temp];
  private emailFields: object = { text: 'EmailId' };
  private commentTarget: string = '#commentsMention';
  private commentFields: Object = { text: 'Name' };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
            <div className="content-wrapper">
              <div id='mention_default'>
                <table>
                  <tbody>
                    <tr>
                        <td>
                            <label className="default-size">Comments</label>
                            <div id="commentsMention" placeholder="Type @ and tag user" ></div>
                        </td>
                    </tr>
                  </tbody>
                </table>

                <MentionComponent dataSource={this.emailData} target={this.commentTarget} fields={this.commentFields}></MentionComponent>
              </div>
            </div>
        </div>
        <div id="action-description">
        <p>This sample demonstrates the default functionalities of the Mention component. Type the <code>@</code> character in the editable element and select or tag the user from the suggestion list.</p>
        </div>
            
        <div id="description">
        <p>The <code>Mention</code> is a component used to display a list of items that the users can select or tag from the list suggested. You can use the <code>@</code> mention support with the <code>input</code>, <code>textarea</code>, and <code>contenteditable</code> div elements.</p>
        <p>In the above sample, the div elements are configured with <code>@</code> mentions listing the <code>comments</code> contents.</p>
        </div>
      </div>
    );
  }
}
