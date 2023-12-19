/**
 * Rich Text Editor Smart Suggestion sample
 */
 import { DialogType, HtmlEditor, Image, Audio, Video, Inject, Link, NodeSelection, QuickToolbar, RichTextEditorComponent, Toolbar, ToolbarSettingsModel, Table, EmojiPicker } from '@syncfusion/ej2-react-richtexteditor';
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
         { formatName: "Emoji picker", command: "EmojiPicker", formatType: "Inline", icon: "e-icons e-emoji icon",description: "Use emojis to express ideas and emoticons"},
         { formatName: "Image", command: "Image", formatType: "Media", icon: "e-icons e-image icon", description: "Add image to your page"},
         { formatName: "Audio", command: "Audio", formatType: "Media", icon: "e-icons e-audio icon", description: "Add audio to your page"},
         { formatName: "Video", command: "Video", formatType: "Media", icon: "e-icons e-video icon", description: "Add video to your page"}
   ];
   
   private  fieldsData: { [key: string]: string }={ text: 'formatName', groupBy: 'formatType' };
 
   private toolbarSettings: ToolbarSettingsModel = {
     items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
       'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
       'LowerCase', 'UpperCase', '|',
       'Formats', 'Alignments', '|', 'NumberFormatList', 'BulletFormatList', '|',
       'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
       '|', 'EmojiPicker', '|',
       'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
   };
 
   public actionBegineHandler(args: any): void {
     if (args.requestType === 'EnterAction') {
       if (this.mentionObj.element.classList.contains('e-popup-open')) {
         args.cancel = true;
       }
     }
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
      const brTag: HTMLElement = document.createElement('br');
      if (node2.parentElement && node2.parentElement.innerHTML.length === 1) {
          node2.parentElement.appendChild(brTag);
      }
      node2.parentNode.removeChild(node2);
      if(previouNode) {
          this.selection.setCursorPoint(document, previouNode as Element, previouNode.textContent.length);
      }
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
          this.mentionObj.hidePopup();
          this.formatRTE.executeCommand('insertOrderedList');
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'UL') {
          this.mentionObj.hidePopup();
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
      else if ((args.itemData as  { [key: string]: Object }).command == 'EmojiPicker') {
          this.beforeApplyFormat(false);
          this.mentionObj.hidePopup();
          this.formatRTE.showEmojiPicker();
      }
      else {
          this.mentionObj.hidePopup();
          this.formatRTE.executeCommand('formatBlock', (args.itemData as  { [key: string]: Object }).command);
      }
   }
 
   render() {
     return (
       <div className='control-pane'>
         <div className='control-section mention-inline-format-section' id="mentionFormat">
           <div className='rte-control-section' ref={this.mentionFormatIntegrationRef} id='mentionFormatIntegration'>
             <RichTextEditorComponent id="MentionInlineFormat" ref={(scope) => { this.formatRTE = scope }} toolbarSettings={this.toolbarSettings} placeholder="TType '/' and choose format"  actionBegin={this.actionBegineHandler.bind(this)} >
               <Inject services={[HtmlEditor, Toolbar, Image, Audio, Table, Video, Link, QuickToolbar, EmojiPicker]} />
             </RichTextEditorComponent>

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
