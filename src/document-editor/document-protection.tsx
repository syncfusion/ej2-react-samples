import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';

import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
export class DocumentProtection extends SampleBase<{}, {}> {
    private hostUrl: string = 'https://services.syncfusion.com/react/production/api/documenteditor/';
    public container: DocumentEditorContainerComponent;
    public titleBar: TitleBar;

    public userList: string[] = ['engineer@mycompany.com', 'manager@mycompany.com'];
    public rendereComplete(): void {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        }
        this.container.showPropertiesPane = false;
        this.container.documentEditor.currentUser = 'engineer@mycompany.com';
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
                    <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block' }}
                       height={'590px'} serviceUrl={this.hostUrl} enableToolbar={true} locale='en-US' />
                </div>
            </div>
            <div className="col-lg-3 property-section">
                <div className="property-panel-header">User Permission</div>
                <table id="property" title="User Permission" style={{ width: "100%", marginTop: "10px" }}>
                    <tr>
                        <td className="left-side">
                            <DropDownListComponent id="ddlelement" dataSource={this.userList} change={this.onChange.bind(this)} placeholder="Select a game" value={this.userList[0]} popupHeight="220px" />
                        </td>
                    </tr>
                </table>
            </div>
            <div id="action-description">
                <p>This example demonstrates document protection support in document editor to restrict the types of changes can be made to the document by a user/user group.</p>
            </div>
            <div id="description">
                <div>
                    <p>In this demo, the Document editor opens a protected document that includes permitted ranges for two users identified by email: each user is authorized to edit a separate text area.</p>
                    <p>You can switch between the current user to edit different parts by selecting dropdown list in User permissions pane.</p>
                    <p>User can add the user in dropdown who have editing permission in document by using addItem method.</p>
                    <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/document-management/">documentation section.</a>
                    </p>
                </div>
            </div>
        </div>);
    }

    public onChange(event: ChangeEventArgs): void {
        this.container.documentEditor.currentUser = event.value as string;
    }
    onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object = {"sfdt":"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"};
        // tslint:enable   
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Document Protection';
        this.titleBar.updateDocumentTitle();
        this.container.documentChange = (): void => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };
    }
}