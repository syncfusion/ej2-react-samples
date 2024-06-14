import * as React from 'react';
import { Ribbon, RibbonComponent, RibbonTabsDirective, RibbonTabDirective, RibbonCollectionsDirective, RibbonCollectionDirective, RibbonGroupsDirective, RibbonGroupDirective } from '@syncfusion/ej2-react-ribbon';
import { RibbonFileMenu, RibbonItemsDirective, RibbonItemDirective, RibbonItemSize, Inject, DisplayMode, LauncherClickEventArgs, FileMenuEventArgs, RibbonColorPicker, RibbonGroupButtonSelection, RibbonGallerySettingsModel, RibbonGallery, GallerySelectEventArgs } from '@syncfusion/ej2-react-ribbon';
import { ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { MenuItemModel } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './gallery.css';

export class Gallery extends SampleBase<{}, {}> {
  private ribbonObj: Ribbon;
  public gallerySettings: RibbonGallerySettingsModel = (
    {
        select: this.gallerySelect,
        popupWidth: '544px',
        itemCount: 3,
        groups: [{
                itemWidth: '100',
                itemHeight: '40',
                header: 'Title and Headings',
                items: [
                    {
                        content: 'Heading 1',
                        cssClass: 'heading_1'
                    },
                    {
                        content: 'Heading 2',
                        cssClass: 'heading_2'
                    }, {
                        content: 'Heading 3',
                        cssClass: 'heading_3'
                    }, {
                        content: 'Heading 4',
                        cssClass: 'heading_4'
                    }, {
                        content: 'Title',
                        cssClass: 'title'
                    }, {
                        content: 'Total',
                        cssClass: 'total'
                    }
                ]
            }, {
                itemWidth: '100',
                itemHeight: '40',
                header: 'Data and Model',
                items: [
                    {
                        content: 'Calculation',
                        cssClass: 'calculation'
                    },
                    {
                        content: 'Check Cell',
                        cssClass: 'check-cell'
                    }, {
                        content: 'Hyperlink',
                        cssClass: 'hyperlink'
                    }, {
                        content: 'Input',
                        cssClass: 'input'
                    }, {
                        content: 'Linked Cell',
                        cssClass: 'linked-cell'
                    }, {
                        content: 'Note',
                        cssClass: 'note'
                    }
                ]
            }, {
                itemWidth: '100',
                itemHeight: '40',
                header: 'Good, Bad and Neutral',
                items: [{
                        content: 'Normal',
                        cssClass: 'normal'
                    }, {
                        content: 'Bad',
                        cssClass: 'bad'
                    }, {
                        content: 'Good',
                        cssClass: 'good'
                    }, {
                        content: 'Neutral',
                        cssClass: 'neutral'
                    }
                ]
            }]
    }
    );
  public pasteOptions: ItemModel[] = [{ text: "Keep Source Format" }, { text: "Merge Format" }, { text: "Keep Text Only" }];
  public tableOptions: ItemModel[] = [{ text: "Insert Table" }, { text: "Draw Table" }, { text: "Convert Table" }, { text: "Excel SpreadSheet" }];
  public shapeOptions: ItemModel[] = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
  public headerOptions: ItemModel[] = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
  public footerOptions: ItemModel[] = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
  public pageOptions: ItemModel[] = [{ text: "Insert Top of page" }, { text: "Insert Bottom of page" }, { text: "Format Page Number" }];
  public linkOptions: ItemModel[] = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];
  public dictateOptions: ItemModel[] = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];

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

  public gallerySelect(args: GallerySelectEventArgs) {
    this.updateContent("Gallery -> " + args.currentItem.content);
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
            <div className='col-lg-12 control-section ribbon-gallery-section'>
                <div className='control ribbon-sample'>
                    <div id="gallery-ribbonContainer" className='ribbon-gallery-container'>
                        <RibbonComponent id='gallery-ribbon' cssClass='ribbonGallery' ref={ribbonDefault => { this.ribbonObj = ribbonDefault }} fileMenu={{ visible: true, menuItems: this.fileOptions, select: this.fileSelect }} launcherIconClick={this.launchClick}>
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
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-cut", content: "Cut", clicked: function () { this.updateContent("Cut"); this.enablePaste();} }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-copy", content: "Copy", clicked: function () { this.updateContent("Copy"); this.enablePaste();} }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-format-painter", content: "Format Painter", clicked: function () { this.updateContent("Format Painter") } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Gallery" id='gallery' groupIconCss="e-icons e-paste" showLauncherIcon={true}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Gallery" allowedSizes={RibbonItemSize.Large}
                                                            gallerySettings={this.gallerySettings} >
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
                                                        <RibbonItemDirective id='pictureddl' type="DropDown" dropDownSettings={{ iconCss: "e-icons e-image", content: "Pictures", target: '#gallery-pictureList' }}>
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
                            <Inject services={[RibbonFileMenu, RibbonColorPicker, RibbonGallery]} />
                        </RibbonComponent>
                        <div id="gallery-ribbonPlaceHolder">
                            <div className="content1"></div>
                            <div className="content2"></div>
                            <div className="content3"></div>
                            <div className="content4"></div>
                            <ToastComponent id='toast' ref={toast => this.toastInstance = toast} position={{ X: 'Right' }}  width='auto' height={25} timeOut={2000} cssClass='e-toast-info' showCloseButton={true} target="#gallery-ribbonPlaceHolder" newestOnTop={true} animation={{ show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } }} />
                        </div>
                        <ListViewComponent id='gallery-pictureList' dataSource={['This Device', 'Stock Images', 'Online Images']} showHeader={true} headerTitle="Insert Picture From" select={function (args) { this.updateContent("Picture -> " + args.text); }}></ListViewComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample showcases the functionality of the Ribbon Gallery item.</p>
            </div>
            <div id="description">
                <p>
                    The Ribbon Gallery item enables to perform specific actions by displaying a collection of related items, including icons, content, or images.
                    In this sample, the gallery item is added to showcase a collection of items with content using <code>gallerySettings</code> property with the defined type as <code>RibbonItemType.Gallery</code>. Each collection can be grouped using <code>groups</code> property with defined group name using <code>header</code> property.
                    Each item's content is added using <code>content</code> property, and its customization using <code>itemWidth</code>, <code>itemHeight</code>, and <code>cssClass</code> properties.
                </p>
            </div>
        </div>
    );
  }
}
