/**
 * Rich Text Editor inline sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RichTextEditorComponent, Inject, QuickToolbar, Image, Link, HtmlEditor, Toolbar, InlineModeModel, FormatModel, FontFamilyModel, ToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';
import './inline.css';

export class Inline extends SampleBase<{}, {}> {

  private rteObj: RichTextEditorComponent;
  public checkboxObj: CheckBoxComponent;

  change(args: ChangeEventArgs): void {
    this.rteObj.inlineMode.onSelection = (args as any).checked;
  }
  private inlineMode: InlineModeModel = {
    enable: true,
    onSelection: true
  };
  private format: FormatModel = {
    width: 'auto'
  }
  private fontFamily: FontFamilyModel = {
    width: 'auto'
  }
  // Rich Text Editor items list
  private items: string[] = ['Bold', 'Italic', 'Underline',
    'Formats', '-', 'Alignments', 'OrderedList', 'UnorderedList',
    'CreateLink'];

  //Rich Text Editor ToolbarSettings
  private toolbarSettings: ToolbarSettingsModel = {
    items: this.items
  };
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section' id='rteInline'>
          <div className='col-lg-8' >
            <div className="content-wrapper">
              <RichTextEditorComponent id="inlineRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }}
                inlineMode={this.inlineMode} toolbarSettings={this.toolbarSettings} format={this.format} fontFamily={this.fontFamily}>
                <p>The sample is configured with the inline mode of the editor. Initially, the editor is rendered without a <a href="https://ej2.syncfusion.com/home/" target='_blank'>toolbar</a>. The toolbar becomes visible only when the content is selected.</p>
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
          <p>The Rich Text Editor provides an option to display toolbar on demand using mode property. Set mode as inline to enable
            inline editor. The toolbar becomes visible only when the content is selected</p>
          <p><b>Injecting Module</b></p>
          <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject <code>Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar</code> modules into the services.</p>
        </div>
      </div>
    );
  }
}
