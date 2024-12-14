/**
 * Rich Text Editor markdown overview sample
 */
import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { Image, Inject, IToolbarItems, Link, MarkdownEditor, MarkdownFormatter, RichTextEditorComponent, Table, Toolbar, ToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import * as Marked from 'marked';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';
import './mention-integration.css';

export class MentionIntegration extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorComponent;
    private mention: MentionComponent;

    // set the value to Rich Text Editor
    private value: string = 'Hello [@Maria](mailto:maria@gmail.com)\n\nWelcome to the mention integration with markdown editor demo. Type @ character and tag user from the suggestion list.';
    private placeholder: string = 'Enter your text here...';
    // Rich Text Editor items list
    private items: (string | IToolbarItems)[] = ['Bold', 'Italic', 'StrikeThrough', '|',
        'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', 'SuperScript', 'SubScript', '|',
        'CreateLink', 'Image', 'CreateTable', '|',
        {
            tooltipText: 'Preview',
            template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code">' +
                '<span class="e-btn-icon e-md-preview e-icons"></span></button>'
        }, '|', 'Undo', 'Redo'];


    private textArea: HTMLTextAreaElement;
    private mdsource: HTMLElement;
    private mdPreview: HTMLElement;
    private emailData: { [key: string]: string; }[] = [
        { name: "Selma Rose", initial: 'SR', email: "selma@gmail.com", color: '#FAFDFF', bgColor: '#01579B' },
        { name: "Maria", initial: 'MA', email: "maria@gmail.com", color: '#004378', bgColor: '#ADDBFF' },
        { name: "Russo Kay", initial: 'RK', email: "russo@gmail.com", color: '#F9DEDC', bgColor: '#8C1D18' },
        { name: "Robert", initial: 'RO', email: "robert@gmail.com", color: '#FFD6F7', bgColor: '#37003A' },
        { name: "Camden Kate", initial: 'CK', email: "camden@gmail.com", color: '#FFFFFF', bgColor: '#464ECF' },
        { name: "Garth", initial: 'GA', email: "garth@gmail.com", color: '#FFFFFF', bgColor: '#008861' },
        { name: "Andrew James", initial: 'AJ', email: "james@gmail.com", color: '#FFFFFF', bgColor: '#53CA17' },
        { name: "Olivia", initial: 'OL', email: "olivia@gmail.com", color: '#FFFFFF', bgColor: '#8C1D18' },
        { name: "Sophia", initial: 'SO', email: "sophia@gmail.com", color: '#000000', bgColor: '#D0BCFF' },
        { name: "Margaret", initial: 'MA', email: "margaret@gmail.com", color: '#000000', bgColor: '#F2B8B5' },
        { name: "Ursula Ann", initial: 'UA', email: "ursula@gmail.com", color: '#000000', bgColor: '#47ACFB' },
        { name: "Laura Grace", initial: 'LG', email: "laura@gmail.com", color: '#000000', bgColor: '#FFE088' },
        { name: "Albert", initial: 'AL', email: "albert@gmail.com", color: '#FFFFFF', bgColor: '#00335B' },
        { name: "William", initial: 'WA', email: "william@gmail.com", color: '#FFFFFF', bgColor: '#163E02' }
      ];

    //Rich Text Editor ToolbarSettings
    private toolbarSettings: ToolbarSettingsModel = {
        items: this.items
    };

    private formatter: MarkdownFormatter = new MarkdownFormatter({ listTags: { 'OL': '1., 2., 3.' } });

    public markdownConversion(): void {
        if (this.mdsource.classList.contains('e-active')) {
            let id: string = this.rteObj.getID() + 'html-view';
            let htmlPreview: HTMLElement = this.rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked.marked((this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value);
        }
    }
    public fullPreview(): void {
        let id: string = this.rteObj.getID() + 'html-preview';
        let htmlPreview: HTMLElement = this.rteObj.element.querySelector('#' + id);
        if (this.mdsource.classList.contains('e-active')) {
            this.mdsource.classList.remove('e-active');
            this.mdsource.parentElement.title = 'Preview';
            this.textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
        } else {
            this.mdsource.classList.add('e-active');
            if (!htmlPreview) {
                htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                this.textArea.parentNode.appendChild(htmlPreview);
            }
            this.textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = Marked.marked((this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value);
            this.mdsource.parentElement.title = 'Code View';
        }
    }
    public rendereComplete(): void {
        this.textArea = this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement;
        this.textArea.addEventListener('keyup', (e: KeyboardEventArgs) => {
            this.markdownConversion();
        });
        this.mdsource = document.getElementById('preview-code');
        this.mdsource.addEventListener('click', (e: MouseEvent) => {
            this.fullPreview();
            if ((e.currentTarget as HTMLElement).classList.contains('e-active')) {
                this.rteObj.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                    'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
            } else {
                this.rteObj.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                    'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
            }
        });
    }

    private itemTemplate(data: any): React.JSX.Element {
        return (
          <div className="editor-mention-item-template">
            <div className="em-header">
              <div className="em-avatar" style={{ backgroundColor: data.bgColor, color: data.color }}>
                <div className="em-initial">{data.initial}</div>
              </div>
            </div>
            <div className="em-content">
              <div className="em-name">{data.name}</div>
              <div className="em-email">{data.email}</div>
            </div>
          </div>
        );
      }
    
      private displayTemplate(data: any): React.JSX.Element {
        return (
            <React.Fragment>
            [@{data.name}](mailto:${data.email})
            </React.Fragment>
        );
      }
    render() {
        return (
            <div id="markdownSample" className='control-pane'>
                <div className='control-section' id="rteMarkdown">
                    <div className="content-wrapper">
                        <RichTextEditorComponent id="markdownRTE"
                            ref={(richtexteditor) => { this.rteObj = richtexteditor }} editorMode='Markdown'
                            height='250px' value={this.value} formatter={this.formatter} toolbarSettings={this.toolbarSettings} >
                            <Inject services={[MarkdownEditor, Toolbar, Image, Link, Table]} />
                        </RichTextEditorComponent>
                        <MentionComponent id='editorMention' ref={(mention: MentionComponent) => { this.mention = mention }} dataSource={this.emailData} displayTemplate={this.displayTemplate} itemTemplate={this.itemTemplate} target="#markdownRTE_editable-content" fields={{ text: 'name' }} popupWidth='250px' popupHeight='200px' sortOrder='Ascending' allowSpaces={true}></MentionComponent>
                    </div>
                </div>
                <div id="action-description">
        <p>This example shows how to integrate @mention component within Markdown Editor component. Type `@` character and select a user from the suggestion list.</p>
        </div>

        <div id="description">
            <p> The @Mention is a component used to display a list of items that users can select or tag from the suggested list. In this demo, configured the following properties with popup dimensions.</p>
            <ul>
                <li><code>allowSpaces</code> - Allows to search a word with space.</li>
                <li><code>suggestionCount</code> - Control the items in suggestion list.</li>
                <li><code>itemTemplate</code> - Used to display the customized appearance in suggestion list.</li>
            </ul>
        </div>
            </div>
        );
    }
}
