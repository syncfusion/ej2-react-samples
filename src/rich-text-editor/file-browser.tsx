/**
 * Rich Text Editor File Browser sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, QuickToolbar, Image, Link } from '@syncfusion/ej2-react-richtexteditor';
import { ToolbarSettingsModel, FileManager, FileManagerSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';

export class FileBrowser extends SampleBase<{}, {}> {
    private hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';

    private toolbarSettings: ToolbarSettingsModel = {
        items: ['FileManager', 'Image']
    }

    private fileManagerSettings: FileManagerSettingsModel = {
        enable: true,
        path: '/Pictures/Food',
        ajaxSettings: {
            url: this.hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
            uploadUrl: this.hostUrl + 'api/FileManager/Upload',
            downloadUrl: this.hostUrl + 'api/FileManager/Download'
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div>
                    <div className='control-section' id="rteAPI">
                        <div className='rte-control-section'>
                            <RichTextEditorComponent toolbarSettings={this.toolbarSettings}
                                fileManagerSettings={this.fileManagerSettings}>
                                    <p>Rich Text Editor allows inserting images from online sources as well as the local computers where you want to insert the image in your content.</p>
                                    <p><b>Get started Quick Toolbar to click on the image</b></p>
                                    <p>It is possible to add custom style on the selected image inside the RichTextEditor through the quick toolbar.</p>
                                    <img id='rteImageID' style={{ width: '300px', height: '300px', transform: 'rotate(0deg)'}} alt="Logo" src="./src/rich-text-editor/images/RTEImage-Feather.png" />
                                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar, FileManager]} />
                            </RichTextEditorComponent>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                <p>This sample demonstrates the option to insert the image into the RichTextEditor content using FileManager. Click the open folder button from the toolbar item to insert the image.</p>
                </div>

                <div id="description">
                    <p>The FileManager feature provides an option to insert the image into the editor and its supports various cloud service.
                        It supports all the basic file operations such as create, rename, delete, cut, copy, paste, upload, download and so on.
                    </p>

                    <p><b>Injecting Module:</b></p>
                    <p>RichTextEditor features are segregated into individual feature-wise modules. To use FileManager tool,
                        we need to inject FileManager module into the service</p>

                    <p><b>Note:</b> File Manager’s upload functionality is restricted in online demo.</p>
                </div>
            </div>
        );
    }
}
