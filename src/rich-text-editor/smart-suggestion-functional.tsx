/**
 * Rich Text Editor Smart Suggestion sample
 */
 import { DialogType, HtmlEditor, Image, Audio, Video, Table, Inject, Link, NodeSelection, QuickToolbar, RichTextEditorComponent, Toolbar, ToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
 import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
 import * as React from 'react';
 import {updateSampleSection } from '../common/sample-base';
 import './smart-suggestion.css';
 import { ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-react-popups';
  
 function MentionFormatIntegration() {
  React.useEffect(() => {
      updateSampleSection();
  }, [])
 
   let saveSelection: NodeSelection;
   let selection: NodeSelection = new NodeSelection();
   let formatRTE: RichTextEditorComponent;
   let dialogObj: DialogComponent;
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
        { formatName: "Emoji", command: "Emoji", formatType: "Inline", icon: "e-icons emoji",description: "Use emojis to express ideas and emoticons"},
        { formatName: "Image", command: "Image", formatType: "Media", icon: "e-icons e-image icon", description: "Add image to your page"},
        { formatName: "Audio", command: "Audio", formatType: "Media", icon: "e-icons e-audio icon", description: "Add audio to your page"},
        { formatName: "Video", command: "Video", formatType: "Media", icon: "e-icons e-video icon", description: "Add video to your page"}
   ];
   
   const  fieldsData: { [key: string]: string }={ text: 'formatName', groupBy: 'formatType' };
 
   const toolbarSettings: ToolbarSettingsModel = {
     items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
     'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
     'LowerCase', 'UpperCase', 'SuperScript', 'SubScript', '|',
     'Formats', 'Alignments', 'NumberFormatList', 'BulletFormatList',
     'Outdent', 'Indent', '|', 'CreateTable', 'CreateLink', 'Image', 'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
   };
 
   function actionBegineHandler(args: any): void {
    if (args.requestType === 'EnterAction') {
      if (mentionObj.element.classList.contains('e-popup-open')) {
        args.cancel = true;
      }
    }
   }
 
   // Begins the process of inserting emoticons.
 
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
 
   const dialogButtons: ButtonPropsModel[] = [{ buttonModel: { content: "Insert", isPrimary: true }, click: onInsert.bind(this) },
   { buttonModel: { content: 'Cancel' }, click: onCancel }];
   let header: string = 'Insert Emoticons';

  function onCreate(): void {
    dialogObj.target = document.getElementById('mentionFormatIntegration');
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
      node2.parentNode.removeChild(node2);
      const brTag: HTMLElement = document.createElement('br');
      if (node2.parentElement && node2.parentElement.innerHTML.length === 1) {
          node2.parentElement.appendChild(brTag);
      }
      if(previouNode) {
          selection.setCursorPoint(document, previouNode as Element, previouNode.textContent.length);
      }
  }
 
   function onInsert(): void {
    const activeElement: Element = dialogObj.element.querySelector('.char_block.e-active');
    if (activeElement) {
        if (formatRTE.formatter.getUndoRedoStack().length === 0) {
            formatRTE.formatter.saveData();
        }
        beforeApplyFormat(false);
        let range: Range =formatRTE.getRange();
        selection.setCursorPoint(document, range.startContainer as Element, range.startOffset);
        formatRTE.executeCommand('insertText', activeElement.textContent);
        formatRTE.formatter.saveData();
        formatRTE.formatter.enableUndo(formatRTE);
    }
    dialogOverlay();
   }
 
   function dialogOverlay(): void {
     let activeElement: Element = dialogObj.element.querySelector('.char_block.e-active');
     if (activeElement) {
       activeElement.classList.remove('e-active');
     }
     dialogObj.hide();
   }

   function dialogOpen(): void{
      let emojiElement: HTMLElement = document.getElementById('rteEmoticons-smiley');
      if (!emojiElement.children[0].classList.contains('e-active')) {
        emojiElement.children[0].classList.add('e-active');
      }
   }
 
   function onCancel(): void {
     let activeElement: Element = (this as any).element.querySelector('.char_block.e-active');
     if (activeElement) {
       activeElement.classList.remove('e-active');
     }
     (this as any).hide();
   }
 
   function dialogCreate(): void {
     var dialogContent = document.getElementById('emojiDialog');
     dialogContent.onclick = (e: Event) => {
       let target: HTMLElement = e.target as HTMLElement;
       let activeElement: Element = dialogObj.element.querySelector('.char_block.e-active');
       if (target.classList.contains('char_block')) {
         target.classList.add('e-active');
         if (activeElement) {
           activeElement.classList.remove('e-active');
         }
       }
     };
   }
 
   // Ends the process of inserting emoticons
 
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
          formatRTE.executeCommand('insertOrderedList');
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'UL') {
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
      else if ((args.itemData as  { [key: string]: Object }).command == 'Emoji') {
        dialogObj.element.style.display = 'block';
          mentionObj.hidePopup();
          dialogObj.show();
      }
      else {
          formatRTE.executeCommand('formatBlock', (args.itemData as  { [key: string]: Object }).command);
      }
    }
 
   var smileyItems = smileys.map(function (smiley) {
      return (
          <div className='char_block' title={smiley.title} dangerouslySetInnerHTML={{ __html: smiley.content }}></div>
      );
    });
 
    return (
      <div className='control-pane'>
        <div className='control-section mention-inline-format-section' id="mentionFormat">
          <div className='rte-control-section' ref={mentionFormatIntegrationRef} id='mentionFormatIntegration'>
            <RichTextEditorComponent id="MentionInlineFormat" ref={(scope) => { formatRTE = scope }} toolbarSettings={toolbarSettings} placeholder="Type '/' and choose format"  actionBegin={actionBegineHandler.bind(this)} created={onCreate.bind(this)} >
              <Inject services={[HtmlEditor, Toolbar, Image, Audio, Table, Video, Link, QuickToolbar]} />
            </RichTextEditorComponent>

            <DialogComponent id='emojiDialog' ref={(scope) => { dialogObj = scope }}
                buttons={dialogButtons} overlayClick={dialogOverlay.bind(this)} created={dialogCreate.bind(this)} header={header} visible={false}
                width='36%' isModal={true} open={dialogOpen.bind(this)}>
                  <div id="rteEmoticons-smiley">{smileyItems}</div>
            </DialogComponent>
    
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
