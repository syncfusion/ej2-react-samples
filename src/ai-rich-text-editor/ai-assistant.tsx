
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Inject, RichTextEditorComponent, Toolbar, Link, Image, QuickToolbar, HtmlEditor, ToolbarClickEventArgs } from '@syncfusion/ej2-react-richtexteditor';
import { enableRipple } from '@syncfusion/ej2-base';
import './rich-text-editor.css';
import { DropDownButton } from '@syncfusion/ej2-react-splitbuttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent, ChipListComponent } from '@syncfusion/ej2-react-buttons';
import { SkeletonComponent, ToastComponent } from '@syncfusion/ej2-react-notifications';
import { Dialog, DialogComponent } from '@syncfusion/ej2-react-popups';
import { useEffect } from 'react';
enableRipple(true);

function SmartRichTextEditor() {
    useEffect(() => {
        regenerateButton!.element.addEventListener('click', () => {
            updateAISugesstions();
        });
        copyButton!.element.addEventListener('click', () => {
            copyTextToClipboard(AIResult);
        });
        replaceButton!.element.addEventListener('click', () => {
            let range: Range = (defaultRTE as any).formatter.editorManager.nodeSelection?.getRange((defaultRTE as any).contentModule.getDocument());
            (defaultRTE as any).formatter.editorManager.nodeSelection?.restore(range);
            (defaultRTE as any).executeCommand('insertHTML', AIResult, { undo: true });
            closeDialog();
        });
    }, []);
    let toolbarSettings = {
        items: [
            {
                tooltipText: 'AI Assistant',
                template:
                    '<button class="e-tbar-btn e-btn" tabindex="-1" id="ai_assistant_button_tbar" style="width:100%"><div class="e-rte-dropdown-btn-text">AIAssistant</div></button>'
            },
            {
                tooltipText: 'Rephrase',
                template:
                    '<button class="e-tbar-btn e-btn" tabindex="-1" id="ai_rephrase_button_tbar" style="width:100%"><div class="e-tbar-btn-text">Rephrase</div></button>'
            },
            'Bold',
            'Italic',
            'Underline',
            '|',
            'FontName',
            'FontSize',
            'FontColor',
            '|',
            'BackgroundColor',
            'Formats',
            'Alignments',
            '|',
            'OrderedList',
            'BulletFormatList',
            'CreateLink',
            'Image',
            '|',
            'createTable',
            'SourceCode',
            'Undo',
            'Redo',
        ],
    };
    const queryList: { ID: string; Text: string }[] = [
        { ID: "Rephrase", Text: "Rephrase" },
        { ID: "Grammar", Text: "Correct Grammar" },
        { ID: "Summarize", Text: "Summarize" },
        { ID: "Elaborate", Text: "Elaborate" },
        { ID: "Translate", Text: "Translate" },
        { ID: "SentimentAnalysis", Text: "Sentiment Analysis" }
    ];

    const languageList: { ID: string; Text: string }[] = [
        { ID: "EN", Text: "English" },
        { ID: "ZH", Text: "Chinese (Simplified)" },
        { ID: "ZHT", Text: "Chinese (Traditional)" },
        { ID: "ES", Text: "Spanish" },
        { ID: "HI", Text: "Hindi" },
        { ID: "AR", Text: "Arabic" },
        { ID: "BN", Text: "Bengali" },
        { ID: "PT", Text: "Portuguese" },
        { ID: "RU", Text: "Russian" },
        { ID: "JA", Text: "Japanese" },
        { ID: "DE", Text: "German" },
        { ID: "KO", Text: "Korean" },
        { ID: "FR", Text: "French" },
        { ID: "IT", Text: "Italian" },
        { ID: "TR", Text: "Turkish" }
    ];

    let subQuery = '';
    let promptQuery = '';
    let isSentimentCheck: boolean = false;
    let resultData: string = '';
    let defaultRTE: RichTextEditorComponent;
    let leftRte: RichTextEditorComponent;
    let rightRte: RichTextEditorComponent;
    let aiassistantButton: DropDownButton;
    let dropValIndex = 0;
    let queryCategory: DropDownListComponent;
    let regenerateButton: ButtonComponent;
    let copyButton: ButtonComponent;
    let replaceButton: ButtonComponent;
    let sentimentButton: ButtonComponent
    let apiResultData: any;
    let AIResult: string;
    let toastObj: ToastComponent;
    let chipList: ChipListComponent;
    let languageCategory: DropDownListComponent;
    let translatelanguage: string;
    let chipValue: string[] = ['Standard'];
    let dialog: DialogComponent;

    function aiQuerySelectedMenu(args: any): void {
        dialogueOpen(args.item.text);
    }

    function onToolbarClick(args: ToolbarClickEventArgs): void {
        if (args.item.tooltipText === 'Rephrase') {
            dialogueOpen("Rephrase");
        }
    }

    function dialogueOpen(selectedQuery: string): void {
        var selectionText = defaultRTE.getSelectedHtml();
        if (selectionText) {
            let range: Range = (defaultRTE as any).formatter.editorManager.nodeSelection?.getRange((defaultRTE as any).contentModule.getDocument());
            (defaultRTE as any).formatter.editorManager.nodeSelection?.save(range, (defaultRTE as any).contentModule.getDocument());
            dropValIndex = queryList.findIndex(q => q.Text.toLowerCase() === selectedQuery.toLowerCase());
            queryCategory.index = dropValIndex;
            leftRte.value = promptQuery = selectionText;
            leftRte.refreshUI();
            dialog.show();
            updateAISugesstionsData(selectedQuery);
        } else {
            toastObj.timeOut = 2000;
            toastObj.content = 'Please select the content to perform the AI operation.';
            toastObj.show();
        }
    }

    function updateAISugesstionsData(selectedQuery: string): void {
        (document.getElementById('language') as HTMLElement).style.display = 'none';
        (document.getElementById('chips-container') as HTMLElement).style.display = 'none';
        isSentimentCheck = false;
        switch (selectedQuery) {
            case "Summarize":
                subQuery = "Summarize the upcoming sentence shortly.";
                break;
            case "Elaborate":
                subQuery = "Elaborate on the upcoming sentence.";
                break;
            case "Rephrase":
                (document.getElementById('chips-container') as HTMLElement).style.display = '';
                subQuery = chipValue[0] + " rephrase the upcoming sentence.";
                break;
            case "Correct Grammar":
                subQuery = "Correct the grammar of the upcoming sentence.";
                break;
            case "Translate":
                (document.getElementById('language') as HTMLElement).style.display = '';
                subQuery = "Translate the upcoming sentence to " + translatelanguage + ".";
                break;
            case "Sentiment Analysis":
                isSentimentCheck = true;
                subQuery = "Analyze the sentiment and grammar of the following paragraphs and provide the expression score with an emoji followed by the sentiment in the format: \"😊 Neutral\". \n\nNOTE: Avoid any additional text or explanation:";
                break;
        }
        updateAISugesstions();
    }

    function updateAISugesstions(): void {
        try {
            if (promptQuery) {
                (document.getElementById('skeletonId') as HTMLElement).style.display = '';
                (document.getElementById('rightRte') as HTMLElement).style.display = 'none';
                sentimentButton.element.style.display = 'none';
                regenerateButton.disabled = true;
                copyButton.disabled = true;
                replaceButton.disabled = true;
                apiResultData = getResponseFromOpenAI(subQuery, promptQuery);
                apiResultData.then((result: any) => {
                    AIResult = isSentimentCheck ? promptQuery : result;
                    sentimentButton.content = result.toLowerCase().includes("positive") ? "😊 Positive" : result.toLowerCase().includes("negative") ? "😞 Negative" : "😐 Neutral";
                    sentimentButton.element.style.display = !isSentimentCheck ? 'none' : '';
                    rightRte.value = AIResult;
                    var noResultsFound = !(AIResult || promptQuery);
                    (document.getElementById('no-results-found') as HTMLElement).style.display = noResultsFound ? '' : 'none';
                    regenerateButton.disabled = noResultsFound;
                    copyButton.disabled = noResultsFound;
                    replaceButton.disabled = noResultsFound;
                    (document.getElementById('skeletonId') as HTMLElement).style.display = 'none';
                    (document.getElementById('rightRte') as HTMLElement).style.display = noResultsFound ? 'none' : '';
                });
            }
        } catch {
            toastObj.show();
        }
    }

    async function getResponseFromOpenAI(subQuery: string, promptQuery: string): Promise<string> {
        const content = await (window as any).OpenAiModelRTE(subQuery, promptQuery);
        return content ? content as string : '';
    }

    function onCreate(): void {
        if (!aiassistantButton) {
            aiassistantButton = new DropDownButton({
                items: [
                    { text: 'Rephrase' },
                    { text: 'Correct Grammar' },
                    { text: 'Summarize' },
                    { text: 'Elaborate' },
                    { text: 'Translate' },
                    { text: 'Sentiment Analysis' }
                ],
                cssClass: 'menubutton e-tbar-btn e-tbar-btn-text',
                select: aiQuerySelectedMenu
            });
            aiassistantButton.appendTo('#ai_assistant_button_tbar');
        }
        dialog.hide();
    }

    function dialogShow(): void {
        (dialog as Dialog).element.style.display = '';
    }

    function closeDialog(): void {
        dialog.hide();
        rightRte.value = '';
        leftRte.value = '';
        promptQuery = '';
        chipValue[0] = 'Standard';
        AIResult = '';
        dropValIndex = 0;
        (document.getElementById('chips-container') as HTMLElement).style.display = '';
        (document.getElementById('language') as HTMLElement).style.display = 'none';
        sentimentButton.content = '😊 Neutral';
    }

    function copyTextToClipboard(text: string): void {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                console.log('Text copied to clipboard successfully!');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        } else {
            // Fallback for browsers that do not support the Clipboard API
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                console.log('Text copied to clipboard using execCommand');
            } catch (err) {
                console.error('Failed to copy text: ', err);
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }

    return (
        <>
            <div id='container' className='e-rte-custom-tbar-section'>
                <RichTextEditorComponent
                    ref={richtexteditor => defaultRTE = richtexteditor as RichTextEditorComponent}
                    id='defaultRTE'
                    height={550}
                    saveInterval={0}
                    autoSaveOnIdle={true}
                    value={`<h2><span>Integrate AI with the Editor</span></h2><p>Integrate the AI assistant into the rich text editor by capturing the content from the editor, sending it to the AI service, and displaying the results or suggestions back in the editor.</p><h3>Summarize</h3><p>This function condenses the selected content into a brief summary, capturing the main points succinctly.</p><h3>Elaborate</h3><p>This function expands the selected content, adding additional details and context.</p><h3>Rephrase</h3><p>This function rewrites the selected content to convey the same meaning using different words or structures. It also enables rephrase options and disables language selection.</p><h3>Correct Grammar</h3><p>This function reviews and corrects the grammar of the selected content, ensuring it adheres to standard grammatical rules.</p><h3>Translate</h3><p>This function translates the selected content into the specified language, enabling language selection and disabling rephrase options.</p>`}
                    toolbarSettings={toolbarSettings}
                    created={onCreate}
                    toolbarClick={onToolbarClick}
                >
                    <Inject services={[Toolbar, Link, Image, QuickToolbar, HtmlEditor]} />
                </RichTextEditorComponent>
                <DialogComponent
                    id="dialog"
                    ref={dialogObj => dialog = dialogObj as DialogComponent}
                    className="modal"
                    style={{ display: "none" }}
                    header="AI Assistant"
                    content={document.getElementById('dialog-content') as HTMLElement}
                    target={document.getElementById('defaultRTE') as HTMLElement}
                    showCloseIcon={true}
                    isModal={true}
                    height="100%"
                    width="80%"
                    cssClass="e-rte-elements custom-dialog-rte"
                    zIndex={1000}
                    footerTemplate={document.getElementById('dialog-footer-content') as HTMLElement}
                    close={closeDialog}
                    overlayClick={() => {
                        let activeEle: HTMLElement = dialog.element.querySelector('.char_block.e-active') as HTMLElement;
                        if (activeEle) {
                            activeEle.classList.remove('e-active');
                        }
                        closeDialog();
                    }}
                    open={dialogShow}
                >
                    <div id="dialog-content" className="dialog-content" style={{ height: "100%" }}>
                        <div className="custom-row-0">
                            <div className="cuscol-0" style={{ width: "100%", alignItems: "center", justifyContent: "left" }}>
                                <div style={{ width: '75%', textAlign: 'left' }}>
                                    <DropDownListComponent
                                        ref={query => queryCategory = query as DropDownListComponent}
                                        id="queryCategory"
                                        index={0}
                                        dataSource={queryList}
                                        fields={{ text: 'Text', value: 'ID' }}
                                        cssClass="e-e-round-corner"
                                        select={(args: any) => {
                                            chipList.selectedChips = 0;
                                            languageCategory.index = 0;
                                            translatelanguage = "EN";
                                            updateAISugesstionsData(args.itemData.Text);
                                        }}
                                    >
                                        Rephrase
                                    </DropDownListComponent>
                                </div>
                            </div>
                            <div className="cuscol-1" style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <div id="language" style={{ width: '100%', display: 'none' }}>
                                    <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'end', paddingRight: '20px' }}>
                                            <span>Target Language</span>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <DropDownListComponent
                                                ref={language => languageCategory = language as DropDownListComponent}
                                                id="language-Category"
                                                index={0}
                                                dataSource={languageList}
                                                fields={{ text: 'Text', value: 'ID' }}
                                                cssClass="e-e-round-corner"
                                                select={(args: any) => {
                                                    translatelanguage = args.itemData.ID;
                                                    updateAISugesstionsData("Translate");
                                                }}
                                            ></DropDownListComponent>
                                        </div>
                                    </div>
                                </div>
                                <ChipListComponent
                                    id="chips-container"
                                    ref={chip => chipList = chip as ChipListComponent}
                                    style={{ justifyContent: 'right', alignItems: 'center', width: '100%', display: 'none' }}
                                    chips={['Standard', 'Fluent', 'Professional']}
                                    selection="Single"
                                    cssClass="e-outline"
                                    selectedChips={[0]}
                                    click={(args: any) => {
                                        chipValue[0] = args.text;
                                        updateAISugesstionsData("Rephrase");
                                    }}
                                ></ChipListComponent>
                            </div>
                        </div>
                        <div className="custom-row-1" style={{ height: "74%" }}>
                            <div className="cuscol-0" style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "left" }}>
                                <div style={{ textAlign: 'left' }}>
                                    <RichTextEditorComponent
                                        ref={richtexteditor => leftRte = richtexteditor as RichTextEditorComponent}
                                        id="leftRte"
                                        height={310}
                                        value={resultData}
                                        toolbarSettings={{
                                            enable: false,
                                        }}
                                        placeholder="Analysis of AI Support"
                                        width="100%"
                                        cssClass="e-outline"
                                    >
                                        <Inject services={[HtmlEditor]} />
                                    </RichTextEditorComponent>
                                </div>
                            </div>
                            <div className="cuscol-1" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' }}>
                                <div style={{ textAlign: 'left', width: '100%' }}>
                                    <RichTextEditorComponent
                                        ref={richtexteditor => rightRte = richtexteditor as RichTextEditorComponent}
                                        id="rightRte"
                                        style={{ display: 'none' }}
                                        height={310}
                                        value={resultData}
                                        toolbarSettings={{
                                            enable: false,
                                        }}
                                        placeholder="Analysis of AI Support"
                                        width="100%"
                                        cssClass="e-outline"
                                    >
                                        <Inject services={[HtmlEditor]} />
                                    </RichTextEditorComponent>
                                    <div className="no-results-found" id="no-results-found" style={{ height: '244px', alignContent: 'center', display: 'none' }}>
                                        <img height="50" width="50" src="https://storage.googleapis.com/cdn-bolddesk/agent-angular-app/images/light/no-records-warning.svg" />
                                        <div>No results found</div>
                                    </div>
                                    <div id='skeletonId' style={{ display: 'none' }}>
                                        <SkeletonComponent
                                            id='skeletonId1'
                                            shape="Rectangle"
                                            height="20px"
                                            width="100%"
                                        ></SkeletonComponent><br />
                                        <SkeletonComponent
                                            id='skeletonId2'
                                            shape="Rectangle"
                                            height="20px"
                                            width="90%"
                                        ></SkeletonComponent><br />
                                        <SkeletonComponent
                                            id='skeletonId3'
                                            shape="Rectangle"
                                            height="20px"
                                            width="70%"
                                        ></SkeletonComponent>
                                        <br />
                                        <SkeletonComponent
                                            id='skeletonId4'
                                            shape="Rectangle"
                                            height="20px"
                                            width="50%"
                                        ></SkeletonComponent><br />
                                        <SkeletonComponent
                                            id='skeletonId5'
                                            shape="Rectangle"
                                            height="20px"
                                            width="30%"
                                        ></SkeletonComponent><br />
                                        <SkeletonComponent
                                            id='skeletonId6'
                                            shape="Rectangle"
                                            height="20px"
                                            width="10%"
                                        ></SkeletonComponent><br />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="dialog-footer-content">
                            <div className="custom-row-0">
                                <div className="cuscol-0" style={{ width: "100%", alignItems: "center", justifyContent: "left" }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <ButtonComponent
                                            ref={button => regenerateButton = button as ButtonComponent}
                                            content="Regenerate"
                                            isPrimary={true}
                                            disabled={true}
                                        ></ButtonComponent>
                                    </div>
                                </div>
                                <div className="cuscol-1" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <div style={{ textAlign: 'right', width: '100%' }}>
                                        <ButtonComponent
                                            ref={button => sentimentButton = button as ButtonComponent}
                                            content="😊 Neutral"
                                            disabled={true}
                                            cssClass="sentiment"
                                        />
                                        <ButtonComponent
                                            ref={button => copyButton = button as ButtonComponent}
                                            content="Copy"
                                            disabled={true}
                                        />
                                        <ButtonComponent
                                            ref={button => replaceButton = button as ButtonComponent}
                                            content="Replace"
                                            isPrimary={true}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogComponent>
                <ToastComponent
                    id="toast_default"
                    ref={toast => toastObj = toast as ToastComponent}
                    showCloseButton={true}
                    timeOut={0}
                    content="An error occurred during the AI process, Please try again."
                    position={{ X: 'Right', Y: 'Top' }}
                ></ToastComponent>
            </div>
        </>
    )
}

export default SmartRichTextEditor