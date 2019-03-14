/**
 * RichTextEditor image sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, QuickToolbar, Image, Link, IToolbarItems } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import { NodeSelection } from '@syncfusion/ej2-react-richtexteditor';
import './image.css';

export class ImageSample extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorComponent;

    // set the value to RichTextEditor
    private template: string = `<p>Rich Text Editor allows to insert images from online source as well as local 
    computer where you want to insert the image in your content.</p>
    <p><b>Get started Quick Toolbar to click on the image</b></p>
    <p>It is possible to add custom style on the selected image inside the RichTextEditor through quick toolbar.</p>
    <img id='rteImageID' style="width:300px; height:300px;transform: rotate(0deg);" alt="Logo" src="./src/rich-text-editor/images/RTEImage-Feather.png" />`;


    private image: (string | IToolbarItems)[] = ['Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
        'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension',
        {
            tooltipText: 'Rotate Left',
            template: '<button class="e-tbar-btn e-btn" id="roatateLeft"><span class="e-btn-icon e-icons e-rotate-left"></span>'
        },
        {
            tooltipText: 'Rotate Right',
            template: '<button class="e-tbar-btn e-btn" id="roatateRight"><span class="e-btn-icon e-icons e-rotate-right"></span>'
        }];

    private quickToolbarSettings: object = {
        image: this.image
    }

    public onToolbarClick(e: any): void {
        let nodeObj: NodeSelection = new NodeSelection();
        let range: Range = nodeObj.getRange(this.rteObj.contentModule.getDocument());
        let imgEle: HTMLElement = nodeObj.getNodeCollection(range)[0] as HTMLElement;
        if (e.item.tooltipText === 'Rotate Right') {
            let transform: number = (imgEle.style.transform === '') ? 0 :
                parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
            imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
        } else if (e.item.tooltipText === 'Rotate Left') {
            let transform: number = (imgEle.style.transform === '') ? 0 :
                Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
            imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section' id='rteImage'>
                    <div className="content-wrapper">
                            <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }}
                                toolbarClick={this.onToolbarClick.bind(this)} valueTemplate={this.template} quickToolbarSettings={this.quickToolbarSettings}>
                                <Inject services={[HtmlEditor, Toolbar, Image, QuickToolbar]} />
                            </RichTextEditorComponent>
                    </div>
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
            </div>
        );
    }
}
