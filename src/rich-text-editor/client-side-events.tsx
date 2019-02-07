/**
 * RichTextEditor events sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, Link, Image, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import { ActionBeginEventArgs, ActionCompleteEventArgs } from '@syncfusion/ej2-richtexteditor';
import { PropertyPane } from '../common/property-pane';
import './rte-events.css';

export class RTEEvents extends SampleBase<{}, {}> {

  private rteObj: RichTextEditorComponent;

  // set the value to RichTextEditor
  private template: string = `<p>The rich text editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. 
  Users can format their content using standard toolbar commands.</p>
                
  <p><b>Key features:</b></p>
                
  <ul>
      <li>
          <p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p>
      </li>
      <li>
          <p>Capable of handling markdown editing.</p>
      </li>
      <li>
          <p>Contains a modular library to load the necessary functionality on demand.</p>
      </li>
      <li>
          <p>Provides a fully customizable toolbar.</p>
      </li>
      <li>
          <p>Provides HTML view to edit the source directly for developers.</p>
      </li>
      <li>
          <p>Supports third-party library integration.</p>
      </li>
      <li>
          <p>Allows preview of modified content before saving it.</p>
      </li>
      <li>
          <p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p>
      </li>
      <li>
          <p>Contains undo/redo manager.</p>
      </li>
      <li>
          <p>Creates bulleted and numbered lists.</p>
      </li>
  </ul>`;

  // RichTextEditor items list
  private items: string[] = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
  'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
  'LowerCase', 'UpperCase', '|',
  'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
  'Outdent', 'Indent', '|',
  'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
  'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'];

    //RichTextEditor ToolbarSettings
    private toolbarSettings: object = {
        items: this.items
    };

    public rendereComplete(): void {
        document.getElementById('clear').onclick = () => {
            document.getElementById('EventLog').innerHTML = '';
        };
    }
    private create(): void {
        this.appendElement('RichTextEditor <b>create</b> event called<hr>');
    }
    private actionBegin(args: ActionBeginEventArgs): void {
        this.appendElement('<b>' + args.requestType + '</b> action is called<hr>');
        this.handleFullScreen(args);
    }
    private actionComplete(args: ActionCompleteEventArgs): void {
        this.appendElement('<b>' + args.requestType + '</b> action is completed<hr>');
        this.actionCompleteHandler();
    }
    private focus(): void {
        this.appendElement('RichTextEditor <b>focus</b> event called<hr>');
    }
    private blur(): void {
        this.appendElement('RichTextEditor <b>blur</b> event called<hr>');
    }
    private change(): void {
        this.appendElement('RidhTextEditor <b>change</b> event called<hr>');
    }
    private toolbarClick(): void {
        this.appendElement('RidhTextEditor <b>toolbar click</b> event called<hr>');
    }
    private appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }
    public handleFullScreen(e: any): void {
        let leftBar: HTMLElement;
        let transformElement: HTMLElement;
        if (Browser.isDevice) {
            leftBar = document.querySelector('#right-sidebar');
            transformElement = document.querySelector('.sample-browser.e-view.e-content-animation');
        } else {
            leftBar = document.querySelector('#left-sidebar');
            transformElement = document.querySelector('#right-pane');
        }
        if (e.targetItem === 'Maximize') {
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
            if (!Browser.isDevice) { transformElement.style.marginLeft = '0px'; }
            transformElement.style.transform = 'inherit';
        } else if (e.targetItem === 'Minimize') {
            removeClass([leftBar], ['e-close']);
            if (!Browser.isDevice) {
            addClass([leftBar], ['e-open']);
            transformElement.style.marginLeft = leftBar.offsetWidth + 'px'; }
            transformElement.style.transform = 'translateX(0px)';
        }
    }
    public actionCompleteHandler(): void {
        setTimeout(() => { (this.rteObj as any).toolbarModule.refreshToolbarOverflow(); }, 400);
    }

  render() {
    return (
      <div className='control-pane'>
          <div className='col-lg-8 control-section' id='rteEvent'>
            <div className='rte-control-section'>
              <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }} 
              valueTemplate={this.template} toolbarSettings={ this.toolbarSettings}
              created={this.create.bind(this)}
              actionBegin={this.actionBegin.bind(this)}
              actionComplete={this.actionComplete.bind(this)}
              focus={this.focus.bind(this)}
              blur={this.blur.bind(this)}
              change={this.change.bind(this)}
              toolbarClick={this.toolbarClick.bind(this)}>
              <Inject services={[HtmlEditor, Toolbar, Link, Image, QuickToolbar]} />
              </RichTextEditorComponent>
            </div>
          </div>
          <div className='col-lg-4 property-section' id="rteEventProperty">
          <PropertyPane title='Properties'>
                <table id="property" title="Event Trace" className='property-panel-table rte-event-panel'>
                    <tbody><tr>
                    <td>
                        <div className="eventarea" style={{ height: '245px', overflow: 'auto' }}>
                            <span className="EventLog" id="EventLog" style={{ wordBreak: 'normal' }}></span>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <div className="evtbtn" style={{ paddingBottom: '10px'}}>
                            <ButtonComponent id="clear">Clear</ButtonComponent>
                        </div>
                    </td>
                    </tr>
                    </tbody>
                </table>
            </PropertyPane>
          </div>
          <div id="action-description">
            <p>This sample demonstrates the events that trigger on every action of the rich text editor. The event details are showcased in the event trace panel.</p>
          </div>
    
          <div id="description">
            <p>The rich text editor triggers the events based on its actions. 
                The events can be used as an extension point to perform custom operations.</p>
            <ul>
                <li><code>change</code> - Triggers when the editor gets blurred and changes are made to the content.</li>
                <li><code>focus</code> - Triggers when the editor is in focus.</li>
                <li><code>blur</code> - Triggers when focused out of the editor.</li>
                <li><code>actionBegin</code> - Triggers before the execution of command.</li>
                <li><code>actionComplete</code> - Triggers after the execution of command.</li>
                <li><code>created</code> - Triggers when the component is created.</li>
                <li><code>destroyed</code> – Triggers when the component is destroyed.</li>
            </ul>
            <p><b>Injecting Module</b></p>
            <p>RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject <code>Toolbar, Link, Image, HtmlEditor</code> modules into the services.</p>
          </div>
      </div>
    );
  }
}
