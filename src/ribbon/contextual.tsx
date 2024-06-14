import * as React from 'react';
import { Ribbon, RibbonComponent, RibbonTabsDirective, RibbonTabDirective, RibbonCollectionsDirective, RibbonCollectionDirective, RibbonGroupsDirective, RibbonGroupDirective, RibbonContextualTabsDirective, RibbonContextualTabDirective, RibbonContextualTab } from '@syncfusion/ej2-react-ribbon';
import { RibbonFileMenu, RibbonItemsDirective, RibbonItemDirective, RibbonItemSize, Inject, DisplayMode, LauncherClickEventArgs, FileMenuEventArgs, RibbonColorPicker, RibbonGroupButtonSelection } from '@syncfusion/ej2-react-ribbon';
import { ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { MenuItemModel } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './contextual.css';

export class Contextual extends SampleBase<{}, {}> {
    private ribbonObj: Ribbon;
    private selectedCell: HTMLElement = null;
    private tableElement: HTMLElement = null;
    private imageElement: HTMLElement = null;
    private placeholderElement: HTMLElement = null;

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

    public tableDropdownOptions: ItemModel[] = [{ text: "Header Row" }, { text: "Banded Rows" }, { text: "Banded Columns" }];
    public borderDropdownOptions: ItemModel[] = [
      { text: 'Border Right', iconCss: 'e-icons e-border-right' },
      { text: 'Border Left', iconCss: 'e-icons e-border-left' },
      { text: 'Border Bottom', iconCss: 'e-icons e-border-bottom' },
      { text: 'Border Top', iconCss: 'e-icons e-border-top' }
    ];
    public mergeDropdownOptions: ItemModel[] = [ { text: 'Merge Cells', iconCss: 'e-icons e-merge-cells' }, { text: 'Split Cells', iconCss: 'e-icons e-split-horizontal' } ];

    public fontSize: string[] = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
    public fontStyle: string[] = ["Algerian", "Arial", "Calibri", "Cambria", "Cambria Math", "Courier New", "Candara", "Georgia", "Impact", "Segoe Print", "Segoe Script", "Segoe UI", "Symbol", "Times New Roman", "Verdana", "Windings"];

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

    public isPasteDisabled: boolean = true;

    componentDidMount(): void {
        this.tableElement.onclick = (args) => {
            this.ribbonObj.showTab('TableDesign', true);
            this.ribbonObj.showTab('TableLayout', true);
            this.ribbonObj.selectTab('TableDesign');
            this.ribbonObj.hideTab('Format', true);
            if (this.selectedCell) {
                this.selectedCell.classList.remove('e-table-selected');
            }
            (args.target as HTMLElement).classList.add('e-table-selected');
            this.selectedCell = (args.currentTarget as HTMLElement).querySelector('.e-table-selected');
            this.imageElement.classList.remove('e-image-selected');
        }
        this.imageElement.onclick = (e) => {
            e.stopPropagation();
            this.ribbonObj.showTab('Format', true);
            this.ribbonObj.selectTab('Format');
            this.ribbonObj.hideTab('TableDesign', true);
            this.ribbonObj.hideTab('TableLayout', true);
            this.updateSelectedState('Image');
        }
        this.placeholderElement.onclick = (args) => {
            if ((args.target as any).nodeName !== 'TD' && (args.target as any).nodeName !== 'IMG') {
                this.ribbonObj.hideTab('TableDesign', true);
                this.ribbonObj.hideTab('TableLayout', true);
                this.ribbonObj.hideTab('Format', true);
                this.updateSelectedState('Table');
            }
        }
    }

    public updateSelectedState = (args: string) => {
        if (this.selectedCell) {
            this.selectedCell.classList.remove('e-table-selected');
            this.selectedCell = null;
        }
        this.imageElement.classList[args === 'Image' ? 'add' : 'remove']('e-image-selected');
    }
    public enablePaste() {
        if (!this.isPasteDisabled) { return; }
        this.ribbonObj.enableItem('pastebtn');
        this.isPasteDisabled = false;
    }

    public updateContent(args: string) {
        this.toastInstance.show({ content: "Last clicked item is " + args });
    }

    public fileSelect(args: FileMenuEventArgs) {
        if (args.item.id === "newword" || args.item.id === "oldword" || args.item.id === "pdf") {
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
                <div className='col-lg-12 control-section contextual-tab'>
                    <div id="ribbonContainer">
                        <RibbonComponent id='ribbon' ref={ribbon => { this.ribbonObj = ribbon }} enablePersistence={true} fileMenu={{ visible: true, menuItems: this.fileOptions, select: this.fileSelect }} launcherIconClick={this.launchClick}>
                            <RibbonTabsDirective>
                                <RibbonTabDirective header='Home'>
                                    <RibbonGroupsDirective>
                                        <RibbonGroupDirective header="Clipboard" id='clipboard' groupIconCss="e-icons e-paste" showLauncherIcon={true}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" disabled={true} id="pastebtn" allowedSizes={RibbonItemSize.Large}
                                                            splitButtonSettings={{ iconCss: "e-icons e-paste", items: this.pasteOptions, content: "Paste", select: function (args) { this.updateContent("Paste -> " + args.item.text); }, click: function () { this.updateContent("Paste"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-cut", content: "Cut", clicked: function () { this.updateContent("Cut"); this.enablePaste(); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-copy", content: "Copy", clicked: function () { this.updateContent("Copy"); this.enablePaste(); } }}>
                                                        </RibbonItemDirective>
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
                                                        <RibbonItemDirective type="ComboBox" comboBoxSettings={{ dataSource: this.fontStyle, index: 3, label: 'Font Style', width: '115px', popupWidth: '150px', allowFiltering: true, change: function (args) { if (args.itemData) { this.updateContent("Font Style -> " + args.itemData.text); } } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="ComboBox" comboBoxSettings={{ dataSource: this.fontSize, index: 3, label: 'Font Size', width: '65px', popupWidth: '85px', allowFiltering: true, change: function (args) { if (args.itemData) { this.updateContent("Font Size -> " + args.itemData.text); } } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="GroupButton" allowedSizes={RibbonItemSize.Small} groupButtonSettings={{ selection: RibbonGroupButtonSelection.Multiple, header: 'Format Styles', items: [{ iconCss: 'e-icons e-bold', content: 'Bold', selected: true, click: () => { this.updateContent("Bold") } }, { iconCss: 'e-icons e-italic', content: 'Italic', click: () => { this.updateContent("Italic") } }, { iconCss: 'e-icons e-underline', content: 'Underline', click: () => { this.updateContent("Underline") } }, { iconCss: 'e-icons e-strikethrough', content: 'Strikethrough', click: () => { this.updateContent("Strikethrough") } }, { iconCss: 'e-icons e-change-case', content: 'Change Case', click: () => { this.updateContent("Change Case") } }] }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="ColorPicker" allowedSizes={RibbonItemSize.Small} displayOptions={DisplayMode.Simplified | DisplayMode.Classic} colorPickerSettings={{ value: '#123456', change: function (args) { this.updateContent(args.currentValue.hex + " color"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Paragraph" groupIconCss="e-icons e-align-center" orientation="Row">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-decrease-indent", content: 'Decrease Indent', clicked: function () { this.updateContent("Decrease Indent"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-increase-indent", content: 'Increase Indent', clicked: function () { this.updateContent("Increase Indent"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-paragraph", content: 'Paragraph', clicked: function () { this.updateContent("Paragraph Mark"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="GroupButton" allowedSizes={RibbonItemSize.Small} groupButtonSettings={{ selection: RibbonGroupButtonSelection.Single, header: 'Alignment', items: [{ iconCss: 'e-icons e-align-left', selected: true, click: () => { this.updateContent("Align Left") } }, { iconCss: 'e-icons e-align-center', click: () => { this.updateContent("Align Center") } }, { iconCss: 'e-icons e-align-right', click: () => { this.updateContent("Align Right") } }, { iconCss: 'e-icons e-justify', click: () => { this.updateContent("Justify") } }] }}>
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
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-replace", content: 'Replace', clicked: function () { this.updateContent("Replace"); } }}>
                                                        </RibbonItemDirective>
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
                                                        <RibbonItemDirective type="SplitButton" allowedSizes={RibbonItemSize.Large} splitButtonSettings={{ iconCss: "sf-icon-dictate", items: this.dictateOptions, content: "Dictate", select: function (args) { this.updateContent("Dictate -> " + args.item.text); }, click: function () { this.updateContent("Dictate"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Editor" groupIconCss="sf-icon-editor" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "sf-icon-editor", content: "Editor", clicked: function () { this.updateContent("Editor"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Reuse Files" groupIconCss="sf-icon-reuse" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" disabled={true} allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "sf-icon-reuse", content: "Reuse Files", clicked: function () { this.updateContent("Reuse Files"); } }}>
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
                                                        <RibbonItemDirective id='pictureddl' type="DropDown" dropDownSettings={{ iconCss: "e-icons e-image", content: "Pictures", target: '#pictureList' }}>
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
                                                <RibbonCollectionDirective>
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
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-mode", content: "Dark Mode", clicked: function () { this.this.updateContent("Dark Mode"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                    </RibbonGroupsDirective>
                                </RibbonTabDirective>
                            </RibbonTabsDirective>
                            {/* Contextual tab starts */}
                            <RibbonContextualTabsDirective>
                                <RibbonContextualTabDirective visible={true}>
                                    <RibbonTabsDirective>
                                        <RibbonTabDirective id="TableDesign" header='Table Design'>
                                            <RibbonGroupsDirective>
                                                <RibbonGroupDirective header="Table Style" groupIconCss="e-icons e-field-settings">
                                                    <RibbonCollectionsDirective>
                                                        <RibbonCollectionDirective>
                                                            <RibbonItemsDirective>
                                                                <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-field-settings", content: "Table Style", items: this.tableDropdownOptions, select: function(args) { this.updateContent("Table Style -> " + args.item.text); } }}>
                                                                </RibbonItemDirective>
                                                            </RibbonItemsDirective>
                                                        </RibbonCollectionDirective>
                                                    </RibbonCollectionsDirective>
                                                </RibbonGroupDirective>
                                                <RibbonGroupDirective header="Borders Style" groupIconCss="e-icons e-field-settings">
                                                    <RibbonCollectionsDirective>
                                                        <RibbonCollectionDirective>
                                                            <RibbonItemsDirective>
                                                                <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-border-all", content: "Borders", items: this.borderDropdownOptions, select: function(args) { this.updateContent("Borders -> " + args.item.text); } }}>
                                                                </RibbonItemDirective>
                                                            </RibbonItemsDirective>
                                                        </RibbonCollectionDirective>
                                                    </RibbonCollectionsDirective>
                                                </RibbonGroupDirective>
                                            </RibbonGroupsDirective>
                                        </RibbonTabDirective>

                                        <RibbonTabDirective id="TableLayout" header='Table Layout'>
                                            <RibbonGroupsDirective>
                                                <RibbonGroupDirective header="Data" groupIconCss="e-icons e-custom-sort">
                                                    <RibbonCollectionsDirective>
                                                        <RibbonCollectionDirective>
                                                            <RibbonItemsDirective>
                                                                <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "e-icons e-sort-ascending", content: "Sort Table Ascending", clicked: function() { this.updateContent("Sort Table Ascending"); } }}>
                                                                </RibbonItemDirective>
                                                            </RibbonItemsDirective>
                                                        </RibbonCollectionDirective>
                                                        <RibbonCollectionDirective>
                                                            <RibbonItemsDirective>
                                                                <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "e-icons e-sort-descending", content: "Sort Table Descending", clicked: function() { this.updateContent("Sort Table Descending"); } }}>
                                                                </RibbonItemDirective>
                                                            </RibbonItemsDirective>
                                                        </RibbonCollectionDirective>
                                                    </RibbonCollectionsDirective>
                                                </RibbonGroupDirective>
                                                <RibbonGroupDirective header="Merge" groupIconCss="e-icons e-merge-cells">
                                                    <RibbonCollectionsDirective>
                                                        <RibbonCollectionDirective>
                                                            <RibbonItemsDirective>
                                                                <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-merge-cells", content: "Merge", items: this.mergeDropdownOptions, select: function(args) { this.updateContent("Merge -> " + args.item.text); } }}>
                                                                </RibbonItemDirective>
                                                            </RibbonItemsDirective>
                                                        </RibbonCollectionDirective>
                                                    </RibbonCollectionsDirective>
                                                </RibbonGroupDirective>
                                            </RibbonGroupsDirective>
                                        </RibbonTabDirective>
                                    </RibbonTabsDirective>
                                </RibbonContextualTabDirective>
                                <RibbonContextualTabDirective visible={false}>
                                    <RibbonTabsDirective>
                                        <RibbonTabDirective id="Format" header='Picture Format'>
                                            <RibbonGroupsDirective>
                                                <RibbonGroupDirective header="Background" groupIconCss="e-icons e-image">
                                                    <RibbonCollectionsDirective>
                                                        <RibbonCollectionDirective>
                                                            <RibbonItemsDirective>
                                                                <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "e-icons e-image", content: "Remove Background", clicked: function() { this.updateContent("Remove Background"); } }}>
                                                                </RibbonItemDirective>
                                                            </RibbonItemsDirective>
                                                        </RibbonCollectionDirective>
                                                    </RibbonCollectionsDirective>
                                                </RibbonGroupDirective>
                                            </RibbonGroupsDirective>
                                        </RibbonTabDirective>
                                    </RibbonTabsDirective>
                                </RibbonContextualTabDirective>
                            </RibbonContextualTabsDirective>
                            {/* Contextual tab ends */}                            
                            <Inject services={[RibbonFileMenu, RibbonColorPicker, RibbonContextualTab]} />
                        </RibbonComponent>
                        <div id="contextual-ribbonPlaceHolder" ref={holder => { this.placeholderElement = holder }}>
                            <div className="content-wrap">
                                <div className="table-content" style={{ backgroundColor: "white" }}>
                                    <table border={1} className="ribbon-table">
                                        <caption className="table-header">Click on the table or image to show contextual tabs.</caption>
                                        <tbody className="table-body" ref={table => { this.tableElement = table }}>
                                            <tr id="tableRow1">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr id="tableRow2">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr id="tableRow3">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <img id="ribbonImage" ref={image => { this.imageElement = image }} className="ribbon-image" src="src/ribbon/images/empire-state-building.png" alt="image" />
                                </div>
                            </div>
                            <ToastComponent id='toast' ref={toast => this.toastInstance = toast} position={{ X: 'Right' }} width='auto' height={25} timeOut={2000} cssClass='e-toast-info' showCloseButton={true} target="#contextual-ribbonPlaceHolder" newestOnTop={true} animation={{ show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } }} />
                        </div>
                        <ListViewComponent id='pictureList' dataSource={['This Device', 'Stock Images', 'Online Images']} showHeader={true} headerTitle="Insert Picture From" select={function (args) { this.updateContent("Picture -> " + args.text); }}></ListViewComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample showcases the contextual tabs support in the ribbon.</p>
                </div>
                <div id="description">
                    <p> The Ribbon contextual tabs enable users to display the ribbon tabs on demand based on specific actions or needs. It supports adding all built-in and custom ribbon items, similar to the normal ribbon tab. This example demonstrates adding the contextual tabs using the <code>contextualTabs</code> property and showing the contextual tabs in the initial load using the <code>visible</code> property. </p>
                </div>
            </div>
        );
    }
}
