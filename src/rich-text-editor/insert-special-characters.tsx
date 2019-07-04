/**
 * RichTextEditor custom toolbar sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, NodeSelection, Image, Link, IToolbarItems, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { Browser, addClass } from '@syncfusion/ej2-base';
import './insert-special-characters.css';
export class InsertSpecialCharacters extends SampleBase<{}, {}> {

  private rteObj: RichTextEditorComponent;
  // set the value to RichTextEditor
  private template: string = `<div style="display:block;"><p style="margin-right:10px">The custom command "insert special character" is configured as the last item of the toolbar. Click on the command and choose the special character you want to include from the popup.</p></div>`;

  public selection: NodeSelection = new NodeSelection();
  public range: Range;
  public customBtn: any;
  public dialogCtn: any;
  public saveSelection: NodeSelection;
  public dialogObj: DialogComponent;
  // RichTextEditor items list
  private items: (string | IToolbarItems)[] = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
  'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode',
  {
      tooltipText: 'Insert Symbol',
      template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%"><div class="e-tbar-btn-text" style="font-weight: 500;"> &#937;</div></button>'
  }, '|', 'Undo', 'Redo'
  ];

  //RichTextEditor ToolbarSettings
  private toolbarSettings: object = {
    items: this.items
  };

  public dlgButtons: any = [{ buttonModel: { content: "Insert", isPrimary: true }, click: this.onInsert.bind(this) },
  { buttonModel: { content: 'Cancel' }, click: this.onCancel }];
  public header: string = 'Special Characters';
  public target: Element = document.getElementById('rteSection');
  public height: any = 'auto';


  public onCreate(): void {
    this.customBtn = document.getElementById('custom_tbar') as HTMLElement;
    this.customBtn.onclick = (e: Event) => {
        (this.rteObj.contentModule.getEditPanel() as HTMLElement).focus();
        this.dialogObj.element.style.display = '';
        this.range = this.selection.getRange(document);
        this.saveSelection = this.selection.save(this.range, document);
        this.dialogObj.content = document.getElementById('rteSpecial_char');
        this.dialogObj.show();
    };
  }


  public dialogCreate(): void {
    this.dialogCtn = document.getElementById('rteSpecial_char');
    this.dialogCtn.onclick = (e: Event) => {
        let target: HTMLElement = e.target as HTMLElement;
        let activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
        if (target.classList.contains('char_block')) {
            target.classList.add('e-active');
            if (activeEle) {
                activeEle.classList.remove('e-active');
            }
        }
    };
}
public onInsert(): void {
    let activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
    if (activeEle) {
        if (this.rteObj.formatter.getUndoRedoStack().length === 0) {
          this.rteObj.formatter.saveData();
        }
        if (Browser.isDevice && Browser.isIos) {
          this.saveSelection.restore();
        }
        this.rteObj.executeCommand('insertText', activeEle.textContent);
        this.rteObj.formatter.saveData();
        (this.rteObj as any).formatter.enableUndo(this.rteObj);
    }
    this.dialogOverlay();
}

public dialogOverlay(): void {
    let activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
    if (activeEle) {
        activeEle.classList.remove('e-active');
    }
    this.dialogObj.hide();
}

public onCancel(e: any): void {
  let activeEle: Element = (this as any).element.querySelector('.char_block.e-active');
  if (activeEle) {
      activeEle.classList.remove('e-active');
  }
  (this as any).hide();
}

  render() {
    return (
      <div className='control-pane'>
          <div className='control-section e-rte-custom-tbar-section' id="rteCustomTool">
            <div className='rte-control-section' id='rteSection'>
            <RichTextEditorComponent id="defaultRTE" ref={(scope) => { this.rteObj = scope }}
            valueTemplate={this.template} toolbarSettings={this.toolbarSettings} created={this.onCreate.bind(this)}>
              <Inject services={[HtmlEditor, Toolbar, Link, Image, QuickToolbar]} />
            </RichTextEditorComponent>
            <DialogComponent id='customTbarDlg' ref={(scope) => { this.dialogObj = scope }}  
            buttons={this.dlgButtons} overlayClick={this.dialogOverlay.bind(this)} header={this.header} visible={false}
                showCloseIcon={false} width='43%' target={'#rteSection'} height={this.height} created={this.dialogCreate.bind(this)} isModal={true}>
            </DialogComponent>
            <div id="customTbarDialog" style={{display: 'none'}}>
                <div id="rteSpecial_char">
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
          <p>This sample shows how to add your own commands to toolbar of the rich text editor. 
            The <code>“Ω” </code>  command is added to insert special characters in the editor. 
            Click the “Ω” command to show the special characters list, and then choose the character to be inserted in the editor.
          </p>
        </div>
        <div id="description">
          <p>The rich text editor allows you to configure your own commands to its toolbar using <code>toolbarSettings</code> property. 
            The command can be plain text, icon, or HTML template. 
            You can also define the order and group where the command should be included. 
            Bind the action to the command by getting its instance. </p>
          <p><b>Injecting Module</b></p>
          <p>RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject <code>Toolbar, Link, Image, HtmlEditor, QuickToolbar</code> modules into the services.</p>
        </div>
      </div>
    );
  }
}
