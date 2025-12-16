/**
 * Rich Text Editor markdown preview sample
 */
import { addClass, Browser, createElement, isNullOrUndefined, KeyboardEventArgs, removeClass } from '@syncfusion/ej2-base';
import { Image, Inject, IToolbarItems, Link, MarkdownEditor, RichTextEditor, RichTextEditorComponent, Table, Toolbar, ToolbarSettingsModel, ActionCompleteEventArgs, HtmlEditor, ToolbarType } from '@syncfusion/ej2-react-richtexteditor';
import { PaneDirective, PanesDirective, SplitterComponent } from '@syncfusion/ej2-react-layouts';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import './overview.css';
function Preview() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let rteObj: RichTextEditorComponent;
    let splitterInstance;
    // set the value to Rich Text Editor
    const value: string = `## Welcome to the Syncfusion® EJ2 Markdown Editor

The **Syncfusion Rich Text Editor** in **Markdown** mode delivers a lightweight, distraction-free editing experience with full Markdown syntax support — powered natively by Syncfusion’s own **MarkdownConverter**.

Write beautiful documents faster using simple, readable Markdown syntax and see the formatted result instantly with live preview.

### Why Choose Markdown Mode?

- Clean, plain-text syntax that is easy to read and write — even in raw form
- Input or modify text, apply formatting, and view the Markdown preview side-by-side using the splitter control.
- Toolbar + keyboard shortcuts for rapid formatting
- Easy to convert content to HTML or other formats
- Ideal for documentation, notes, and developer-focused content
- Reduces clutter and keeps the writing experience distraction-free

### Supported Markdown Features in Action

# Headings
## Markdown Editor Demo
### Create Clean, Structured Content
#### Organize Sections Effortlessly
##### Add Subheadings for Clarity
###### Provide Notes or Additional Info

Headings help structure your content, making it easier to read, scan, and organize information within the Markdown editor.

#### Text Formatting
**Bold text highlights important information.**

*Markdown makes writing simple and clean.*

**_You can also combine bold and italic for emphasis._**

~~Use strikethrough to indicate removed or outdated content.~~

\`Inline code is perfect for short code snippets like commands or variables.\`

### Table
Create simple tables to organize information clearly and quickly.

| Feature | Description |
|---------|-------------|
| Markdown   | Lightweight, easy-to-read formatting syntax |
| Preview    | Shows formatted output side-by-side |

#### Lists

**Unordered**
- Explore the editor features
- Add content with simple syntax
    - Insert nested bullet points
    - Organize topics hierarchically
- Keep your notes clear and readable

**Ordered**
1. Start writing your content
2. Apply Markdown formatting
    1. Add sub-steps for detailed tasks
    2. Improve clarity with structure
3. Review and finalize your document

**Task List**
- [x] Completed task
- [ ] Write documentation
- [ ] Release new version

#### Blockquotes

> Markdown makes writing on the web beautiful and readable.
>
> — John Gruber, Creator of Markdown

#### Code Blocks
Inline code: Use \`npm install @syncfusion/ej2-richtexteditor\``;
    // Rich Text Editor items list
    const items: (string | IToolbarItems)[] = ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'Blockquote', 'OrderedList',
    'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable', '|', 'Undo', 'Redo'];
    let textArea: HTMLElement;
    let srcArea: Element;
    let placeholder: string = 'Enter your text here...';
    //Rich Text Editor ToolbarSettings
    const toolbarSettings: ToolbarSettingsModel = {
        items: items,
        type: ToolbarType.Expand,
        enableFloating: false
    };
    function onCreate() {
        textArea = rteObj.contentModule.getEditPanel() as HTMLElement;
        srcArea = document.querySelector('.source-code') as HTMLElement;
        updateValue();
    }
    function onChange() {
        updateValue();
    }
    function onResizing() {
        rteObj.refreshUI();
    }
    function updateValue() {
        srcArea.innerHTML =  MarkdownConverter.toHtml((rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value) as string;
    }
    function updateOrientation() { 
        if (Browser.isDevice) {
            splitterInstance.orientation = 'Vertical';
            (document.body.querySelector('.heading') as any).style.width = 'auto';
        }
    }
    function content1() {
        return (<div className="content">
            <RichTextEditorComponent id='defaultRTE' ref={(richtexteditor) => { rteObj = richtexteditor; }} editorMode='Markdown'  toolbarSettings={toolbarSettings} height='447px' saveInterval={1} created={onCreate.bind(this)} change={onChange.bind(this)} actionComplete={updateValue.bind(this)} value={value}>

                <Inject services={[MarkdownEditor, Toolbar, Image, Link, HtmlEditor, Table]} />
            </RichTextEditorComponent>
        </div>);
    };
    function content2() {
        return (<div className="heading right">
            <h6 className="title"><b>Markdown Preview</b></h6>
            <div className="splitter-default-content source-code pane2" style={{ padding: "20px" }}></div>
        </div>);
    };
    return (
        <div className='control-pane'>
            <div className='control-section markdown-preview' id="rtePreview">
                <div className="content-wrapper">
                <SplitterComponent id='splitter-rte-markdown-preview' ref={splitter => (splitterInstance = splitter)} height='450px' width='100%' resizing={onResizing.bind(this)} created={updateOrientation.bind(this)}>
                        <PanesDirective>
                            <PaneDirective resizable={true} size='50%' min="40%" cssClass='pane1' content={content1.bind(this)}></PaneDirective>
                            <PaneDirective min="40%" cssClass='pane2' content={content2.bind(this)}></PaneDirective>
                        </PanesDirective>
                    </SplitterComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates how to preview markdown changes in Rich Text Editor.
                    Type or edit the display text, and apply format to view the preview of markdown.
                    You can preview the markdown changes immediately in the preview area.</p>
            </div>
            <div id="description">
                <p>The Rich Text Editor allows you to preview markdown changes immediately using <code>preview</code>.</p>
                <p>Syncfusion's <code>Markdown Converter</code> is used in this sample to convert markdown into HTML content.</p>
            </div>
        </div>
    );
}
export default Preview;

