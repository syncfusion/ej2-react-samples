import * as React from 'react';
import { RichTextEditorComponent, Inject, IToolbarItems, HtmlEditor, Toolbar, ToolbarSettingsModel, Image, Link, NodeSelection, QuickToolbar, ActionCompleteEventArgs, ActionBeginEventArgs, Table, PasteCleanup } from '@syncfusion/ej2-react-richtexteditor';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';
import './mail-merge.css';

export class MailMerge extends SampleBase<{}, {}>  {
    private rteObj: RichTextEditorComponent | null = null;
    private mentionObj: MentionComponent | null = null;
    private range: Range = new Range();
    private selection: NodeSelection = new NodeSelection();
    private saveSelection: any = null;
    private value: string = `<p>Dear <span contenteditable="false" class="e-mention-chip"><span>{{FirstName}}</span></span> <span contenteditable="false" class="e-mention-chip"><span>{{LastName}}</span></span>,</p>
  <p>We are thrilled to have you with us! Your unique promotional code for this month is: <span contenteditable="false" class="e-mention-chip"><span>{{PromoCode}}</span></span>.</p>
  <p>Your current subscription plan is: <span contenteditable="false" class="e-mention-chip"><span>{{SubscriptionPlan}}</span></span>.</p>
  <p>Your customer ID is: <span contenteditable="false" class="e-mention-chip"><span>{{CustomerID}}</span></span>.</p>
  <p>Your promotional code expires on: <span contenteditable="false" class="e-mention-chip"><span>{{ExpirationDate}}</span></span>.</p>
  <p>Feel free to browse our latest offerings and updates. If you need any assistance, don't hesitate to contact us at <a href="mailto:{{SupportEmail}}"><span contenteditable="false" class="e-mention-chip"><span>{{SupportEmail}}</span></span></a> or call us at <span contenteditable="false" class="e-mention-chip"><span>{{SupportPhoneNumber}}</span></span>.</p>
  <p>Best regards,<br>The <span contenteditable="false" class="e-mention-chip"><span>{{CompanyName}}</span></span> Team</p>`

