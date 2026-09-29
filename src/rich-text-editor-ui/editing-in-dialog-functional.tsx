import * as React from 'react';
import './editing-in-dialog.css';
import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import { RichTextEditorUI } from '@syncfusion/ej2-react-richtexteditor-ui';
import { updateSampleSection } from '../common/sample-base';

function EditingInDialog() {
    const openBtnRef = React.useRef<HTMLButtonElement | null>(null);
    const dialogHostRef = React.useRef<HTMLDivElement | null>(null);
    const sampleContainerRef = React.useRef<HTMLDivElement | null>(null);

    const dialogObjRef = React.useRef<Dialog | null>(null);
    const buttonObjRef = React.useRef<Button | null>(null);
    const editorObjRef = React.useRef<RichTextEditorUI | null>(null);

    React.useEffect(() => {
        updateSampleSection();

        if (!dialogHostRef.current) { return; }

        const dialogObj: Dialog = new Dialog({
            header: 'Compose Message',
            target: sampleContainerRef.current as HTMLElement,
            animationSettings: { effect: 'None' },
            showCloseIcon: true,
            width: '600px',
            height: '300px',
            buttons: [
                { click: dlgButtonClick, buttonModel: { content: 'Send', isPrimary: true } },
                { click: dlgCancel,     buttonModel: { content: 'Cancel' } }
            ],
            open: dialogOpen,
            close: dialogClose
        });
        dialogObj.appendTo(dialogHostRef.current);
        dialogObjRef.current = dialogObj;

        const buttonObj: Button = new Button({});
        if (openBtnRef.current) {
            buttonObj.appendTo(openBtnRef.current);
            buttonObjRef.current = buttonObj;

            openBtnRef.current.onclick = (): void => {
                dialogObj.show();
            };
        }

        function initializeEditor(): void {
            if (!editorObjRef.current) {
                const contentDiv: HTMLElement = document.createElement('div');
                contentDiv.id = 'dialogEditorContent';
                const dialogContent: HTMLElement | null = document.querySelector('#editorDialog .e-dlg-content');
                if (dialogContent) {
                    dialogContent.appendChild(contentDiv);
                    const editor: RichTextEditorUI = new RichTextEditorUI({
                        placeholder: 'Write your message...',
                        toolbarSettings: {
                            items: [
                                'Bold', 'Italic', 'Underline', '|',
                                'Formats', 'BulletFormatList', 'NumberFormatList', '|',
                                'Link', 'Undo', 'Redo'
                            ]
                        }
                    });
                    editor.appendTo('#dialogEditorContent');
                    editorObjRef.current = editor;
                }
            }
        }

        function dlgButtonClick(): void {
            if (!editorObjRef.current) { return; }
            const content: string = editorObjRef.current.getHtml();
            if (content && content.replace(/<[^>]*>/g, '').trim()) {
                // eslint-disable-next-line no-alert
                alert('Message sent:\n\n' + content.replace(/<[^>]*>/g, ''));
                editorObjRef.current.value = '';
                editorObjRef.current.dataBind();
            }
            if (dialogObjRef.current) { dialogObjRef.current.hide(); }
        }

        function dlgCancel(): void {
            if (editorObjRef.current) {
                editorObjRef.current.value = '';
                editorObjRef.current.dataBind();
            }
            if (dialogObjRef.current) { dialogObjRef.current.hide(); }
        }

        function dialogClose(): void {
            if (openBtnRef.current) { openBtnRef.current.style.display = 'block'; }
        }

        function dialogOpen(): void {
            if (openBtnRef.current) { openBtnRef.current.style.display = 'none'; }

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

            initializeEditor();
            if (editorObjRef.current) { editorObjRef.current.focusIn(); }
        }

        return (): void => {
            if (editorObjRef.current) {
                try { editorObjRef.current.destroy(); } catch { /* noop */ }
                editorObjRef.current = null;
            }
            if (dialogObjRef.current) {
                try { dialogObjRef.current.destroy(); } catch { /* noop */ }
                dialogObjRef.current = null;
            }
            if (buttonObjRef.current) {
                try { buttonObjRef.current.destroy(); } catch { /* noop */ }
                buttonObjRef.current = null;
            }
        };
    }, []);

    return (
        <div className="editing-in-dialog-sample">
            <div className="control-pane">
                <div className="control-section">
                    <div className="sample-container" ref={sampleContainerRef}>
                        <button
                            id="dialogBtn"
                            ref={openBtnRef}
                            className="e-btn e-primary"
                        >
                            Open Editor
                        </button>
                        <div id="editorDialog" ref={dialogHostRef}></div>
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

export default EditingInDialog;
