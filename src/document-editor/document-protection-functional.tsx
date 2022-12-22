import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
function DocumentProtection() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    let hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    let container: DocumentEditorContainerComponent;
    let titleBar: TitleBar;
    let userList: string[] = ['engineer@mycompany.com', 'manager@mycompany.com'];
    function rendereComplete(): void {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        }
        container.serviceUrl = hostUrl + 'api/documenteditor/';
        container.showPropertiesPane = false;
        container.documentEditor.currentUser = 'engineer@mycompany.com';
        // container.documentEditor.pageOutline = '#E0E0E0';
        // container.documentEditor.acceptTab = true;
        container.documentEditor.resize();
        titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
        onLoadDefault();
    }
    return (<div className='control-pane'>
        <div className="col-lg-9 control-section">
            <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
            <div id="documenteditor_container_body">
                <DocumentEditorContainerComponent id="container" ref={(scope) => { container = scope; }} style={{ 'display': 'block' }}
                    height={'590px'} enableToolbar={true} locale='en-US' />
            </div>
        </div>
        <div className="col-lg-3 property-section">
            <div className="property-panel-header">User Permission</div>
            <table id="property" title="User Permission" style={{ width: "100%", marginTop: "10px" }}>
                <tr>
                    <td className="left-side">
                        <DropDownListComponent id="ddlelement" dataSource={userList} change={onChange.bind(this)} placeholder="Select a game" value={userList[0]} popupHeight="220px" />
                    </td>
                </tr>
            </table>
        </div>
        <div id="action-description">
            <p>This example demonstrates document protection support in document editor to restrict the types of changes can be made to the document by a user/user group.</p>
        </div>
        <div id="description">
            <div>
                <p>In this demo, the Document editor opens a protected document that includes permitted ranges for two users identified by email: each user is authorized to edit a separate text area.</p>
                <p>You can switch between the current user to edit different parts by selecting dropdown list in User permissions pane.</p>
                <p>User can add the user in dropdown who have editing permission in document by using addItem method.</p>
                <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/document-management/">documentation section.</a>
                </p>
            </div>
        </div>
    </div>);

    function onChange(event: ChangeEventArgs): void {
        container.documentEditor.currentUser = event.value as string;
    }
    function onLoadDefault(): void {
        // tslint:disable
        let defaultDocument: object = {
            "sections": [
                {
                    "blocks": [
                        {
                            "characterFormat": {
                                "fontSize": 14.0,
                                "fontSizeBidi": 14.0
                            },
                            "paragraphFormat": {
                                "lineSpacing": 32.0,
                                "lineSpacingType": "Exactly",
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "Name",
                                    "characterFormat": {
                                        "bold": true,
                                        "fontSize": 14.0,
                                        "boldBidi": true,
                                        "fontSizeBidi": 14.0
                                    }
                                },
                                {
                                    "text": ":",
                                    "characterFormat": {
                                        "fontSize": 14.0,
                                        "fontSizeBidi": 14.0
                                    }
                                }
                            ]
                        },
                        {
                            "rows": [
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 20.0,
                                        "heightType": "AtLeast",
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
                                        }
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "paragraphFormat": {
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "editRangeId": "1348272392",
                                                            "columnFirst": 0,
                                                            "columnLast": 0,
                                                            "user": "engineer@mycompany.com"
                                                        },
                                                        {
                                                            "text": "Enter name"
                                                        },
                                                        {
                                                            "editRangeId": "1348272392",
                                                            "editableRangeStart": {
                                                                "editRangeId": "1348272392",
                                                                "columnFirst": 0,
                                                                "columnLast": 0,
                                                                "user": "engineer@mycompany.com"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 467.5,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Center",
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
                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            "title": null,
                            "description": null,
                            "tableFormat": {
                                "allowAutoFit": true,
                                "leftIndent": 0.0,
                                "tableAlignment": "Left",
                                "preferredWidthType": "Auto",
                                "borders": {
                                    "left": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "right": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "top": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "bottom": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "vertical": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "horizontal": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
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
                                "bidi": false
                            }
                        },
                        {
                            "characterFormat": {
                                "bold": true,
                                "fontSize": 14.0,
                                "boldBidi": true,
                                "fontSizeBidi": 14.0
                            },
                            "paragraphFormat": {
                                "lineSpacing": 32.0,
                                "lineSpacingType": "Exactly",
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "Designation:",
                                    "characterFormat": {
                                        "bold": true,
                                        "fontSize": 14.0,
                                        "boldBidi": true,
                                        "fontSizeBidi": 14.0
                                    }
                                }
                            ]
                        },
                        {
                            "rows": [
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 20.0,
                                        "heightType": "AtLeast",
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
                                        }
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "paragraphFormat": {
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "editRangeId": "808933422",
                                                            "columnFirst": 0,
                                                            "columnLast": 0,
                                                            "user": "engineer@mycompany.com"
                                                        },
                                                        {
                                                            "text": "Enter designation"
                                                        },
                                                        {
                                                            "editRangeId": "808933422",
                                                            "editableRangeStart": {
                                                                "editRangeId": "808933422",
                                                                "columnFirst": 0,
                                                                "columnLast": 0,
                                                                "user": "engineer@mycompany.com"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 467.5,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Center",
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
                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            "title": null,
                            "description": null,
                            "tableFormat": {
                                "allowAutoFit": true,
                                "leftIndent": 0.0,
                                "tableAlignment": "Left",
                                "preferredWidthType": "Auto",
                                "borders": {
                                    "left": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "right": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "top": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "bottom": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "vertical": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "horizontal": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
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
                                "bidi": false
                            }
                        },
                        {
                            "characterFormat": {
                                "bold": true,
                                "fontSize": 14.0,
                                "boldBidi": true,
                                "fontSizeBidi": 14.0
                            },
                            "paragraphFormat": {
                                "lineSpacing": 32.0,
                                "lineSpacingType": "Exactly",
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "Email Address:",
                                    "characterFormat": {
                                        "bold": true,
                                        "fontSize": 14.0,
                                        "boldBidi": true,
                                        "fontSizeBidi": 14.0
                                    }
                                },
                                {
                                    "name": "_GoBack",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_GoBack",
                                    "bookmarkType": 1
                                }
                            ]
                        },
                        {
                            "rows": [
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 20.0,
                                        "heightType": "AtLeast",
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
                                        }
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "paragraphFormat": {
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "editRangeId": "810441411",
                                                            "columnFirst": 0,
                                                            "columnLast": 0,
                                                            "user": "engineer@mycompany.com"
                                                        },
                                                        {
                                                            "text": "Enter email address"
                                                        },
                                                        {
                                                            "editRangeId": "810441411",
                                                            "editableRangeStart": {
                                                                "editRangeId": "810441411",
                                                                "columnFirst": 0,
                                                                "columnLast": 0,
                                                                "user": "engineer@mycompany.com"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 467.5,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Center",
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
                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            "title": null,
                            "description": null,
                            "tableFormat": {
                                "allowAutoFit": true,
                                "leftIndent": 0.0,
                                "tableAlignment": "Left",
                                "preferredWidthType": "Auto",
                                "borders": {
                                    "left": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "right": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "top": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "bottom": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "vertical": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "horizontal": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
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
                                "bidi": false
                            }
                        },
                        {
                            "characterFormat": {
                                "bold": true,
                                "fontSize": 14.0,
                                "boldBidi": true,
                                "fontSizeBidi": 14.0
                            },
                            "paragraphFormat": {
                                "lineSpacing": 32.0,
                                "lineSpacingType": "Exactly",
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "Feedbacks:",
                                    "characterFormat": {
                                        "bold": true,
                                        "fontSize": 14.0,
                                        "boldBidi": true,
                                        "fontSizeBidi": 14.0
                                    }
                                }
                            ]
                        },
                        {
                            "rows": [
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 20.0,
                                        "heightType": "AtLeast",
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
                                        }
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "paragraphFormat": {
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "editRangeId": "1016946268",
                                                            "columnFirst": 0,
                                                            "columnLast": 0,
                                                            "user": "manager@mycompany.com"
                                                        },
                                                        {
                                                            "text": "Enter the feedbacks"
                                                        },
                                                        {
                                                            "editRangeId": "1016946268",
                                                            "editableRangeStart": {
                                                                "editRangeId": "1016946268",
                                                                "columnFirst": 0,
                                                                "columnLast": 0,
                                                                "user": "manager@mycompany.com"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 467.5,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Center",
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
                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            "title": null,
                            "description": null,
                            "tableFormat": {
                                "allowAutoFit": true,
                                "leftIndent": 0.0,
                                "tableAlignment": "Left",
                                "preferredWidthType": "Auto",
                                "borders": {
                                    "left": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "right": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "top": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "bottom": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "vertical": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "horizontal": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
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
                                "bidi": false
                            }
                        },
                        {
                            "characterFormat": {
                                "bold": true,
                                "fontSize": 14.0,
                                "boldBidi": true,
                                "fontSizeBidi": 14.0
                            },
                            "paragraphFormat": {
                                "lineSpacing": 32.0,
                                "lineSpacingType": "Exactly",
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "Review comments:",
                                    "characterFormat": {
                                        "bold": true,
                                        "fontSize": 14.0,
                                        "boldBidi": true,
                                        "fontSizeBidi": 14.0
                                    }
                                }
                            ]
                        },
                        {
                            "rows": [
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 20.0,
                                        "heightType": "AtLeast",
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
                                        }
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "paragraphFormat": {
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "editRangeId": "1373703080",
                                                            "columnFirst": 0,
                                                            "columnLast": 0,
                                                            "user": "manager@mycompany.com"
                                                        },
                                                        {
                                                            "text": "Enter the comments"
                                                        },
                                                        {
                                                            "editRangeId": "1373703080",
                                                            "editableRangeStart": {
                                                                "editRangeId": "1373703080",
                                                                "columnFirst": 0,
                                                                "columnLast": 0,
                                                                "user": "manager@mycompany.com"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 467.5,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Center",
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
                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            "title": null,
                            "description": null,
                            "tableFormat": {
                                "allowAutoFit": true,
                                "leftIndent": 0.0,
                                "tableAlignment": "Left",
                                "preferredWidthType": "Auto",
                                "borders": {
                                    "left": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "right": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "top": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "bottom": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "vertical": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "horizontal": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
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
                                "bidi": false
                            }
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": []
                        }
                    ],
                    "headersFooters": {
                        "header": {
                            "blocks": [
                                {
                                    "paragraphFormat": {
                                        "styleName": "Header"
                                    },
                                    "inlines": [
                                        {
                                            "text": "Employee’s Details "
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    "sectionFormat": {
                        "headerDistance": 36.0,
                        "footerDistance": 36.0,
                        "pageWidth": 612.0,
                        "pageHeight": 792.0,
                        "leftMargin": 72.0,
                        "rightMargin": 72.0,
                        "topMargin": 72.0,
                        "bottomMargin": 72.0,
                        "differentFirstPage": false,
                        "differentOddAndEvenPages": false,
                        "bidi": false
                    }
                }
            ],
            "characterFormat": {
                "fontSize": 11.0,
                "fontFamily": "Calibri",
                "fontSizeBidi": 11.0,
                "fontFamilyBidi": "Calibri"
            },
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
                    "next": "Normal"
                },
                {
                    "type": "Character",
                    "name": "Default Paragraph Font"
                },
                {
                    "type": "Paragraph",
                    "name": "List Paragraph",
                    "basedOn": "Normal",
                    "paragraphFormat": {
                        "leftIndent": 36.0,
                        "contextualSpacing": true
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Header",
                    "basedOn": "Normal",
                    "next": "Normal",
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
                }
            ],
            "defaultTabWidth": 36.0,
            "formatting": false,
            "protectionType": "ReadOnly",
            "enforcement": true,
            "hashValue": "TQGuJuLceQCe234Ygx4q6NFgHpRMfi1hjFTojyKzbQOkwk+ckEM9CjNIdkiUhSR/e/7sfMxO4sbPcg/DBzztMg==",
            "saltValue": "FXbkr1RtDIIIZfwlM71dMg=="
        };
        // tslint:enable   
        container.documentEditor.open(JSON.stringify(defaultDocument));
        container.documentEditor.documentName = 'Document Protection';
        titleBar.updateDocumentTitle();
        container.documentChange = (): void => {
            titleBar.updateDocumentTitle();
            container.documentEditor.focusIn();
        };
    }
}
export default DocumentProtection;