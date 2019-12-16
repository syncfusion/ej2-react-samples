import * as React from 'react';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, QuickToolbar, Image, Link } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import { NodeSelection } from '@syncfusion/ej2-react-richtexteditor';
import './image.css';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
export class ImageSample extends SampleBase {
    constructor() {
        super(...arguments);
        this.value = "Blob";
        this.fields = { text: "text", value: "value" };
        this.formatData = [
            { text: 'Blob', value: 'Blob' },
            { text: 'Base64', value: 'Base64' }
        ];
        this.image = ['Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
            'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension',
            {
                tooltipText: 'Rotate Left',
                template: '<button class="e-tbar-btn e-btn" id="roatateLeft"><span class="e-btn-icon e-icons e-rotate-left"></span>'
            },
            {
                tooltipText: 'Rotate Right',
                template: '<button class="e-tbar-btn e-btn" id="roatateRight"><span class="e-btn-icon e-icons e-rotate-right"></span>'
            }];
        this.quickToolbarSettings = {
            image: this.image
        };
        this.onCheckChange = (args) => {
            this.rteObj.enableAutoUrl = args.checked;
        };
        this.ondropChange = () => {
            if (this.formatdrop.value === 'Base64') {
                this.rteObj.insertImageSettings.saveFormat = 'Base64';
            }
            else {
                this.rteObj.insertImageSettings.saveFormat = 'Blob';
            }
        };
    }
    onToolbarClick(e) {
        let nodeObj = new NodeSelection();
        let range = nodeObj.getRange(this.rteObj.contentModule.getDocument());
        let imgEle = nodeObj.getNodeCollection(range)[0];
        if (e.item.tooltipText === 'Rotate Right') {
            let transform = (imgEle.style.transform === '') ? 0 :
                parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
            imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
            this.rteObj.formatter.saveData();
            this.rteObj.formatter.enableUndo(this.rteObj);
        }
        else if (e.item.tooltipText === 'Rotate Left') {
            let transform = (imgEle.style.transform === '') ? 0 :
                Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
            imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
            this.rteObj.formatter.saveData();
            this.rteObj.formatter.enableUndo(this.rteObj);
        }
    }
    render() {
        return (<div className='control-pane'>
                <div className='col-lg-8'>
                    <div className='control-section' id="rteAPI">
                        <div className='rte-control-section'>
                            <RichTextEditorComponent id="imageRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor; }} toolbarClick={this.onToolbarClick.bind(this)} quickToolbarSettings={this.quickToolbarSettings}>
                                    <p>Rich Text Editor allows to insert images from online source as well as local computer where you want to insert the image in your content.</p>
                                    <p><b>Get started Quick Toolbar to click on the image</b></p>
                                    <p>It is possible to add custom style on the selected image inside the RichTextEditor through quick toolbar.</p>
                                    <img id='rteImageID' style={{ width: '300px', height: '300px', transform: 'rotate(0deg)' }} alt="Logo" src="./src/rich-text-editor/images/RTEImage-Feather.png"/>
                                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]}/>
                            </RichTextEditorComponent>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="rteAPIProperty">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" style={{ width: '100%', margin: '10px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '8px', width: '50%' }}><div>EnableAutoUrl</div></td>
                                    <td>
                                        <div style={{ paddingLeft: '10px' }}>
                                            <CheckBoxComponent checked={false} ref={(scope) => { this.readonly = scope; }} change={this.onCheckChange.bind(this)}></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                <td style={{ padding: '8px', width: '50%' }}><div>Save Format </div></td>
                                    <td>
                                        <div style={{ paddingLeft: '10px' }}>
                                        <DropDownListComponent id="formattingOption" dataSource={this.formatData} ref={(dropdownlist) => { this.formatdrop = dropdownlist; }} fields={this.fields} change={this.ondropChange.bind(this)} value={this.value} popupHeight="200px"/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                    </div>

                    <div id="action-description">
                        <p>This sample demonstrates the option to insert the image to the RichTextEditor content. Click the image button from the
                        toolbar item to insert the image.</p>
                    </div>

                    <div id="description">
                        <p>Image tools used to insert an image to the RichTextEditor and click on the image to easily customize the image using quick toolbar.
                        The quick toolbar has the following items</p>
                        <ul>
                            <li><code>Replace</code> – can replace the image with some other image.</li>
                            <li><code>Align</code> – Align the image with left, right and justify.</li>
                            <li><code>Image captions</code> – set the captions for the image.</li>
                            <li><code>Change size</code> – modify width and height of image.</li>
                            <li><code>Delete</code> – delete the image.</li>
                            <li><code>Link</code> – provide the link to the image.</li>
                            <li><code>Display</code> - display the image as inline or with break.</li>
                            <li><code>Alternate text</code> – provide the alternative text for the image if the image is not present in the location.</li>
                            <li><code>Custom Tools</code> - "rotation" related commands are added as custom commands to the image element</li>
                            <li><code>Resize</code> – can resize the image dimension with resize options.</li>
                        </ul>
                        Quick commands are opened as context-menu on clicking the corresponding element.
                        The commands must be passed as string collection to image, text, and link attributes of the quickToolbarSettings property.
    
                    <p><b>Injecting Module:</b></p>
                        <p>RichTextEditor component features are segregated into individual feature-wise modules. To use image tool, we need to inject <code>Image</code> modules into the services.</p>
                    </div>
                </div>);
    }
}
