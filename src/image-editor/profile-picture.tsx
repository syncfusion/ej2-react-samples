import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { getComponent, createElement } from '@syncfusion/ej2-base';
import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import { DialogComponent, ButtonPropsModel, AnimationSettingsModel } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './profile-picture.css';

export class ProfilePicture extends SampleBase<{}, {}> {
    public animationSettings: AnimationSettingsModel = { effect: 'None' };
    public dialogInstance: DialogComponent;
    public imageEditorInstance: ImageEditorComponent;
    public buttonEle: HTMLButtonElement;
    public buttonRef: React.Ref<HTMLButtonElement>;
    public image: HTMLImageElement;

    private fileChanged(args: any): void {
        const URL = window.URL; const url = URL.createObjectURL((args.target as any).files[0]);
        this.imageEditorInstance.open(url.toString());
        (document.getElementById('img-upload') as HTMLInputElement).value = null;
    }

    private handleImageLoaded(): void {
        let canvas: HTMLCanvasElement = document.querySelector('#img-canvas');
        let image: HTMLImageElement = document.querySelector('#custom-img');
        let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        canvas.width = image.width < image.height ? image.width : image.height; 
        canvas.height = canvas.width;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    buttons: ButtonPropsModel[] = [
    {
        click: this.dlgOpenButtonClick.bind(this),
        buttonModel: {
            content: 'Open',
            cssClass:'e-custom-img-btn e-img-custom-open'
        }
    },
    {
        click: this.dlgResetButtonClick.bind(this),
        buttonModel: {
            content: 'Reset',
            cssClass:'e-custom-img-btn e-img-custom-reset'
        }
    },
    {
        click: this.dlgRotateButtonClick.bind(this),
        buttonModel: {
            content: 'Rotate',
            cssClass: 'e-custom-img-btn e-img-custom-rotate'
        }
    },
    {
        click: this.dlgDoneButtonClick.bind(this),
        buttonModel: {
            content: 'Apply',
            cssClass: 'e-custom-img-btn e-img-custom-apply',
            isPrimary: true
        }
    }];

    private dlgOpenButtonClick(): void {
        document.getElementById('img-upload').click();
    }

    private dlgResetButtonClick(): void {
        this.imageEditorInstance.reset();
    }

    private dlgRotateButtonClick(): void {
        this.imageEditorInstance.rotate(-90);
    }

    private dlgDoneButtonClick(): void {
        this.imageEditorInstance.crop();
        let croppedData: ImageData = this.imageEditorInstance.getImageData();
        let canvas: HTMLCanvasElement = document.querySelector('#img-canvas');
        let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        let parentDiv: HTMLElement = document.querySelector('.e-profile');
        let tempCanvas: HTMLCanvasElement = parentDiv.appendChild(createElement('canvas') as HTMLCanvasElement);
        let tempContext: CanvasRenderingContext2D = tempCanvas.getContext('2d');
        tempCanvas.width = croppedData.width; tempCanvas.height = croppedData.height;
        tempContext.putImageData(croppedData, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
        tempCanvas.remove();
        parentDiv.style.borderRadius = '100%'; canvas.style.backgroundColor = '#fff';
        this.dialogInstance.hide();
    }

    contentTemplate() {
        return (<ImageEditorComponent ref={img => this.imageEditorInstance = img} toolbar={[]} fileOpened={this.fileOpened.bind(this)} created={this.created.bind(this)}></ImageEditorComponent>);
    }

    fileOpened() {
        this.imageEditorInstance.select('circle');
    }

    created() {
        this.imageEditorInstance.theme = window.location.href.split('#')[1].split('/')[1];
    }

    private editClicked(): void {
        this.dialogInstance.show();
        let canvas: HTMLCanvasElement = document.querySelector('#img-canvas');
        this.imageEditorInstance.open(canvas.toDataURL());
    };
    
    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-12 control-section e-img-editor-profile'>
                    <div className='e-profile'>
                        <div className='e-custom-wrapper'>  
                            <canvas id='img-canvas'></canvas>
                            <img alt='img' className='e-custom-img' id='custom-img' onLoad={this.handleImageLoaded.bind(this)} src='src/image-editor/images/profile.png'/>
                            <input type='file' id='img-upload' className='e-custom-file' onChange={this.fileChanged.bind(this)}/>
                            <span id='custom-edit' className='e-custom-edit' onClick={this.editClicked.bind(this)}>
                                <span className='e-custom-icon sb-icons'></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div id='profile-dialog'>
                <DialogComponent id='profile-dialog' showCloseIcon={true} animationSettings={this.animationSettings} closeOnEscape={true} visible={false} width={'340px'} height={'420px'} ref={dialog => this.dialogInstance = dialog}
                    target='.sb-desktop-wrapper' header='Edit Profile Image' buttons={this.buttons} content={this.contentTemplate.bind(this)} position= {{X:'center', Y: 100}}>
                </DialogComponent>
                </div>
                <div id='action-description'>
                    <p>The Image Editor component provides built-in support to rotate an image using the rotate method and support to crop an image using the select and crop methods.</p>
                </div>
                <div id='description'>
                    <p>In this demo, Image Editor is rendered within a dialog and opens an image by passing its URL path to the open method of the Image Editor control.</p>
                    <p> The following operations are supported in the Image Editor. :  </p>
                    <ul>
                        <li><b>Selection</b> : Multiple selection options are available. The selection region can be a square or circle, customized to various aspect ratios, and customized by dragging and resizing.</li>
                        <li><b>Crop</b> : The image can be cropped based on the selection.</li>
                        <li><b>Rotate</b> : The image can be rotated both clockwise and anticlockwise by 90 degrees.</li>
                    </ul>
                    <p>
                        More information about Image Editor can be found in this 
                <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/image-editor/getting-started/'>
                             documentation section</a>.
            </p>
                </div>
            </div>
        );
    }
}