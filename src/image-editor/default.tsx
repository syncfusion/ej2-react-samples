import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './default.css';

export class Default extends SampleBase<{}, {}> {
    private imgObj: ImageEditorComponent;
    public imageEditorCreated(): void {
        if (Browser.isDevice) {
            this.imgObj.open('src/image-editor/images/flower.png');
        } else {
            this.imgObj.open('src/image-editor/images/bridge.png');
        }
        if (this.imgObj.theme && window.location.href.split('#')[1]) {
            this.imgObj.theme = window.location.href.split('#')[1].split('/')[1];
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='row'>
                        <div className='col-lg-12 control-section'>
							<div className='e-img-editor-sample'>
								<ImageEditorComponent ref={(img) => { this.imgObj = img }} created={this.imageEditorCreated.bind(this)}>
								</ImageEditorComponent>
							</div>
                        </div>
                    </div>
                </div>
                <div id='action-description'>
                    <p>This sample demonstrates Image Editor features such as crop, rotate, flip, insert shape and text.</p>
                </div>
                <div id='description'>
                    <p>
                        The Image Editor component provides built-in support to edit images in the following ways through APIs:
                    </p>
                    <ul>
                        <li><b>Selection</b> : Multiple selection options are available. The selection region can be a square or circle, customized to various aspects ratios, and customized by dragging and resizing.</li>
                        <li><b>Crop</b> : The image can be cropped based on the selection.</li>
                        <li><b>Rotate</b> : The image can be rotated both clockwise and anticlockwise by 90 degrees.</li>
                        <li><b>Flip</b> : The image can be flipped both horizontally and vertically.</li>
                        <li><b>Zoom</b> : The image can be zoomed in and out.</li>
                        <li><b>Pan</b> : View the entire image by toggling the pan option from the toolbar.</li>
                        <li><b>Freehand drawing</b> : Draw freehand on the image and adjust the pen's stroke width and stroke color.</li>
                        <li><b>Reset</b> : Revert all the edited states and load the original image.</li>
                        <li><b>Save</b> : Save the edited image in JPEG, PNG, and SVG formats.</li>
                        <li><b>Annotation</b> : Text, rectangle, ellipse, and line annotation shapes are supported.</li>
                    </ul>
                    <p>
                        More information about Image Editor can be found in this 
                        <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/image-editor/getting-started/'> documentation section</a>.
                    </p>
                </div>
            </div>
        );
    }
}