import * as React from 'react';
import './editing-in-dialog.css';
import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import { RichTextEditorUI } from '@syncfusion/ej2-react-richtexteditor-ui';
import { SampleBase } from '../common/sample-base';

export class EditingInDialog extends SampleBase<{}, {}> {
    private openBtnRef: HTMLButtonElement | null = null;
    private dialogHostRef: HTMLDivElement | null = null;
    private sampleContainerRef: HTMLDivElement | null = null;

    private dialogObj: Dialog | null = null;
    private buttonObj: Button | null = null;
    private editorObj: RichTextEditorUI | null = null;

    public componentDidMount(): void {
        super.componentDidMount && super.componentDidMount();

        if (!this.dialogHostRef) { return; }

        this.dialogObj = new Dialog({
            header: 'Compose Message',
            target: this.sampleContainerRef as HTMLElement,
            animationSettings: { effect: 'None' },
            showCloseIcon: true,
            width: '600px',
            height: '300px',
            buttons: [
                { click: (): void => { this.dlgButtonClick(); }, buttonModel: { content: 'Send', isPrimary: true } },
                { click: (): void => { this.dlgCancel(); },     buttonModel: { content: 'Cancel' } }
            ],
            open: (): void => { this.dialogOpen(); },
            close: (): void => { this.dialogClose(); }
        });
        this.dialogObj.appendTo(this.dialogHostRef);

        if (this.openBtnRef) {
            this.buttonObj = new Button({});
            this.buttonObj.appendTo(this.openBtnRef);
            this.openBtnRef.onclick = (): void => {
                if (this.dialogObj) { this.dialogObj.show(); }
            };
        }
    }

    public componentWillUnmount(): void {
        if (this.editorObj) {
            try { this.editorObj.destroy(); } catch { /* noop */ }
            this.editorObj = null;
        }
        if (this.dialogObj) {
            try { this.dialogObj.destroy(); } catch { /* noop */ }
            this.dialogObj = null;
        }
        if (this.buttonObj) {
            try { this.buttonObj.destroy(); } catch { /* noop */ }
            this.buttonObj = null;
        }
    }

    private setOpenBtnRef = (el: HTMLButtonElement | null): void => {
        this.openBtnRef = el;
    };

    private setDialogHostRef = (el: HTMLDivElement | null): void => {
        this.dialogHostRef = el;
    };

    private setSampleContainerRef = (el: HTMLDivElement | null): void => {
        this.sampleContainerRef = el;
    };

    private initializeEditor = (): void => {
        if (!this.editorObj) {
            const contentDiv: HTMLElement = document.createElement('div');
            contentDiv.id = 'dialogEditorContent';
            const dialogContent: HTMLElement | null = document.querySelector('#editorDialog .e-dlg-content');
            if (dialogContent) {
                dialogContent.appendChild(contentDiv);
                this.editorObj = new RichTextEditorUI({
                    placeholder: 'Write your message...',
                    toolbarSettings: {
                        items: [
                            'Bold', 'Italic', 'Underline', '|',
                            'Formats', 'BulletFormatList', 'NumberFormatList', '|',
                            'Link', 'Undo', 'Redo'
                        ]
                    }
                });
                this.editorObj.appendTo('#dialogEditorContent');
            }
        }
    };

    private dlgButtonClick = (): void => {
        if (!this.editorObj) { return; }
        const content: string = this.editorObj.getHtml();
        if (content && content.replace(/<[^>]*>/g, '').trim()) {
            alert('Message sent:\n\n' + content.replace(/<[^>]*>/g, ''));
            this.editorObj.value = '';
            this.editorObj.dataBind();
        }
        if (this.dialogObj) { this.dialogObj.hide(); }
    };

    private dlgCancel = (): void => {
        if (this.editorObj) {
            this.editorObj.value = '';
            this.editorObj.dataBind();
        }
        if (this.dialogObj) { this.dialogObj.hide(); }
    };

    private dialogClose = (): void => {
        if (this.openBtnRef) { this.openBtnRef.style.display = 'block'; }
    };

    private dialogOpen = (): void => {
        if (this.openBtnRef) { this.openBtnRef.style.display = 'none'; }

        setTimeout(() => {
            const dialogElement: HTMLElement | null = document.querySelector('#editorDialog .e-dialog') as HTMLElement;
            if (dialogElement && !dialogElement.id) { dialogElement.id = 'mainDialog'; }
            const dialogHeader: HTMLElement | null = document.querySelector('#editorDialog .e-dlg-header') as HTMLElement;
            if (dialogHeader && !dialogHeader.id) { dialogHeader.id = 'dialogHeader'; }
            const dialogContentEl: HTMLElement | null = document.querySelector('#editorDialog .e-dlg-content') as HTMLElement;
            if (dialogContentEl && !dialogContentEl.id) { dialogContentEl.id = 'dialogContent'; }
            const dialogFooter: HTMLElement | null = document.querySelector('#editorDialog .e-footer-content') as HTMLElement;
            if (dialogFooter && !dialogFooter.id) { dialogFooter.id = 'dialogFooter'; }
        }, 0);

        this.initializeEditor();
        if (this.editorObj) { this.editorObj.focusIn(); }
    };

    public render(): JSX.Element {
        return (
            <div className="editing-in-dialog-sample">
                <div className="control-pane">
                    <div className="control-section">
                        <div className="sample-container" ref={this.setSampleContainerRef}>
                            <button
                                id="dialogBtn"
                                ref={this.setOpenBtnRef}
                                className="e-btn e-primary"
                            >
                                Open Editor
                            </button>
                            <div id="editorDialog" ref={this.setDialogHostRef}></div>
                        </div>
                    </div>

                    <div id="action-description">
                        <p>
                            This sample demonstrates how to render the Rich Text
                            Editor UI component inside a Dialog component for
                            composing messages or content.
                        </p>
                    </div>

                    <div id="description">
                        <p>
                            The Rich Text Editor UI is integrated with the
                            Syncfusion Dialog component to create a message
                            composer. Click the <strong>Open Editor</strong>{' '}
                            button to launch the dialog with the RTE. Users can
                            compose formatted content using the toolbar and send
                            or cancel their message. The editor automatically
                            initializes when the dialog opens and clears when
                            closed.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
