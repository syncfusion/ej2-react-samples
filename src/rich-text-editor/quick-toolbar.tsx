/**
 * DropDownList Default Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RichTextEditorComponent, Inject, ToolbarType, QuickToolbar} from '@syncfusion/ej2-react-richtexteditor';
import { Image, Link, HtmlEditor, IToolbarItems, Toolbar} from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import { QuickToolbarSettings } from '@syncfusion/ej2-richtexteditor/src/rich-text-editor/models/toolbar-settings';
import './quick-toolbar.css';
export class QuickToolbarSample extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorComponent;

    // set the value to RichTextEditor
    private value: string = `<div style="display:block;padding-top:2px">
        <p style="margin-right:10px;margin-top:10px;">The sample is configured with quick toolbar commands for image and link elements.  
        Click on the image or link to see its quick action commands.   
        </p></div><div>
        <img id="rteImageID" style="width:300px; height:300px;transform: rotate(0deg); margin: 12px 22px" 
        alt="Logo" src="./src/rich-text-editor/images/RTEImage-Feather.png" />
        </div>`;

    // RichTextEditor items list
    private image: (string | IToolbarItems)[] = ['Replace', 'Align', 'Caption',
        'Remove', 'InsertLink', '|', 'Display', 'AltText', 'Dimension', '|',
        {
            tooltipText: 'Rotate Left',
            template: '<button class="e-tbar-btn e-btn" id="roatateLeft"><span class="e-btn-icon e-icons e-roatate-left"></span>'
        },
        {
            tooltipText: 'Rotate Right',
            template: '<button class="e-tbar-btn e-btn" id="roatateRight"><span class="e-btn-icon e-icons e-roatate-right"></span>'
        }];

    private quickToolbarSettings: object = {
        image: this.image
    }
    public oncreate(): void {
        document.getElementById('rteImageID').onclick = (e: Event) => {
            let rotateLeft: HTMLElement = document.getElementById('roatateLeft');
            let rotateRight: HTMLElement = document.getElementById('roatateRight');
            rotateLeft.onclick = (e: Event) => {
                let imgEle: HTMLElement = document.getElementById('rteImageID');
                let transform: number = Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
                imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
            };
            rotateRight.onclick = (e: Event) => {
                let imgEle: HTMLElement = document.getElementById('rteImageID');
                let transform: number = parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
                imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
            };
        };
    }

  render() {
    return (
      <div id="dropdowndefault" className='control-pane'>
        <div className='control-section'>
          <div className="content-wrapper">
            <div id='default'>
                <RichTextEditorComponent id="defaultRTE" created={this.oncreate.bind(this)}
                    ref={(scope) => { this.rteObj = scope }}
                    value={this.value} quickToolbarSettings={this.quickToolbarSettings}  >
                    <Inject services={[Toolbar, Link, Image, QuickToolbar, HtmlEditor]} />
                </RichTextEditorComponent>
            </div>
          </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the default rendering of the rich text editor with minimum configuration.</p>
        </div>
        <div id="description">
          <p> The rich text editor is WYSIWYG ("what you see is what you get") editor that is used to create and edit content, 
            and return valid HTML markup. </p>
          <p> The editor provides a standard toolbar to format content using its commands. </p>
          <p> The toolbar contains commands to align the text, insert link, insert image, insert list, undo/redo 
            the operation, HTML view, and more.</p>
        </div>
      </div>
    );
  }
}
