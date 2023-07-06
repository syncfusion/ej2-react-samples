import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SidebarComponent, ToolbarComponent, ItemsDirective, ItemDirective, ClickEventArgs } from '@syncfusion/ej2-react-navigations';
import { updateSampleSection } from '../common/sample-base';
import './dock.css';
function Dock() {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let dockBar = useRef<SidebarComponent>(null);
    //Toolbar component template element specification
    let folderEle: string = '<div class= "e-folder"><div class= "e-folder-name">React Documentation</div></div>';
    let ListData: { [key: string]: Object }[] = [
        { id: "1", text: "Grid", iconcss: "sb-icons icon-grid e-sb-icon control-icon", 
            description: "The React DataGrid is a feature-rich component useful for" +
            "displaying data in a tabular format. Its wide range of functionalities" + 
            "includes data binding, editing, Excel-like filtering, custom sorting," +
            "aggregating rows, selection, and support for Excel, CSV, and PDF formats." +
            "It loads millions of records in just a second. It has flexible editing and intuitive record selection modes." + 
            "Also, it has seamless data exporting options like PDF, CSV, and Excel." },
        { id: "2", text: "Chart", iconcss: "sb-icons icon-chart e-sb-icon control-icon", 
            description: "The React Charts is a well-crafted charting component to visualize data." + 
            "It contains a rich UI gallery of 30+ charts and graphs, ranging from line to financial" + 
            " that cater to all charting scenarios. Its high performance helps to render large amounts of data quickly." + 
            "It also comes with features such as zooming, panning, tooltip, crosshair, trackball, highlight, and selection" },
        { id: "3", text: "Datepicker", iconcss: "sb-icons icon-datepicker e-sb-icon control-icon", 
            description: "The React DatePicker is a lightweight and mobile-friendly component that allows" +
            "end-users to enter or select a date value. It has month, year, and decade view options to quickly" +
            "navigate to the desired date. It supports minimum dates, maximum dates, and disabled dates to restrict the date selection." +
            "It has built-in features such as validation, custom date formats, range restriction, and disable dates to enhance the progressive usage." },
        { id: "4", text: "Dialog", iconcss: "sb-icons icon-dialog e-sb-icon control-icon",
            description: "The React Dialog is a useful user interface (UI) component for informing users" +
            "about critical information, errors, warnings, and questions, as well as confirming decisions and collecting" +
            "input from users. The component has a rich set of built-in features such as action buttons, positioning, animations," + 
            "dragging, resizing, templating, and more with mobile dialog support. The React dialog provides two different types:" +
            "modal dialogs and non-modal dialogs (modeless) based on interactions." },
        { id: "5", text: "Dropdown List", iconcss: "sb-icons icon-dropdownlist e-sb-icon control-icon", 
            description: "The React Dropdown List is a quick replacement of the HTML select tags." +
            "It has a rich appearance and allows users to select a single value that is non-editable" +
            " from a list of predefined values. It has several out-of-the-box features, such as data binding," +
            " filtering, grouping, UI customization, accessibility, and preselected values." }
    ];

    const [description, setDescription] = useState(ListData[0].description.toString());
    let listFields: { [key: string]: Object } = { id: "id", text: "text", iconCss: "iconcss" };

    const toolbarCliked = (args: ClickEventArgs) => {
        if(args.item.tooltipText == "Menu") {
            dockBar.current.toggle();
        }
    }
    const onSelect = (args: any) => {
        setDescription(args.data.description);
    }
    return(
        <div className="control-section" id="dock-wrapper">
            {/* main content declaration */}
            <div>
                <ToolbarComponent cssClass="dockToolbar" id="dockToolbar" clicked={toolbarCliked.bind(this)}>
                    <ItemsDirective>
                        <ItemDirective prefixIcon="e-tbar-menu-icon tb-icons" tooltipText="Menu"></ItemDirective>
                        <ItemDirective template={folderEle}></ItemDirective>
                    </ItemsDirective>
                </ToolbarComponent>
            </div>
            <div id="main-content container-fluid col-md-12" className="dockmaincontent">
                <div>
                    <div id="dockContent" className="dockContent">{description}</div>
                </div>
            </div>
            {/* sidebar component */}
            <SidebarComponent id="dockSidebar" ref={dockBar} className="dockSidebar" width="220px" dockSize="60px" target=".dockmaincontent" enableDock={true} type="Auto">
                <ListViewComponent id="dockList" dataSource={ListData} cssClass="e-template-list" showIcon={true} fields={listFields} select={onSelect.bind(this)}></ListViewComponent>
            </SidebarComponent>
            <div id="action-description">
                <p>
                    The <code>Sidebar</code> dock sample demonstrates the dock functionalities of the <code>Sidebar</code>. Click on the hamburger menu icon to expand/collapse the sidebar with dock state.
                </p>
            </div>
            <div id="description">
                <p>
                    Dock state of the Sidebar reserves some space on the page that always remains in a visible state when the Sidebar is collapsed. It is used to show the short term of a content like icons alone instead of lengthy text.
                </p>
                <p>
                    In this demo, the list item has an icon with text representation. On dock state, only the icon listed out to interact. It can be achieved by using the <code>EnableDock</code> property.
                </p>
            </div>
        </div>
    );
        
    
}
export default Dock;