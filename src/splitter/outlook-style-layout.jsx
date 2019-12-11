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
export class OutlookLayout extends SampleBase {
    constructor() {
        super(...arguments);
        this.dataSource = [
            { Name: 'Selma Tally', content: 'Apology marketing email', content2: 'Hello Ananya Singleton', id: '1', order: 0 },
            { Name: 'Illa Russo', content: 'Annual conference', content2: 'Hi jeani Moresa', id: '4', order: 0 },
            { Name: 'Camden Macmellon', content: 'Reference request- Camden hester', content2: 'Hello Kerry Best', order: 0 },
            { Name: 'Garth Owen', content: 'Application for job Title', content2: 'Hello Illa Russo', id: '2', order: 0 },
            { Name: 'Ursula Patterson', content: 'Programmaer Position Applicant', content2: 'Hello Kerry best', id: '2', order: 0 }
        ];
        this.data = this.dataSource;
        this.paneSize1 = "28%";
        this.minimumSize1 = "27%";
        this.paneSize2 = "33%";
        this.minimumSize2 = "23%";
        this.paneSize3 = "37%";
        this.minimumSize3 = "30%";
        //Set customized list template
        this.listTemplate = '<div class="settings e-list-wrapper e-list-multi-line e-list-avatar">' +
            '<span class="e-list-item-header">${Name}</span>' +
            '<span class="e-list-content">${content}</span>' +
            '</div>';
        //Set customized group-header template
        this.grouptemplate = '<div class="e-list-wrapper"><span class="e-list-item-content"></span></div>';
        //Map the appropriate columns to fields property
        this.listFields = { text: 'Name', groupBy: 'order' };
        this.mailBox = [
            { id: 1, name: 'Favorites', hasChild: true },
            { id: 2, pid: 1, name: 'Sales Reports', count: '4' },
            { id: 3, pid: 1, name: 'Sent Items' },
            { id: 4, pid: 1, name: 'Marketing Reports ', count: '6' },
            { id: 5, name: 'Andrew Fuller', hasChild: true, expanded: true },
            { id: 6, pid: 5, name: 'Inbox', selected: true, count: '20' },
            { id: 7, pid: 5, name: 'Drafts', count: '5' },
            { id: 15, pid: 5, name: 'Archive' },
            { id: 8, pid: 5, name: 'Deleted Items' },
            { id: 9, pid: 5, name: 'Sent Items' },
            { id: 10, pid: 5, name: 'Sales Reports', count: '4' },
            { id: 11, pid: 5, name: 'Marketing Reports', count: '6' },
            { id: 12, pid: 5, name: 'Outbox' },
            { id: 13, pid: 5, name: 'Junk Email' },
            { id: 14, pid: 5, name: 'RSS Feed' },
            { id: 15, pid: 5, name: 'Trash' }
        ];
        this.treeFields = { dataSource: this.mailBox, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    }
    nodeTemplate(data) {
        return (<div>
            <div className="treeviewdiv">
                <div className="textcontent">
                    <span className="treeName">{data.name}</span>
                </div>
                {data.count &&
            <div className="countcontainer">
                        <span className="treeCount e-badge e-badge-primary">{data.count}</span>
                    </div>}
            </div>
        </div>);
    }
    ;
    content1() {
        return (<div className='splitter-content'>
                <TreeViewComponent id='splitter-tree' fields={this.treeFields} nodeTemplate={this.nodeTemplate}/>
            </div>);
    }
    ;
    content2() {
        return (<div className='splitter-content'>
                <ListViewComponent id='groupedList-split' fields={this.listFields} className='splitter-list' dataSource={this.dataSource} cssClass={'e-list-template'} groupTemplate={this.grouptemplate} template={this.listTemplate} ref={(listview) => { this.listViewObj = listview; }}/>
            </div>);
    }
    ;
    content3() {
        return (<div>
                <div className='splitter-content'>
                    <div style={{ width: '100%', padding: '15px' }}>
                        <table>
                            <tr>
                                <td><button className='e-btn e-flat e-outline'>To...</button></td>
                                <td id='firstname-target'>
                                    <TextBoxComponent id="firstname"/>
                                </td>
                            </tr>
                            <tr>
                                <td><button className='e-btn e-flat e-outline'>Cc...</button></td>
                                <td id='lastname-target'>
                                    <TextBoxComponent id="lastname"/>
                                </td>
                            </tr>
                            <tr>
                                <td><div id='subject-text'>Subject</div></td>
                                <td id='subject-target'>
                                    <TextBoxComponent id="subject"/>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className='forum'>
                        <div id='createpostholder'>
                            <RichTextEditorComponent id="outlookRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor; }} height="262px">
                                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]}/>
                            </RichTextEditorComponent>
                            <div id='buttonSection'>
                                <button className='e-btn e-primary' id='send'>Send</button>
                                <button className='e-btn' id='discard'>Discard</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
    ;
    onSplitterResize() {
        this.rteObj.refreshUI();
    }
    render() {
        return (<div id="target" className="control-section outlook-style">
                <SplitterComponent id="splitter1" height="493px" width="100%" ref={(splitter) => { this.splitterInstance = splitter; }} resizing={this.onSplitterResize.bind(this)}>
                    <PanesDirective>
                        <PaneDirective size={this.paneSize1} min={this.minimumSize1} content={this.content1.bind(this)}>
                        </PaneDirective>
                        <PaneDirective size={this.paneSize2} min={this.minimumSize2} content={this.content2.bind(this)}>
                        </PaneDirective>
                        <PaneDirective size={this.paneSize3} min={this.minimumSize3} content={this.content3.bind(this)}>
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
            </div>);
    }
}
