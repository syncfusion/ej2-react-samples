/**
 * Rich Text Editor Smart Suggestion sample
 */
 import { DialogType, HtmlEditor, Image, Audio, Video, Inject, Link, NodeSelection, QuickToolbar, RichTextEditorComponent, Toolbar, ToolbarSettingsModel, Table } from '@syncfusion/ej2-react-richtexteditor';
 import { MentionComponent, SelectEventArgs } from '@syncfusion/ej2-react-dropdowns';
 import * as React from 'react';
 import { SampleBase } from '../common/sample-base';
 import './smart-suggestion.css';
 import { ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-react-popups';
  
  export class MentionFormatIntegration extends SampleBase<{}, {}> {
 
   private mentionFormatIntegrationRef: React.Ref<HTMLDivElement>;
   public saveSelection: NodeSelection;
   public selection: NodeSelection = new NodeSelection();
   private formatRTE: RichTextEditorComponent;
   public dialogObj: DialogComponent;
   public mentionObj: MentionComponent;
   private rteSectionEle: HTMLDivElement = null;
 
   constructor(props) {
     super(props);
     this.mentionFormatIntegrationRef = element => {
       this.rteSectionEle = element;
     };
   }
  
   private data: { [key: string]: Object }[] = [
         { formatName: "Text", command: "P", formatType: "Basic blocks", icon: "e-btn-icon e-text e-icons", description: "Writing with paragraphs"},
         { formatName: "Quotation", command: "BlockQuote", formatType: "Basic blocks", icon: "e-icons block-view", description: "Insert a quote or citation" },
         { formatName: "Heading 1", command: "H1", formatType: "Basic blocks", icon: "e-icons h1-view", description: "Use this for a top level heading"},
         { formatName: "Heading 2", command: "H2", formatType: "Basic blocks", icon: "e-icons h2-view", description: "Use this for key sections"},
         { formatName: "Heading 3", command: "H3", formatType: "Basic blocks", icon: "e-icons h3-view",description: "Use this for sub sections and group headings" },
         { formatName: "Heading 4", command: "H4", formatType: "Basic blocks", icon: "e-icons h4-view", description: "Use this for deep headings"},
         { formatName: "Numbered list", command: "OL", formatType: "Basic blocks", icon: "e-icons e-list-ordered icon", description: "Create an ordered list"},
         { formatName: "Bulleted list", command: "UL", formatType: "Basic blocks", icon: "e-icons e-list-unordered icon", description: "Create an unordered list"},
         { formatName: "Table", command: "CreateTable", formatType: "Basic blocks",icon: "e-icons e-table icon", description: "Insert a table"},
         { formatName: "Emoji", command: "Emoji", formatType: "Inline", icon: "e-icons emoji",description: "Use emojis to express ideas and emoticons"},
         { formatName: "Image", command: "Image", formatType: "Media", icon: "e-icons e-image icon", description: "Add image to your page"},
         { formatName: "Audio", command: "Audio", formatType: "Media", icon: "e-icons e-audio icon", description: "Add audio to your page"},
         { formatName: "Video", command: "Video", formatType: "Media", icon: "e-icons e-video icon", description: "Add video to your page"}
   ];
   
   private  fieldsData: { [key: string]: string }={ text: 'formatName', groupBy: 'formatType' };
 
   private toolbarSettings: ToolbarSettingsModel = {
     items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
     'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
     'LowerCase', 'UpperCase', 'SuperScript', 'SubScript', '|',
     'Formats', 'Alignments', 'NumberFormatList', 'BulletFormatList',
     'Outdent', 'Indent', '|', 'CreateTable', 'CreateLink', 'Image', 'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
   };
 
   public actionBegineHandler(args: any): void {
     if (args.requestType === 'EnterAction') {
       if (this.mentionObj.element.classList.contains('e-popup-open')) {
         args.cancel = true;
       }
     }
   }
 
 
   // Begins the process of inserting emoticons.
 
   public smileys: { [key: string]: string }[] = [
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
     { title: 'Camel', content: '&#128042;' }
   ];
 
   public dialogButtons: ButtonPropsModel[] = [{ buttonModel: { content: "Insert", isPrimary: true }, click: this.onInsert.bind(this) },
   { buttonModel: { content: 'Cancel' }, click: this.onCancel }];
   public header: string = 'Insert Emoticons';

   public onCreate(): void {
     this.dialogObj.target = document.getElementById('mentionFormatIntegration');
   }

   public beforeApplyFormat(isBlockFormat: Boolean):void{
      let range1: Range = this.formatRTE.getRange();
      let node: Node = this.formatRTE.formatter.editorManager.nodeSelection.getNodeCollection(range1)[0];
      let blockNewLine = !(node.parentElement.innerHTML.replace(/&nbsp;|<br>/g, '').trim() == '/' || node.textContent.trim().indexOf('/')==0);
      let blockNode: Node;
      let startNode:Node = node;
      if (blockNewLine && isBlockFormat) {
          while (startNode != this.formatRTE.inputElement) {
              blockNode = startNode;
              startNode = startNode.parentElement;
          }           
      }          
      let startPoint = range1.startOffset;
      while(this.formatRTE.formatter.editorManager.nodeSelection.getRange(document).toString().indexOf("/") ==-1 ){
          this.formatRTE.formatter.editorManager.nodeSelection.setSelectionText(document, node, node, startPoint, range1.endOffset);
          startPoint--;
      }
      let range2: Range = this.formatRTE.getRange();
      let node2: Node = this.formatRTE.formatter.editorManager.nodeCutter.GetSpliceNode(range2, node as HTMLElement);
      let previouNode: Node = node2.previousSibling;
      node2.parentNode.removeChild(node2);
      if(blockNewLine && isBlockFormat){
          let defaultTag: HTMLElement = document.createElement('p');
          defaultTag.innerHTML = '</br>';
          blockNode.parentNode.insertBefore(defaultTag, blockNode.nextSibling);
          this.selection.setCursorPoint(document, blockNode.nextSibling as Element, 0);
      } else if(previouNode) {
          this.selection.setCursorPoint(document, previouNode as Element, previouNode.textContent.length);
      }
  }
 
   public onInsert(): void {
      const activeElement: Element = this.dialogObj.element.querySelector('.char_block.e-active');
      if (activeElement) {
          if (this.formatRTE.formatter.getUndoRedoStack().length === 0) {
              this.formatRTE.formatter.saveData();
          }
          this.beforeApplyFormat(false);
          let range: Range =this.formatRTE.getRange();
          this.selection.setCursorPoint(document, range.startContainer as Element, range.startOffset);
          this.formatRTE.executeCommand('insertText', activeElement.textContent);
          this.formatRTE.formatter.saveData();
          this.formatRTE.formatter.enableUndo(this.formatRTE);
      }
      this.dialogOverlay();
   }
 
   public dialogOverlay(): void {
     let activeElement: Element = this.dialogObj.element.querySelector('.char_block.e-active');
     if (activeElement) {
       activeElement.classList.remove('e-active');
     }
     this.dialogObj.hide();
   }
   public dialogOpen(): void{
       let emojiElement: HTMLElement = document.getElementById('rteEmoticons-smiley');
       if (!emojiElement.children[0].classList.contains('e-active')) {
         emojiElement.children[0].classList.add('e-active');
       }
   }
 
   public onCancel(): void {
     let activeElement: Element = (this as any).element.querySelector('.char_block.e-active');
     if (activeElement) {
       activeElement.classList.remove('e-active');
     }
     (this as any).hide();
   }
 
   public dialogCreate(): void {
     let dialogContent: HTMLElement = document.getElementById('emojiDialog');
     dialogContent.onclick = (e: Event) => {
       let target: HTMLElement = e.target as HTMLElement;
       let activeElement: Element = this.dialogObj.element.querySelector('.char_block.e-active');
       if (target.classList.contains('char_block')) {
         target.classList.add('e-active');
         if (activeElement) {
           activeElement.classList.remove('e-active');
         }
       }
     };
   }
 
   // Ends the process of inserting emoticons.
 
    private itemTemplate(data: any): JSX.Element {
      return (
       <table className="format-table">
         <tr>
           <td >
             <span id='icons' className={data.icon}></span>
           </td>
           <td>
             <span className="font">{data.formatName}</span>
             <span className="description">{data.description}</span>
           </td>
         </tr>
       </table>
     );
    }
 
 
    public beforeOpen():void{
       this.saveSelection = this.selection.save(this.selection.getRange(document), document);
    }

    public filtering():void{
      this.saveSelection = this.selection.save(this.selection.getRange(document), document);
    }
    
    public appyCommand(args: SelectEventArgs):void{
      args.cancel = true;
      this.formatRTE.focusIn();
      this.saveSelection.restore();
      if (!((args.itemData as  { [key: string]: Object }).formatType == 'Inline')) {
          this.beforeApplyFormat(true);
      }
      if ((args.itemData as  { [key: string]: Object }).command == 'OL') {
          this.formatRTE.executeCommand('insertOrderedList');
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'UL') {
          this.formatRTE.executeCommand('insertUnorderedList');
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'CreateTable') {
          this.mentionObj.hidePopup();
          this.formatRTE.showDialog(DialogType.InsertTable);
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'Image') {
          this.mentionObj.hidePopup();
          this.formatRTE.showDialog(DialogType.InsertImage);
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'Audio') {
          this.mentionObj.hidePopup();
          this.formatRTE.showDialog(DialogType.InsertAudio);
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'Video') {
          this.mentionObj.hidePopup();
          this.formatRTE.showDialog(DialogType.InsertVideo);
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'Emoji') {
        this.dialogObj.element.style.display = 'block';
          this.mentionObj.hidePopup();
          this.dialogObj.show();
      }
      else {
          this.formatRTE.executeCommand('formatBlock', (args.itemData as  { [key: string]: Object }).command);
      }
   }
 
   render() {
     var smileyItems = this.smileys.map(function (smiley) {
       return (
         <div className='char_block' title={smiley.title} dangerouslySetInnerHTML={{ __html: smiley.content }}></div>
       );
   });
 
     return (
       <div className='control-pane'>
         <div className='control-section mention-inline-format-section' id="mentionFormat">
           <div className='rte-control-section' ref={this.mentionFormatIntegrationRef} id='mentionFormatIntegration'>
             <RichTextEditorComponent id="MentionInlineFormat" ref={(scope) => { this.formatRTE = scope }} toolbarSettings={this.toolbarSettings} placeholder="TType '/' and choose format"  actionBegin={this.actionBegineHandler.bind(this)} created={this.onCreate.bind(this)} >
               <Inject services={[HtmlEditor, Toolbar, Image, Audio, Table, Video, Link, QuickToolbar]} />
             </RichTextEditorComponent>
 
             <DialogComponent id='emojiDialog' ref={(scope) => { this.dialogObj = scope }}
                 buttons={this.dialogButtons} overlayClick={this.dialogOverlay.bind(this)} created={this.dialogCreate.bind(this)} header={this.header} visible={false}
                 width='36%' isModal={true} open={this.dialogOpen.bind(this)}>
                   <div id="rteEmoticons-smiley">{smileyItems}</div>
             </DialogComponent>
 
             <MentionComponent ref={(scope) => { this.mentionObj = scope }} id="mentionEditor" target="#MentionInlineFormat_rte-edit-view" mentionChar={'/'} allowSpaces={true} dataSource={this.data} fields={this.fieldsData} 
               popupWidth="320px" popupHeight="290px" itemTemplate={this.itemTemplate} beforeOpen={this.beforeOpen.bind(this)} filtering={this.filtering.bind(this)} select={this.appyCommand.bind(this)}></MentionComponent>
           </div>
         </div>
         <div id="action-description">
           <p>This example demonstrates how to easily apply formatting or insert media and tables in the Rich Text Editor content using the Mention component. To use it, simply type the slash (/) key in the editor and select the desired format from the suggestion list that appears.</p>
         </div>
         <div id="description">
           <p>The @mention component is integrated into the Rich Text Editor and shows the suggestion list when the slash (/) key is pressed in an editor and applies suggested formats. To achieve this, the sample is customized for the Mention and Rich Text Editor .</p>
           <ul>
               <li>Prevent the @mention default selection action by setting the <a target='_blank' href='https://helpej2.syncfusion.com/react/documentation/api/mention/selectEventArgs/#cancel'>args.cancel</a> as <code>true</code> at the <a target='_blank' href='https://helpej2.syncfusion.com/react/documentation/api/mention/#select'>select</a> event.</li>
               <li>Get the command name from the Mention component, select an event, and pass it to the public method <a target='_blank' href="https://helpej2.syncfusion.com/react/documentation/api/rich-text-editor#executecommand">executeCommand</a> to perform the specified formats on the selected text in an editor.</li>
           </ul>
           <p> The following formats are shown in the mention suggestion list; apply them in an editor.</p>
               <ul>
                   <li><code>Basic blocks</code> - The Rich Text Editor supports basic text formatting blocks, including <code>paragraph</code>, <code>headings</code>, <code>code</code>,<code>quotation</code>, <code>lists</code>, and <code>table</code> making it easier for users to structure their content. When a user selects a basic block format, it will be applied to the next line or paragraph.</li>
                   <li><code>Inline formats</code> - The Rich Text Editor supports inline formatting, allowing you to add <code>emojis</code> to the specific text within the content.</li>
                   <li><code>Media formats</code> -  The Rich Text Editor also supports media formats, including <code>image</code>, <code>video</code>, and <code>audio</code> making it an efficient tool for the content creation.</li>
               </ul>
         </div>
       </div>
      );
    }
  } 
