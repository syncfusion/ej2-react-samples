import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TabComponent, TreeViewComponent, TabItemDirective, TabItemsDirective, DragEventArgs, DragAndDropEventArgs } from '@syncfusion/ej2-react-navigations';
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import { Category, ChartComponent, DataLabel, LineSeries, Legend, Tooltip, SeriesCollectionDirective, SeriesDirective } from '@syncfusion/ej2-react-charts';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DatePickerComponent, CalendarComponent } from '@syncfusion/ej2-react-calendars';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { HtmlEditor, Image, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { SampleBase } from '../common/sample-base';
import './tab.component.css';

export class Dragdrop extends SampleBase<{}, {}> {
    public tabObj: TabComponent;
    public treeObj: TreeViewComponent;
    public data: { [key: string]: Object }[] = [
        { text: "DropDown List", id: "list-01" },
        { text: "DatePicker", id: "list-02" },
        { text: "Calendar", id: "list-03" },
        { text: "File Upload", id: "list-04" },
        { text: "Rich Text Editor", id: "list-05" }
    ];
    public allowDragAndDrop: boolean = true;
    public field: Object = { dataSource: this.data, id: 'id', text: 'text' };
    public draggedItemHeader: string | HTMLElement;
    public i: number = 0;

    public onTabCreate(): void {
        let tabElement = document.getElementById("draggableTab");
        if (!isNullOrUndefined(tabElement)) {
            tabElement.querySelector(".e-tab-header").classList.add("e-droppable");
            tabElement.querySelector(".e-content").classList.add("tab-content");
        }
    }

    public onTabDragStart(args: DragEventArgs): void {
        this.draggedItemHeader = this.tabObj.items[args.index].header.text;
    }

    public onDraggedTab(args: DragEventArgs) {
        let dragTabIndex = Array.prototype.indexOf.call(this.tabObj.element.querySelectorAll('.e-toolbar-item'), args.draggedItem);
        let dropNode = args.target.closest("#ListView .e-list-item");
        if (dropNode != null && !args.target.closest("#draggableTab .e-toolbar-item") && this.tabObj.items.length > 1) {
            args.cancel = true;
            let dropContainer = (document.querySelector('.treeview-external-drag-tab')).querySelectorAll('.e-list-item');
            let dropIndex = Array.prototype.indexOf.call(dropContainer, dropNode);
            let newNode = [{ id: "list" + this.i, text: this.draggedItemHeader }];
            this.tabObj.removeTab(dragTabIndex);
            this.treeObj.addNodes(newNode, "Treeview", dropIndex);
        }
    }

    public onNodeDragStop(args: DragAndDropEventArgs) {
        let dropElement: any = args.target.closest("#draggableTab .e-toolbar-item");
        if (dropElement != null) {
            let tabElement = document.querySelector("#draggableTab");
            let itemPosition = (((args.event.type.indexOf('touch') > -1) ? args.event.changedTouches[0].clientX
                : args.event.clientX) < dropElement.getBoundingClientRect().left + dropElement.offsetWidth / 2) ? 0 : 1;
            let dropItemIndex = [].slice.call(tabElement.querySelectorAll(".e-toolbar-item")).indexOf(dropElement) + itemPosition;
            let tabContent;
            switch (args.draggedNodeData.text) {
                case "DropDown List":
                    tabContent = this.DropDownList;
                    break;
                case "DatePicker":
                    tabContent = this.DatePicker;
                    break;
                case "Calendar":
                    tabContent = this.Calendar;
                    break;
                case "File Upload":
                    tabContent = this.Uploader;
                    break;
                case "Rich Text Editor":
                    tabContent = this.RichTextEditor;
                    break;
                case "Grid":
                    tabContent = this.Grid;
                    break;
                case "Schedule":
                    tabContent = this.Schedule;
                    break;
                case "Chart":
                    tabContent = this.Chart;
                    break;
                default:
                    break;
            }
            let newTabItem = [{ header: { text: args.draggedNodeData.text.toString() }, content: tabContent }];
            this.tabObj.addTab(newTabItem, dropItemIndex);
            this.treeObj.removeNodes([args.draggedNode]);
        }
        args.cancel = true;
    }

    public onNodeDrag(args: DragAndDropEventArgs) {
        if (!isNullOrUndefined(args.target.closest(".tab-content"))) {
            args.dropIndicator = "e-no-drop";
        } else if (!isNullOrUndefined(args.target.closest("#draggableTab .e-tab-header"))) {
            args.dropIndicator = "e-drop-in";
        }
    }

    public Grid() {
        let gridData = [
            {
                OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
                ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
                ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38, Verified: !0
            },
            {
                OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, OrderDate: new Date(836505e6),
                ShipName: 'Toms Spezialitäten', ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',
                ShipRegion: 'CJ', ShipPostalCode: '44087', ShipCountry: 'Germany', Freight: 11.61, Verified: !1
            },
            {
                OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4, OrderDate: new Date(8367642e5),
                ShipName: 'Hanari Carnes', ShipCity: 'Rio de Janeiro', ShipAddress: 'Rua do Paço, 67',
                ShipRegion: 'RJ', ShipPostalCode: '05454-876', ShipCountry: 'Brazil', Freight: 65.83, Verified: !0
            },
            {
                OrderID: 10251, CustomerID: 'VICTE', EmployeeID: 3, OrderDate: new Date(8367642e5),
                ShipName: 'Victuailles en stock', ShipCity: 'Lyon', ShipAddress: '2, rue du Commerce',
                ShipRegion: 'CJ', ShipPostalCode: '69004', ShipCountry: 'France', Freight: 41.34, Verified: !0
            },
            {
                OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 2, OrderDate: new Date(8368506e5),
                ShipName: 'Suprêmes délices', ShipCity: 'Charleroi', ShipAddress: 'Boulevard Tirou, 255',
                ShipRegion: 'CJ', ShipPostalCode: 'B-6000', ShipCountry: 'Belgium', Freight: 51.3, Verified: !0
            }
        ];
        return (
            <GridComponent dataSource={gridData}>
                <ColumnsDirective>
                    <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign="Right" type="number" />
                    <ColumnDirective field='CustomerID' headerText='Customer ID' width='140' type="string" />
                    <ColumnDirective field="Freight" headerText="Freight" width="120" textAlign="Right" format="C" />
                    <ColumnDirective field="OrderDate" headerText="Order Date" width="140" format="yMd" />
                </ColumnsDirective>
            </GridComponent>);
    }

    public Chart() {
        let chartData = [
            { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
            { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
            { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
            { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
            { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
            { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
        ];
        return (
            <ChartComponent height='300px' primaryXAxis={{ valueType: 'Category' }}>
                <SeriesCollectionDirective>
                    <SeriesDirective dataSource={chartData} xName='month' yName='sales' type='Line'> </SeriesDirective>
                </SeriesCollectionDirective>
                <Inject services={[LineSeries, Legend, Tooltip, DataLabel, Category]} />
            </ChartComponent>);
    }

    public Schedule() {
        let dataManger = new DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/Schedule',
            adaptor: new ODataV4Adaptor,
            crossDomain: true
        });
        return (<ScheduleComponent height='500px' selectedDate={new Date(2020, 9, 20)}
            eventSettings={{ dataSource: dataManger }} readonly={true}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>);
    }

    public DropDownList() {
        let sportsData = ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'];
        return (<DropDownListComponent width='200px' dataSource={sportsData} placeholder='Select a game' />);
    }

    public DatePicker() {
        return (<DatePickerComponent width='200px' placeholder='Enter date' />);
    }

    public Calendar() {
        return (<CalendarComponent />);
    }

    public Uploader() {
        return (<UploaderComponent autoUpload={false} />);
    }

    public RichTextEditor() {
        return (<RichTextEditorComponent height='340px'>
            <p>The Rich Text Editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands.</p>

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
            </ul>
            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
        </RichTextEditorComponent>);
    }

    render() {
        let headerText = [{ text: "Grid" }, { text: "Chart" }, { text: "Schedule" }];

        return (
            <div className='control-pane'>
                <div className='control-section tab-control-section row'>
                    <div id="TabContainer">
                        <div className="col-lg-4" style={{ marginTop: '10px' }}>
                            <div className='property-panel-header'>List of Components</div>
                            <TreeViewComponent id="ListView" ref={(treeview) => { this.treeObj = treeview }} dragArea="#TabContainer" cssClass="treeview-external-drag-tab" fields={this.field} nodeDragStop={this.onNodeDragStop.bind(this)} nodeDragging={this.onNodeDrag.bind(this)} allowDragAndDrop={this.allowDragAndDrop} />
                        </div>
                        <div className="col-lg-8 content-wrapper control-section">
                            <TabComponent id="draggableTab" ref={(tab) => { this.tabObj = tab }} created={this.onTabCreate.bind(this)} dragArea="#TabContainer" onDragStart={this.onTabDragStart.bind(this)} dragged={this.onDraggedTab.bind(this)} allowDragAndDrop={this.allowDragAndDrop} >
                                <TabItemsDirective>
                                    <TabItemDirective header={headerText[0]} content={this.Grid} />
                                    <TabItemDirective header={headerText[1]} content={this.Chart} />
                                    <TabItemDirective header={headerText[2]} content={this.Schedule} />
                                </TabItemsDirective>
                            </TabComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This example illustrates how to reorder tabs and add tabs from an external source(list of components) by drag and drop. Here, you can drag and drop the items from TreeView into Tab.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, the <code>allowDragAndDrop</code> property is used to enable drag and drop and the <code>dragArea</code> property is used to define the draggable area.
                    </p>
                    <p>
                        In this example, the list of components is rendered using the <code>treeview</code> component. We can drag the item from the treeview component to the tab component by using the <code>nodeDragStop</code> event of the treeview component and add the same item with the help of the <code>addTab</code> public method of Tab and remove this item from the treeview by using the <code>removeNodes</code> method.
                    </p>
                    <p>
                        In the same way, we can drag the tab item within the tab component and also add the tab item to the treeview component. Here, we can drop the tab item in the treeview component by using the <code>dragged</code> event of the tab component. In this case, we can remove the dropped item from tab with the help of the <code>removeTab</code> public method and add the item to the treeview in its <code>addNodes</code> public method.
                    </p>
                </div>
            </div>
        );
    }
}