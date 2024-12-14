import * as React from 'react';
import { Ribbon, RibbonComponent, RibbonTabsDirective, RibbonTabDirective, RibbonCollectionsDirective, RibbonCollectionDirective, RibbonGroupsDirective, RibbonGroupDirective, RibbonItemsDirective, RibbonItemDirective, DisplayMode } from '@syncfusion/ej2-react-ribbon';
import { RibbonFileMenu, RibbonItemSize, Inject, FileMenuEventArgs, LauncherClickEventArgs, RibbonColorPicker, RibbonGroupButtonSelection } from '@syncfusion/ej2-react-ribbon';
import { ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { FilteringEventArgs } from "@syncfusion/ej2-dropdowns";
import { Query } from "@syncfusion/ej2-data";
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { MenuItemModel } from '@syncfusion/ej2-react-navigations';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './resize.css';

export class Resize extends SampleBase<{}, {}> {

    private resizeRibbonObj: Ribbon;

    public pasteOptions: ItemModel[] = [{ text: "Keep Source Format" }, { text: "Merge Format" }, { text: "Keep Text Only" }];
    public findOptions: ItemModel[] = [{ text: "Find", iconCss: "e-icons e-search" }, { text: "Advanced Find", iconCss: "e-icons e-search" }, { text: "Go to", iconCss: "e-icons e-arrow-right" }];
    public selectOptions: ItemModel[] = [{ text: "Select All" }, { text: "Select Objects" }];
    public dictateOptions: ItemModel[] = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];
    public tableOptions: ItemModel[] = [{ text: "Insert Table" }, { text: "Draw Table" }, { text: "Convert Table" }, { text: "Excel SpreadSheet" }];
    public shapeOptions: ItemModel[] = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
    public headerOptions: ItemModel[] = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
    public footerOptions: ItemModel[] = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
    public pageOptions: ItemModel[] = [{ text: "Insert Top of page" }, { text: "Insert Bottom of page" }, { text: "Format Page Number" }];
    public linkOptions: ItemModel[] = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];

    public fontSize: string[] = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
    public fontStyle: string[] = ["Algerian", "Arial", "Calibri", "Cambria", "Cambria Math", "Courier New", "Candara", "Georgia", "Impact", "Segoe Print", "Segoe Script", "Segoe UI", "Symbol", "Times New Roman", "Verdana", "Windings"];
    public filtering(e: FilteringEventArgs) {
        let query = new Query();
        query = (e.text !== "") ? query.where("Text", "contains", e.text, true) : query;
        e.updateData(this.fontStyle, query);
    }

    public fileOptions: MenuItemModel[] = [{ text: "New", iconCss: "e-icons e-file-new", id: "new" },
    { text: "Open", iconCss: "e-icons e-folder-open", id: "Open" },
    { text: "Rename", iconCss: "e-icons e-rename", id: "rename" },
    {
        text: "Save as", iconCss: "e-icons e-save", id: "save",
        items: [
            { text: "Microsoft Word (.docx)", iconCss: "sf-icon-word", id: "newword" },
            { text: "Microsoft Word 97-2003(.doc)", iconCss: "sf-icon-word", id: "oldword" },
            { text: "Download as PDF", iconCss: "e-icons e-export-pdf", id: "pdf" }]
    }]

    toastInstance: ToastComponent;

    public updateContent(args: string) {
        this.toastInstance.show({ content: "Last clicked item is " + args });
    }

    public isPasteDisabled: boolean = true;
    public enablePaste() { 
        if (!this.isPasteDisabled) { return; }
        this.resizeRibbonObj.enableItem('resize-pastebtn');
        this.isPasteDisabled = false;
    }

    sliderRef: SliderComponent;
    public onCreated() {
        var container = document.getElementById('ribbonContainer');
        this.sliderRef.max = container.offsetWidth;
        this.sliderRef.value = container.offsetWidth;
        this.sliderRef.min = 350;
    }

    public onResize = () => {
        var container = document.getElementById('ribbonContainer');
        container.style.width = '100%';
        this.sliderRef.max = container.offsetWidth;
        this.sliderRef.value = container.offsetWidth;
    };
    componentDidMount() {
        window.addEventListener('resize', this.onResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    public onChange(args) {
        var container = document.getElementById('ribbonContainer');
        container.style.width = args.value + 'px';
        this.resizeRibbonObj.refreshLayout();
    }

    public fileSelect(args: FileMenuEventArgs){
        if(args.item.id === "newword" || args.item.id === "oldword" || args.item.id === "pdf"){
            this.updateContent("File -> Save as -> " + args.item.text);
        }
        else {
            this.updateContent("File -> " + args.item.text);
        }
      }
    
    public launchClick(args: LauncherClickEventArgs) {
        if (args.groupId == "clipboard") {
            this.updateContent("Clipboard Launcher Icon");
        }
        else if (args.groupId == "illustration") {
            this.updateContent("Illustration Launcher Icon");
        }
        else if (args.groupId == "header_footer") {
            this.updateContent("Header & Footer Launcher Icon");
        }
      }

    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-12 control-section default-ribbon-section'>
                    <div className='control ribbon-sample'>
                        <div id="ribbonContainer" className='resize-ribbon-container'>
                            <RibbonComponent id='ribbon' ref={resizeRibbon => { this.resizeRibbonObj = resizeRibbon }} enablePersistence={true} fileMenu={{ visible: true, menuItems: this.fileOptions, select: this.fileSelect }} launcherIconClick={this.launchClick}  cssClass='ribbon-resize'>
                                <RibbonTabsDirective>
                                    <RibbonTabDirective header='Home'>
                                        <RibbonGroupsDirective>
                                            <RibbonGroupDirective header="Clipboard" id="clipboard" groupIconCss="e-icons e-paste" showLauncherIcon={true}>
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="SplitButton" disabled={true} id="resize-pastebtn" allowedSizes={RibbonItemSize.Large}
                                                                splitButtonSettings={{ iconCss: "e-icons e-paste", items: this.pasteOptions, content: "Paste", select: function (args) { this.updateContent("Paste -> " + args.item.text); }, click: function () { this.updateContent("Paste"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-cut", content: "Cut", clicked: function () { this.updateContent("Cut"); this.enablePaste(); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-copy", content: "Copy", clicked: function () { this.updateContent("Copy"); this.enablePaste(); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-format-painter", content: "Format Painter", clicked: function () { this.updateContent("Format Painter") } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                            <RibbonGroupDirective header="Font" overflowHeader="More Font Options" groupIconCss="e-icons e-bold" isCollapsible={false} enableGroupOverflow={true} orientation="Row" cssClass='font-group'>
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="ComboBox" comboBoxSettings={{ dataSource: this.fontStyle, index: 3, label: 'Font Style', width: '115px', popupWidth: '150px', allowFiltering: true, filtering: this.filtering, select: function (args) { if (args.itemData) { this.updateContent("Font Style -> " + args.itemData.text); } } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="ComboBox" comboBoxSettings={{ dataSource: this.fontSize, index: 3, label: 'Font Size', width: '65px', popupWidth: '85px', select: function (args) { if (args.itemData) { this.updateContent("Font Size -> " + args.itemData.text); } } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="GroupButton" allowedSizes={RibbonItemSize.Small} groupButtonSettings={{selection: RibbonGroupButtonSelection.Multiple, header: 'Format Styles', items: [{iconCss: 'e-icons e-bold', content: 'Bold', selected: true, click: () => { this.updateContent("Bold") }}, {iconCss: 'e-icons e-italic', content: 'Italic', click: () => { this.updateContent("Italic") }}, {iconCss: 'e-icons e-underline', content: 'Underline', click: () => { this.updateContent("Underline") }}, {iconCss: 'e-icons e-strikethrough', content: 'Strikethrough', click: () => { this.updateContent("Strikethrough") }}, {iconCss: 'e-icons e-change-case', content: 'Change Case', click: () => { this.updateContent("Change Case") }}]}}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="ColorPicker" allowedSizes={RibbonItemSize.Small} displayOptions={DisplayMode.Simplified | DisplayMode.Classic} colorPickerSettings={{value: '#123456', change: function (args) { this.updateContent(args.currentValue.hex + " color"); }}}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                            <RibbonGroupDirective header="Paragraph" groupIconCss="e-icons e-align-center" orientation="Row">
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-decrease-indent", content: 'Decrease Indent', clicked: function() { this.updateContent("Decrease Indent"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-increase-indent", content: 'Increase Indent', clicked: function() { this.updateContent("Increase Indent"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-paragraph", content: 'Paragraph', clicked: function() { this.updateContent("Paragraph Mark"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="GroupButton" allowedSizes={RibbonItemSize.Small} groupButtonSettings={{selection: RibbonGroupButtonSelection.Single, header: 'Alignment', items: [{iconCss: 'e-icons e-align-left', selected: true, click: () => { this.updateContent("Align Left") }}, {iconCss: 'e-icons e-align-center', click: () => { this.updateContent("Align Center") }}, {iconCss: 'e-icons e-align-right', click: () => { this.updateContent("Align Right") }}, {iconCss: 'e-icons e-justify', click: () => { this.updateContent("Justify") }}]}}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                            <RibbonGroupDirective header="Editing" groupIconCss="e-icons e-edit" orientation="Column">
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="SplitButton" splitButtonSettings={{ iconCss: "e-icons e-search", items: this.findOptions, content: "Find", select: function (args) { this.updateContent("Find -> " + args.item.text); }, click: function () { this.updateContent("Find"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-replace", content: 'Replace', clicked: function () { this.updateContent("Replace"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="SplitButton" splitButtonSettings={{ iconCss: "e-icons e-mouse-pointer", items: this.selectOptions, content: "Select", select: function (args) { this.updateContent("Select -> " + args.item.text); }, click: function () { this.updateContent("Select"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                            <RibbonGroupDirective header="Voice" groupIconCss="sf-icon-dictate" isCollapsible={false}>
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="SplitButton" disabled={true} allowedSizes={RibbonItemSize.Large} splitButtonSettings={{ iconCss: "sf-icon-dictate", items: this.dictateOptions, content: "Dictate", select: function (args) { this.updateContent("Dictate -> " + args.item.text); }, click: function () { this.updateContent("Dictate"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                        </RibbonGroupsDirective>
                                    </RibbonTabDirective>
                                    <RibbonTabDirective header='Insert'>
                                        <RibbonGroupsDirective>
                                            <RibbonGroupDirective header="Tables" isCollapsible={false}>
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-table", items: this.tableOptions, content: "Table", select: function (args) { this.updateContent("Table -> " + args.item.text); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                            <RibbonGroupDirective header="Illustration" overflowHeader="Illustrations" id="illustration" groupIconCss="e-icons e-image" enableGroupOverflow={true} orientation="Row">
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective id='pictureddl' type="DropDown" dropDownSettings={{ iconCss: "e-icons e-image", content: "Pictures", target: '#resize-pictureList' }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "sf-icon-shapes", items: this.shapeOptions, content: "Shapes", select: function (args) { this.updateContent("Shapes -> " + args.item.text); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-3d-model", content: "3D Models", clicked: function () { this.updateContent("3D Models"); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-smart-art", content: "Smart Art", clicked: function () { this.updateContent("Smart Art"); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-chart", content: "Charts", clicked: function () { this.updateContent("Chart"); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-screenshot", content: "Screenshot", clicked: function () { this.updateContent("Screenshot"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                            <RibbonGroupDirective header="Header & Footer" id="header_footer" groupIconCss="e-icons e-table" orientation="Column" showLauncherIcon={true}>
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "e-icons e-header", items: this.headerOptions, content: "Header", select: function (args) { this.updateContent("Header -> " + args.item.text); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "e-icons e-footer", items: this.footerOptions, content: "Footer", select: function (args) { this.updateContent("Footer -> " + args.item.text); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "e-icons e-page-numbering", items: this.pageOptions, content: "Page Numbering", select: function (args) { this.updateContent("Page Numbering -> " + args.item.text); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                            <RibbonGroupDirective header="Comments" isCollapsible={false}>
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective >
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "e-icons e-comment-add", content: "New Comment", clicked: function () { this.updateContent("New Comment"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                            <RibbonGroupDirective header="Links" groupIconCss="e-icons e-link" isCollapsible={false}>
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-link", items: this.linkOptions, content: "Link", select: function (args) { this.updateContent("Link -> " + args.item.text); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                        </RibbonGroupsDirective>
                                    </RibbonTabDirective>
                                    <RibbonTabDirective header='View'>
                                        <RibbonGroupsDirective>
                                            <RibbonGroupDirective header="Views" groupIconCss='e-icons e-print' orientation='Row'>
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-read", content: "Read Mode", clicked: function () { this.updateContent("Read Mode"); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-print", content: "Print Layout", clicked: function () { this.updateContent("Print Layout"); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-web-layout", content: "Web Layout", clicked: function () { this.updateContent("Web Layout"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                            <RibbonGroupDirective header="Zoom" groupIconCss="e-icons e-zoom-to-fit" orientation="Row">
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-zoom-in", content: "Zoom in", clicked: function () { this.updateContent("Zoom in"); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-zoom-out", content: "Zoom out", clicked: function () { this.updateContent("Zoom out"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                            <RibbonGroupDirective header="Show" isCollapsible={true}>
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="CheckBox" checkBoxSettings={{ label: "Ruler", checked: false, change: function () { this.updateContent("Ruler"); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="CheckBox" checkBoxSettings={{ label: "Gridlines", checked: false, change: function () { this.updateContent("Gridlines"); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="CheckBox" checkBoxSettings={{ label: "Navigation Pane", checked: true, change: function () { this.updateContent("Navigation Pane"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                            <RibbonGroupDirective header="Dark Mode" isCollapsible={false}>
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-mode", content: "Dark Mode", clicked: function () { this.updateContent("Dark Mode"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                        </RibbonGroupsDirective>
                                    </RibbonTabDirective>
                                </RibbonTabsDirective>
                                <Inject services={[RibbonFileMenu, RibbonColorPicker]} />
                            </RibbonComponent>
                            <div id="ribbonPlaceHolder">
                                <div style={{ width: '100%', height: '40px' }}>
                                    <p className='ribbonResizeDisplayText'>Resize Ribbon</p>
                                    <div id='ribbonSlider' style={{ width: '200px', margin: '0 15px' }}>
                                        <SliderComponent id='slider' ref={slider => { this.sliderRef = slider }} min={350} change={this.onChange.bind(this)} created={this.onCreated.bind(this)} />
                                    </div>
                                </div>
                                <div className="content1"></div>
                                <div className="content2"></div>
                                <div className="content3"></div>
                                <div className="content4"></div>
                                <ToastComponent id='toast' ref={toast => this.toastInstance = toast} position={{ X: 'Right' }} height={25} width='auto' timeOut={2000} cssClass='e-toast-info' showCloseButton={true} target="#ribbonPlaceHolder" newestOnTop={true} animation={{ show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } }} />
                            </div>
                            <ListViewComponent id='resize-pictureList' dataSource={['This Device', 'Stock Images', 'Online Images']} showHeader={true} headerTitle="Insert Picture From" select={function (args) { this.updateContent("Picture -> " + args.text); }}></ListViewComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the adaptiveness of the ribbon to different screen sizes. Move the slider to resize the ribbon.</p>
                </div>
                <div id="description">
                    <p>The ribbon supports three sizes of ribbon items in classic mode: <code>Large</code>, <code>Medium</code>, and <code>Small</code>, and two sizes in simplified mode: <code>Medium</code>, and <code>Small</code>. The ribbon items switch between these sizes based on the screen size.
            In addition, the ribbon also has overflow dropdowns and horizontal scrolling to ensure all items are accessible in all screen sizes and resolutions.</p>
                </div>
            </div>
        );
    }
}
