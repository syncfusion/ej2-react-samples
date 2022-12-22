/**
 * Rich Text Editor custom toolbar sample
 */
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-react-popups';
import { HtmlEditor, Image, Inject, IToolbarItems, Link, NodeSelection, QuickToolbar, RichTextEditorComponent, Toolbar, ToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import './insert-emoticons.css';
function InsertEmoticons() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let rteObj: RichTextEditorComponent;
    let rteSectionEle: HTMLDivElement = null;
    let rteSectionRef: React.Ref<HTMLDivElement> = (element) => {
        rteSectionEle = element;
    }

    let selection: NodeSelection = new NodeSelection();
    let range: Range;
    let customBtn: HTMLElement;
    let dialogCtn: HTMLElement;
    let saveSelection: NodeSelection;
    let dialogObj: DialogComponent;
    let tabObj: TabComponent;
    const smileys: { [key: string]: string }[] = [
        { content: '&#128512;', title: 'Grinning face' },
        { content: '&#128513;', title: 'Grinning face with smiling eyes' },
        { content: '&#128514;', title: 'Face with tears of joy' },
        { content: '&#128515;', title: 'Smiling face with open mouth' },
        { content: '&#128516;', title: 'Smiling face with open mouth and smiling eyes' },
        { content: '&#128517;', title: 'Smiling face with open mouth and cold sweat' },
        { content: '&#128518;', title: 'Smiling face with open mouth and tightly-closed eyes' },
        { content: '&#128519;', title: 'Smiling face with halo' },
        { content: '&#128520;', title: 'Smiling face with horns' },
        { content: '&#128521;', title: 'Winking face' },
        { content: '&#128522;', title: 'Smiling face with smiling eyes' },
        { content: '&#128523;', title: 'Face savouring delicious food' },
        { content: '&#128524;', title: 'Relieved face' },
        { content: '&#128525;', title: 'Smiling face with heart-shaped eyes' },
        { content: '&#128526;', title: 'Smiling face with sunglasses' },
        { content: '&#128527;', title: 'Smirking face"' },
        { content: '&#128528;', title: 'Neutral face' },
        { content: '&#128529;', title: 'Expressionless face' },
        { content: '&#128530;', title: 'Unamused face' },
        { content: '&#128531;', title: 'Face with cold sweat' },
        { content: '&#128532;', title: 'Pensive face' },
        { content: '&#128533;', title: 'Confused face' },
        { content: '&#128534;', title: 'Confounded face' },
        { content: '&#128535;', title: 'Kissing face' },
        { content: '&#128536;', title: 'Face throwing a kiss' },
        { content: '&#128538;', title: 'Kissing face with smiling eyes' },
        { content: '&#128539;', title: 'Face with stuck-out tongue' },
        { content: '&#128540;', title: 'Face with stuck-out tongue and winking eye' },
        { content: '&#128541;', title: 'Face with stuck-out tongue and tightly-closed eyes' },
        { content: '&#128542;', title: 'Disappointed face' },
        { content: '&#128543;', title: 'Worried face' },
        { content: '&#128544;', title: 'Angry face' },
        { content: '&#128545;', title: 'Pouting face' },
        { content: '&#128546;', title: 'Crying face' },
        { content: '&#128547;', title: 'Persevering face' },
        { content: '&#128548;', title: 'Face with look of triumph' },
        { content: '&#128549;', title: 'Disappointed but relieved face' },
        { content: '&#128550;', title: 'Frowning face with open mouth' },
        { content: '&#128551;', title: 'Anguished face' },
        { content: '&#128552;', title: 'Fearful face' },
        { content: '&#128553;', title: 'Weary face' },
        { content: '&#128554;', title: 'Sleepy face' },
        { content: '&#128555;', title: 'Tired face' },
        { content: '&#128556;', title: 'Grimacing face' },
        { content: '&#128557;', title: 'Loudly crying face' },
        { content: '&#128558;', title: 'Face with open mouth' },
        { content: '&#128559;', title: 'Hushed face' },
        { content: '&#128560;', title: 'Face with open mouth and cold sweat' },
        { content: '&#128561;', title: 'Face screaming in fear' },
        { content: '&#128562;', title: 'Astonished face' },
        { content: '&#128563;', title: 'Flushed face' },
        { content: '&#128564;', title: 'Sleeping face' },
        { content: '&#128565;', title: 'char_block' },

    ];
    const animals: { [key: string]: string }[] = [
        { title: 'Monkey Face', content: '&#128053;' },
        { title: 'Monkey', content: '&#128018;' },
        { title: 'Gorilla', content: '&#129421;' },
        { title: 'Dog Face', content: '&#128054;' },
        { title: 'Dog', content: '&#128021;' },
        { title: 'Poodle', content: '&#128041;' },
        { title: 'Wolf Face', content: '&#128058;' },
        { title: 'Fox Face', content: '&#129418;' },
        { title: 'Cat Face', content: '&#128049;' },
        { title: 'Cat', content: '&#128008;' },
        { title: 'Lion Face', content: '&#129409;' },
        { title: 'Tiger Face', content: '&#128047;' },
        { title: 'Tiger', content: '&#128005;' },
        { title: 'Leopard', content: '&#128006;' },
        { title: 'Horse Face', content: '&#128052;' },
        { title: 'Horse', content: '&#128014;' },
        { title: 'Unicorn Face', content: '&#129412;' },
        { title: 'Deer', content: '&#129420;' },
        { title: 'Cow Face', content: '&#128046;' },
        { title: 'Ox', content: '&#128002;' },
        { title: 'Water Buffalo', content: '&#128003;' },
        { title: 'Cow', content: '&#128004;' },
        { title: 'Pig Face', content: '&#128055;' },
        { title: 'Pig', content: '&#128022;' },
        { title: 'Boar', content: '&#128023;' },
        { title: 'Pig Nose', content: '&#128061;' },
        { title: 'Ram', content: '&#128015;' },
        { title: 'Ewe', content: '&#128017;' },
        { title: 'Goat', content: '&#128016;' },
        { title: 'Camel', content: '&#128042;' },
        { title: 'Two-Hump Camel', content: '&#128043;' },
        { title: 'Elephant', content: '&#128024;' },
        { title: 'Rhinoceros', content: '&#129423;' },
        { title: 'Mouse Face', content: '&#128045;' },
        { title: 'Mouse', content: '&#128001;' },
        { title: 'Rat', content: '&#128000;' },
        { title: 'Hamster Face', content: '&#128057;' },
        { title: 'Rabbit Face', content: '&#128048;' },
        { title: 'Rabbit', content: '&#128007;' },
        { title: 'Chipmunk', content: '&#128063;' },
        { title: 'Bat', content: '&#129415;' },
        { title: 'Bear Face', content: '&#128059;' },
        { title: 'Koala', content: '&#128040;' },
        { title: 'Panda Face', content: '&#128060;' },
        { title: 'Paw Prints', content: '&#128062;' },
        { title: 'Frog Face', content: '&#128056;' },
        { title: 'Crocodile', content: '&#128010;' },
        { title: 'Turtle', content: '&#128034;' },
        { title: 'Lizard', content: '&#129422;' },
        { title: 'Snake', content: '&#128013;' },
        { title: 'Dragon Face', content: '&#128050;' },
        { title: 'Dragon', content: '&#128009;' },
        { title: 'Sauropod', content: '&#129429;' },
        { title: 'T-Rex', content: '&#129430;' },
    ];
    // Rich Text Editor items list
    const items: (string | IToolbarItems)[] = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode',
        {
            tooltipText: 'Insert Emoticons',
            template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%"><div class="e-tbar-btn-text" style="font-weight: 500;">&#128578;</div></button>'
        }, '|', 'Undo', 'Redo'
    ];

    //Rich Text Editor ToolbarSettings
    const toolbarSettings: ToolbarSettingsModel = {
        items: items
    };

    const dlgButtons: ButtonPropsModel[] = [{ buttonModel: { content: "Insert", isPrimary: true }, click: onInsert.bind(this) },
    { buttonModel: { content: 'Cancel' }, click: onCancel }];
    const header: string = 'Insert Emoticons';
    const target: Element = rteSectionEle;
    const height: string | number = 'auto';


    function onCreate(): void {
        const customBtn = document.getElementById('custom_tbar') as HTMLElement;
        customBtn.onclick = (e: Event) => {
            (rteObj.contentModule.getEditPanel() as HTMLElement).focus();
            dialogObj.element.style.display = '';
            range = selection.getRange(document);
            saveSelection = selection.save(range, document);
            dialogObj.content = tabObj.element;
            dialogObj.show();
        };
    }


    function dialogCreate(): void {
        const dialogCtn = tabObj.element;
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

    function onOpen(): void {
        tabObj.refresh();
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

    let headerText: Object = [{ text: "&#128578;" }, { text: "&#128053;" }];

    var smileyItems = smileys.map(function (smiley) {
        return (
            <div className='char_block' title={smiley.title} dangerouslySetInnerHTML={{ __html: smiley.content }}></div>
        );
    });
    var animalItems = animals.map(function (animal) {
        return (
            <div className='char_block' title={animal.title} dangerouslySetInnerHTML={{ __html: animal.content }}></div>
        );
    });


    return (
        <div className='control-pane'>
            <div className='control-section e-rte-custom-tbar-section' id="rteCustomTool">
                <div className='rte-control-section' ref={rteSectionRef} id='rteSection'>
                    <RichTextEditorComponent id="EmotionIconstRTE" ref={(scope) => { rteObj = scope }}
                        toolbarSettings={toolbarSettings} actionComplete={actionCompleteHandler.bind(this)} created={onCreate.bind(this)}>
                        <div style={{ display: 'block;' }}><p style={{ marginRight: '10px' }}>The custom command "insert emoticons" is configured as the last item of the toolbar. Click on the command and choose the special character you want to include from the popup.</p></div>
                        <Inject services={[HtmlEditor, Toolbar, Link, Image, QuickToolbar]} />
                    </RichTextEditorComponent>
                    <DialogComponent id='customTbarDlg' ref={(scope) => { dialogObj = scope }}
                        buttons={dlgButtons} overlayClick={dialogOverlay.bind(this)} header={header} visible={false}
                        showCloseIcon={false} width='43%' target={'#rteSection'} height={height} open={onOpen.bind(this)} isModal={true}>
                    </DialogComponent>
                    <div id="tabControl" style={{ display: 'none' }}>
                        <TabComponent id='defaultTab' ref={(tab) => { tabObj = tab; }} created={dialogCreate.bind(this)}>
                            <TabItemsDirective>
                                <TabItemDirective header={headerText[0]}
                                    content='#rteEmoticons-smiley' />
                                <TabItemDirective header={headerText[1]}
                                    content='#rteEmoticons-animal' />
                            </TabItemsDirective>
                        </TabComponent>
                    </div>
                    <div id="rteSpecial_char" style={{ display: 'none' }}>
                        <div id='rteEmoticons-smiley'>
                            {smileyItems}
                        </div>

                        <div id='rteEmoticons-animal'>
                            {animalItems}
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample shows how to add your own commands to toolbar of the Rich Text Editor.
                    The emoticons symbol is added to the toolbar to insert emoticons symbols in the editor.
                    Click the smiley to show the emoticons  list, and then choose the emoticon to be inserted in the editor.
                </p>
            </div>
            <div id="description">
                <p>The Rich Text Editor allows you to configure your own commands to its toolbar using <code>toolbarSettings</code> property.
                    The command can be plain text, icon, or HTML template.
                    You can also define the order and group where the command should be included.
                    Bind the action to the command by getting its instance. </p>
                <p><b>Injecting Module</b></p>
                <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject <code>Toolbar, Link, Image, HtmlEditor, QuickToolbar</code> modules into the services.</p>
            </div>
        </div>
    );
}
export default InsertEmoticons;
