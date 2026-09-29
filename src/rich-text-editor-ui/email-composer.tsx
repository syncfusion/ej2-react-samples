import * as React from 'react';
import './email-composer.css';
import { RichTextEditorUIComponent, Inject, SlashCommand } from '@syncfusion/ej2-react-richtexteditor-ui';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';

export class EmailComposer extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorUIComponent | null = null;
    private toRecipientObj: MultiSelectComponent | null = null;
    private ccRecipientObj: MultiSelectComponent | null = null;
    private toastObj: ToastComponent | null = null;

    private emailData: { Name: string; Eimg: string; EmailId: string }[] = [
        { Name: 'Selma Rose', Eimg: '2', EmailId: 'selma@gmail.com' },
        { Name: 'Maria', Eimg: '1', EmailId: 'maria@gmail.com' },
        { Name: 'Russo Kay', Eimg: '8', EmailId: 'russo@gmail.com' },
        { Name: 'Robert', Eimg: 'dp', EmailId: 'robert@gmail.com' },
        { Name: 'Camden Kate', Eimg: '9', EmailId: 'camden@gmail.com' },
        { Name: 'Garth', Eimg: '7', EmailId: 'garth@gmail.com' },
        { Name: 'Andrew James', Eimg: 'pic04', EmailId: 'james@gmail.com' },
        { Name: 'Olivia', Eimg: '5', EmailId: 'olivia@gmail.com' },
        { Name: 'Sophia', Eimg: '6', EmailId: 'sophia@gmail.com' },
        { Name: 'Margaret', Eimg: '3', EmailId: 'margaret@gmail.com' },
        { Name: 'Ursula Ann', Eimg: 'dp', EmailId: 'ursula@gmail.com' },
        { Name: 'Laura Grace', Eimg: '4', EmailId: 'laura@gmail.com' },
        { Name: 'Albert', Eimg: 'pic03', EmailId: 'albert@gmail.com' },
        { Name: 'William', Eimg: '10', EmailId: 'william@gmail.com' }
    ];

    private itemTemplate = (data: any): JSX.Element => {
        const image: string = data.Eimg ? String(data.Eimg) : 'dp';
        return (
            <table className="mail-item">
                <tbody>
                    <tr>
                        <td>
                            <img
                                className="mail-item-img"
                                src={`src/rich-text-editor-ui/images/${image}.png`}
                                alt={data.Name}
                            />
                        </td>
                        <td>
                            <span className="mail-item-name">{data.Name}</span>
                            <span className="mail-item-email">{data.EmailId}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    };

    private valueTemplate = (data: any): JSX.Element | null => {
        if (!data) {
            return null;
        }
        const image: string = data.Eimg ? String(data.Eimg) : 'dp';
        return (
            <div className="mail-value">
                <img
                    className="mail-value-img"
                    src={`src/rich-text-editor-ui/images/${image}.png`}
                    alt={data.Name}
                />
                <span className="mail-value-name">{data.Name}</span>
            </div>
        );
    };

    private fields = { text: 'Name', value: 'EmailId' };

    public onSendClick = (): void => {
        this.clearComposer();
        if (this.rteObj) {
            this.rteObj.value = '';
            this.rteObj.refresh();
        }
        this.showToast('Mail Composer', 'Mail sent successfully.');
    };

    public onDiscardClick = (): void => {
        this.clearComposer();
        if (this.rteObj) {
            this.rteObj.value = '';
            this.rteObj.refresh();
        }
        this.showToast('Mail Composer', 'Mail discarded. Composer cleared.');
    };

    private clearComposer(): void {
        if (this.toRecipientObj) {
            this.toRecipientObj.value = [];
            this.toRecipientObj.dataBind();
        }
        if (this.ccRecipientObj) {
            this.ccRecipientObj.value = [];
            this.ccRecipientObj.dataBind();
        }
        const subjectInput = document.getElementById('subject') as HTMLInputElement;
        if (subjectInput) {
            subjectInput.value = '';
        }
    }

    private showToast(title: string, message: string): void {
        if (this.toastObj) {
            this.toastObj.show({
                title,
                content: message,
                cssClass: 'e-toast-success'
            });
        }
    }

    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <div className="sample-container">
                        <div className="mail-composer container-fluid">
                            <div className="form-group">
                                <ButtonComponent
                                    id="sendMail"
                                    cssClass="e-primary"
                                    onClick={this.onSendClick}
                                >
                                    Send
                                </ButtonComponent>
                                <ButtonComponent
                                    id="discardMail"
                                    onClick={this.onDiscardClick}
                                >
                                    Discard
                                </ButtonComponent>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="toRecipient" className="col-xs-12 col-md-2 control-label">To</label>
                                <div className="col-xs-12 col-md-10">
                                    <MultiSelectComponent
                                        id="toRecipient"
                                        ref={(scope) => { this.toRecipientObj = scope; }}
                                        dataSource={this.emailData}
                                        fields={this.fields}
                                        mode="Box"
                                        allowFiltering={true}
                                        allowCustomValue={true}
                                        placeholder="Recipients"
                                        itemTemplate={this.itemTemplate}
                                        valueTemplate={this.valueTemplate}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="ccRecipient" className="col-xs-12 col-md-2 control-label">Cc</label>
                                <div className="col-xs-12 col-md-10">
                                    <MultiSelectComponent
                                        id="ccRecipient"
                                        ref={(scope) => { this.ccRecipientObj = scope; }}
                                        dataSource={this.emailData}
                                        fields={this.fields}
                                        mode="Box"
                                        allowFiltering={true}
                                        allowCustomValue={true}
                                        placeholder="Cc"
                                        itemTemplate={this.itemTemplate}
                                        valueTemplate={this.valueTemplate}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="subject" className="col-xs-12 col-md-2 control-label">Subject</label>
                                <div className="col-xs-12 col-md-10">
                                    <input
                                        id="subject"
                                        type="text"
                                        className="e-input form-control"
                                        placeholder="Enter subject"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <RichTextEditorUIComponent
                                    ref={(scope) => { this.rteObj = scope; }}
                                    placeholder="Compose your email..."
                                    slashCommandSettings={{ enable: true }}
                                    toolbarSettings={{
                                        items: [
                                            'Undo', 'Redo', '|',
                                            'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
                                            'FontColor', 'BackgroundColor', '|',
                                            'Formats', 'Alignment', '|',
                                            'FontName', 'FontSize', '|',
                                            'NumberFormatList', 'BulletFormatList', '|',
                                            'Table', 'Image', 'Link', '|',
                                            'Subscript', 'Superscript'
                                        ]
                                    }}
                                >
                                    <Inject services={[SlashCommand]} />
                                </RichTextEditorUIComponent>
                            </div>
                        </div>
                    </div>
                </div>

                <ToastComponent
                    id="mailToast"
                    ref={(scope) => { this.toastObj = scope; }}
                    position={{ X: 'Right', Y: 'Top' }}
                    showProgressBar={false}
                    newestOnTop={true}
                    timeOut={2500}
                    showCloseButton={true}
                />

                <div id="action-description">
                    <p>
                        This sample demonstrates a Mail Composer application built using Rich Text Editor UI and the
                        Bootstrap 3 grid. Users can select recipients using MultiSelect components, enter a subject,
                        compose rich email content, insert links, images, tables, and use Slash Commands to quickly
                        create and format content before sending or discarding the email. A Toast notification
                        confirms the action and the composer is cleared afterwards.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample showcases Rich Text Editor UI as a modern email composing experience. It combines
                        recipient selection, subject entry, rich text editing, image insertion, table creation, links,
                        lists, and slash command functionality to provide a complete email authoring interface.
                    </p>
                    <ul>
                        <li>
                            <code>Recipients</code> - Select one or more recipients using the MultiSelect component in the To and Cc fields.
                        </li>
                        <li>
                            <code>Subject</code> - Specify the subject of the email message.
                        </li>
                        <li>
                            <code>Links</code> - Insert hyperlinks into the email content.
                        </li>
                        <li>
                            <code>Images</code> - Insert and manage images within the email body.
                        </li>
                        <li>
                            <code>Tables</code> - Create and edit tables for structured content.
                        </li>
                        <li>
                            <code>Lists</code> - Create ordered and unordered lists using NumberFormatList and BulletFormatList tools.
                        </li>
                        <li>
                            <code>Formatting</code> - Apply font family, font size, font color, background color, and heading formats.
                        </li>
                        <li>
                            <code>Alignment</code> - Align content using left, center, right, and justified alignment options.
                        </li>
                        <li>
                            <code>Undo/Redo</code> - Revert or reapply editing operations.
                        </li>
                        <li>
                            <code>Subscript/Superscript</code> - Format selected text as subscript or superscript.
                        </li>
                        <li>
                            <code>Slash Command</code> - Type <code>/</code> within the editor to quickly access content insertion and formatting commands.
                        </li>
                        <li>
                            <code>Send Mail</code> - Collect recipient information, subject, and editor content, display a success toast, and clear the composer.
                        </li>
                        <li>
                            <code>Discard</code> - Clear the recipients, subject, and editor content without sending the email.
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
