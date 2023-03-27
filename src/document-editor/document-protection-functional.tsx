import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
function DocumentProtection() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    let hostUrl: string = 'https://services.syncfusion.com/react/production/api/documenteditor/';
    let container: DocumentEditorContainerComponent;
    let titleBar: TitleBar;
    let userList: string[] = ['engineer@mycompany.com', 'manager@mycompany.com'];
    function rendereComplete(): void {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        }
        container.showPropertiesPane = false;
        container.documentEditor.currentUser = 'engineer@mycompany.com';
        // container.documentEditor.pageOutline = '#E0E0E0';
        // container.documentEditor.acceptTab = true;
        container.documentEditor.resize();
        titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
        onLoadDefault();
    }
    return (<div className='control-pane'>
        <div className="col-lg-9 control-section">
            <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
            <div id="documenteditor_container_body">
                <DocumentEditorContainerComponent id="container" ref={(scope) => { container = scope; }} style={{ 'display': 'block' }}
                    height={'590px'} serviceUrl={hostUrl} enableToolbar={true} locale='en-US' />
            </div>
        </div>
        <div className="col-lg-3 property-section">
            <div className="property-panel-header">User Permission</div>
            <table id="property" title="User Permission" style={{ width: "100%", marginTop: "10px" }}>
                <tr>
                    <td className="left-side">
                        <DropDownListComponent id="ddlelement" dataSource={userList} change={onChange.bind(this)} placeholder="Select a game" value={userList[0]} popupHeight="220px" />
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

    function onChange(event: ChangeEventArgs): void {
        container.documentEditor.currentUser = event.value as string;
    }
    function onLoadDefault(): void {
        // tslint:disable
        let defaultDocument: object = {"sfdt":"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"};
        // tslint:enable   
        container.documentEditor.open(JSON.stringify(defaultDocument));
        container.documentEditor.documentName = 'Document Protection';
        titleBar.updateDocumentTitle();
        container.documentChange = (): void => {
            titleBar.updateDocumentTitle();
            container.documentEditor.focusIn();
        };
    }
}
export default DocumentProtection;