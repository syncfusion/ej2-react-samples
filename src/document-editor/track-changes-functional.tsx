import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
function TrackChanges() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    const hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    let container: DocumentEditorContainerComponent;
    let titleBar: TitleBar;
    function rendereComplete(): void {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        }
        container.serviceUrl = hostUrl + 'api/documenteditor/';
        container.documentEditor.pageOutline = '#E0E0E0';
        container.documentEditor.acceptTab = true;
        container.documentEditor.resize();
        titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
        onLoadDefault();
    }
    return (<div className='control-pane'>
        <div className='control-section'>
            <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
            <div id="documenteditor_container_body">
                <DocumentEditorContainerComponent id="container" ref={(scope) => { container = scope; }} style={{ 'display': 'block' }}
                    height={'590px'} enableToolbar={true} locale='en-US' showPropertiesPane={false} enableTrackChanges={true}
                    userColor={'#b70f34'} currentUser={'Nancy Davolio'} />
            </div>
        </div>
        <div id="action-description">
            <p>This example demonstrates the track changes in DocumentEditor to view, make and accept or reject the changes. To unprotect the document, use password '123'.</p>
        </div>
        <div id="description">
            <p>In this example, you can find track changes feature in the document editor.
            </p>
            <ul>
                <li>Accept changes</li>
                <li>Reject changes</li>
                <li>Accept all</li>
                <li>Reject all</li>
            </ul>
            <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/getting-started/">documentation section.</a>
            </p>
        </div>
    </div>);
    function onLoadDefault(): void {
        // tslint:disable
        let defaultDocument: object = {
            "sections": [
                {
                    "blocks": [
                        {
                            "paragraphFormat": {
                                "styleName": "Title"
                            },
                            "inlines": [
                                {
                                    "text": "ASP.NET Core Succinctly"
                                }
                            ]
                        },
                        {
                            "inlines": []
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Heading 1"
                            },
                            "inlines": [
                                {
                                    "name": "_Toc523387945",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc523388455",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015551",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015586",
                                    "bookmarkType": 0
                                },
                                {
                                    "text": "Chapter 1 Introduction to ASP.NET Core"
                                },
                                {
                                    "name": "_Toc523387945",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc523388455",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015551",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015586",
                                    "bookmarkType": 1
                                }
                            ]
                        },
                        {
                            "inlines": [
                                {
                                    "text": "A"
                                },
                                {
                                    "text": "SP",
                                    "revisionIds": [
                                        "c8a048a0-f08e-47c6-b2c6-6e0a465270e9"
                                    ]
                                },
                                {
                                    "text": "sp",
                                    "revisionIds": [
                                        "6e8b3a04-c641-4a4f-ab05-5fe0af7a9ced"
                                    ]
                                },
                                {
                                    "text": "."
                                },
                                {
                                    "text": "NET",
                                    "revisionIds": [
                                        "6e173bd5-f421-41a3-b0ee-f67e9357fb83"
                                    ]
                                },
                                {
                                    "text": "net",
                                    "revisionIds": [
                                        "dba73704-ccd6-40bd-97ad-daa240d2b73c"
                                    ]
                                },
                                {
                                    "text": " "
                                },
                                {
                                    "text": "c",
                                    "revisionIds": [
                                        "ee4dccc8-8824-45c9-accd-f8a1bc2e3335"
                                    ]
                                },
                                {
                                    "text": "C",
                                    "revisionIds": [
                                        "ef33a8b5-2e8d-4dc3-8624-998a015b00b0"
                                    ]
                                },
                                {
                                    "text": "ore is the web develop framework that comes together with the new .NET Core and, besides all the new features,"
                                },
                                {
                                    "text": " ",
                                    "revisionIds": [
                                        "98eb2dec-fa89-4849-9d14-0b9243edf11e"
                                    ]
                                },
                                {
                                    "text": "also adopts a significantly new approach to web development. The first chapter starts by going through the history of Microsoft's web stack to show the motivations that led to this framework. Later, it moves to more practical matters, like showing you how to get started with ."
                                },
                                {
                                    "text": "Net",
                                    "revisionIds": [
                                        "16410e27-c5dd-406c-aff0-bbba788c2842"
                                    ]
                                },
                                {
                                    "text": "net",
                                    "revisionIds": [
                                        "bb2049b4-5492-44d7-aee1-761dfeeb5ace"
                                    ]
                                },
                                {
                                    "text": " "
                                },
                                {
                                    "text": "c",
                                    "revisionIds": [
                                        "cd5beda1-0830-48fc-943d-2a2eb0760a0c"
                                    ]
                                },
                                {
                                    "text": "C",
                                    "revisionIds": [
                                        "cc2b1726-9e7b-49c2-834c-5f8028130232"
                                    ]
                                },
                                {
                                    "text": "ore and describing the foundations of the framework."
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Heading 1"
                            },
                            "inlines": [
                                {
                                    "name": "_Toc523387946",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc523388456",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015552",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015587",
                                    "bookmarkType": 0
                                },
                                {
                                    "text": "Chapter 2 What are .NET Core and ASP.NET Core?"
                                },
                                {
                                    "name": "_Toc523387946",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc523388456",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015552",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015587",
                                    "bookmarkType": 1
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "revisionIds": [
                                    "9587f2be-4f9c-49d1-b660-5e111e9b337a"
                                ]
                            },
                            "inlines": [
                                {
                                    "text": "Before trying to understand the reason for its existence, "
                                },
                                {
                                    "text": "let's"
                                },
                                {
                                    "text": " first try to define what .NET Core and ASP.NET Core are."
                                }
                            ]
                        },
                        {
                            "rows": [
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 0.0,
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
                                        },
                                        "revisionIds": [
                                            "c47394e9-7244-4e9a-8c79-e6271f55910e"
                                        ]
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "revisionIds": [
                                                            "c47394e9-7244-4e9a-8c79-e6271f55910e"
                                                        ]
                                                    },
                                                    "paragraphFormat": {
                                                        "outlineLevel": "Level2",
                                                        "styleName": "Heading 2"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": ".NET Core",
                                                            "revisionIds": [
                                                                "c47394e9-7244-4e9a-8c79-e6271f55910e"
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 233.75,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
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
                                                "cellWidth": 233.75
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "revisionIds": [
                                                            "c47394e9-7244-4e9a-8c79-e6271f55910e"
                                                        ]
                                                    },
                                                    "paragraphFormat": {
                                                        "outlineLevel": "Level2",
                                                        "styleName": "Heading 2"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "ASP.NET Core",
                                                            "revisionIds": [
                                                                "c47394e9-7244-4e9a-8c79-e6271f55910e"
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 233.75,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
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
                                                "cellWidth": 233.75
                                            }
                                        }
                                    ]
                                },
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 0.0,
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
                                        },
                                        "revisionIds": [
                                            "67cf4063-129c-49a1-9938-849adaecd38a"
                                        ]
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "revisionIds": [
                                                            "67cf4063-129c-49a1-9938-849adaecd38a"
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "The framework .NET Core 1.1 a is modular, cross-platform, cloud-optimized version of the .NET Framework, consisting of the ",
                                                            "revisionIds": [
                                                                "67cf4063-129c-49a1-9938-849adaecd38a"
                                                            ]
                                                        },
                                                        {
                                                            "text": "CoreCLR",
                                                            "revisionIds": [
                                                                "67cf4063-129c-49a1-9938-849adaecd38a"
                                                            ]
                                                        },
                                                        {
                                                            "text": " and the implementation of the .NET Standard Library 1.6. One of the main features of this library is the ability to install only the features that are needed for the application you are building, reducing its footprint and the possibility of installing the library itself within the application.",
                                                            "revisionIds": [
                                                                "67cf4063-129c-49a1-9938-849adaecd38a"
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 233.75,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
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
                                                "cellWidth": 233.75
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "revisionIds": [
                                                            "67cf4063-129c-49a1-9938-849adaecd38a"
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "ASP.NET Core is a complete rewrite of ASP.NET, built with the goal of being cross-platform, completely open-source, and without the limitations of backward compatibility. Like .NET Core, ASP.NET Core is also built with a modular approach. This means the application you build can include only the needed features without taking on additional burdens.",
                                                            "revisionIds": [
                                                                "67cf4063-129c-49a1-9938-849adaecd38a"
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 233.75,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
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
                                                "cellWidth": 233.75
                                            }
                                        }
                                    ]
                                },
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 0.0,
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
                                        },
                                        "revisionIds": [
                                            "1f42c8b7-753a-4bfa-952b-88116a8e466b"
                                        ]
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "revisionIds": [
                                                            "1f42c8b7-753a-4bfa-952b-88116a8e466b"
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "This makes it possible for applications built with different versions to co-exist on the same machine without the compatibility problems typical of the full .NET Framework.",
                                                            "revisionIds": [
                                                                "1f42c8b7-753a-4bfa-952b-88116a8e466b"
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 233.75,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
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
                                                "cellWidth": 233.75
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "revisionIds": [
                                                            "1f42c8b7-753a-4bfa-952b-88116a8e466b"
                                                        ]
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "This is made possible by the new startup and execution environment, based on the Open Web Interface for .NET (OWIN) standard. In addition, ASP.NET Core comes with many interesting features that we are going to see throughout the book, like an integrated dependency injection system and a new application framework that unifies the programming models of ASP.NET MVC and Web API.",
                                                            "revisionIds": [
                                                                "1f42c8b7-753a-4bfa-952b-88116a8e466b"
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 233.75,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
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
                                                "cellWidth": 233.75
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
                                        "hasNoneStyle": false,
                                        "color": "#000000FF"
                                    },
                                    "right": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false,
                                        "color": "#000000FF"
                                    },
                                    "top": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false,
                                        "color": "#000000FF"
                                    },
                                    "bottom": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false,
                                        "color": "#000000FF"
                                    },
                                    "vertical": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false,
                                        "color": "#000000FF"
                                    },
                                    "horizontal": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false,
                                        "color": "#000000FF"
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
                                "bidi": false,
                                "horizontalPositionAbs": "Left",
                                "horizontalPosition": 0.0
                            }
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Heading 1"
                            },
                            "inlines": [
                                {
                                    "name": "_Toc523387949",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc523388459",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015555",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015590",
                                    "bookmarkType": 0
                                },
                                {
                                    "text": "Chapter 3 Getting Started with .NET Core"
                                },
                                {
                                    "name": "_Toc523387949",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc523388459",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015555",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015590",
                                    "bookmarkType": 1
                                }
                            ]
                        },
                        {
                            "inlines": [
                                {
                                    "text": "Now that it is clear what ASP.NET Core and .NET Core are, and why they were created, "
                                },
                                {
                                    "text": "it's"
                                },
                                {
                                    "text": " time to look at how to install them and how to build a simple application with them."
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Heading 2"
                            },
                            "inlines": [
                                {
                                    "name": "_Toc523387950",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc523388460",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015556",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015591",
                                    "bookmarkType": 0
                                },
                                {
                                    "text": "Install"
                                },
                                {
                                    "text": "ing",
                                    "revisionIds": [
                                        "59d0ced2-f763-494c-9d02-bbcf2d3c53e1"
                                    ]
                                },
                                {
                                    "text": " .NET Core on Windows"
                                },
                                {
                                    "name": "_Toc523387950",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc523388460",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015556",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015591",
                                    "bookmarkType": 1
                                }
                            ]
                        },
                        {
                            "inlines": [
                                {
                                    "text": "Installing on Windows is "
                                },
                                {
                                    "text": "pretty easy",
                                    "revisionIds": [
                                        "6826474c-e3f2-4099-a4a7-0b342802c112"
                                    ]
                                },
                                {
                                    "text": "easy",
                                    "revisionIds": [
                                        "d708f14b-4342-4ca2-8ed9-fefd1a21c51d"
                                    ]
                                },
                                {
                                    "text": ". With Visual Studio 2017, chances are you already installed it. If not, go back to the Visual Studio Installer and make sure you have the .NET Core workload selected."
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Heading 2"
                            },
                            "inlines": [
                                {
                                    "name": "_Toc523387951",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc523388461",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015557",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015592",
                                    "bookmarkType": 0
                                },
                                {
                                    "text": "Install"
                                },
                                {
                                    "text": "ing",
                                    "revisionIds": [
                                        "b63c68ba-698b-411f-82d1-4dbf314bd202"
                                    ]
                                },
                                {
                                    "text": " .NET Core on a Mac (or Linux)"
                                },
                                {
                                    "name": "_Toc523387951",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc523388461",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015557",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015592",
                                    "bookmarkType": 1
                                }
                            ]
                        },
                        {
                            "inlines": [
                                {
                                    "text": "The beauty of .NET Core is that it can also be installed on a Mac (or Linux, for that matter) without relying on third-party frameworks, as was needed before with Mono."
                                }
                            ]
                        },
                        {
                            "inlines": [
                                {
                                    "text": "Each distribution of Linux has its own individual way of installing, but in the end, the process boils down to the same principles:"
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "List Paragraph",
                                "listFormat": {
                                    "listLevelNumber": 0,
                                    "listId": 0
                                }
                            },
                            "inlines": [
                                {
                                    "text": "Install prerequisites and configure the package manager of your distribution."
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "List Paragraph",
                                "listFormat": {
                                    "listLevelNumber": 0,
                                    "listId": 0
                                }
                            },
                            "inlines": [
                                {
                                    "text": "Invoke the package manager to download and install .NET Core and its tools."
                                }
                            ]
                        },
                        {
                            "inlines": [
                                {
                                    "text": "You can read instructions specific to your distribution on the official .NET Core website. As an example, "
                                },
                                {
                                    "text": "we’ll"
                                },
                                {
                                    "text": " show you how to install on a Mac."
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "italic": true,
                                "italicBidi": true
                            },
                            "paragraphFormat": {
                                "textAlignment": "Center"
                            },
                            "inlines": [
                                {
                                    "text": "Code Listing 3-1",
                                    "characterFormat": {
                                        "italic": true,
                                        "italicBidi": true
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
                                        "height": 1.0,
                                        "heightType": "AtLeast",
                                        "borders": {
                                            "left": {
                                                "lineStyle": "Single",
                                                "lineWidth": 0.5,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false,
                                                "color": "#000000FF"
                                            },
                                            "right": {
                                                "lineStyle": "Single",
                                                "lineWidth": 0.5,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false,
                                                "color": "#000000FF"
                                            },
                                            "top": {
                                                "lineStyle": "Single",
                                                "lineWidth": 0.5,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false,
                                                "color": "#000000FF"
                                            },
                                            "bottom": {
                                                "lineStyle": "Single",
                                                "lineWidth": 0.5,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false,
                                                "color": "#000000FF"
                                            },
                                            "vertical": {
                                                "lineStyle": "Single",
                                                "lineWidth": 0.5,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false,
                                                "color": "#000000FF"
                                            },
                                            "horizontal": {
                                                "lineStyle": "Single",
                                                "lineWidth": 0.5,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false,
                                                "color": "#000000FF"
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
                                                    "inlines": [
                                                        {
                                                            "text": ">brew update"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "inlines": [
                                                        {
                                                            "text": ">brew install "
                                                        },
                                                        {
                                                            "text": "openssl"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "inlines": [
                                                        {
                                                            "text": ">ln -s /"
                                                        },
                                                        {
                                                            "text": "usr"
                                                        },
                                                        {
                                                            "text": "/local/opt/"
                                                        },
                                                        {
                                                            "text": "openssl"
                                                        },
                                                        {
                                                            "text": "/lib/libcrypto.1.0.0.dylib /"
                                                        },
                                                        {
                                                            "text": "usr"
                                                        },
                                                        {
                                                            "text": "/local/lib/"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "inlines": [
                                                        {
                                                            "text": ">ln -s /"
                                                        },
                                                        {
                                                            "text": "usr"
                                                        },
                                                        {
                                                            "text": "/local/opt/"
                                                        },
                                                        {
                                                            "text": "openssl"
                                                        },
                                                        {
                                                            "text": "/lib/libssl.1.0.0.dylib /"
                                                        },
                                                        {
                                                            "text": "usr"
                                                        },
                                                        {
                                                            "text": "/local/lib/"
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 467.5,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
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
                                                "cellWidth": 467.5
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
                                        "hasNoneStyle": false,
                                        "color": "#000000FF"
                                    },
                                    "right": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false,
                                        "color": "#000000FF"
                                    },
                                    "top": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false,
                                        "color": "#000000FF"
                                    },
                                    "bottom": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false,
                                        "color": "#000000FF"
                                    },
                                    "vertical": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false,
                                        "color": "#000000FF"
                                    },
                                    "horizontal": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false,
                                        "color": "#000000FF"
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
                                "bidi": false,
                                "horizontalPositionAbs": "Left",
                                "horizontalPosition": 0.0
                            }
                        },
                        {
                            "inlines": []
                        },
                        {
                            "inlines": [
                                {
                                    "text": "Once all these prerequisites have been installed, you can download and install the official SDK for macOS by downloading it from the "
                                },
                                {
                                    "hasFieldEnd": true,
                                    "fieldType": 0
                                },
                                {
                                    "text": "HYPERLINK \"https://www.microsoft.com/net/core\" "
                                },
                                {
                                    "fieldType": 2
                                },
                                {
                                    "text": "official .NET Core website",
                                    "characterFormat": {
                                        "styleName": "Hyperlink"
                                    }
                                },
                                {
                                    "fieldType": 1
                                },
                                {
                                    "text": "."
                                }
                            ]
                        },
                        {
                            "inlines": [
                                {
                                    "text": "On Linux and Mac, you do not have Visual Studio to develop apps, but you can use the .NET Core SDK or Visual Studio Code, which is a lightweight, extensible, cross-platform text editor built by Microsoft and the community. The last chapter of this book covers in detail each of the tools with which you can build .NET Core apps."
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Heading 1"
                            },
                            "inlines": [
                                {
                                    "name": "_Toc523387952",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc523388462",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015558",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015593",
                                    "bookmarkType": 0
                                },
                                {
                                    "text": "A Look at the Future"
                                },
                                {
                                    "name": "_Toc523387952",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc523388462",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015558",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015593",
                                    "bookmarkType": 1
                                }
                            ]
                        },
                        {
                            "inlines": [
                                {
                                    "text": "The release of .NET Core has been a very difficult one, with many delays and changes in direction. While the framework is stable, with .NET Core 1.1 released in November 2016, the tooling is still in development."
                                }
                            ]
                        },
                        {
                            "inlines": [
                                {
                                    "text": "When we wrote this book, we relied on previews that were made available at the "
                                },
                                {
                                    "text": "Connect("
                                },
                                {
                                    "text": "); event of November 2016, so some of the screenshots or procedures in the examples might be different from what is currently available."
                                }
                            ]
                        },
                        {
                            "inlines": [
                                {
                                    "text": "What can we expect for the future of .NET Core?"
                                }
                            ]
                        },
                        {
                            "inlines": [
                                {
                                    "text": "First, unlike previous frameworks, we "
                                },
                                {
                                    "text": "have to",
                                    "revisionIds": [
                                        "c8366f2d-254f-436f-bd43-dbb82507fcf2"
                                    ]
                                },
                                {
                                    "text": "must",
                                    "revisionIds": [
                                        "1dd2f9c1-88ce-4d21-b835-6e59f94c5982"
                                    ]
                                },
                                {
                                    "text": " expect a continuous release of enhanced tools, both for the CLI and for the tooling inside Visual Studio. Second, on the framework side, there will be the second big release of .NET Core 2.0, implementing .NET Standard 2.0."
                                }
                            ]
                        },
                        {
                            "inlines": [
                                {
                                    "text": "But rest assured that Microsoft sees .NET Core as the future of .NET for the next 10 years, so this is the right time to jump in and start learning this new technology."
                                }
                            ]
                        }
                    ],
                    "headersFooters": {},
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
                        "bidi": false,
                        "restartPageNumbering": false,
                        "pageStartingNumber": 0,
                        "endnoteNumberFormat": "LowerCaseRoman",
                        "footNoteNumberFormat": "Arabic",
                        "restartIndexForFootnotes": "DoNotRestart",
                        "restartIndexForEndnotes": "DoNotRestart",
                        "pageNumberStyle": "Arabic",
                        "columns": {
                            "column": [
                                {
                                    "width": 468.0,
                                    "space": 0.0
                                }
                            ],
                            "numberOfColumns": 1,
                            "equalWidth": true
                        }
                    }
                }
            ],
            "characterFormat": {
                "fontSize": 11.0,
                "fontFamily": "Calibri",
                "fontColor": "#000000FF",
                "fontSizeBidi": 11.0,
                "fontFamilyBidi": "Calibri"
            },
            "paragraphFormat": {
                "afterSpacing": 8.0,
                "lineSpacing": 1.0791666507720947,
                "lineSpacingType": "Multiple"
            },
            "lists": [
                {
                    "listId": 0,
                    "abstractListId": 0
                }
            ],
            "abstractLists": [
                {
                    "abstractListId": 0,
                    "levels": [
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "",
                            "characterFormat": {
                                "fontFamily": "Symbol",
                                "fontFamilyBidi": "Symbol"
                            },
                            "paragraphFormat": {
                                "leftIndent": 36.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "o",
                            "characterFormat": {
                                "fontFamily": "Courier New",
                                "fontFamilyBidi": "Courier New"
                            },
                            "paragraphFormat": {
                                "leftIndent": 72.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "",
                            "characterFormat": {
                                "fontFamily": "Wingdings",
                                "fontFamilyBidi": "Wingdings"
                            },
                            "paragraphFormat": {
                                "leftIndent": 108.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "",
                            "characterFormat": {
                                "fontFamily": "Symbol",
                                "fontFamilyBidi": "Symbol"
                            },
                            "paragraphFormat": {
                                "leftIndent": 144.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "o",
                            "characterFormat": {
                                "fontFamily": "Courier New",
                                "fontFamilyBidi": "Courier New"
                            },
                            "paragraphFormat": {
                                "leftIndent": 180.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "",
                            "characterFormat": {
                                "fontFamily": "Wingdings",
                                "fontFamilyBidi": "Wingdings"
                            },
                            "paragraphFormat": {
                                "leftIndent": 216.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "",
                            "characterFormat": {
                                "fontFamily": "Symbol",
                                "fontFamilyBidi": "Symbol"
                            },
                            "paragraphFormat": {
                                "leftIndent": 252.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "o",
                            "characterFormat": {
                                "fontFamily": "Courier New",
                                "fontFamilyBidi": "Courier New"
                            },
                            "paragraphFormat": {
                                "leftIndent": 288.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "",
                            "characterFormat": {
                                "fontFamily": "Wingdings",
                                "fontFamilyBidi": "Wingdings"
                            },
                            "paragraphFormat": {
                                "leftIndent": 324.0,
                                "firstLineIndent": -18.0
                            }
                        }
                    ]
                }
            ],
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
                    "type": "Paragraph",
                    "name": "Heading 1",
                    "basedOn": "Normal",
                    "next": "Normal",
                    "link": "Heading 1 Char",
                    "characterFormat": {
                        "fontSize": 16.0,
                        "fontFamily": "Calibri Light",
                        "fontColor": "#2F5496FF",
                        "fontSizeBidi": 16.0,
                        "fontFamilyBidi": "Calibri Light"
                    },
                    "paragraphFormat": {
                        "beforeSpacing": 12.0,
                        "afterSpacing": 0.0,
                        "outlineLevel": "Level1"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Heading 2",
                    "basedOn": "Normal",
                    "next": "Normal",
                    "link": "Heading 2 Char",
                    "characterFormat": {
                        "fontSize": 13.0,
                        "fontFamily": "Calibri Light",
                        "fontColor": "#2F5496FF",
                        "fontSizeBidi": 13.0,
                        "fontFamilyBidi": "Calibri Light"
                    },
                    "paragraphFormat": {
                        "beforeSpacing": 2.0,
                        "afterSpacing": 0.0,
                        "outlineLevel": "Level2"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Heading 3",
                    "basedOn": "Normal",
                    "next": "Normal",
                    "link": "Heading 3 Char",
                    "characterFormat": {
                        "fontSize": 12.0,
                        "fontFamily": "Calibri Light",
                        "fontColor": "#1F3763FF",
                        "fontSizeBidi": 12.0,
                        "fontFamilyBidi": "Calibri Light"
                    },
                    "paragraphFormat": {
                        "beforeSpacing": 2.0,
                        "afterSpacing": 0.0,
                        "outlineLevel": "Level3"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Heading 4",
                    "basedOn": "Normal",
                    "next": "Normal",
                    "link": "Heading 4 Char",
                    "characterFormat": {
                        "italic": true,
                        "fontFamily": "Calibri Light",
                        "fontColor": "#2F5496FF",
                        "italicBidi": true,
                        "fontFamilyBidi": "Calibri Light"
                    },
                    "paragraphFormat": {
                        "beforeSpacing": 2.0,
                        "afterSpacing": 0.0,
                        "outlineLevel": "Level4"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Heading 5",
                    "basedOn": "Normal",
                    "next": "Normal",
                    "link": "Heading 5 Char",
                    "characterFormat": {
                        "fontFamily": "Calibri Light",
                        "fontColor": "#2F5496FF",
                        "fontFamilyBidi": "Calibri Light"
                    },
                    "paragraphFormat": {
                        "beforeSpacing": 2.0,
                        "afterSpacing": 0.0,
                        "outlineLevel": "Level5"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Heading 6",
                    "basedOn": "Normal",
                    "next": "Normal",
                    "link": "Heading 6 Char",
                    "characterFormat": {
                        "fontFamily": "Calibri Light",
                        "fontColor": "#1F3763FF",
                        "fontFamilyBidi": "Calibri Light"
                    },
                    "paragraphFormat": {
                        "beforeSpacing": 2.0,
                        "afterSpacing": 0.0,
                        "outlineLevel": "Level6"
                    }
                },
                {
                    "type": "Character",
                    "name": "Default Paragraph Font"
                },
                {
                    "type": "Character",
                    "name": "Heading 1 Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontSize": 16.0,
                        "fontFamily": "Calibri Light",
                        "fontColor": "#2F5496FF",
                        "fontSizeBidi": 16.0,
                        "fontFamilyBidi": "Calibri Light"
                    }
                },
                {
                    "type": "Character",
                    "name": "Heading 2 Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontSize": 13.0,
                        "fontFamily": "Calibri Light",
                        "fontColor": "#2F5496FF",
                        "fontSizeBidi": 13.0,
                        "fontFamilyBidi": "Calibri Light"
                    }
                },
                {
                    "type": "Character",
                    "name": "Heading 3 Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontSize": 12.0,
                        "fontFamily": "Calibri Light",
                        "fontColor": "#1F3763FF",
                        "fontSizeBidi": 12.0,
                        "fontFamilyBidi": "Calibri Light"
                    }
                },
                {
                    "type": "Character",
                    "name": "Heading 4 Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "italic": true,
                        "fontFamily": "Calibri Light",
                        "fontColor": "#2F5496FF",
                        "italicBidi": true,
                        "fontFamilyBidi": "Calibri Light"
                    }
                },
                {
                    "type": "Character",
                    "name": "Heading 5 Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontFamily": "Calibri Light",
                        "fontColor": "#2F5496FF",
                        "fontFamilyBidi": "Calibri Light"
                    }
                },
                {
                    "type": "Character",
                    "name": "Heading 6 Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontFamily": "Calibri Light",
                        "fontColor": "#1F3763FF",
                        "fontFamilyBidi": "Calibri Light"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Notes",
                    "basedOn": "Normal",
                    "next": "Normal",
                    "characterFormat": {
                        "bold": true,
                        "boldBidi": true
                    },
                    "paragraphFormat": {
                        "afterSpacing": 6.0,
                        "lineSpacing": 1.0,
                        "lineSpacingType": "Multiple"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "List Paragraph",
                    "basedOn": "Normal",
                    "next": "List Paragraph",
                    "paragraphFormat": {
                        "leftIndent": 36.0
                    }
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
                    "type": "Character",
                    "name": "Unresolved Mention",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontColor": "#808080FF"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Title",
                    "basedOn": "Normal",
                    "next": "Normal",
                    "link": "Title Char",
                    "characterFormat": {
                        "fontSize": 28.0,
                        "fontFamily": "Calibri Light",
                        "fontSizeBidi": 28.0,
                        "fontFamilyBidi": "Calibri Light"
                    },
                    "paragraphFormat": {
                        "afterSpacing": 0.0,
                        "lineSpacing": 1.0,
                        "lineSpacingType": "Multiple"
                    }
                },
                {
                    "type": "Character",
                    "name": "Title Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontSize": 28.0,
                        "fontFamily": "Calibri Light",
                        "fontSizeBidi": 28.0,
                        "fontFamilyBidi": "Calibri Light"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "TOC Heading",
                    "basedOn": "Heading 1",
                    "next": "Normal",
                    "paragraphFormat": {
                        "outlineLevel": "BodyText"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "TOC 1",
                    "basedOn": "Normal",
                    "next": "Normal",
                    "paragraphFormat": {
                        "afterSpacing": 5.0
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "TOC 2",
                    "basedOn": "Normal",
                    "next": "Normal",
                    "paragraphFormat": {
                        "leftIndent": 11.0,
                        "afterSpacing": 5.0
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Balloon Text",
                    "basedOn": "Normal",
                    "next": "Balloon Text",
                    "link": "Balloon Text Char",
                    "characterFormat": {
                        "fontSize": 9.0,
                        "fontFamily": "Segoe UI",
                        "fontSizeBidi": 9.0,
                        "fontFamilyBidi": "Segoe UI"
                    },
                    "paragraphFormat": {
                        "afterSpacing": 0.0,
                        "lineSpacing": 1.0,
                        "lineSpacingType": "Multiple"
                    }
                },
                {
                    "type": "Character",
                    "name": "Balloon Text Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontSize": 9.0,
                        "fontFamily": "Segoe UI",
                        "fontSizeBidi": 9.0,
                        "fontFamilyBidi": "Segoe UI"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Revision",
                    "next": "Revision",
                    "paragraphFormat": {
                        "afterSpacing": 0.0,
                        "lineSpacing": 1.0,
                        "lineSpacingType": "Multiple"
                    }
                }
            ],
            "revisions": [
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "c8a048a0-f08e-47c6-b2c6-6e0a465270e9"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "6e8b3a04-c641-4a4f-ab05-5fe0af7a9ced"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "6e173bd5-f421-41a3-b0ee-f67e9357fb83"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "dba73704-ccd6-40bd-97ad-daa240d2b73c"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "ee4dccc8-8824-45c9-accd-f8a1bc2e3335"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "ef33a8b5-2e8d-4dc3-8624-998a015b00b0"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:35:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "98eb2dec-fa89-4849-9d14-0b9243edf11e"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "16410e27-c5dd-406c-aff0-bbba788c2842"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "bb2049b4-5492-44d7-aee1-761dfeeb5ace"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "cd5beda1-0830-48fc-943d-2a2eb0760a0c"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "cc2b1726-9e7b-49c2-834c-5f8028130232"
                },
                {
                    "author": "Nancy Davolio",
                    "date": "2020-06-02T18:35:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "59d0ced2-f763-494c-9d02-bbcf2d3c53e1"
                },
                {
                    "author": "Nancy Davolio",
                    "date": "2020-06-02T18:35:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "6826474c-e3f2-4099-a4a7-0b342802c112"
                },
                {
                    "author": "Nancy Davolio",
                    "date": "2020-06-02T18:35:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "d708f14b-4342-4ca2-8ed9-fefd1a21c51d"
                },
                {
                    "author": "Nancy Davolio",
                    "date": "2020-06-02T18:35:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "b63c68ba-698b-411f-82d1-4dbf314bd202"
                },
                {
                    "author": "Nancy Davolio",
                    "date": "2020-06-02T18:42:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "c8366f2d-254f-436f-bd43-dbb82507fcf2"
                },
                {
                    "author": "Nancy Davolio",
                    "date": "2020-06-02T18:42:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "1dd2f9c1-88ce-4d21-b835-6e59f94c5982"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2022-06-03T13:26:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "c47394e9-7244-4e9a-8c79-e6271f55910e"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2022-06-03T13:26:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "67cf4063-129c-49a1-9938-849adaecd38a"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2022-06-03T13:26:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "1f42c8b7-753a-4bfa-952b-88116a8e466b"
                }
            ],
            "defaultTabWidth": 36.0,
            "formatting": false,
            "trackChanges": true,
            "protectionType": "RevisionsOnly",
            "enforcement": true,
            "hashValue": "qsJNK7sBSNTNNOWtooTdYccSjsrjY46Sb3hjTApSGsgusNsre1M2WK4vo9JCbCo1Iict/7S82fqVCdAxBhU+Dg==",
            "saltValue": "weL9KagXkQLvlCzyaFMPcQ==",
            "cryptProviderType": "rsaAES",
            "cryptAlgorithmClass": "hash",
            "cryptAlgorithmType": "typeAny",
            "cryptAlgorithmSid": "14",
            "cryptSpinCount": "100000",
            "dontUseHTMLParagraphAutoSpacing": false,
            "alignTablesRowByRow": false,
            "formFieldShading": true,
            "footnotes": {
                "separator": [
                    {
                        "inlines": [
                            {
                                "text": "\u0003"
                            }
                        ]
                    }
                ],
                "continuationSeparator": [
                    {
                        "inlines": [
                            {
                                "text": "\u0004"
                            }
                        ]
                    }
                ],
                "continuationNotice": [
                    {
                        "inlines": []
                    }
                ]
            },
            "endnotes": {
                "separator": [
                    {
                        "inlines": [
                            {
                                "text": "\u0003"
                            }
                        ]
                    }
                ],
                "continuationSeparator": [
                    {
                        "inlines": [
                            {
                                "text": "\u0004"
                            }
                        ]
                    }
                ],
                "continuationNotice": [
                    {
                        "inlines": []
                    }
                ]
            },
            "compatibilityMode": "Word2013"
        };
        // tslint:enable        
        container.documentEditor.open(JSON.stringify(defaultDocument));
        container.documentEditor.documentName = 'Track Changes';
        titleBar.updateDocumentTitle();
        container.documentChange = (): void => {
            titleBar.updateDocumentTitle();
            container.documentEditor.focusIn();
        };
    }
}
export default TrackChanges;