    private items: (string | IToolbarItems)[] = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|',
        'CreateLink', 'Image', 'CreateTable', '|',
        { tooltipText: 'Merge Data', template: '#merge_data', command: 'Custom' },
        { tooltipText: 'Insert Field', template: '#insertField', command: 'Custom' },
        'SourceCode', '|', 'Undo', 'Redo'
    ]

    //Rich Text Editor ToolbarSettings
    private toolbarSettings: ToolbarSettingsModel = {
        items: this.items
    };

    private mentionChar: "{{";

    private itemsName: [
        { text: 'First Name' },
        { text: 'Last Name' },
        { text: 'Support Email' },
        { text: 'Company Name' },
        { text: 'Promo Code' },
        { text: 'Support Phone Number' },
        { text: 'Customer ID' },
        { text: 'Expiration Date' },
        { text: 'Subscription Plan' },
    ]

    private placeholderData: {
        FirstName: 'John',
        LastName: 'Doe',
        PromoCode: 'ABC123',
        SubscriptionPlan: 'Premium',
        CustomerID: '123456',
        ExpirationDate: '2024-12-31',
        SupportEmail: 'support@example.com',
        SupportPhoneNumber: '+1-800-555-5555',
        CompanyName: 'Example Inc.'
    }

    private textToValueMap: {
        'First Name': 'FirstName',
        'Last Name': 'LastName',
        'Support Email': 'SupportEmail',
        'Company Name': 'CompanyName',
        'Promo Code': 'PromoCode',
        'Support Phone Number': 'SupportPhoneNumber',
        'Customer ID': 'CustomerID',
        'Expiration Date': 'ExpirationDate',
        'Subscription Plan': 'SubscriptionPlan'
    }

    private data: [
        { text: 'First Name', value: 'FirstName' },
        { text: 'Last Name', value: 'LastName' },
        { text: 'Support Email', value: 'SupportEmail' },
        { text: 'Company Name', value: 'CompanyName' },
        { text: 'Promo Code', value: 'PromoCode' },
        { text: 'Support Phone Number', value: 'SupportPhoneNumber' },
        { text: 'Customer ID', value: 'CustomerID' },
        { text: 'Expiration Date', value: 'ExpirationDate' },
        { text: 'Subscription Plan', value: 'SubscriptionPlan' },
    ]

    private fieldsData: { text: 'text', value: 'value' }

    actionBegin(args: ActionBeginEventArgs) {
        if (
            args.requestType === 'EnterAction' &&
            this.mentionObj.element.classList.contains('e-popup-open')
        ) {
            args.cancel = true;
        }
    }

    actionComplete(e: ActionCompleteEventArgs) {
        if (e.requestType === 'SourceCode') {
            this.rteObj.getToolbar().querySelector('#merge_data').parentElement.classList.add('e-overlay');
            this.rteObj.getToolbar().querySelector('#insertField').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
            this.rteObj.getToolbar().querySelector('#merge_data').parentElement.classList.remove('e-overlay');
            this.rteObj.getToolbar().querySelector('#insertField').parentElement.classList.remove('e-overlay');
        }
    }


    blur() {
        this.range = this.selection.getRange(document);
        this.saveSelection = this.selection.save(this.range, document);
    }

    onDropDownClose() {
        if (this.rteObj) {
            this.rteObj.focusIn();
        }
    }

    onItemSelect(args: { item: { text: string; }; }) {
        if (args.item.text != null) {
            const value = this.textToValueMap[args.item.text];
            const trimmedValue = value.trim();
            this.rteObj.formatter.editorManager.nodeSelection.restore();
            this.rteObj!.executeCommand(
                'insertHTML',
                `<span contenteditable="false" class="e-mention-chip"><span>{{${trimmedValue}}}</span></span>&nbsp;`,
                { undo: true }
            );
        }
    }

    displayTemplate(data: { value: string; }) {
        return (
            <React.Fragment>
                {data.value}&#125;&#125;
            </React.Fragment>
        );
    }

    onClickHandler() {
        if (this.rteObj) {
            let editorContent = this.rteObj.value;
            let mergedContent = this.replacePlaceholders(editorContent, this.placeholderData);
            if (this.rteObj.formatter.getUndoRedoStack().length === 0) {
                this.rteObj.formatter.saveData();
            }
            this.rteObj.value = mergedContent;
            this.rteObj.formatter.saveData();
        } else {
            console.log('MailMergeEditor is not initialized.');
        }
    }

    replacePlaceholders(template: string, data: { [key: string]: string; }) {
        return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
            const value = data[key.trim()];
            return value !== undefined ? value : match;
        });
    }

    render() {
        return (
            <div>
                <RichTextEditorComponent
                    ref={(richtexteditor) => { this.rteObj = richtexteditor; }}
                    value={this.value}
                    id="mailMergeEditor"
                    toolbarSettings={this.toolbarSettings}
                    placeholder="Type @ and tag the name"
                    blur={this.blur}
                    actionComplete={this.actionComplete}
                    actionBegin={this.actionBegin}
                    saveInterval={1}
                >
                    <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar, Table, PasteCleanup]} />
                </RichTextEditorComponent>
                <button
                    className="e-control e-lib e-btn e-formats-tbar-btn e-rte-elements e-tbar-btn"
                    tabIndex={-1}
                    id="merge_data"
                    style={{ width: '100%' }}
                    onClick={this.onClickHandler}
                >
                    <span style={{ display: 'inline-flex' }}>
                        <span className="e-tbar-btn-text">Merge Data</span>
                    </span>
                </button>
                <DropDownButtonComponent
                    className="e-rte-dropdown-btn e-rte-dropdown-popup e-rte-dropdown-items e-rte-elements e-rte-dropdown-menu"
                    items={this.itemsName}
                    content='<span style="display: inline-flex;"><span class="e-rte-dropdown-btn-text">Insert Field</span></span>'
                    select={this.onItemSelect} close={this.onDropDownClose}
                    id="insertField"
                ></DropDownButtonComponent>
                <MentionComponent
                    ref={(scope) => { this.mentionObj = scope; }}
                    id="mentionEditor"
                    target="#mailMergeEditor"
                    mentionChar={this.mentionChar}
                    showMentionChar={true}
                    allowSpaces={true}
                    dataSource={this.data}
                    fields={this.fieldsData}
                    popupWidth="250px"
                    popupHeight="200px"
                    displayTemplate={this.displayTemplate}
                />
                <div id="action-description">
                    <p>This sample demonstrates how to implement a mail merge in the Rich Text Editor sample by inserting placeholders into the editor using custom toolbar item, which are then replaced with actual data to create personalized content.</p>
                </div>
                <div id="description">
                    <p>The mail merge in the Rich Text Editor sample enables users to insert placeholders for personalized content. These placeholders are replaced with actual data when generating the final content, making it easy
                        to create customized letters, invoices, and more.</p>
                    <p>The following configurations are used in this sample:</p>
                    <ul>
                        <li>The <code>Button</code> and <code>DropDownButton</code> control are configured in the custom toolbar of
                            the Rich Text Editor.</li>
                        <li>The <code>Button</code> click action performs the merge of the editor placeholder content.</li>
                        <li>The <code>DropDownButton</code> control provides a list of available fields, such as "First Name" or
                            "Email Address." A selected field from this dropdown is inserted into the editor as a placeholder.</li>
                        <li>The <code>Button</code> and <code>DropDownButton</code> control are configured in the custom toolbar of
                            the Rich Text Editor.</li>
                        <li>The <code>Button</code> click action performs the merge of the editor placeholder content.</li>
                        <li>The <code>DropDownButton</code> control provides a list of available fields, such as "First Name" or
                            "Email Address." A selected field from this dropdown is inserted into the editor as a placeholder.</li>
                        <li>The <code>Mention</code> control allows insertion of merge fields by pressing the mention character, such
                            as <code>{"{"}{"{"}</code>, in the editor and selecting an item. These chips make it easy to see and select fields
                            directly within the content.</li>
                    </ul>
                </div>
            </div>
        );
    }
}
