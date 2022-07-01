import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
import { DialogUtility, Dialog } from '@syncfusion/ej2-react-popups';
import { ToolbarItem, ToolbarItems, toolbarClick, Data } from '@syncfusion/ej2-react-grids';
import { Item, ClickEventArgs } from '@syncfusion/ej2-react-navigations';
import { ListView, SelectEventArgs, ListViewComponent } from '@syncfusion/ej2-react-lists';
DocumentEditorContainerComponent.Inject(Toolbar);

// tslint:disable:max-line-length
export class MailMerge extends SampleBase<{}, {}> {
    private hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    public container: DocumentEditorContainerComponent;
    public titleBar: TitleBar;
    private toolbarOptions: object = ['New', 'Open', 'Separator', 'Undo',
        'Redo',
        'Separator',
        {
            prefixIcon: 'sf-icon-InsertMergeField',
            tooltipText: 'Insert Field',
            text: this.onWrapText('Insert Field'),
            id: 'InsertField'
        },
        {
            prefixIcon: 'sf-icon-FinishMerge',
            tooltipText: 'Merge Document',
            text: this.onWrapText('Merge Document'),
            id: 'MergeDocument'
        },
        'Separator',
        'Image',
        'Table',
        'Hyperlink',
        'Bookmark',
        'TableOfContents',
        'Separator',
        'Header',
        'Footer',
        'PageSetup',
        'PageNumber',
        'Break',
        'Separator',
        'Find',
        'Separator',
        'Comments',
        'TrackChanges',
        'Separator',
        'LocalClipboard',
        'RestrictEditing',
        'Separator',
        'FormFields',
        'UpdateFields'
        ];
    listview: any;
    field: any;
    insertFieldDialogObj: Dialog = new Dialog({
        header: 'Merge Field',
        content:
            '<div class="dialogContent">'
            // tslint:disable-next-line:max-line-length
            + '<label class="e-insert-field-label">Name:</label></br><input type="text" id="field_text" class="e-input" placeholder="Type a field to insert eg. FirstName">'
            + '</div>',
        showCloseIcon: true,
        isModal: true,
        width: 'auto',
        height: 'auto',
        close: this.closeFieldDialog,
        buttons: [
            {
                'click': (): void => {
                    let fieldNameTextBox: any = document.getElementById('field_text');
                    let fieldName: any = fieldNameTextBox.value;
                    if (fieldName !== '') {
                        this.container.documentEditor.editor.insertField('MERGEFIELD ' + fieldName + ' \\* MERGEFORMAT');
                    }
                    this.insertFieldDialogObj.hide();
                    this.container.documentEditor.focusIn();
                },
                buttonModel: {
                    content: 'Ok',
                    cssClass: 'e-flat',
                    isPrimary: true,
                },
            },
            {
                'click': (): void => {
                    this.insertFieldDialogObj.hide();
                    this.container.documentEditor.focusIn();
                },
                buttonModel: {
                    content: 'Cancel',
                    cssClass: 'e-flat',
                },
            },
        ],
    });
    Data: { text: string; category: string; htmlAttributes: { draggable: boolean; }; }[];
    mergeDocument(): void {
        this.container.documentEditor.saveAsBlob('Docx').then((blob: Blob) => {
            let exportedDocumment: Blob = blob;
            let fileReader: any = new FileReader();
            fileReader.onload = (): void => {
                let base64String: any = fileReader.result;
                let responseData: any = {
                    fileName: this.container.documentEditor.documentName + '.docx',
                    documentData: base64String
                };
                // let waitingPopUp:HTMLElement = document.getElementById('waiting-popup');
                // let inActiveDiv:HTMLElement = document.getElementById('popup-overlay');
                this.showHideWaitingIndicator(true);
                let baseUrl: string = this.hostUrl + 'api/documenteditor/MailMerge';
                let httpRequest: XMLHttpRequest = new XMLHttpRequest();
                httpRequest.open('POST', baseUrl, true);
                httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                httpRequest.onreadystatechange = () => {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200 || httpRequest.status === 304) {
                            this.container.documentEditor.open(httpRequest.responseText);
                        } else {
                            // Failed to merge document
                            DialogUtility.alert({
                                title: 'Information',
                                content: 'failure to merge document',
                                showCloseIcon: true,
                                closeOnEscape: true,
                            });
                        }
                        this.showHideWaitingIndicator(false);
                    }
                };
                httpRequest.send(JSON.stringify((responseData)));
            };
            fileReader.readAsDataURL(blob);
        });
    }
    showHideWaitingIndicator(show: boolean) {
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let inActiveDiv: HTMLElement = document.getElementById('popup-overlay');
        inActiveDiv.style.display = show ? 'block' : 'none';
        waitingPopUp.style.display = show ? 'block' : 'none';
    }
    showInsertFielddialog(container): void {
        let instance: any = this;
        if (document.getElementById('insert_merge_field') === null || document.getElementById('insert_merge_field') === undefined) {
            let fieldcontainer: any = document.createElement('div');
            fieldcontainer.id = 'insert_merge_field';
            document.body.appendChild(fieldcontainer);
            this.insertFieldDialogObj.appendTo('#insert_merge_field');
            fieldcontainer.parentElement.style.position = 'fixed';
            fieldcontainer.style.width = 'auto';
            fieldcontainer.style.height = 'auto';
        }
        this.insertFieldDialogObj.close = (): void => { container.documentEditor.focusIn(); };
        this.insertFieldDialogObj.beforeOpen = (): void => { container.documentEditor.focusIn(); };
        this.insertFieldDialogObj.show();
        let fieldNameTextBox: any = document.getElementById('field_text');
        fieldNameTextBox.value = '';
    }
    closeFieldDialog(): void {
        this.insertFieldDialogObj.hide();
        this.container.documentEditor.focusIn();
    }
    insertField(fieldName: any) {
        let fileName: any = fieldName.replace(/\n/g, '').replace(/\r/g, '').replace(/\r\n/g, '');
        let fieldCode: any = 'MERGEFIELD  ' + fileName + '  \\* MERGEFORMAT ';
        this.container.documentEditor.editor.insertField(fieldCode, '«' + fieldName + '»');
        this.container.documentEditor.focusIn();
    }
    public onWrapText(text: string): string {
        let content: string = '';
        let index: number = text.lastIndexOf(' ');
        content = text.slice(0, index);
        text.slice(index);
        content += '<div class="e-de-text-wrap">' + text.slice(index) + '</div>';
        return content;
    }
    /*
    onSelect(args: SelectEventArgs) {
        let fieldName: any = args.text;
       //this.listview.selectItem(undefined);
        this.insertField(fieldName);
    } */

    public rendereComplete(): void {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        }
        this.container.serviceUrl = this.hostUrl + 'api/documenteditor/';
        this.container.documentEditor.pageOutline = '#E0E0E0';
        this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true);
        this.onLoadDefault();
    }

    render() {
        return (<div className='control-pane'>
            <div className='control-section'>
                <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
                <div className="col-lg-2 control-section" style={{ 'paddingRight': 'inherit', 'paddingTop': '0px', 'paddingLeft': '5px', 'height': '590px', 'borderLeft': '1px solid rgb(238, 238, 238)', 'borderBottom': '1px solid rgb(238, 238, 238)' }} >
                <h5><label style={{'display':'block','margin':'1px','paddingTop': '5px'}}>Select Field to Insert</label></h5>
                    <div id='listview'></div>
                </div>
                <div className="col-lg-10 control-section" style={{ 'paddingLeft': '0px', 'paddingRight': '0px', 'paddingTop': '0px' }}>
                    <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block' }}
                        height={'590px'} enableToolbar={true} locale='en-US' />
                </div>
            </div>

            <div className="overlay" id="popup-overlay"></div>
            <div id='waiting-popup' >
                <svg className="circular" height="40" width="40">
                    <circle className="circle-path" cx="25" cy="25" r="20" fill="none" stroke-width="6" stroke-miterlimit="10" />
                </svg>
            </div>
            <div id="action-description">
                <p>This example demonstrates the mail merge operation in DocumentEditor. Use the "Merge Document" toolbar button to perform the mail merge operation.</p>
            </div>
            <div id="description">
                <p>Mail merge feature in the DocumentEditor.
                </p>
                <ul>
                    <li>Fields can be inserted using API.</li>
                    <li>Document generated is mail merged by Syncfusion DocIO on the server-side.</li>
                    <li>Merged document is opened in the DocumentEditor.</li>
                </ul>
                <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/web-services/mvc/">documentation section.</a>
                </p>
            </div>
        </div>);
    }

    onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object = {
            "sections": [
                {
                    "blocks": [
                        {
                            "rows": [
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 83.5999984741211,
                                        "heightType": "AtLeast",
                                        "borders": {
                                            "left": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "right": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "top": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "bottom": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "vertical": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "horizontal": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "diagonalDown": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            },
                                            "diagonalUp": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            }
                                        },
                                        "leftMargin": 5.4,
                                        "rightMargin": 5.4,
                                        "topMargin": 0.0,
                                        "bottomMargin": 0.0
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  TableStart:Orders  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«TableStart:Orders»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    "characterFormat": {
                                                        "bold": true,
                                                        "fontSize": 24.0,
                                                        "fontSizeBidi": 24.0
                                                    },
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "INVOICE",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontSize": 24.0,
                                                                "fontSizeBidi": 24.0
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "imageString": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM4AAAAJCAYAAAB68hPIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAA+SURBVFhH7dgxEQAwDAOxgCuiYiyiEEgxxLN8Jwi/uMbM1qvuHmCnzn0D7AgHAsKBgHAgIBwICAcC7mhY6/kc4VEEyn2PzAAAAABJRU5ErkJggg==",
                                                            "length": 1,
                                                            "width": 103.0,
                                                            "height": 4.5,
                                                            "isInlineImage": false,
                                                            "isMetaFile": false
                                                        }
                                                    ]
                                                },
                                                {
                                                    "characterFormat": {
                                                        "bold": true,
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Invoice ",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": "to:",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  ShipName  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«ShipName»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  ShipAddress  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«ShipAddress»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  ShipCity  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«ShipCity»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        },
                                                        {
                                                            "text": " - ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  ShipPostalCode  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«ShipPostalCode»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  ShipCountry  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«ShipCountry»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 347.10000610351563,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone"
                                                },
                                                "cellWidth": 347.10000610351563
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": []
                                                },
                                                {
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": []
                                                },
                                                {
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": []
                                                },
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": []
                                                },
                                                {
                                                    "characterFormat": {
                                                        "bold": true,
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Order ID",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": "\t",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": ":",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": " ",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  OrderID  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«OrderID»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Order",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": " Date",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": "\t",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": ":",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": " ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  OrderDate \\@ \"dd-MMM-yyyy\" \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«OrderDate»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    "characterFormat": {
                                                        "bold": true,
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Customer ID",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": "\t",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": ":",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": " ",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  CustomerID  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«CustomerID»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    "characterFormat": {
                                                        "bold": true,
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Required",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": " ",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": "Date:",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": " ",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  RequiredDate \\@ \"dd-MMM-yyyy\" \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«RequiredDate»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    "paragraphFormat": {
                                                        "styleName": "Header",
                                                        "tabs": [
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 234.0
                                                            },
                                                            {
                                                                "tabJustification": "Left",
                                                                "position": 0.0,
                                                                "tabLeader": "None",
                                                                "deletePosition": 468.0
                                                            }
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Shipped",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": " ",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": "Date",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": "\t",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": ":",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": " ",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  ShippedDate \\@ \"dd-MMM-yyyy\" \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«ShippedDate»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        },
                                                        {
                                                            "text": " ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  TableEnd:Orders  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«TableEnd:Orders»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 203.69999694824219,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone"
                                                },
                                                "cellWidth": 203.69999694824219
                                            }
                                        }
                                    ]
                                }
                            ],
                            "title": null,
                            "description": null,
                            "tableFormat": {
                                "allowAutoFit": false,
                                "leftMargin": 5.4000000953674316,
                                "rightMargin": 5.4000000953674316,
                                "topMargin": 0.0,
                                "bottomMargin": 0.0,
                                "leftIndent": 0.0,
                                "tableAlignment": "Center",
                                "preferredWidthType": "Auto",
                                "borders": {
                                    "left": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "right": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "top": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "bottom": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "vertical": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "horizontal": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "diagonalDown": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "diagonalUp": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    }
                                },
                                "bidi": false
                            }
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": []
                        },
                        {
                            "rows": [
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 11.600000381469727,
                                        "heightType": "AtLeast",
                                        "borders": {
                                            "left": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "right": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "top": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "bottom": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "vertical": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "horizontal": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "diagonalDown": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            },
                                            "diagonalUp": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            }
                                        },
                                        "leftMargin": 5.4,
                                        "rightMargin": 5.4,
                                        "topMargin": 0.0,
                                        "bottomMargin": 0.0
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "bold": true,
                                                        "fontFamily": "Calibri",
                                                        "boldBidi": true
                                                    },
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "lineSpacing": 1.0,
                                                        "lineSpacingType": "Multiple",
                                                        "textAlignment": "Center",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Product ID",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri",
                                                                "fontColor": "#FFFFFFFF",
                                                                "boldBidi": true
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 182.35000610351563,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#2F5496FF"
                                                },
                                                "cellWidth": 185.35000610351563
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "bold": true,
                                                        "fontFamily": "Calibri",
                                                        "fontColor": "#FFFFFFFF",
                                                        "boldBidi": true
                                                    },
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "lineSpacing": 1.0,
                                                        "lineSpacingType": "Multiple",
                                                        "textAlignment": "Center",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Quantity",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri",
                                                                "fontColor": "#FFFFFFFF",
                                                                "boldBidi": true
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 60.400001525878906,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#2E74B5FF"
                                                },
                                                "cellWidth": 62.400001525878906
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "bold": true,
                                                        "fontFamily": "Calibri",
                                                        "fontColor": "#FFFFFFFF",
                                                        "boldBidi": true
                                                    },
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "lineSpacing": 1.0,
                                                        "lineSpacingType": "Multiple",
                                                        "textAlignment": "Center",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Unit Price",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri",
                                                                "fontColor": "#FFFFFFFF",
                                                                "boldBidi": true
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 64.0999984741211,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#2E74B5FF"
                                                },
                                                "cellWidth": 66.0999984741211
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "bold": true,
                                                        "fontFamily": "Calibri",
                                                        "fontColor": "#FFFFFFFF",
                                                        "boldBidi": true
                                                    },
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "lineSpacing": 1.0,
                                                        "lineSpacingType": "Multiple",
                                                        "textAlignment": "Center",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Discount",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri",
                                                                "fontColor": "#FFFFFFFF",
                                                                "boldBidi": true
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 60.549999237060547,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#2E74B5FF"
                                                },
                                                "cellWidth": 62.549999237060547
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "bold": true,
                                                        "fontFamily": "Calibri",
                                                        "fontColor": "#FFFFFFFF",
                                                        "boldBidi": true
                                                    },
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "lineSpacing": 1.0,
                                                        "lineSpacingType": "Multiple",
                                                        "textAlignment": "Center",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Price",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri",
                                                                "fontColor": "#FFFFFFFF",
                                                                "boldBidi": true
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 175.39999389648438,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#2E74B5FF"
                                                },
                                                "cellWidth": 178.39999389648438
                                            }
                                        }
                                    ]
                                },
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 29.149999618530273,
                                        "heightType": "AtLeast",
                                        "borders": {
                                            "left": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "right": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "top": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "bottom": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "vertical": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "horizontal": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "diagonalDown": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            },
                                            "diagonalUp": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            }
                                        },
                                        "leftMargin": 5.4,
                                        "rightMargin": 5.4,
                                        "topMargin": 0.0,
                                        "bottomMargin": 0.0
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "bold": true,
                                                        "fontFamily": "Calibri",
                                                        "boldBidi": true
                                                    },
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "lineSpacing": 1.0,
                                                        "lineSpacingType": "Multiple",
                                                        "textAlignment": "Center",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri",
                                                                "boldBidi": true
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  TableStart:Order  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri",
                                                                "boldBidi": true
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«TableStart:Order»",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri",
                                                                "boldBidi": true
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        },
                                                        {
                                                            "text": " ",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri",
                                                                "boldBidi": true
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri",
                                                                "boldBidi": true
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  ProductName  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri",
                                                                "boldBidi": true
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«ProductName»",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontFamily": "Calibri",
                                                                "boldBidi": true
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 182.35000610351563,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#E7E6E6FF"
                                                },
                                                "cellWidth": 185.35000610351563
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "lineSpacing": 1.0,
                                                        "lineSpacingType": "Multiple",
                                                        "textAlignment": "Center",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  Quantity  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«Quantity»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 60.400001525878906,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#E7E6E6FF"
                                                },
                                                "cellWidth": 62.400001525878906
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "lineSpacing": 1.0,
                                                        "lineSpacingType": "Multiple",
                                                        "textAlignment": "Center",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "$",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  UnitPrice  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«UnitPrice»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 64.0999984741211,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#E7E6E6FF"
                                                },
                                                "cellWidth": 66.0999984741211
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "lineSpacing": 1.0,
                                                        "lineSpacingType": "Multiple",
                                                        "textAlignment": "Center",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  Discount  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«Discount»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 60.549999237060547,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#E7E6E6FF"
                                                },
                                                "cellWidth": 62.549999237060547
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "lineSpacing": 1.0,
                                                        "lineSpacingType": "Multiple",
                                                        "textAlignment": "Right",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "$",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  ExtendedPrice  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«ExtendedPrice»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        },
                                                        {
                                                            "text": " ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  TableEnd:Order  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«TableEnd:Order»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 175.39999389648438,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#E7E6E6FF"
                                                },
                                                "cellWidth": 178.39999389648438
                                            }
                                        }
                                    ]
                                }
                            ],
                            "title": null,
                            "description": null,
                            "tableFormat": {
                                "allowAutoFit": false,
                                "cellSpacing": 2.0,
                                "leftMargin": 5.4000000953674316,
                                "rightMargin": 5.4000000953674316,
                                "topMargin": 0.0,
                                "bottomMargin": 0.0,
                                "leftIndent": 0.0,
                                "tableAlignment": "Center",
                                "preferredWidthType": "Auto",
                                "borders": {
                                    "left": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "right": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "top": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "bottom": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "vertical": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "horizontal": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "diagonalDown": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "diagonalUp": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    }
                                },
                                "bidi": false
                            }
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": []
                        },
                        {
                            "rows": [
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 16.75,
                                        "heightType": "AtLeast",
                                        "borders": {
                                            "left": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "right": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "top": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "bottom": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "vertical": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "horizontal": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "diagonalDown": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            },
                                            "diagonalUp": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            }
                                        },
                                        "leftMargin": 5.4,
                                        "rightMargin": 5.4,
                                        "topMargin": 0.0,
                                        "bottomMargin": 0.0
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "textAlignment": "Right",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Sub Total",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 184.39999389648438,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#E7E6E6FF"
                                                },
                                                "cellWidth": 187.39999389648438
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "lineSpacing": 1.0,
                                                        "lineSpacingType": "Multiple",
                                                        "textAlignment": "Right",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  TableStart:OrderTotals  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«TableStart:OrderTotals»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        },
                                                        {
                                                            "text": " ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "text": "$",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  Subtotal  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«Subtotal»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 172.14999389648438,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#E7E6E6FF"
                                                },
                                                "cellWidth": 175.14999389648438
                                            }
                                        }
                                    ]
                                },
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 15.399999618530273,
                                        "heightType": "AtLeast",
                                        "borders": {
                                            "left": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "right": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "top": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "bottom": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "vertical": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "horizontal": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "diagonalDown": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            },
                                            "diagonalUp": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            }
                                        },
                                        "leftMargin": 5.4,
                                        "rightMargin": 5.4,
                                        "topMargin": 0.0,
                                        "bottomMargin": 0.0
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "textAlignment": "Right",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Freight",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 184.39999389648438,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#E7E6E6FF"
                                                },
                                                "cellWidth": 187.39999389648438
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "afterSpacing": 0.0,
                                                        "lineSpacing": 1.0,
                                                        "lineSpacingType": "Multiple",
                                                        "textAlignment": "Right",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "$",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  Freight  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«Freight»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 172.14999389648438,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#E7E6E6FF"
                                                },
                                                "cellWidth": 175.14999389648438
                                            }
                                        }
                                    ]
                                },
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 21.600000381469727,
                                        "heightType": "AtLeast",
                                        "borders": {
                                            "left": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "right": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "top": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "bottom": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "vertical": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "horizontal": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": true
                                            },
                                            "diagonalDown": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            },
                                            "diagonalUp": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            }
                                        },
                                        "leftMargin": 5.4,
                                        "rightMargin": 5.4,
                                        "topMargin": 0.0,
                                        "bottomMargin": 0.0
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "fontFamily": "Calibri"
                                                    },
                                                    "paragraphFormat": {
                                                        "textAlignment": "Right",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Total",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 184.39999389648438,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#E7E6E6FF"
                                                },
                                                "cellWidth": 187.39999389648438
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "fontColor": "#FFFFFFFF"
                                                    },
                                                    "paragraphFormat": {
                                                        "textAlignment": "Right",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "$",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  Total  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«Total»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        },
                                                        {
                                                            "text": " ",
                                                            "characterFormat": {
                                                                "fontColor": "#FFFFFFFF"
                                                            }
                                                        },
                                                        {
                                                            "hasFieldEnd": true,
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            },
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " MERGEFIELD  TableEnd:OrderTotals  \\* MERGEFORMAT ",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "text": "«TableEnd:OrderTotals»",
                                                            "characterFormat": {
                                                                "fontFamily": "Calibri"
                                                            }
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 172.14999389648438,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone",
                                                    "backgroundColor": "#E7E6E6FF"
                                                },
                                                "cellWidth": 175.14999389648438
                                            }
                                        }
                                    ]
                                }
                            ],
                            "title": null,
                            "description": null,
                            "tableFormat": {
                                "allowAutoFit": true,
                                "cellSpacing": 2.0,
                                "leftMargin": 5.4000000953674316,
                                "rightMargin": 5.4000000953674316,
                                "topMargin": 0.0,
                                "bottomMargin": 0.0,
                                "leftIndent": 0.0,
                                "tableAlignment": "Right",
                                "preferredWidthType": "Auto",
                                "borders": {
                                    "left": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "right": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "top": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "bottom": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "vertical": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "horizontal": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": true
                                    },
                                    "diagonalDown": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "diagonalUp": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    }
                                },
                                "shading": {
                                    "texture": "TextureNone",
                                    "backgroundColor": "#FFFFFFFF"
                                },
                                "bidi": false
                            }
                        },
                        {
                            "characterFormat": {
                                "fontSize": 16.0,
                                "fontSizeBidi": 16.0
                            },
                            "paragraphFormat": {
                                "textAlignment": "Center",
                                "styleName": "Normal"
                            },
                            "inlines": []
                        },
                        {
                            "characterFormat": {
                                "fontSize": 16.0,
                                "fontSizeBidi": 16.0
                            },
                            "paragraphFormat": {
                                "textAlignment": "Center",
                                "styleName": "Normal"
                            },
                            "inlines": []
                        },
                        {
                            "characterFormat": {
                                "fontSize": 16.0,
                                "fontSizeBidi": 16.0
                            },
                            "paragraphFormat": {
                                "textAlignment": "Center",
                                "styleName": "Normal"
                            },
                            "inlines": []
                        },
                        {
                            "characterFormat": {
                                "fontSize": 16.0,
                                "fontFamily": "Calibri",
                                "fontSizeBidi": 16.0
                            },
                            "paragraphFormat": {
                                "textAlignment": "Center",
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "Thank ",
                                    "characterFormat": {
                                        "fontSize": 16.0,
                                        "fontFamily": "Calibri",
                                        "fontSizeBidi": 16.0
                                    }
                                },
                                {
                                    "text": "you for doing business with us!",
                                    "characterFormat": {
                                        "fontSize": 16.0,
                                        "fontFamily": "Calibri",
                                        "fontSizeBidi": 16.0
                                    }
                                }
                            ]
                        }
                    ],
                    "headersFooters": {
                        "header": {
                            "blocks": [
                                {
                                    "paragraphFormat": {
                                        "styleName": "Header"
                                    },
                                    "inlines": []
                                }
                            ]
                        }
                    },
                    "sectionFormat": {
                        "headerDistance": 36.0,
                        "footerDistance": 36.0,
                        "pageWidth": 612.0,
                        "pageHeight": 792.0,
                        "leftMargin": 36.0,
                        "rightMargin": 36.0,
                        "topMargin": 36.0,
                        "bottomMargin": 36.0,
                        "differentFirstPage": false,
                        "differentOddAndEvenPages": false,
                        "bidi": false,
                        "restartPageNumbering": false,
                        "pageStartingNumber": 0
                    }
                }
            ],
            "paragraphFormat": {
                "afterSpacing": 8.0,
                "lineSpacing": 1.0791666507720947,
                "lineSpacingType": "Multiple"
            },
            "background": {
                "color": "#FFFFFFFF"
            },
            "styles": [
                {
                    "type": "Paragraph",
                    "name": "Normal",
                    "next": "Normal",
                    "characterFormat": {
                        "fontSize": 12.0,
                        "fontFamily": "Times New Roman",
                        "fontColor": "#000000FF",
                        "fontSizeBidi": 12.0
                    },
                    "paragraphFormat": {
                        "afterSpacing": 8.0,
                        "lineSpacing": 1.0791666507720947,
                        "lineSpacingType": "Multiple"
                    }
                },
                {
                    "type": "Character",
                    "name": "Default Paragraph Font"
                },
                {
                    "type": "Paragraph",
                    "name": "Table Normal",
                    "next": "Table Normal"
                },
                {
                    "type": "Paragraph",
                    "name": "No List",
                    "next": "No List",
                    "characterFormat": {
                        "fontFamily": "Times New Roman"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Header",
                    "basedOn": "Normal",
                    "next": "Header",
                    "link": "Header Char",
                    "paragraphFormat": {
                        "afterSpacing": 0.0,
                        "lineSpacing": 1.0,
                        "lineSpacingType": "Multiple",
                        "tabs": [
                            {
                                "tabJustification": "Center",
                                "position": 234.0,
                                "tabLeader": "None",
                                "deletePosition": 0.0
                            },
                            {
                                "tabJustification": "Right",
                                "position": 468.0,
                                "tabLeader": "None",
                                "deletePosition": 0.0
                            }
                        ]
                    }
                },
                {
                    "type": "Character",
                    "name": "Header Char",
                    "basedOn": "Default Paragraph Font"
                },
                {
                    "type": "Paragraph",
                    "name": "Footer",
                    "basedOn": "Normal",
                    "next": "Footer",
                    "link": "Footer Char",
                    "paragraphFormat": {
                        "afterSpacing": 0.0,
                        "lineSpacing": 1.0,
                        "lineSpacingType": "Multiple",
                        "tabs": [
                            {
                                "tabJustification": "Center",
                                "position": 234.0,
                                "tabLeader": "None",
                                "deletePosition": 0.0
                            },
                            {
                                "tabJustification": "Right",
                                "position": 468.0,
                                "tabLeader": "None",
                                "deletePosition": 0.0
                            }
                        ]
                    }
                },
                {
                    "type": "Character",
                    "name": "Footer Char",
                    "basedOn": "Default Paragraph Font"
                },
                {
                    "type": "Paragraph",
                    "name": "Table Grid",
                    "basedOn": "Table Normal",
                    "next": "Table Grid"
                },
                {
                    "type": "Character",
                    "name": "Hyperlink",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "underline": "Single",
                        "fontColor": "#0563C1FF"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Grid Table 4",
                    "basedOn": "Table Normal",
                    "next": "Grid Table 4"
                },
                {
                    "type": "Paragraph",
                    "name": "Grid Table 7 Colorful",
                    "basedOn": "Table Normal",
                    "next": "Grid Table 7 Colorful"
                }
            ],
            "defaultTabWidth": 36.0,
            "formatting": false,
            "trackChanges": false,
            "protectionType": "NoProtection",
            "enforcement": false,
            "dontUseHTMLParagraphAutoSpacing": false
        };
        // tslint:enable        
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Mail Merge';
        let item: any = this.toolbarOptions;
        this.container.toolbarItems = item;
        this.titleBar.updateDocumentTitle();
        this.container.documentChange = (): void => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };


        document.getElementById('listview').addEventListener('dragstart', (event: any): void => {
            event.dataTransfer.setData('Text', event.target.innerText);
            event.target.classList.add('de-drag-target');
        });
        // Prevent default drag over for document editor element
        document.getElementById('container').addEventListener('dragover', (event: any): void => {
            event.preventDefault();
        });

        // Drop Event for document editor element
        document.getElementById('container').addEventListener('drop', (e: any) => {
            let text: string = e.dataTransfer.getData('Text');
            this.container.documentEditor.selection.select({ x: e.offsetX, y: e.offsetY, extend: false });
            this.insertField(text);
        });

        document.addEventListener('dragend', (event: any) => {
            if (event.target.classList.contains('de-drag-target')) {
                event.target.classList.remove('de-drag-target');
            }
        });

        this.Data = [
            {
                text: 'ProductName',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'ShipName',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'CustomerID',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'Quantity',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'UnitPrice',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'Discount',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'ShipAddress',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'ShipCity',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'ShipCountry',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'OrderId',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'OrderDate',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            }

        ];
        //this.field = {tooltip:'category',htmlAttributes: { draggable: true }};

        let listDivElement: HTMLElement = document.getElementById('listview');
        let listView: ListView = new ListView({
            dataSource: this.Data,
            fields: { tooltip: 'category' },
            select: onSelect.bind(this)
        });
        listView.appendTo(listDivElement);

        function onSelect(args: SelectEventArgs) {
            let fieldName: any = args.text;
            listView.selectItem(undefined);
            this.insertField(fieldName);
        }

        this.container.toolbarClick = (args: ClickEventArgs): void => {
            switch (args.item.id) {
                case 'MergeDocument':
                    this.mergeDocument();
                    break;
                case 'InsertField':
                    this.showInsertFielddialog(this.container);
                    break;
            }
        };
    }
}
