/**
 * RichTextEditor inline sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RichTextEditorComponent, Inject, ToolbarType, QuickToolbar, Image, Link, HtmlEditor, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';
import './inline.css';

export class Inline extends SampleBase<{}, {}> {

  private rteObj: RichTextEditorComponent;
  public checkboxObj: CheckBoxComponent;

  // set the value to RichTextEditor
  private template: string = `<p>The sample is configured with inline mode of editor. Initially, the editor is rendered without a <a href="https://ej2.syncfusion.com/home/" target='_blank'>toolbar</a>. The toolbar becomes visible only when the content is selected.</p>`;

  change(args: ChangeEventArgs): void {
    this.rteObj.inlineMode.onSelection = (args as any).checked;
    this.rteObj.dataBind();
  }
  private inlineMode: object = {
    enable: true,
    onSelection: true
  };
  private format: object = {
    width: 'auto'
  }
  private fontFamily: object = {
    width: 'auto'
  }
  // RichTextEditor items list
  private items: string[] = ['Bold', 'Italic', 'Underline',
  'Formats', '-', 'Alignments', 'OrderedList', 'UnorderedList',
  'CreateLink'];

  //RichTextEditor ToolbarSettings
  private toolbarSettings: object = {
      items: this.items
  };
  render() {
    return (
      <div id="dropdowndefault" className='control-pane'>
        <div className='control-section' id='rteInline'>
          <div className='col-lg-8' >
            <div className="content-wrapper">
                <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }}
                  valueTemplate={this.template} inlineMode={this.inlineMode} toolbarSettings={ this.toolbarSettings} format={this.format} fontFamily={this.fontFamily}>
                  <Inject services={[Image, Link, QuickToolbar, HtmlEditor, Toolbar]} />
                </RichTextEditorComponent>
            </div>
          </div>
          <div className='col-lg-4 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" title="Properties">
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <CheckBoxComponent checked={true} label='Show on Selection' ref={(scope) => { this.checkboxObj = scope; }} change={this.change.bind(this)} ></CheckBoxComponent>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the toolbar show on inline mode. Toolbar show while selection on the below editable content and
            it hide on focus out from edit area.</p>
        </div>

        <div id="description">
          <p>The rich text editor provides an option to display toolbar on demand using mode property. Set mode as inline to enable
            inline editor. The toolbar becomes visible only when the content is selected</p>
          <p><b>Injecting Module</b></p>
          <p>RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject <code>Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar</code> modules into the services.</p>
        </div>
      </div>
    );
  }
}
