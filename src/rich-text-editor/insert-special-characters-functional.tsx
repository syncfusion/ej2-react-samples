/**
 * Rich Text Editor custom toolbar sample
 */
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-react-popups';
import { HtmlEditor, Image, Inject, IToolbarItems, Link, NodeSelection, QuickToolbar, RichTextEditorComponent, Toolbar, ToolbarSettingsModel, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import './insert-special-characters.css';
function InsertSpecialCharacters() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let rteObj: RichTextEditorComponent;
    let rteSpecialCharEle: HTMLDivElement = null;
    let rteSpecialCharRef: React.Ref<HTMLDivElement> = (element) => {
        rteSpecialCharEle = element;
    };
    let rteSectionEle: HTMLDivElement = null;
    let rteSectionRef: React.Ref<HTMLDivElement> = (element) => {
        rteSectionEle = element;
    };
    const selection: NodeSelection = new NodeSelection();
    let range: Range;
    let customBtn: HTMLElement;
    let dialogCtn: HTMLElement;
    let saveSelection: NodeSelection;
    let dialogObj: DialogComponent;
    // Rich Text Editor items list
    const items: (string | IToolbarItems)[] = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode',
        {
            tooltipText: 'Insert Symbol',
            template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%"><div class="e-tbar-btn-text" style="font-weight: 400;"> &#937;</div></button>'
        }, '|', 'Undo', 'Redo'
    ];
    //Rich Text Editor ToolbarSettings
    const toolbarSettings: ToolbarSettingsModel = {
        items: items
    };
    const dlgButtons: ButtonPropsModel[] = [{ buttonModel: { content: "Insert", isPrimary: true }, click: onInsert.bind(this) },
    { buttonModel: { content: 'Cancel' }, click: onCancel }];
    const header: string = 'Special Characters';
    const target: Element = rteSectionEle;
    const height: string | number = 'auto';
    function onCreate(): void {
        const customBtn = document.getElementById('custom_tbar') as HTMLElement;
        customBtn.onclick = (e: Event) => {
            (rteObj.contentModule.getEditPanel() as HTMLElement).focus();
            dialogObj.element.style.display = '';
            range = selection.getRange(document);
            saveSelection = selection.save(range, document);
            dialogObj.content = rteSpecialCharEle;
            dialogObj.show();
        };
    }
    function dialogCreate(): void {
        const dialogCtn = rteSpecialCharEle;
        dialogCtn.onclick = (e: Event) => {
            let target: HTMLElement = e.target as HTMLElement;
            let activeEle: Element = dialogObj.element.querySelector('.char_block.e-active');
            if (target.classList.contains('char_block')) {
                target.classList.add('e-active');
                if (activeEle) {
                    activeEle.classList.remove('e-active');
                }
            }
        };
    }
    function onInsert(): void {
        let activeEle: Element = dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            if (rteObj.formatter.getUndoRedoStack().length === 0) {
                rteObj.formatter.saveData();
            }
            saveSelection.restore();
            rteObj.executeCommand('insertText', activeEle.textContent);
            rteObj.formatter.saveData();
            rteObj.formatter.enableUndo(rteObj);
        }
        dialogOverlay();
    }
    function dialogOverlay(): void {
        let activeEle: Element = dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            activeEle.classList.remove('e-active');
        }
        dialogObj.hide();
    }
    function onCancel(): void {
        let activeEle: Element = (this as any).element.querySelector('.char_block.e-active');
        if (activeEle) {
            activeEle.classList.remove('e-active');
        }
        (this as any).hide();
    }
    function actionCompleteHandler(e: any): void {
        if (e.requestType === 'SourceCode') {
            rteObj.getToolbar().querySelector('#custom_tbar').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
            rteObj.getToolbar().querySelector('#custom_tbar').parentElement.classList.remove('e-overlay');
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section e-rte-custom-tbar-section' id="rteCustomTool">
                <div className='rte-control-section' ref={rteSectionRef} id='rteSection'>
                    <RichTextEditorComponent id="specialCharRTE" ref={(scope) => { rteObj = scope }}
                        toolbarSettings={toolbarSettings} actionComplete={actionCompleteHandler.bind(this)} created={onCreate.bind(this)}>
                        <div style={{ display: 'block' }}><p style={{ marginRight: '10px' }}>The custom command "insert special character" is configured as the last item of the toolbar. Click on the command and choose the special character you want to include from the popup.</p></div>
                        <Inject services={[HtmlEditor, Toolbar, Link, Image, QuickToolbar, PasteCleanup, Table, Video, Audio]} />
                    </RichTextEditorComponent>
                    <DialogComponent id='customTbarDlg' ref={(scope) => { dialogObj = scope }}
                        buttons={dlgButtons} overlayClick={dialogOverlay.bind(this)} header={header} visible={false}
                        showCloseIcon={false} width='43%' target={'#rteSection'} height={height} created={dialogCreate.bind(this)} isModal={true}>
                    </DialogComponent>
                    <div id="customTbarDialog" style={{ display: 'none' }}>
                        <div id="rteSpecial_char" ref={rteSpecialCharRef} >
                            <div className="char_block" title="&#94;">&#94;</div>
                            <div className="char_block" title="&#95;">&#95;</div>
                            <div className="char_block" title="&#96;">&#96;</div>
                            <div className="char_block" title="&#123;">&#123;</div>
                            <div className="char_block" title="&#124;">&#124;</div>
                            <div className="char_block" title="&#125;">&#125;</div>
                            <div className="char_block" title="&#126;">&#126;</div>
                            <div className="char_block" title="&#160;">&#160;</div>
                            <div className="char_block" title="&#161;">&#161;</div>
                            <div className="char_block" title="&#162;">&#162;</div>
                            <div className="char_block" title="&#163;">&#163;</div>
                            <div className="char_block" title="&#164;">&#164;</div>
                            <div className="char_block" title="&#165;">&#165;</div>
                            <div className="char_block" title="&#x20B9;">&#x20B9;</div>
                            <div className="char_block" title="&#166;">&#166;</div>
                            <div className="char_block" title="&#167;">&#167;</div>
                            <div className="char_block" title="&#168;">&#168;</div>
                            <div className="char_block" title="&#169;">&#169;</div>
                            <div className="char_block" title="&#170;">&#170;</div>
                            <div className="char_block" title="&#171;">&#171;</div>
                            <div className="char_block" title="&#172;">&#172;</div>
                            <div className="char_block" title="&#173;">&#173;</div>
                            <div className="char_block" title="&#174;">&#174;</div>
                            <div className="char_block" title="&#175;">&#175;</div>
                            <div className="char_block" title="&#176;">&#176;</div>
                            <div className="char_block" title="&#177;">&#177;</div>
                            <div className="char_block" title="&#178;">&#178;</div>
                            <div className="char_block" title="&#179;">&#179;</div>
                            <div className="char_block" title="&#180;">&#180;</div>
                            <div className="char_block" title="&#181;">&#181;</div>
                            <div className="char_block" title="&#182;">&#182;</div>
                            <div className="char_block" title="&#183;">&#183;</div>
                            <div className="char_block" title="&#184;">&#184;</div>
                            <div className="char_block" title="&#185;">&#185;</div>
                            <div className="char_block" title="&#186;">&#186;</div>
                            <div className="char_block" title="&#187;">&#187;</div>
                            <div className="char_block" title="&#188;">&#188;</div>
                            <div className="char_block" title="&#189;">&#189;</div>
                            <div className="char_block" title="&#190;">&#190;</div>
                            <div className="char_block" title="&#191;">&#191;</div>
                            <div className="char_block" title="&#192;">&#192;</div>
                            <div className="char_block" title="&#193;">&#193;</div>
                            <div className="char_block" title="&#194;">&#194;</div>
                            <div className="char_block" title="&#195;">&#195;</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample shows how to add your own commands to toolbar of the Rich Text Editor.
                    The <code>“Ω” </code>  command is added to insert special characters in the editor.
                    Click the “Ω” command to show the special characters list, and then choose the character to be inserted in the editor.
                </p>
            </div>
            <div id="description">
                <p>The Rich Text Editor allows you to configure your own commands to its toolbar using <code>toolbarSettings</code> property.
                    The command can be plain text, icon, or HTML template.
                    You can also define the order and group where the command should be included.
                    Bind the action to the command by getting its instance. </p>
                <p><b>Injecting Module</b></p>
                <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject <code>Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup</code> modules into the services.</p>
            </div>
        </div>
    );
}
export default InsertSpecialCharacters;


