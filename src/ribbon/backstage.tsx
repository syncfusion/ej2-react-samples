import * as React from 'react';
import { Ribbon, RibbonComponent, RibbonTabsDirective, RibbonTabDirective, RibbonCollectionsDirective, RibbonCollectionDirective, RibbonGroupsDirective, RibbonGroupDirective } from '@syncfusion/ej2-react-ribbon';
import { RibbonFileMenu, RibbonBackstage, RibbonItemsDirective, RibbonItemDirective, RibbonItemSize, RibbonGroupButtonSelection, BackstageItemModel, Inject, DisplayMode, LauncherClickEventArgs, RibbonColorPicker } from '@syncfusion/ej2-react-ribbon';
import { ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { MenuItemModel } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './backstage.css';
import * as data from './dataSource/datasource.json';

export class Backstage extends SampleBase<{}, {}> {
    private ribbonObj: Ribbon;

    public pasteOptions: ItemModel[] = [{ text: "Keep Source Format" }, { text: "Merge Format" }, { text: "Keep Text Only" }];
    public findOptions: ItemModel[] = [{ text: "Find", iconCss: "e-icons e-search" }, { text: "Advanced find", iconCss: "e-icons e-search" }, { text: "Go to", iconCss: "e-icons e-arrow-right" }];
    public selectOptions: ItemModel[] = [{ text: "Select All" }, { text: "Select Objects" }];
    public dictateOptions: ItemModel[] = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];
    public tableOptions: ItemModel[] = [{ text: "Insert Table" }, { text: "Draw Table" }, { text: "Convert Table" }, { text: "Excel Spreadsheet" }];
    public shapeOptions: ItemModel[] = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
    public headerOptions: ItemModel[] = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
    public footerOptions: ItemModel[] = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
    public pageOptions: ItemModel[] = [{ text: "Insert Top of page" }, { text: "Insert Bottom of page" }, { text: "Format Page Number" }];
    public linkOptions: ItemModel[] = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];

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
    public enablePaste() {
        if (!this.isPasteDisabled) { return; }
        this.ribbonObj.enableItem('pastebtn');
        this.isPasteDisabled = false;
    }

    public updateContent(args: string) {
        this.toastInstance.show({ content: "Last clicked item is " + args });
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

    public isBackstageOpened = false;
    public handleClickInsideBackstageContent(e: any) {
        e.stopPropagation();
        var cName: string = e.target.className;
        if (cName !== "section-title" && cName !== "home-wrapper" && cName !== "new-wrapper" && cName !== "block-wrapper" && cName !== "e-ribbon-backstage-content") {
            this.ribbonObj.ribbonBackstageModule.hideBackstage();
            this.toastInstance.show({ content: 'Backstage content is interacted and closed.' });
            this.ribbonObj.element.querySelector('.e-ribbon-backstage-content').removeEventListener('click', this.handleClickInsideBackstageContent.bind(this));
        }
    }
    

    public backstageClickHandler() {
        this.ribbonObj.ribbonBackstageModule.hideBackstage();
        this.toastInstance.show({ content: 'Print action is selected' });
    }

    public getBackstageContent(item: string): string {
        var homeContentTemplate = "<div class='home-wrapper'>{{newSection}}{{recentSection}}</div>";
        var newSection = "<div class='new-wrapper'><div class='section-title'> New </div><div class='category_container'><div class='doc_category_image'></div> <span class='doc_category_text'> New document </span></div></div>";
        var recentSection = "<div class='block-wrapper'><div class='section-title'> Recent </div>{{recentWrapper}}</div>";
        var recentWrapper = "<div class='section-content'><table><tbody><tr><td> <span class='doc_icon e-icons {{icon}}'></span> </td><td><span style='display: block; font-size: 14px'> {{title}} </span><span style='font-size: 12px'> {{description}} </span></td></tr></tbody></table></div>";
        var blockSection = "<div class='block-wrapper'> <div class='section-title'> {{blockTitle}} </div> {{blockSection}} </div>";
        var content = "";
        var recentDocUpdatedString = "";
        switch (item) {
            case 'home': {
                data['recentDocuments'].slice(0,3).forEach(function(doc) { recentDocUpdatedString += recentWrapper.replace(/{{icon}}/g, 'e-notes').replace(/{{title}}/g, doc.fileName).replace(/{{description}}/g, doc.location); });
                var updatedRecentSection = recentSection.replace(/{{recentWrapper}}/g, recentDocUpdatedString);
                content = homeContentTemplate.replace(/{{newSection}}/g, newSection).replace(/{{recentSection}}/g, updatedRecentSection);
                break;
            }
            case 'new': {
                content = newSection;
                break;
            }
            case 'open': {
                data['recentDocuments'].forEach(function(doc) { recentDocUpdatedString += recentWrapper.replace(/{{icon}}/g, 'e-notes').replace(/{{title}}/g, doc.fileName).replace(/{{description}}/g, doc.location); });
                content = recentSection.replace(/{{recentWrapper}}/g, recentDocUpdatedString);
                break;
            }
            default:
                data['dataOptions'][item].forEach(function(doc) { recentDocUpdatedString += recentWrapper.replace(/{{icon}}/g, doc.icon).replace(/{{title}}/g, doc.title).replace(/{{description}}/g, doc.description); });
                content = blockSection.replace(/{{blockSection}}/g, recentDocUpdatedString).replace(/{{blockTitle}}/g, (item.charAt(0).toUpperCase() + item.slice(1)));
                break;
        }
        return content;
    }

    public menuItems: BackstageItemModel[] = [
        { id: 'home', text: 'Home', iconCss: 'e-icons e-home', content: this.getBackstageContent('home') },
        { id: 'new', text: 'New', iconCss: 'e-icons e-file-new', content: this.getBackstageContent('new') },
        { id: 'open', text: 'Open', iconCss: 'e-icons e-folder-open', content: this.getBackstageContent('open') },
        { separator: true },
        { text: 'Info', content: this.getBackstageContent('info') },
        { text: 'Save as', content: this.getBackstageContent('save') },
        { text: 'Export', content: this.getBackstageContent('export') },
        { text: 'Print', backStageItemClick: this.backstageClickHandler.bind(this) },
        { text: 'Share', content: this.getBackstageContent('share') },
        { separator: true, isFooter: true },
        { text: 'Account', isFooter: true, content: this.getBackstageContent('account') },
        { text: 'Feedback', isFooter: true, content: this.getBackstageContent('feedback') }
    ];

    public ribbonCreated() {
        if (!this.isBackstageOpened) {
            this.ribbonObj.element.querySelector('.e-ribbon-backstage').addEventListener('click', this.backstageClick.bind(this));
        }
    }
    public backstageClick() {
        this.isBackstageOpened = true;
        this.ribbonObj.element.querySelector('.e-ribbon-backstage-content').addEventListener('click', this.handleClickInsideBackstageContent.bind(this));
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-12 control-section ribbon-backstage-section'>
                    <div className='control ribbon-sample'>
                        <div id="ribbonContainer" className='ribbon-backstage-container'>
                            <RibbonComponent id='backstage-ribbon' ref={ribbonDefault => { this.ribbonObj = ribbonDefault }} backStageMenu={{ text: 'File', visible: true, items: this.menuItems, backButton: { text: 'Close' } }} created={this.ribbonCreated} launcherIconClick={this.launchClick}>
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
                                                            <RibbonItemDirective type="ColorPicker" allowedSizes={RibbonItemSize.Small} displayOptions={DisplayMode.Simplified | DisplayMode.Classic} colorPickerSettings={{ value: '#123456', change: function (args) { this.updateContent(args.currentValue.hex + " color"); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-bold", content: "Bold", isToggle: true, clicked: function () { this.updateContent("Bold"); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-italic", content: "Italic", isToggle: true, clicked: function () { this.updateContent("Italic"); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-underline", content: "Underline", isToggle: true, clicked: function () { this.updateContent("Underline"); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-strikethrough", content: "Strikethrough", isToggle: true, clicked: function () { this.updateContent("Strikethrough"); } }}>
                                                            </RibbonItemDirective>
                                                            <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-change-case", content: "Change Case", isToggle: true, clicked: function () { this.updateContent("Change case"); } }}>
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
                                                            <RibbonItemDirective id='pictureddl' type="DropDown" dropDownSettings={{ iconCss: "e-icons e-image", content: "Pictures", target: '#default-pictureList' }}>
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
                                <Inject services={[RibbonFileMenu, RibbonColorPicker, RibbonBackstage]} />
                            </RibbonComponent>
                            <div id="default-ribbonPlaceHolder">
                                <div className="content1"></div>
                                <div className="content2"></div>
                                <div className="content3"></div>
                                <div className="content4"></div>
                                <ToastComponent id='toast' ref={toast => this.toastInstance = toast} position={{ X: 'Right' }} width='auto' height={25} timeOut={2000} cssClass='e-toast-info' showCloseButton={true} target="#default-ribbonPlaceHolder" newestOnTop={true} animation={{ show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } }} />
                            </div>
                            <ListViewComponent id='default-pictureList' dataSource={['This Device', 'Stock Images', 'Online Images']} showHeader={true} headerTitle="Insert Picture From" select={function (args) { this.updateContent("Picture -> " + args.text); }}></ListViewComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample showcases the basic ribbon backstage view.</p>
                </div>
                <div id="description">
                    <p>The Ribbon backstage is a place for handling files, settings, and document-related tasks. It simplifies user interactions with documents and app preferences, improving efficiency and organization.</p>
                </div>
            </div>
        );
    }
}
