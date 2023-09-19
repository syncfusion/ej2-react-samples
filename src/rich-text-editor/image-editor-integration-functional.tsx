/**
 * Rich Text Editor Image Editor integration sample
 */
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar, NodeSelection } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import { updateSampleSection } from '../common/sample-base';
import './image-editor-integration.css';
function ImageEditorIntegration() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    var rteObj;
    const dlgButtons = [
      {
        buttonModel: { content: 'Save', isPrimary: true },
        click: onInsert.bind(this),
      },
      { buttonModel: { content: 'Cancel' }, click: onCancel },
    ];
    const toolbar = ['Undo', 'Redo', 'Crop', 'Annotate', 'ZoomIn', 'ZoomOut',
      'Reset', 'Pan', 'Finetune', 'Filter', 'Pen', 'Line', 'Rectangle', 'Ellipse', 'Arrow',
      'Path', 'Text', 'CustomSelection', 'CircleSelection', 'SquareSelection', 'RatioSelection',
      'Default', 'Chrome', 'Cold', 'Warm', 'Grayscale', 'Sepia', 'Invert', 'Brightness', 'Contrast',
      'Hue', 'Saturation', 'Exposure', 'Opacity', 'Blur' ];
    const selection = new NodeSelection();
    const header = 'Image Editor';
    var dialogObj;
    var imageEditorObj;
    var rteObj;
    var range;
    var saveSelection;
    var dataURL;
    var isLoaded = false;
    var imageELement;
    function onInsert() {
      if (rteObj.formatter.getUndoRedoStack().length === 0) {
        rteObj.formatter.saveData();
      }
      saveSelection.restore();
      var canvas: any = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      const imgData = imageEditorObj.getImageData();
      canvas.height = imgData.height;
      canvas.width = imgData.width;
      ctx.putImageData(imgData, 0, 0);
      isLoaded = true;
      rteObj.executeCommand('editImage', {
        url: canvas.toDataURL(),
        width: { width: canvas.width },
        height: { height: canvas.height },
        selection: saveSelection,
        cssClass: imageELement.getAttribute('class').replace('e-rte-image', ''),
      });
      rteObj.formatter.saveData();
      rteObj.formatter.enableUndo(rteObj);
      dialogObj.hide();
      isLoaded = false;
    }
  
    function onCancel() {
      dialogObj.hide();
    }
    function onToolbarClick(args) {
      if (args.item.tooltipText === 'Image Editor') {
        range = selection.getRange(document);
        saveSelection = selection.save(range, document);
        dialogObj.show();
      }
    }
    function OnBeforeOpen() {
      var selectNodes =
        rteObj.formatter.editorManager.nodeSelection.getNodeCollection(range);
      if (selectNodes.length == 1 && selectNodes[0].tagName == 'IMG') {
        imageELement = selectNodes[0];
        imageELement.crossOrigin = 'anonymous';
        var canvas: any = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        canvas.height = imageELement.offsetHeight;
        canvas.width = imageELement.offsetWidth;
        imageELement.onload = function () {
          ctx.drawImage(imageELement, 0, 0, canvas.width, canvas.height);
          dataURL = canvas.toDataURL();
          if (!isLoaded) {
            imageEditorObj.open(dataURL);
          }
        };
      }
    }
    const quickToolbarSettings = {
      image: [
        'Replace',
        'Align',
        'Caption',
        'Remove',
        '-',
        'InsertLink',
        'Display',
        'AltText',
        {
          tooltipText: 'Image Editor',
          template:
            '<button class="e-tbar-btn e-btn" id="imageEditor"><span class="e-btn-icon e-icons e-rte-image-editor"></span>',
        },
      ],
    };
    return (
        <div className='control-pane'>
            <div className='control-section' id="rte">
                <div className='rte-control-section'>
                <RichTextEditorComponent
                id="rteImageEditor"
                ref={(scope) => {
                rteObj = scope;
                }}
                quickToolbarSettings={quickToolbarSettings}
                toolbarClick={onToolbarClick}
            >
                <p>
                An image can be edited within a Rich Text Editor using an Image Editor.
                <img
                    id="img1"
                    style={{ height: 335 }}
                    src="https://ej2.syncfusion.com/demos/src/image-editor/images/bridge.png"
                ></img>
                </p>
                <p>
                It allows users to quickly and easily add an Image Editor to their Rich Text Editor.
                It provides a variety of features, including image cropping, resizing, rotation, and more.
                Additionally, it supports a wide range of image formats, including JPEG, PNG, and GIF.
                </p>
                <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
            </RichTextEditorComponent>
            <DialogComponent
                id="ImageEditorDialog"
                ref={(scope) => {
                dialogObj = scope;
                }}
                buttons={dlgButtons}
                beforeOpen={OnBeforeOpen}
                header={header}
                visible={false}
                showCloseIcon={true}
                width="800px"
                height="550px"
                isModal={true}
            >
                <div className="dialogContent">
                <ImageEditorComponent
                    height="400px"
                    ref={(scope) => {
                    imageEditorObj = scope;
                    }}
                    toolbar={toolbar}
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
export default ImageEditorIntegration;
