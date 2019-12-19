/**
 * RichTextEditor toolbar types sample
 */
import { addClass, Browser, removeClass } from '@syncfusion/ej2-base';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar, ToolbarType } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import './types.css';
export class Type extends SampleBase {
    constructor() {
        super(...arguments);
        // RichTextEditor items list
        this.items = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
            'Outdent', 'Indent', '|',
            'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
            'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'];
        //RichTextEditor ToolbarSettings
        this.toolbarSettings = {
            type: ToolbarType.Expand,
            items: this.items,
            enableFloating: false
        };
        this.ddlValue = [
            { Id: '1', Text: 'Expand' },
            { Id: '2', Text: 'MultiRow' }
        ];
        // maps the appropriate column to fields property
        this.fields = { text: 'Text', value: 'Id' };
        // set the value to select an item based on mapped value at initial rendering
        this.ddlSelectedValue = '1';
    }
    onChange(args) {
        switch (args.value) {
            case '1':
                this.rteObj.toolbarSettings.type = ToolbarType.Expand;
                break;
            case '2':
                this.rteObj.toolbarSettings.type = ToolbarType.MultiRow;
                break;
        }
    }
    onFloatChange(args) {
        this.rteObj.toolbarSettings.enableFloating = args.checked;
    }
    handleFullScreen(e) {
        let sbCntEle = document.querySelector('.sb-content.e-view');
        let sbHdrEle = document.querySelector('.sb-header.e-view');
        let leftBar;
        let transformElement;
        if (Browser.isDevice) {
            leftBar = document.querySelector('#right-sidebar');
            transformElement = document.querySelector('.sample-browser.e-view.e-content-animation');
        }
        else {
            leftBar = document.querySelector('#left-sidebar');
            transformElement = document.querySelector('#right-pane');
        }
        if (e.targetItem === 'Maximize') {
            if (Browser.isDevice && Browser.isIos) {
                addClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
            if (!Browser.isDevice) {
                transformElement.style.marginLeft = '0px';
            }
            transformElement.style.transform = 'inherit';
        }
        else if (e.targetItem === 'Minimize') {
            if (Browser.isDevice && Browser.isIos) {
                removeClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            removeClass([leftBar], ['e-close']);
            if (!Browser.isDevice) {
                addClass([leftBar], ['e-open']);
                transformElement.style.marginLeft = leftBar.offsetWidth + 'px';
            }
            transformElement.style.transform = 'translateX(0px)';
        }
    }
    actionCompleteHandler() {
        setTimeout(() => { this.rteObj.toolbarModule.refreshToolbarOverflow(); }, 400);
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section' id='rteTypes'>
          <div className='col-lg-8' style={{ paddingBottom: '20px' }}>
            <RichTextEditorComponent id="typesRTE" ref={(scope) => { this.rteObj = scope; }} floatingToolbarOffset={0} toolbarSettings={this.toolbarSettings} actionBegin={this.handleFullScreen.bind(this)} actionComplete={this.actionCompleteHandler.bind(this)}>
              <p>The rich text editor is WYSIWYG ("what you see is what you get") editor useful to create and edit content, and return the valid HTML markup or markdown of the content</p>
              <p><b>Toolbar</b></p>
              <ol>
                <li>
                  <p>Toolbar contains commands to align the text, insert link, insert image, insert list, undo/redo operations, HTML view, etc </p>
                </li>
                <li>
                  <p>Toolbar is fully customizable </p>
                </li>
              </ol>
              <p><b>Links</b></p>
              <ol>
                <li>
                  <p>You can insert a hyperlink with its corresponding dialog </p>
                </li>
                <li>
                  <p>Attach a hyperlink to the displayed text. </p>
                </li>
                <li>
                  <p>Customize the quick toolbar based on the hyperlink </p>
                </li>
              </ol>
              <p><b>Validation</b></p>
              <ul>
                <li>
                  <p>The editor’s content can be validated on form submission by applying validation rules and validation message</p>
                </li>
              </ul>
              <p><b>Locale.</b></p>
              <ul>
                <li>
                  <p>The editor provides an option to localize its static strings to adapt the editor to a local language.</p>
                </li>
              </ul>
              <p><b>Image.</b></p>
              <ol>
                <li>
                  <p>Allows you to insert images from an online source as well as the local computer </p>
                </li>
                <li>
                  <p>You can upload an image </p>
                </li>
                <li>
                  <p>Provides an option to customize quick toolbar for an image </p>
                </li>
              </ol>
              <img alt="Logo" src="./src/rich-text-editor/images/RTEImage-Feather.png"/>
              <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]}/>
            </RichTextEditorComponent>
          </div>
          <div className='col-lg-4 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" title="Properties" style={{ width: '100%', margin: '10px' }}>
                <tbody>
                  <tr>
                    <td>
                      <div style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                        <DropDownListComponent id="types" dataSource={this.ddlValue} ref={(dropdownlist) => { this.listObj = dropdownlist; }} fields={this.fields} change={this.onChange.bind(this)} floatLabelType='Auto' placeholder="Types" index={0} popupHeight='220px'/>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ paddingLeft: '10px' }}>
                        <CheckBoxComponent checked={false} label='Enable Floating' ref={(scope) => { this.checkboxObj = scope; }} change={this.onFloatChange.bind(this)}></CheckBoxComponent>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the different behavior of toolbar support in the rich text editor. Change the toolbar type as multiRow or expand from the property panel to see its appearance . Check or uncheck the floating toolbar in property panel to look on its behavior.</p>
        </div>
        <div id="description">
          <p><code>Floating</code>: set boolean value to toolbarSettings.enableFloating property to enable or disable the floating toolbar.</p>
          <p> The rich text editor allows you to configure different types of toolbar using <code>toolbarSettings.type</code> property. The types of
            toolbar are: </p>
          <ul>
            <li><code>Expand</code>: The toolbar hides the overflowing items in the next row. Click the expand arrow to view overflowing toolbar items</li>
            <li><code>Multi Row</code>: The toolbar hides the overflowing items in the next row.</li>
          </ul>
          <p><b>Injecting Module</b></p>
          <p>RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject <code>Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar</code> modules into the services.</p>
        </div>
      </div>);
    }
}
