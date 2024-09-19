import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SidebarComponent, TreeViewComponent, ToolbarComponent, NodeSelectEventArgs, ItemsDirective, ItemDirective, ClickEventArgs } from '@syncfusion/ej2-react-navigations';
import { ListViewComponent, SelectEventArgs } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './sidebar-component.css';
export class Default extends SampleBase<{}, {}> {
    public sidebarobj: SidebarComponent;
    public listObj: ListViewComponent;
    //ListView data source initialization
    public inboxData: { [key: string]: Object }[] = [
        { id: "1", text: "Albert Lives", subject: "Business dinner invitation", message: "Hello Uta Morgan," },
        { id: "2", text: "Ila Russo", subject: "Opening for Sales Manager", message: "Hello Jelani Moreno," },
        { id: "3", text: "Garth Owen", subject: "Application for Job Title", message: "Hello Ila Russo," },
        { id: "4", text: "Ursula Patterson", subject: "Programmer Position Application", message: "Hello Kerry Best," },
        { id: "5", text: "Nichole Rivas", subject: "Annual Conference", message: "Hi Igor Mccoy," }
    ];
    public sentItemData: { [key: string]: Object }[] = [
        { id: "11", text: "Gemma Roberson", subject: "Apology for late response email", message: "Hello Colette Wooten," },
        { id: "12", text: "Ann Garza", subject: "Application for Job Title", message: "Hello Kerry Best," },
        { id: "13", text: "Alfonso Burnett", subject: "Anything I can help with", message: "Hello Otto Ashley," },
        { id: "14", text: "Rogan Espinoza", subject: "Assistant Marketing Department", message: "Hello Kerry Best," },
        { id: "15", text: "Sierra Kerr", subject: "Application for Transfer", message: "Hi Halee Lindsey," }
    ];
    public draftsData: { [key: string]: Object }[] = [
        { id: "21", text: "Chaim Barber", subject: "We launched new Product!", message: "Hello Cameran Roth," },
        { id: "22", text: "Lara Knox", subject: "Request for meeting appointment email", message: "Hello Mona Bates," },
        { id: "23", text: "Igor Mccoy", subject: "Thank you", message: "Hello Kerry Best," },
        { id: "24", text: "Patricia Boyle", subject: "Sales Team", message: "Hello Amelia Curtis," },
        { id: "25", text: "Zachery Peters", subject: "Today’s meeting schedule", message: "Hi Leslie Juarez," }
    ];
    public deleteData: { [key: string]: Object }[] = [
        { id: "31", text: "Elijah Berry", subject: "Apology marketing email", message: "Dear Kerry Best," },
        { id: "32", text: "Cameran Newman", subject: "Business appointment request", message: "Hello Mona Bates," },
        { id: "33", text: "Amity Slater", subject: "Business dinner invitation", message: "Hello Kerry Best," },
        { id: "34", text: "Leo Cooley", subject: "Apology Email for Wrong Order", message: "Hi Athena Mcintosh," },
        { id: "35", text: "Halee Lindsey", subject: "Apology for late response email", message: "Hi Fletcher Beck," }
    ];
    public outBoxData: { [key: string]: Object }[] = [
        { id: "41", text: "Willow Frye", subject: "Out of Office", message: "Hello Maggy Randall," },
        { id: "42", text: "Regan Haney", subject: "Project Manager Interview", message: "Hello Kerry Best," },
        { id: "43", text: "Stella Calderon", subject: "Proposition for a new business", message: "Hello Gail Pierce," },
        { id: "44", text: "Xanthus Harmon", subject: "Performance appraisal announcement", message: "Dear Clare Heath," },
        { id: "45", text: "Cheyenne Cline", subject: "Office Holiday", message: "Hi Fletcher Beck," }
    ];
    public treeData: { [key: string]: Object }[] = [
        { id: "1", name: "Favorites", hasChild: true, expanded: true },
        { id: "2", name: "Inbox", selected: true, pid: "1" },
        { id: "3", name: "Sent Items", pid: "1" },
        { id: "5", name: "John", hasChild: true, expanded: true },
        { id: "6", name: "Inbox", pid: "5" },
        { id: "7", name: "Drafts", pid: "5" },
        { id: "8", name: "Deleted Items", pid: "5" },
        { id: "9", name: "Sent Items", pid: "5" },
        { id: "12", name: "Outbox", pid: "5" },
    ];
    public treeFields: { [key: string]: Object } = { dataSource: this.treeData, id: "id", text: "name", selected: "selected", parentID: "pid", hasChildren: "hasChild", expanded: "expanded" };
    listTemplate(data: any): JSX.Element {
        return (
            <div className="e-list-wrapper e-list-avatar e-list-multi-line">
                <span className="e-avatar e-avatar-circle e-icon sf-icon-profile"></span>
                <span className="e-list-item-header">{data.text}</span>
                <span className="e-list-content">{data.subject}</span>
                <span className="e-list-text">{data.message}</span>
            </div>);
    }
    render() {
        //Toolbar component template element specification
        let folderEle: string = '<div class= "e-folder"><div class= "e-folder-name">Webmail</div></div>';
        let userNameEle: string = '<div><div class= "e-user-name">John</div></div>';
        let imageEle: string = '<div class= "image-container"><img height="20px" src="src/sidebar/images/user.svg" alt="John"></img></div>';
        //ListView Fields Mapping
        let fields: { [ key: string]: Object } = { id: "id", text: "text" }
        return (
            <div className="control-section" id="sidebar-wrapper">
                {/* main content declaration */}
                <div>
                    <ToolbarComponent cssClass="defaultToolbar" id="defaultToolbar" clicked={this.toolbarCliked.bind(this)}>
                        <ItemsDirective>
                            <ItemDirective prefixIcon="e-tbar-menu-icon tb-icons" tooltipText="Menu"></ItemDirective>
                            <ItemDirective template={folderEle}></ItemDirective>
                            <ItemDirective align="Right" template={userNameEle}></ItemDirective>
                            <ItemDirective cssClass="e-custom" align="Right" template={imageEle}></ItemDirective>
                        </ItemsDirective>
                    </ToolbarComponent>
                </div>
                <div className="maincontent">
                    <ListViewComponent id="listView" ref={ListView => this.listObj = ListView} template={this.listTemplate as any} cssClass="e-list-template" dataSource={this.inboxData} fields={fields} select={this.onListSelect.bind(this)} statelessTemplates={['template']}>
                    </ListViewComponent>
                </div>
                {/* end of main content declaration */}
                {/* sidebar element declaration */}
                <SidebarComponent id="defaultSidebar" ref={Sidebar => this.sidebarobj = Sidebar} className="default-sidebar" width="260px" target=".maincontent" position="Left">
                    <TreeViewComponent id="defaultTree" fields={this.treeFields} nodeSelecting={this.beforeSelect.bind(this)} nodeSelected={this.onSelect.bind(this)}>
                    </TreeViewComponent>
                </SidebarComponent>
                <div id="action-description">
                    <p>
                        The <code>Sidebar</code> sample demonstrates the default functionalities of the <code>Sidebar</code>. Click on the hamburger menu icon to expand/collapse the sidebar. Click the TreeView node to see the corresponding folder’s mail details.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The <code>Sidebar</code> is an expandable and collapsible component that typically acts as a side container to place primary or secondary content alongside the main content.
                        It provides flexible options that can be shown and hidden based on user interactions. Any type of HTML content or component can be placed in the <code>Sidebar</code> for quick access and easy navigation, like quick references, menus, lists, and tree views.
                    </p>
                    <p>
                        In this demo, the <code>Sidebar</code> is populated as like webmail with folder structure.
                    </p>
                </div>
            </div>
        );
    }
    //open / close the sidebar
    toolbarCliked(args: ClickEventArgs) {
        if(args.item.tooltipText == "Menu") {
            this.sidebarobj.toggle();
        }
    }
    beforeSelect(args: NodeSelectEventArgs) {
        if (args.nodeData.text == "Favorites" || args.nodeData.text == "John") {
            args.cancel = true;
        }
    }
    onSelect(args: NodeSelectEventArgs) {
        if (args.nodeData.text == "Inbox")
        {
            this.listObj.dataSource = this.inboxData;
        }
        else if (args.nodeData.text == "Sent Items")
        {
            this.listObj.dataSource = this.sentItemData;
        }
        else if (args.nodeData.text == "Drafts")
        {
            this.listObj.dataSource = this.draftsData;
        }
        else if (args.nodeData.text == "Deleted Items")
        {
            this.listObj.dataSource = this.deleteData;
        }
        else if (args.nodeData.text == "Outbox")
        {
            this.listObj.dataSource = this.outBoxData;
        }
        this.listObj.dataBind();
    }
    onListSelect(args: SelectEventArgs) {
        args.item.classList.remove("e-active");
    }
}
