import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DocumentEditorContainerComponent, Toolbar, ContentControlInfo } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import { useEffect, useRef, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
const BindUIToDocument = () => {
    useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, []);
    let hostUrl: string = 'https://services.syncfusion.com/react/production/api/documenteditor/';
    let container = useRef<DocumentEditorContainerComponent>(null);
    let titleBar: TitleBar;
    let placeHolderPrefix = 'placeHolder_';
    const settings ={showRuler: true};
    const nameBox = useRef(null);
    const dateBox = useRef(null);
    const addressBox = useRef(null);
    const phoneBox = useRef(null);
    const emailBox = useRef(null);
    let toolbarOptions: any = [
        'New',
        'Open',
        'Separator',
        'Undo',
        'Redo',
        'Separator',
        'ContentControl',
        'Separator',
        'Image',
        'Table',
        'Hyperlink',
        'Bookmark',
        'TableOfContents',
        'Separator',
        'Header',
        'Footer',
        'PageSetup',
        'PageNumber',
        'Break',
        'Separator',
        'Find',
        'Separator',
        'Comments',
        'TrackChanges',
        'Separator',
        'LocalClipboard',
        'Separator',
        'FormFields',
        'UpdateFields',
    ];

    const onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object = {"sfdt":"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"};

        // tslint:enable   
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = 'Bind Content Control Data';
        titleBar.updateDocumentTitle();
        container.current.documentChange = (): void => {
            titleBar.updateDocumentTitle();
            container.current.documentEditor.focusIn();
        };
        bindToForm();
    };
    const rendereComplete = () : void => {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        }
        container.current.showPropertiesPane = false;
        // this.container.documentEditor.pageOutline = '#E0E0E0';
        // this.container.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();
        titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.current.documentEditor, true);
        onLoadDefault();
    };
    const bindToDocument = () => {
        let bookmarkobj = {};
        const data : any = [];
        bookmarkobj['Name'] = nameBox.current.value;
        bookmarkobj['DOB'] = dateBox.current.value;
        bookmarkobj['Address'] = addressBox.current.value;
        bookmarkobj['Phone'] = phoneBox.current.value;
        bookmarkobj['Email'] = emailBox.current.value;
        if (!isNullOrUndefined(bookmarkobj['Name'])) {
            const contentControlData = { title: placeHolderPrefix + 'Name', tag: '', value: bookmarkobj['Name'], canDelete: false, canEdit: false, type: 'RichText' };
            data.push(contentControlData);
        }
        if (!isNullOrUndefined(bookmarkobj['DOB'])) {
            const contentControlData = { title: placeHolderPrefix + 'DOB', tag: '', value: bookmarkobj['DOB'], canDelete: false, canEdit: false, type: 'Date' };
            data.push(contentControlData);
        }
        if (!isNullOrUndefined(bookmarkobj['address'])) {
            const contentControlData = { title: placeHolderPrefix + 'Address', tag: '', value: bookmarkobj['Address'], canDelete: false, canEdit: false, type: 'RichText' };
            data.push(contentControlData);
        }
        if (!isNullOrUndefined(bookmarkobj['Phone'])) {
            const contentControlData = { title: placeHolderPrefix + 'Phone', tag: '', value: bookmarkobj['Phone'], canDelete: false, canEdit: false, type: 'RichText' };
            data.push(contentControlData);
        }
        if (!isNullOrUndefined(bookmarkobj['Email'])) {
            const contentControlData = { title: placeHolderPrefix + 'Email', tag: '', value: bookmarkobj['Email'], canDelete: false, canEdit: false, type: 'RichText' };
            data.push(contentControlData);
        }
        container.current.documentEditor.importContentControlData(data);
    };
    const bindToForm = () => {
        let contentControlInfos = container.current.documentEditor.exportContentControlData();
        if(contentControlInfos.length > 0) {
        for (let i = 0; i < contentControlInfos.length; i++){
            if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('Name') > -1) {
                nameBox.current.value = contentControlInfos[i].value;
              }
              if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('DOB') > -1) {
                dateBox.current.value = contentControlInfos[i].value;
              }
              if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('Address') > -1) {
                addressBox.current.value = contentControlInfos[i].value;
              }
              if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('Phone') > -1) {
                phoneBox.current.value = contentControlInfos[i].value;
              }
              if (!isNullOrUndefined(contentControlInfos[i].title) && contentControlInfos[i].title.indexOf('Email') > -1) {
                emailBox.current.value = contentControlInfos[i].value;
              }
        }
        }
    };
    return (<div className='control-pane'>
            <div className="col-lg-9 control-section">
                <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent 
                        id="container"
                        ref={container}
                        style={{ display: 'block' }}
                        height={'590px'} 
                        serviceUrl={hostUrl} 
                        enableToolbar={true} 
                        locale='en-US'
                        toolbarItems={toolbarOptions} 
                    />
                </div>
            </div>
            <div className="col-lg-3 property-section">
                <div className="content-wrapper sb-content-tab-header">
                <div className="property-panel-header">Form UI</div>
                    <div>
                        <TextBoxComponent id = "firstName" ref={nameBox} placeholder = "Name" floatLabelType = "Auto" />
                    </div>
                    <div style={{marginTop: '20px',marginBottom: '0px'}}>
                        <TextBoxComponent id = "birthDate"  ref ={dateBox} placeholder = "Date[DD/MM/YYYY]" floatLabelType = "Auto" />
                    </div>
                    <div style={{marginTop: '20px',marginBottom: '0px'}}>
                        <TextBoxComponent  id = "address"  ref={addressBox} placeholder = "Address" floatLabelType = "Auto" />
                    </div>
                    <div style={{marginTop: '20px',marginBottom: '0px'}}>
                        <TextBoxComponent  id = "phone" ref={phoneBox} placeholder = "Phone" floatLabelType = "Auto" />
                    </div>
                    <div style={{marginTop: '20px',marginBottom: '20px'}}>
                        <TextBoxComponent  id = "email" ref={emailBox} placeholder = "Email" floatLabelType = "Auto" />
                    </div>
                     </div>
                    <div className="content-wrapper">
                        <div style={{marginTop: '20px',marginRight: '10px', marginBottom: '10px',marginLeft: '0px'}} >
                            <ButtonComponent  id="BindToDocument" onClick={bindToDocument.bind(this)}>
                                Bind Form UI Data To Document
                            </ButtonComponent>
                        </div>
                        <div style={{marginTop: '10px', marginBottom: '0px'}} >
                            <ButtonComponent  id="BindToForm" onClick={bindToForm.bind(this)}>
                                Bind Document Data To Form UI
                            </ButtonComponent>
                        </div>
                    </div>
            </div>
            <div id="defaultDialog"></div>
            <div id="action-description">
                <p>This example showcases how to retrieve content control data from a document and subsequently import data into it.</p>
            </div>
            <div id="description">
                <p>Content controls are individual controls that users can add and customize for use in templates, forms, and documents.</p>
                    <ul>
                        <li>Rich Text: Format and manage rich text with ease, allowing for bold, italic, and underlined text, among
                            other formatting options. This control provides a rich editing experience, making your documents more
                            dynamic and visually appealing.</li>
                        <li>Plain Text: Insert and edit plain text effortlessly, ensuring a clean and straightforward document layout.
                            Ideal for simple text entries without the need for complex formatting.</li>
                        <li>Dropdown List: Create and customize dropdown menus to streamline user input and enhance form functionality.
                            This control simplifies data entry by providing predefined options for users to choose from.</li>
                        <li>Combobox: Combine text input and dropdown options to offer flexible user interaction. Users can either
                            select from a list of predefined choices or enter their own text, increasing versatility.</li>
                        <li>Date Picker: Select and insert dates with an intuitive picker, reducing the chances of formatting errors.
                            This control makes date entry quick and consistent across your documents.</li>
                        <li>Check Box: Add check boxes for easy task tracking and selection, perfect for creating lists and forms. Users
                            can quickly mark items as completed, improving document interactivity.</li>
                        <li>Image: Insert and manage images seamlessly, enhancing the visual appeal of your documents. This control
                            supports various image formats and allows for easy resizing and positioning.</li>
                    </ul>
                    <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/content-control">documentation section.</a>
                    </p>
            </div>
        </div>);

}
export default BindUIToDocument;
