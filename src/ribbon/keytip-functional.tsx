import * as React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { RibbonComponent, RibbonTabsDirective, RibbonTabDirective, RibbonCollectionsDirective, RibbonCollectionDirective, RibbonGroupsDirective, RibbonGroupDirective, RibbonItemsDirective, RibbonItemDirective, RibbonColorPicker, DisplayMode } from '@syncfusion/ej2-react-ribbon';
import { RibbonFileMenu, RibbonBackstage, RibbonKeyTip, RibbonItemSize, RibbonGroupButtonSelection, BackstageItemModel, Inject, LauncherClickEventArgs } from '@syncfusion/ej2-react-ribbon';
import { ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { updateSampleSection } from '../common/sample-base';
import './keytip.css';
import * as data from './dataSource/datasource.json';

const KeyTip = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    let ribbonObj = useRef<RibbonComponent>(null);

    const pasteOptions: ItemModel[] = [{ text: "Keep Source Format" }, { text: "Merge Format" }, { text: "Keep Text Only" }];
    const findOptions: ItemModel[] = [{ text: "Find", iconCss: "e-icons e-search" }, { text: "Advanced find", iconCss: "e-icons e-search" }, { text: "Go to", iconCss: "e-icons e-arrow-right" }];
    const selectOptions: ItemModel[] = [{ text: "Select All" }, { text: "Select Objects" }];
    const dictateOptions: ItemModel[] = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];
    const tableOptions: ItemModel[] = [{ text: "Insert Table" }, { text: "Draw Table" }, { text: "Convert Table" }, { text: "Excel Spreadsheet" }];
    const shapeOptions: ItemModel[] = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
    const headerOptions: ItemModel[] = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
    const footerOptions: ItemModel[] = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
    const pageOptions: ItemModel[] = [{ text: "Insert Top of page" }, { text: "Insert Bottom of page" }, { text: "Format Page Number" }];
    const linkOptions: ItemModel[] = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];

    const fontSize: string[] = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
    const fontStyle: string[] = ["Algerian", "Arial", "Calibri", "Cambria", "Cambria Math", "Courier New", "Candara", "Georgia", "Impact", "Segoe Print", "Segoe Script", "Segoe UI", "Symbol", "Times New Roman", "Verdana", "Windings"];

    let toastInstance = useRef<ToastComponent>(null);

    let isPasteDisabled: boolean = true;
    const enablePaste = () => {
        if (!isPasteDisabled) { return; }
        ribbonObj.current.enableItem('pastebtn');
        isPasteDisabled = false;
    }

    const updateContent = (args) => {
        toastInstance.current.show({ content: "Last clicked item is " + args });
    }

    const launchClick = (args: LauncherClickEventArgs) => {
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

    const getBackstageContent = (item: string): string => {
        var homeContentTemplate = "<div class='home-wrapper'>{{newSection}}{{recentSection}}</div>";
        var newSection = "<div class='new-wrapper'><div class='section-title'> New </div><div class='category_container'><div class='doc_category_image'></div> <span class='doc_category_text'> New document </span></div></div>";
        var recentSection = "<div class='block-wrapper'><div class='section-title'> Recent </div>{{recentWrapper}}</div>";
        var recentWrapper = "<div class='section-content'><table><tbody><tr><td> <span class='doc_icon e-icons {{icon}}'></span> </td><td><span style='display: block; font-size: 14px'> {{title}} </span><span style='font-size: 12px'> {{description}} </span></td></tr></tbody></table></div>";
        var blockSection = "<div class='block-wrapper'> <div class='section-title'> {{blockTitle}} </div> {{blockSection}} </div>";
        var content = "";
        var recentDocUpdatedString = "";
        switch (item) {
            case 'home': {
                data['recentDocuments'].slice(0,4).forEach(function(doc) { recentDocUpdatedString += recentWrapper.replace(/{{icon}}/g, 'e-notes').replace(/{{title}}/g, doc.fileName).replace(/{{description}}/g, doc.location); });
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

    let isBackstageOpened = false;
    const handleClickInsideBackstageContent = (e: any) => {
        e.stopPropagation();
        var cName: string = e.target.className;
        if (cName !== "section-title" && cName !== "home-wrapper" && cName !== "new-wrapper" && cName !== "block-wrapper" && cName !== "e-ribbon-backstage-content") {
            ribbonObj.current.ribbonBackstageModule.hideBackstage();
            toastInstance.current.show({ content: 'Backstage content is interacted and closed.' });
            ribbonObj.current.element.querySelector('.e-ribbon-backstage-content').removeEventListener('click', handleClickInsideBackstageContent);
        }
    }
    
    const ribbonCreated = () => {
        if (!isBackstageOpened) {
            ribbonObj.current.element.querySelector('.e-ribbon-backstage').addEventListener('click', () => {
                isBackstageOpened = true;
                ribbonObj.current.element.querySelector('.e-ribbon-backstage-content').addEventListener('click', handleClickInsideBackstageContent);
            });
        }
        ribbonObj.current.ribbonKeyTipModule.showKeyTips();
    }

    const backstageClickHandler = () => {
        ribbonObj.current.ribbonBackstageModule.hideBackstage();
        toastInstance.current.show({ content: 'Print action is selected' });
    }

    const menuItems: BackstageItemModel[] = [
        { id: 'home', text: 'Home', iconCss: 'e-icons e-home', content: getBackstageContent('home'), keyTip: 'H' },
        { id: 'new', text: 'New', iconCss: 'e-icons e-file-new', content: getBackstageContent('new'), keyTip: 'N' },
        { id: 'open', text: 'Open', iconCss: 'e-icons e-folder-open', content: getBackstageContent('open'), keyTip: 'O' },
        { separator: true },
        { id: 'info', text: 'Info', content: getBackstageContent('info'), keyTip: 'I' },
        { id: 'saveAs', text: 'Save as', content: getBackstageContent('save'), keyTip: 'S' },
        { id: 'export', text: 'Export', content: getBackstageContent('export'), keyTip: 'M' },
        { id: 'print', text: 'Print', backStageItemClick: backstageClickHandler, keyTip: 'P' },
        { id: 'share', text: 'Share', content: getBackstageContent('share'), keyTip: 'Z' },
        { separator: true, isFooter: true },
        { id: 'account', text: 'Account', isFooter: true, content: getBackstageContent('account'), keyTip: 'D' },
        { id: 'feedback', text: 'Feedback', isFooter: true, content: getBackstageContent('feedback'), keyTip: 'K' }
    ];

    return (
        <div className='control-pane'>
            <div className='col-lg-12 control-section ribbon-keytip-section'>
                <div className='control ribbon-sample'>
                    <div id="ribbonContainer" className='ribbon-keytip-container'>
                        <RibbonComponent id='keytip-ribbon' ref={ribbonObj} enableKeyTips={true} layoutSwitcherKeyTip="ZR" created={ribbonCreated} backStageMenu={{ text: 'File', visible: true, keyTip: "F", items: menuItems, backButton: { text: 'Close' } }}  launcherIconClick={launchClick}>
                            <RibbonTabsDirective>
                                <RibbonTabDirective header='Home' keyTip="H">
                                    <RibbonGroupsDirective>
                                        <RibbonGroupDirective header="Clipboard" id="clipboard" groupIconCss="e-icons e-paste">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" disabled={true} keyTip='V' id="pastebtn" allowedSizes={RibbonItemSize.Large}
                                                            splitButtonSettings={{ iconCss: "e-icons e-paste", items: pasteOptions, content: "Paste", select: (args) => { updateContent("Paste -> " + args.item.text); }, click: () => { updateContent("Paste"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" keyTip='X' buttonSettings={{ iconCss: "e-icons e-cut", content: "Cut", clicked: () => { updateContent("Cut"); enablePaste(); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='C' buttonSettings={{ iconCss: "e-icons e-copy", content: "Copy", clicked: () => { updateContent("Copy"); enablePaste(); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='FP' buttonSettings={{ iconCss: "e-icons e-format-painter", content: "Format Painter", clicked: () => { updateContent("Format Painter") } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Font" overflowHeader="More Font Options" groupIconCss="e-icons e-bold" launcherIconKeyTip="FJ" showLauncherIcon={true} isCollapsible={false} enableGroupOverflow={true} orientation="Row" cssClass='font-group'>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="ComboBox" keyTip='FF' comboBoxSettings={{ dataSource: fontStyle, index: 3, label: 'Font Style', width: '115px', popupWidth: '150px', allowFiltering: true, change: (args) => { if (args.itemData) { updateContent("Font Style -> " + args.itemData.text); } } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="ComboBox" keyTip='FS' comboBoxSettings={{ dataSource: fontSize, index: 3, label: 'Font Size', width: '65px', popupWidth: '85px', allowFiltering: true, change: (args) => { if (args.itemData) { updateContent("Font Size -> " + args.itemData.text); } } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="ColorPicker" keyTip='CP' allowedSizes={RibbonItemSize.Small} displayOptions={DisplayMode.Simplified | DisplayMode.Classic} colorPickerSettings={{ value: '#123456', change: (args) => { updateContent(args.currentValue.hex + " color"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='1' allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-bold", content: "Bold", isToggle: true, clicked: () => { updateContent("Bold"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='2' allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-italic", content: "Italic", isToggle: true, clicked: () => { updateContent("Italic"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='3' allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-underline", content: "Underline", isToggle: true, clicked: () => { updateContent("Underline"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='4' allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-strikethrough", content: "Strikethrough", isToggle: true, clicked: () => { updateContent("Strikethrough"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='5' allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-change-case", content: "Change Case", isToggle: true, clicked: () => { updateContent("Change case"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Paragraph" launcherIconKeyTip="PG" showLauncherIcon={true} groupIconCss="e-icons e-align-center" orientation="Row">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" keyTip='AO' allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-decrease-indent", content: 'Decrease Indent', clicked: () => { updateContent("Decrease Indent"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='AI' allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-increase-indent", content: 'Increase Indent', clicked: () => { updateContent("Increase Indent"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='FM' allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-paragraph", content: 'Paragraph', clicked: () => { updateContent("Paragraph Mark"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="GroupButton" allowedSizes={RibbonItemSize.Small} groupButtonSettings={{selection: RibbonGroupButtonSelection.Single, header: 'Alignment', items: [{iconCss: 'e-icons e-align-left', selected: true, click: () => { updateContent("Align Left") }, keyTip: "AL"}, {iconCss: 'e-icons e-align-center', click: () => { updateContent("Align Center") }, keyTip: "AC"}, {iconCss: 'e-icons e-align-right', click: () => { updateContent("Align Right") }, keyTip: "AR"}, {iconCss: 'e-icons e-justify', click: () => { updateContent("Justify") }, keyTip: "AJ"}]}}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Editing" groupIconCss="e-icons e-edit" orientation="Column">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" keyTip='FD' splitButtonSettings={{ iconCss: "e-icons e-search", items: findOptions, content: "Find", select: (args) => { updateContent("Find -> " + args.item.text); }, click: () => { updateContent("Find"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='R' buttonSettings={{ iconCss: "e-icons e-replace", content: 'Replace', clicked: () => { updateContent("Replace"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="SplitButton" keyTip='S' splitButtonSettings={{ iconCss: "e-icons e-mouse-pointer", items: selectOptions, content: "Select", select: (args) => { updateContent("Select -> " + args.item.text); }, click: () => { updateContent("Select"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Voice" groupIconCss="sf-icon-dictate" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" keyTip='D' allowedSizes={RibbonItemSize.Large} splitButtonSettings={{ iconCss: "sf-icon-dictate", items: dictateOptions, content: "Dictate", select: (args) => { updateContent("Dictate -> " + args.item.text); }, click: () => { updateContent("Dictate"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Editor" groupIconCss="sf-icon-editor" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" keyTip='SU' allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "sf-icon-editor", content: "Editor", clicked: () => { updateContent("Editor"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Reuse Files" groupIconCss="sf-icon-reuse" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" keyTip='RF' disabled={true} allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "sf-icon-reuse", content: "Reuse Files", clicked: () => { updateContent("Reuse Files"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                    </RibbonGroupsDirective>
                                </RibbonTabDirective>
                                <RibbonTabDirective header='Insert' keyTip="N">
                                    <RibbonGroupsDirective>
                                        <RibbonGroupDirective header="Tables" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="DropDown" keyTip='T' allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-table", items: tableOptions, content: "Table", select: (args) => { updateContent("Table -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Illustration" overflowHeader="Illustrations" id="illustration" groupIconCss="e-icons e-image" enableGroupOverflow={true} orientation="Row">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective id='pictureddl' keyTip='P' type="DropDown" dropDownSettings={{ iconCss: "e-icons e-image", content: "Pictures", target: '#keytip-pictureList' }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="DropDown" keyTip='SA' dropDownSettings={{ iconCss: "sf-icon-shapes", items: shapeOptions, content: "Shapes", select: (args) => { updateContent("Shapes -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='3D' buttonSettings={{ iconCss: "sf-icon-3d-model", content: "3D Models", clicked: () => { updateContent("3D Models"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='M' buttonSettings={{ iconCss: "sf-icon-smart-art", content: "Smart Art", clicked: () => { updateContent("Smart Art"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='CC' buttonSettings={{ iconCss: "sf-icon-chart", content: "Charts", clicked: () => { updateContent("Chart"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='SS' buttonSettings={{ iconCss: "sf-icon-screenshot", content: "Screenshot", clicked: () => { updateContent("Screenshot"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Header & Footer" id="header_footer" groupIconCss="e-icons e-table" orientation="Column">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="DropDown" keyTip='H' dropDownSettings={{ iconCss: "e-icons e-header", items: headerOptions, content: "Header", select: (args) => { updateContent("Header -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="DropDown" keyTip='HF' dropDownSettings={{ iconCss: "e-icons e-footer", items: footerOptions, content: "Footer", select: (args) => { updateContent("Footer -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="DropDown" keyTip='NU' dropDownSettings={{ iconCss: "e-icons e-page-numbering", items: pageOptions, content: "Page Numbering", select: (args) => { updateContent("Page Numbering -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Comments" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" keyTip='C' allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "e-icons e-comment-add", content: "New Comment", clicked: () => { updateContent("New Comment"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Links" groupIconCss="e-icons e-link" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="DropDown" keyTip='L2' allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-link", items: linkOptions, content: "Link", select: (args) => { updateContent("Link -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                    </RibbonGroupsDirective>
                                </RibbonTabDirective>
                                <RibbonTabDirective header='View' keyTip="W">
                                    <RibbonGroupsDirective>
                                        <RibbonGroupDirective header="Views" groupIconCss='e-icons e-print' orientation='Row'>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" keyTip='F' buttonSettings={{ iconCss: "sf-icon-read", content: "Read Mode", clicked: () => { updateContent("Read Mode"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='LP' buttonSettings={{ iconCss: "e-icons e-print", content: "Print Layout", clicked: () => { updateContent("Print Layout"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='W' buttonSettings={{ iconCss: "sf-icon-web-layout", content: "Web Layout", clicked: () => { updateContent("Web Layout"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Zoom" groupIconCss="e-icons e-zoom-to-fit" orientation="Row">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" keyTip='Q' buttonSettings={{ iconCss: "e-icons e-zoom-in", content: "Zoom in", clicked: () => { updateContent("Zoom in"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" keyTip='J' buttonSettings={{ iconCss: "e-icons e-zoom-out", content: "Zoom out", clicked: () => { updateContent("Zoom out"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Show" isCollapsible={true}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="CheckBox" keyTip='VR' checkBoxSettings={{ label: "Ruler", checked: false, change: () => { updateContent("Ruler"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="CheckBox" keyTip='VG' checkBoxSettings={{ label: "Gridlines", checked: false, change: () => { updateContent("Gridlines"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="CheckBox" keyTip='VN' checkBoxSettings={{ label: "Navigation Pane", checked: true, change: () => { updateContent("Navigation Pane"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Dark Mode" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" keyTip='D' buttonSettings={{ iconCss: "sf-icon-mode", content: "Dark Mode", clicked: () => { updateContent("Dark Mode"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                    </RibbonGroupsDirective>
                                </RibbonTabDirective>
                            </RibbonTabsDirective>
                            <Inject services={[RibbonFileMenu, RibbonColorPicker, RibbonBackstage, RibbonKeyTip]} />
                        </RibbonComponent>
                        <div id="keytip-ribbonPlaceHolder">
                            <div className="content1"></div>
                            <div className="content2"></div>
                            <div className="content3"></div>
                            <div className="content4"></div>
                            <ToastComponent id='toast' ref={toastInstance} position={{ X: 'Right' }} width='auto' height={25} timeOut={2000} cssClass='e-toast-info' showCloseButton={true} target="#keytip-ribbonPlaceHolder" newestOnTop={true} animation={{ show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } }} />
                        </div>
                        <ListViewComponent id='keytip-pictureList' dataSource={['This Device', 'Stock Images', 'Online Images']} showHeader={true} headerTitle="Insert Picture From" select={(args) => { updateContent("Picture -> " + args.text); }}></ListViewComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the KeyTips functionality in the Ribbon. Users can press specific keys or key combinations to perform actions.</p>
            </div>
            <div id="description">
                <p> The KeyTips feature enables quick access to tabs or ribbon items using keyboard actions. </p>
                <ul>
                    <li>
                        <span className="key-class"><kbd>Alt + Windows/Command</kbd></span>
                        <span> - To Display the KeyTips </span>
                    </li>
                    <li>
                        <span className="key-class"><kbd>Esc</kbd></span>
                        <span> - To close the KeyTips or traverse through the items.</span>
                    </li>
                </ul>
                <p>
                    In this sample, the keytips are configured for all ribbon items and backstage using the <code>keytip</code> property. The KeyTips are initially shown using the <code>showKeytips()</code> method.
                </p>
            </div>
        </div>
    );
}
export default KeyTip;
