import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ColorPickerComponent, ColorPickerEventArgs } from '@syncfusion/ej2-react-inputs';
import { DOCUMENT_PROTECTION } from './data';

import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
export class DocumentProtection extends SampleBase<{}, {}> {
    private hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    public container: DocumentEditorContainerComponent;
    public titleBar: TitleBar;

    public userList: string[] = ['engineer@mycompany.com', 'manager@mycompany.com'];

    public colorPicker: ColorPickerComponent;
    public rendereComplete(): void {
        this.container.serviceUrl = this.hostUrl + 'api/documenteditor/';
        // this.container.documentEditor.pageOutline = '#E0E0E0';
        // this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true);
        this.onLoadDefault();
    }
    render() {
        return (<div className='control-pane'>
            <div className="col-lg-9 control-section">
                <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block', 'height': '590px' }}
                        enableToolbar={true} locale='en-US' />
                </div>
            </div>
            <div className="col-lg-3 property-section">
                <div className="content-wrapper">
                    <div className="heading-section">
                        <h5><b>User Permission</b></h5>
                    </div>
                    <div className="control-label"><b>Current User</b>
                    </div>
                    <div className="control-label">
                        <DropDownListComponent id="ddlelement" dataSource={this.userList} change={this.onUserChange.bind(this)} placeholder="Select a game" value={this.userList[0]} popupHeight="220px" />
                    </div>
                    <div className="control-label"><b>User Color</b>
                    </div>
                    <ColorPickerComponent ref={(scope) => { this.colorPicker = scope; }} id='color-picker' change={this.onUserColorChange.bind(this)} ></ColorPickerComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This example demonstrates document protection support in document editor to restrict the types of changes can be made to the document by a user/user group.To unprotect the document, use password '123'.</p>
            </div>
            <div id="description">
                <div>
                    <p>In this demo, the Document editor opens a protected document that includes permitted ranges for two usersidentified by email: each user is authorized to edit a separate text area.</p>
                    <p>You can switch between the current user to edit different parts by selecting dropdown list in User permissions pane.</p>
                    <p>User can add the user in dropdown who have editing permission in document by using addItem method.</p>
                    <p>The range that is enabled for the current user is highlighted.</p>
                    <p> You can disable the highlighting or customize its color using the corresponding demo’s elements.</p>
                    <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/">documentation section.</a>
                    </p>
                </div>
            </div>
            <script>{
                window.onbeforeunload = function () {
                    return 'Want to save your changes?';
                }
            }
            </script>
        </div>);
    }

    public onUserChange(event: ChangeEventArgs): void {
        this.container.documentEditor.currentUser = event.value as string;
    }
    public onUserColorChange(e: ColorPickerEventArgs): void {
        this.container.documentEditor.userColor = e.currentValue.hex;
    }
    onLoadDefault = (): void => {
        this.container.documentEditor.open(DOCUMENT_PROTECTION);
        this.container.documentEditor.documentName = 'Document Protection';
        this.container.documentEditor.currentUser = "engineer@mycompany.com";
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.documentChange = (): void => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };
        this.colorPicker.value = this.container.documentEditor.userColor;
    }
}