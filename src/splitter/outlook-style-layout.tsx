import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { SplitterComponent, PanesDirective, PaneDirective } from '@syncfusion/ej2-react-layouts';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { RichTextEditorComponent, Inject, Link, Image, HtmlEditor, Toolbar, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import './outlook-style-layout.component.css';

/**
 *  Sample for outlook style using splitter
 */

export class OutlookLayout extends SampleBase<{}, {}> {

    public splitterInstance: SplitterComponent;
    public listViewObj: ListViewComponent;
    private rteObj: RichTextEditorComponent;
    private treeInstance: TreeViewComponent;
    private textBox1: TextBoxComponent;
    private textBox2: TextBoxComponent;
    private textBox3: TextBoxComponent;

    public dataSource: any = [
        { Name: 'Selma Tally', content: 'Apology marketing email',content2:'Hello Ananya Singleton', id: '1', order: 0 },
        { Name: 'Illa Russo', content: 'Annual conference', content2: 'Hi jeani Moresa', id: '4', order: 0 },
        { Name: 'Camden Macmellon', content: 'Reference request- Camden hester', content2: 'Hello Kerry Best', order: 0 },
        { Name: 'Garth Owen', content: 'Application for job Title', content2:'Hello Illa Russo', id: '2', order: 0 },
        { Name: 'Ursula Patterson', content: 'Programmaer Position Applicant', content2: 'Hello Kerry best', id: '2', order: 0 }
    ];

    data = this.dataSource as any;

    private nodeTemplate(data: any): JSX.Element {
        return(<div>
            <div className="treeviewdiv">
              <div className="textcontent">
                <span className="treeName">{data.name}</span>
              </div>
               { data.count &&
                <div className="countcontainer">
                  <span className="treeCount e-badge e-badge-primary" >{data.count}</span>
                </div>
              }
            </div>
          </div>);
    };
    public paneSize1 = "28%";
    public minimumSize1 = "27%";
    public content1 = "<div class='splitter-content'></div>";
    public paneSize2 = "33%";
    public minimumSize2 = "23%";
    public content2 = "<div class='splitter-content'></div>";
    public paneSize3 = "37%";
    public minimumSize3 = "30%";
    public content3 = "<div ><div class='splitter-content'><div style = 'width: 100%; padding: 15px;'><table><tr><td><button class='e-btn e-flat e-outline'>To...</button></td>" +
    "<td id='firstname-target'></td></tr><tr><td><button class='e-btn e-flat e-outline'>Cc...</button></td><td id ='lastname-target'></td>" +
    "</tr><tr><td><div id='subject-text'>Subject</div></td><td id='subject-target'></td></tr></table></div>" +
    "<div class='forum'><div id='createpostholder'><div id='buttonSection'><button class='e-btn e-primary' id='send'>Send</button>" +
    "<button class='e-btn' id='discard'>Discard</button></div></div></div></div></div>";
    //Set customized list template
    private listTemplate: string = '<div class="settings e-list-wrapper e-list-multi-line e-list-avatar">' +
        '<span class="e-list-item-header">${Name}</span>' +
        '<span class="e-list-content">${content}</span>' +
        '</div>'
    //Set customized group-header template
    private grouptemplate: string = '<div class="e-list-wrapper"><span class="e-list-item-content"></span></div>';
    //Map the appropriate columns to fields property
    private listFields: object = { text: 'Name', groupBy: 'order' };
    public mailBox: Object[] = [
        { id: 1, name: 'Favorites', hasChild: true},
        { id: 2, pid: 1, name: 'Sales Reports', count: '4' },
        { id: 3, pid: 1, name: 'Sent Items'},
        { id: 4, pid: 1, name: 'Marketing Reports ', count: '6'},
        { id: 5, name: 'Andrew Fuller', hasChild: true, expanded: true },
        { id: 6, pid: 5, name: 'Inbox',  selected: true , count: '20'},
        { id: 7, pid: 5,  name: 'Drafts', count: '5'},
        { id: 15, pid: 5, name: 'Archive'},
        { id: 8, pid: 5,  name: 'Deleted Items'},
        { id: 9, pid: 5, name: 'Sent Items'},
        { id: 10, pid: 5, name: 'Sales Reports' , count: '4'},
        { id: 11, pid: 5, name: 'Marketing Reports', count: '6' },
        { id: 12, pid: 5, name: 'Outbox'},
        { id: 13, pid: 5, name: 'Junk Email'},
        { id: 14, pid: 5, name: 'RSS Feed'},
        { id: 15, pid: 5, name: 'Trash' }
    ];
    private  treeFields: object = { dataSource: this.mailBox, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    private onCreate(e: any): void {
        this.splitterInstance.element.querySelectorAll('.splitter-content')[0].appendChild(this.treeInstance.element);
        this.splitterInstance.element.querySelectorAll('.splitter-content')[1].appendChild(this.listViewObj.element);
        this.splitterInstance.element.querySelector('#createpostholder').insertBefore(this.rteObj.element, this.splitterInstance.element.querySelector('#createpostholder').childNodes[0]);
        this.splitterInstance.element.querySelector('#firstname-target').appendChild(this.textBox1.element.parentElement);
        this.splitterInstance.element.querySelector('#lastname-target').appendChild(this.textBox2.element.parentElement);
        this.splitterInstance.element.querySelector('#subject-target').appendChild(this.textBox3.element.parentElement);
    }
    public render(): JSX.Element {
        return (
            <div id="target" className="control-section outlook-style" >
            <TextBoxComponent id="firstname" ref={(textbox) => { this.textBox1 = textbox }}/>
            <TextBoxComponent id="lastname" ref={(textbox) => { this.textBox2 = textbox }}/>
            <TextBoxComponent id="subject" ref={(textbox) => { this.textBox3 = textbox }}/>
            <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }}  height = "262px">
                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
            </RichTextEditorComponent>
            <TreeViewComponent id='splitter-tree' fields= {this.treeFields} nodeTemplate = {this.nodeTemplate} ref={(tree) => { this.treeInstance = tree }}/>
            <ListViewComponent id='groupedList-split' fields = { this.listFields } className ='splitter-list' dataSource = {this.dataSource}
            cssClass = {'e-list-template'} groupTemplate = {this.grouptemplate} template = {this.listTemplate} ref={(listview) => { this.listViewObj = listview }}/>
                    <SplitterComponent id="splitter1" height="493px" width="100%" ref={(splitter) => { this.splitterInstance = splitter }} created={this.onCreate.bind(this)}>
                        <PanesDirective>
                            <PaneDirective size={this.paneSize1} min={this.minimumSize1} content={this.content1}>
                            </PaneDirective>
                            <PaneDirective size={this.paneSize2} min={this.minimumSize2} content={this.content2}>
                            </PaneDirective>
                            <PaneDirective size={this.paneSize3} min={this.minimumSize3} content={this.content3}>
                            </PaneDirective>
                        </PanesDirective>
                    </SplitterComponent>
                <div id="action-description">
                    <p>
                        This example demonstrates the splitter control that is used to design outlook-like application using multiple horizontal panes. 
                        You can resize its panes horizontally to increase dimension.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The splitter control is used to create outlook-like user interface application using multiple panes with horizontal orientation. 
                        To create outlook-style user interface, use TreeView, ListView, and RichTextEditor controls within split panes. 
                        The TreeView control is used to display mail folders at left pane and ListView to display details of mail items, and 
                        RichTextEditor to create new mail.
                    </p>
                </div>
            </div>
        );
    }
}