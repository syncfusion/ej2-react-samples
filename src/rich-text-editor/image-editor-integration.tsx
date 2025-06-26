/**
 * Rich Text Editor Image Editor Integration sample
 */
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar, NodeSelection, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import { getComponent} from '@syncfusion/ej2-base';
import { ImageEditor } from '@syncfusion/ej2-image-editor';
import './image-editor-integration.css';

export class ImageEditorIntegration extends SampleBase<{}, {}> {

  private selection = new NodeSelection();
  private rteObj: RichTextEditorComponent;
  private dialogObj;
  private imageEditorObj;
  private range;
  private saveSelection: NodeSelection;
  private dataURL;
  private isLoaded = false;
  private header = 'Image Editor';
  private imageELement;
  private dlgButtons = [
    {
      buttonModel: { content: 'Save', isPrimary: true },
      click: this.onInsert.bind(this),
    },
    { buttonModel: { content: 'Cancel' }, click: this.onCancel.bind(this) },
  ];
  private toolbar = ['Undo', 'Redo', 'Crop', 'Annotate', 'ZoomIn', 'ZoomOut',
  'Reset', 'Pan', 'Finetune', 'Filter', 'Pen', 'Line', 'Rectangle', 'Ellipse', 'Arrow',
  'Path', 'Text', 'CustomSelection', 'CircleSelection', 'SquareSelection', 'RatioSelection',
  'Default', 'Chrome', 'Cold', 'Warm', 'Grayscale', 'Sepia', 'Invert', 'Brightness', 'Contrast',
  'Hue', 'Saturation', 'Exposure', 'Opacity', 'Blur' ];
  public onInsert(): void {
    if (this.rteObj.formatter.getUndoRedoStack().length === 0) {
      this.rteObj.formatter.saveData();
    }
    this.saveSelection.restore();
    var canvas: any = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    const imgData = this.imageEditorObj.getImageData();
    canvas.height = imgData.height;
    canvas.width = imgData.width;
    ctx.putImageData(imgData, 0, 0);
    this.isLoaded = true;
    this.rteObj.executeCommand('editImage', {
      url: canvas.toDataURL(),
      width: { width: canvas.width },
      height: { height: canvas.height },
      selection: this.saveSelection,
      cssClass: this.imageELement.getAttribute('class').replace('e-rte-image', ''),
    });
    this.rteObj.formatter.saveData();
    this.rteObj.formatter.enableUndo(this.rteObj);
    this.dispose();
    this.dialogObj.hide();
  }
  public onCancel(): void {
    this.dispose();
    this.dialogObj.hide();
    this.isLoaded = true;
  }
  private quickToolbarSettings = {
    image: [
      'Replace',
      'Align',
      'Caption',
      'Remove',
      '|',
      'InsertLink',
      'OpenImageLink',
      'EditImageLink',
      'RemoveImageLink',
      'Display',
      'AltText',
      {
        tooltipText: 'Image Editor',
        template:
          '<button class="e-tbar-btn e-btn" id="imageEditor"><span class="e-btn-icon e-icons e-rte-image-editor"></span></button>',
      },
    ],
  };
  public onToolbarClick(args): void {
    if (args.item.tooltipText === 'Image Editor') {
      this.range = this.selection.getRange(document);
      this.saveSelection = this.selection.save(this.range, document);
      this.dialogObj.show();
      this.rteObj.quickToolbarModule.imageQTBar.hidePopup();
    }
  }
  public dispose():void {
    const imageEditorInstance = getComponent(document.getElementById('image-editor'), 'image-editor') as ImageEditor;
    if (imageEditorInstance !== null && imageEditorInstance !== undefined) {
        imageEditorInstance.destroy();
    }
  }
  public onClose():void {
    this.dispose();
    this.dialogObj.hide();
    this.isLoaded = true;
  }
  public open(): void {
    this.imageEditorObj.update();
    this.imageEditorObj.open(this.dataURL);
  }
  public OnBeforeOpen(): void {
    this.dispose();
    this.isLoaded = false;
    var selectNodes: any =
      this.rteObj.formatter.editorManager.nodeSelection.getNodeCollection(this.range);
    if (selectNodes.length == 1 && selectNodes[0].tagName == 'IMG') {
      this.imageELement = selectNodes[0];
      this.imageELement.crossOrigin = 'anonymous';
      var canvas: any = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      canvas.height = this.imageELement.offsetHeight;
      canvas.width = this.imageELement.offsetWidth;
      var imageELe = this.imageELement;
      var isLoded = this.isLoaded;
      var proxy = this;
      this.imageELement.onload = function () {
        ctx.drawImage(imageELe, 0, 0, canvas.width, canvas.height);
        proxy.dataURL = canvas.toDataURL();
      }
      if (!isLoded) {
        this.imageEditorObj = new ImageEditor({
          height: '450px'
        });
        this.imageEditorObj.appendTo('#image-editor');
        isLoded = true;
      };
    }
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section' id="rte">
          <div className='rte-control-section'>
          <RichTextEditorComponent
                id="rteImageEditor"
                ref={(richtexteditor) => { this.rteObj = richtexteditor }}
                quickToolbarSettings={this.quickToolbarSettings}
                toolbarClick={this.onToolbarClick.bind(this)}
            >
                <p>
                An image can be edited within a Rich Text Editor using an Image Editor.
                <img
                    id="img1"
                    style={{ height: 335 }}
                    src="src/rich-text-editor/images/bridge.png"
                    aria-label="Bridge"
                ></img>
                </p>
                <p>
                It allows users to quickly and easily add an Image Editor to their Rich Text Editor.
                It provides a variety of features, including image cropping, resizing, rotation, and more.
                Additionally, it supports a wide range of image formats, including JPEG, PNG, and GIF.
                </p>
                <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio]} />
            </RichTextEditorComponent>
            <DialogComponent
                id="ImageEditorDialog"
                ref={(dialog) => { this.dialogObj = dialog }}
                buttons={this.dlgButtons}
                open={this.open.bind(this)}
                beforeOpen={this.OnBeforeOpen.bind(this)}
                header={this.header}
                visible={false}
                showCloseIcon={true}
                width="800px"
                height="550px"
                isModal={true}
                close={this.onClose.bind(this)}
            >
                <div className="dialogContent">
                <ImageEditorComponent
                    id="image-editor"
                    height="400px"
                    ref={(imageEditor) => { this.imageEditorObj = imageEditor }}
                    toolbar={this.toolbar}
                />
                </div>
            </DialogComponent>
          </div>
        </div>

       
        <div id="action-description">
          <p>This example demonstrates how to integrate Image Editor into Rich Text Editor component. To use it, simply click on the image to open the quick toolbar and select Image Editor custom quick toolbar. Then, the image will be opened in the Image Editor.</p>
        </div>

        <div id="description">
        <p>The Image Editor component is integrated into the Rich Text Editor and opens the Image Editor within a Dialog when the Image Editor custom quick toolbar is clicked and allows to edit the image. To achieve this, the sample is customized for the Image Editor and Rich Text Editor</p>
        <ul>
            <li>Include the Image Editor custom toolbar item in the <a target='_blank' href='https://helpej2.syncfusion.com/react/documentation/api/rich-text-editor/quickToolbarSettingsModel/#image'>quickToolbarSettings.image</a> property of the Rich Text Editor</li>
            <li>Configure the Image Editor within a Dialog using the <a target='_blank' href='https://helpej2.syncfusion.com/react/documentation/api/dialog#beforeopen'>beforeOpen</a> event of the Dialog</li>
            <li>Open the Dialog on clicking the Image Editor custom toolbar item</li>
            <li>Insert the edited image into the Rich Text Editor by clicking the Insert button</li>
        </ul>
        </div>
      </div>
    );
  }
}
