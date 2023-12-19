/**
 * Rich Text Editor Smart Suggestion sample
 */
 import { DialogType, HtmlEditor, Image, Audio, Video, Table, Inject, Link, NodeSelection, QuickToolbar, RichTextEditorComponent, Toolbar, ToolbarSettingsModel, EmojiPicker } from '@syncfusion/ej2-react-richtexteditor';
 import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
 import * as React from 'react';
 import {updateSampleSection } from '../common/sample-base';
 import './smart-suggestion.css';
  
 function MentionFormatIntegration() {
  React.useEffect(() => {
      updateSampleSection();
  }, [])
 
   let saveSelection: NodeSelection;
   let selection: NodeSelection = new NodeSelection();
   let formatRTE: RichTextEditorComponent;
   let mentionObj: MentionComponent;
   let rteSectionEle: HTMLDivElement = null;
   let mentionFormatIntegrationRef: React.Ref<HTMLDivElement> = (element) => {
    rteSectionEle = element;
  }
  
   const data: { [key: string]: Object }[] = [
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
   
   const  fieldsData: { [key: string]: string }={ text: 'formatName', groupBy: 'formatType' };
 
   const toolbarSettings: ToolbarSettingsModel = {
     items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
       'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
       'LowerCase', 'UpperCase', '|',
       'Formats', 'Alignments', '|', 'NumberFormatList', 'BulletFormatList', '|',
       'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
       '|', 'EmojiPicker', '|',
       'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
   };
 
   function actionBegineHandler(args: any): void {
    if (args.requestType === 'EnterAction') {
      if (mentionObj.element.classList.contains('e-popup-open')) {
        args.cancel = true;
      }
    }
   }

  function beforeApplyFormat(isBlockFormat: Boolean):void{
      let range1: Range = formatRTE.getRange();
      let node: Node = formatRTE.formatter.editorManager.nodeSelection.getNodeCollection(range1)[0];
      let blockNewLine = !(node.parentElement.innerHTML.replace(/&nbsp;|<br>/g, '').trim() == '/' || node.textContent.trim().indexOf('/')==0);
      let blockNode: Node;
      let startNode:Node = node;
      if (blockNewLine && isBlockFormat) {
          while (startNode != formatRTE.inputElement) {
              blockNode = startNode;
              startNode = startNode.parentElement;
          }           
      }          
      let startPoint = range1.startOffset;
      while(formatRTE.formatter.editorManager.nodeSelection.getRange(document).toString().indexOf("/") ==-1 ){
          formatRTE.formatter.editorManager.nodeSelection.setSelectionText(document, node, node, startPoint, range1.endOffset);
          startPoint--;
      }
      let range2: Range = formatRTE.getRange();
      let node2: Node = formatRTE.formatter.editorManager.nodeCutter.GetSpliceNode(range2, node as HTMLElement);
      let previouNode: Node = node2.previousSibling;
      const brTag: HTMLElement = document.createElement('br');
      if (node2.parentElement && node2.parentElement.innerHTML.length === 1) {
          node2.parentElement.appendChild(brTag);
      }
      node2.parentNode.removeChild(node2);
      if(previouNode) {
          selection.setCursorPoint(document, previouNode as Element, previouNode.textContent.length);
      }
  }

    function itemTemplate(data: any): JSX.Element {
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
 
 
    function beforeOpen():void{
       saveSelection = selection.save(selection.getRange(document), document);
    }
    function filtering():void{
      saveSelection = selection.save(selection.getRange(document), document);
    }
    
    function appyCommand(args: any):void{
      args.cancel = true;
      formatRTE.focusIn();
      saveSelection.restore();
      if (!((args.itemData as  { [key: string]: Object }).formatType == 'Inline')) {
          beforeApplyFormat(true);
      }
      if ((args.itemData as  { [key: string]: Object }).command == 'OL') {
          mentionObj.hidePopup();
          formatRTE.executeCommand('insertOrderedList');
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'UL') {
          mentionObj.hidePopup();
          formatRTE.executeCommand('insertUnorderedList');
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'CreateTable') {
          mentionObj.hidePopup();
          formatRTE.showDialog(DialogType.InsertTable);
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'Image') {
          mentionObj.hidePopup();
          formatRTE.showDialog(DialogType.InsertImage);
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'Audio') {
          mentionObj.hidePopup();
          formatRTE.showDialog(DialogType.InsertAudio);
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'Video') {
          mentionObj.hidePopup();
          formatRTE.showDialog(DialogType.InsertVideo);
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'EmojiPicker') {
          beforeApplyFormat(false);
          mentionObj.hidePopup();
          formatRTE.showEmojiPicker();
      }
      else {
          mentionObj.hidePopup();
          formatRTE.executeCommand('formatBlock', (args.itemData as  { [key: string]: Object }).command);
      }
    }

    return (
      <div className='control-pane'>
        <div className='control-section mention-inline-format-section' id="mentionFormat">
          <div className='rte-control-section' ref={mentionFormatIntegrationRef} id='mentionFormatIntegration'>
            <RichTextEditorComponent id="MentionInlineFormat" ref={(scope) => { formatRTE = scope }} toolbarSettings={toolbarSettings} placeholder="Type '/' and choose format"  actionBegin={actionBegineHandler.bind(this)} >
              <Inject services={[HtmlEditor, Toolbar, Image, Audio, Table, Video, Link, QuickToolbar, EmojiPicker]} />
            </RichTextEditorComponent>
    
            <MentionComponent ref={(scope) => { mentionObj = scope }} id="mentionEditor" target="#MentionInlineFormat_rte-edit-view" mentionChar={'/'} allowSpaces={true} dataSource={data} fields={fieldsData} 
              popupWidth="320px" popupHeight="290px" itemTemplate={itemTemplate} beforeOpen={beforeOpen} filtering={filtering}  select={appyCommand}></MentionComponent>
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
export default MentionFormatIntegration;
