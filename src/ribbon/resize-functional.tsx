import * as React from 'react';
import { useRef, useEffect } from 'react';
import { Ribbon, RibbonComponent, RibbonTabsDirective, RibbonTabDirective, RibbonCollectionsDirective, RibbonCollectionDirective, RibbonGroupsDirective, RibbonGroupDirective, RibbonItemsDirective, RibbonItemDirective, RibbonColorPicker, DisplayMode } from '@syncfusion/ej2-react-ribbon';
import { RibbonFileMenu, RibbonItemSize, Inject, FileMenuEventArgs, LauncherClickEventArgs } from '@syncfusion/ej2-react-ribbon';
import { ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { FilteringEventArgs } from "@syncfusion/ej2-dropdowns";
import { Query } from "@syncfusion/ej2-data";
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { MenuItemModel } from '@syncfusion/ej2-react-navigations';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { updateSampleSection } from '../common/sample-base';
import './resize.css';

function Resize() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let resizeRibbonObj: Ribbon;

    const pasteOptions: ItemModel[] = [{ text: "Keep Source Format" }, { text: "Merge format" }, { text: "Keep text only" }];
    const findOptions: ItemModel[] = [{ text: "Find", iconCss: "e-icons e-search" }, { text: "Advanced find", iconCss: "e-icons e-search" }, { text: "Go to", iconCss: "e-icons e-arrow-right" }];
    const selectOptions: ItemModel[] = [{ text: "Select All" }, { text: "Select Objects" }];
    const dictateOptions: ItemModel[] = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];
    const tableOptions: ItemModel[] = [{ text: "Insert Table" }, { text: "This device" }, { text: "Convert Table" }, { text: "Excel SpreadSheet" }];
    const shapeOptions: ItemModel[] = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
    const headerOptions: ItemModel[] = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
    const footerOptions: ItemModel[] = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
    const pageOptions: ItemModel[] = [{ text: "Insert Top of page" }, { text: "Format Page Number" }, { text: "Format Page Number" }];
    const linkOptions: ItemModel[] = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];

    const fontSize: string[] = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
    const fontStyle: string[] = ["Algerian", "Arial", "Calibri", "Cambria", "Cambria Math", "Courier New", "Candara", "Georgia", "Impact", "Segoe Print", "Segoe Script", "Segoe UI", "Symbol", "Times New Roman", "Verdana", "Windings"];
    function filtering(e: FilteringEventArgs) {
        let query = new Query();
        query = (e.text !== "") ? query.where("Text", "contains", e.text, true) : query;
        e.updateData(fontStyle, query);
    }

    const fileOptions: MenuItemModel[] = [{ text: "New", iconCss: "e-icons e-file-new", id: "new" },
    { text: "Open", iconCss: "e-icons e-folder-open", id: "Open" },
    { text: "Rename", iconCss: "e-icons e-rename", id: "rename" },
    {
        text: "Save as", iconCss: "e-icons e-save", id: "save",
        items: [
            { text: "Microsoft Word (.docx)", iconCss: "sf-icon-word", id: "newword" },
            { text: "Microsoft Word 97-2003(.doc)", iconCss: "sf-icon-word", id: "oldword" },
            { text: "Download as PDF", iconCss: "e-icons e-export-pdf", id: "pdf" }]
    }]

    let toastInstance: ToastComponent;

    let isPasteDisabled: boolean = true;
    function enablePaste() { 
        if (!isPasteDisabled) { return; }
        resizeRibbonObj.enableItem('resize-pastebtn');
        isPasteDisabled = false;
    }

    function updateContent(args) {
        toastInstance.show({ content: "Last clicked item is " + args });
    }

    const sliderRef = useRef(null);
    function onCreated() {
        var container = document.getElementById('ribbonContainer');
        var slider = sliderRef.current;
        slider.max = container.offsetWidth;
        slider.value = container.offsetWidth;
        slider.min = 350;
    }

    useEffect(() => {
        function onResize() {
            var container = document.getElementById('ribbonContainer');
            container.style.width = '100%'; 
            var slider = sliderRef.current;
            slider.max = container.offsetWidth;
            slider.value = container.offsetWidth;
        }
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    })

    function onChange(args) {
        var container = document.getElementById('ribbonContainer');
        container.style.width = args.value + 'px';
        resizeRibbonObj.refreshLayout();
    }

    function fileSelect(args: FileMenuEventArgs){
        if(args.item.id === "newword" || args.item.id === "oldword" || args.item.id === "pdf"){
            updateContent("File -> Save as -> " + args.item.text);
        }
        else {
            updateContent("File -> " + args.item.text);
        }
      }
    
    function launchClick(args: LauncherClickEventArgs) {
        if (args.groupId == "clipboard") {
            updateContent("Clipboard Launcher Icon");
        }
        else if (args.groupId == "illustration") {
            updateContent("Illustration Launcher Icon");
        }
        else if (args.groupId == "header_footer") {
            updateContent("Header & Footer Launcher Icon");
        }
    }

    return (
        <div className='control-pane'>
            <div className='col-lg-12 control-section resize-ribbon-section'>
                <div className='control ribbon-sample'>
                    <div id="ribbonContainer">
                        <RibbonComponent id='ribbon' ref={resizeRibbon => { resizeRibbonObj = resizeRibbon }} fileMenu={{ visible: true, menuItems: fileOptions, select: fileSelect }} launcherIconClick={launchClick}>
                            <RibbonTabsDirective>
                                <RibbonTabDirective header='Home'>
                                    <RibbonGroupsDirective>
                                        <RibbonGroupDirective header="Clipboard" id='clipboard' groupIconCss="e-icons e-paste" showLauncherIcon={true}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" disabled={true} id="resize-pastebtn" allowedSizes={RibbonItemSize.Large}
                                                            splitButtonSettings={{ iconCss: "e-icons e-paste", items: pasteOptions, content: "Paste", select: function (args) { updateContent("Paste -> " + args.item.text); }, click: function () { updateContent("Paste"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-cut", content: "Cut", clicked: function () { updateContent("Cut"); enablePaste(); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective >
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-copy", content: "Copy", clicked: function () { updateContent("Copy"); enablePaste(); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-format-painter", content: "Format Painter", clicked: function () { updateContent("Format Painter") } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Font" groupIconCss="e-icons e-bold" isCollapsible={false} enableGroupOverflow={true} orientation="Row" cssClass='font-group'>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="ComboBox" comboBoxSettings={{ dataSource: fontStyle, index: 3, width: '150px', allowFiltering: true, filtering: filtering, select: function (args) { updateContent("Font Style -> " + args.itemData.text); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="ComboBox" comboBoxSettings={{ dataSource: fontSize, index: 3, width: '65px', popupWidth: '85px', select: function (args) { updateContent("Font Size -> " + args.itemData.text); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="ColorPicker" allowedSizes={RibbonItemSize.Small} displayOptions={DisplayMode.Simplified | DisplayMode.Classic} colorPickerSettings={{value: '#123456', change: function (args) { updateContent(args.currentValue.hex + " color"); }}}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-bold", content: "Bold", isToggle: true, clicked: function () { updateContent("Bold"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-italic", content: "Italic", isToggle: true, clicked: function () { updateContent("Italic"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-underline", content: "Underline", isToggle: true, clicked: function () { updateContent("Underline"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-strikethrough", content: "Strikethrough", isToggle: true, clicked: function () { updateContent("Strikethrough"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-change-case", content: "Change Case", isToggle: true, clicked: function () { updateContent("Change case"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Editing" groupIconCss="e-icons e-edit" orientation="Column">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" splitButtonSettings={{ iconCss: "e-icons e-search", items: findOptions, content: "Find", select: function (args) { updateContent("Find -> " + args.item.text); }, click: function () { updateContent("Find"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-replace", content: 'Replace', clicked: function () { updateContent("Replace"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" splitButtonSettings={{ iconCss: "e-icons e-mouse-pointer", items: selectOptions, content: "Select", select: function (args) { updateContent("Select -> " + args.item.text); }, click: function () { updateContent("Select"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Voice" groupIconCss="sf-icon-dictate" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" disabled={true} allowedSizes={RibbonItemSize.Large} splitButtonSettings={{ iconCss: "sf-icon-dictate", items: dictateOptions, content: "Dictate", select: function (args) { updateContent("Dictate -> " + args.item.text); }, click: function () { updateContent("Dictate"); } }}>
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
                                                        <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-table", items: tableOptions, content: "Table", select: function (args) { updateContent("Table -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Illustration" id="illustration" groupIconCss="e-icons e-image" enableGroupOverflow={true} orientation="Row">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                    <RibbonItemDirective id='pictureddl' type="DropDown" dropDownSettings={{ iconCss: "e-icons e-image", content: "Pictures", target: '#resize-pictureList' }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "sf-icon-shapes", items: shapeOptions, content: "Shapes", select: function (args) { updateContent("Shapes -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-3d-model", content: "3D Models", clicked: function () { updateContent("3D Models"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-smart-art", content: "Smart Art", clicked: function () { updateContent("Smart Art"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-chart", content: "Charts", clicked: function () { updateContent("Chart"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-screenshot", content: "Screenshot", clicked: function () { updateContent("Screenshot"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Header & Footer" id="header_footer" groupIconCss="e-icons e-table" orientation="Column" showLauncherIcon={true}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "e-icons e-header", items: headerOptions, content: "Header", select: function (args) { updateContent("Header -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "e-icons e-footer", items: footerOptions, content: "Footer", select: function (args) { updateContent("Footer -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "e-icons e-page-numbering", items: pageOptions, content: "Page Numbering", select: function (args) { updateContent("Page Numbering -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Comments" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "e-icons e-comment-add", content: "New Comment", clicked: function () { updateContent("New Comment"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Link" groupIconCss="e-icons e-link" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-link", items: linkOptions, content: "Link", select: function (args) { updateContent("Link -> " + args.item.text); } }}>
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
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-read", content: "Read Mode", clicked: function () { updateContent("Read Mode"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-print", content: "Print Layout", clicked: function () { updateContent("Print Layout"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-web-layout", content: "Web Layout", clicked: function () { updateContent("Web Layout"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Zoom" groupIconCss="e-icons e-zoom-to-fit" orientation="Row">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-zoom-in", content: "Zoom in", clicked: function () { updateContent("Zoom in"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-zoom-out", content: "Zoom out", clicked: function () { updateContent("Zoom out"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Show" isCollapsible={true}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="CheckBox" checkBoxSettings={{ label: "Ruler", checked: false, change: function () { updateContent("Ruler"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="CheckBox" checkBoxSettings={{ label: "Gridlines", checked: false, change: function () { updateContent("Gridlines"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="CheckBox" checkBoxSettings={{ label: "Navigation Pane", checked: true, change: function () { updateContent("Navigation Pane"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Dark Mode" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-mode", content: "Dark Mode", clicked: function () { updateContent("Dark Mode"); } }}>
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
                                <h4 style={{ margin: '0 0 0 15px' }}>Resize Ribbon</h4>
                                <div id='ribbonSlider' style={{ width: '200px', margin: '0 15px' }}>
                                    <SliderComponent id='slider' ref={sliderRef} min={350} change={onChange.bind(this)} created={onCreated.bind(this)} />
                                </div>
                            </div>
                            <div className="content1"></div>
                            <div className="content2"></div>
                            <div className="content3"></div>
                            <div className="content4"></div>
                            <ToastComponent id='toast' ref={toast => toastInstance = toast} position={{ X: 'Right' }} height={25} width='auto' timeOut={2000} cssClass='e-toast-info' showCloseButton={true} target="#ribbonPlaceHolder" newestOnTop={true} animation={{ show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } }} />
                        </div>
                        <ListViewComponent id='resize-pictureList' dataSource={['This device', 'Stock Images', 'Online Images']} showHeader={true} headerTitle="Insert Picture From" select={function (args) { updateContent("Picture -> " + args.text); }}></ListViewComponent>
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
export default Resize;
