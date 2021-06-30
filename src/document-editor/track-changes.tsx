import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);

// tslint:disable:max-line-length
export class TrackChanges extends SampleBase<{}, {}> {
    private hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    public container: DocumentEditorContainerComponent;
    public titleBar: TitleBar;
    public rendereComplete(): void {
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
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block' }}
                        height={'590px'} enableToolbar={true} locale='en-US' showPropertiesPane={false} enableTrackChanges={true}
                        userColor={'#b70f34'} currentUser={'Nancy Davolio'} />
                </div>
            </div>
            <div id="action-description">
                <p>This example demonstrates the track changes in DocumentEditor to view, make and accept or reject the changes.</p>
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
            <script>{
                window.onbeforeunload = function () {
                    return 'Want to save your changes?';
                }
            }
            </script>
        </div>);
    }
    onLoadDefault = (): void => {
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
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
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
                                    "text": "C"
                                },
                                {
                                    "text": "hapter 1 Introduction to ASP.NET Core"
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
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "A"
                                },
                                {
                                    "text": "SP",
                                    "revisionIds": [
                                        "b756b968-3c64-4455-80aa-61b916ed6f80"
                                    ]
                                },
                                {
                                    "text": "sp",
                                    "revisionIds": [
                                        "e8b50102-c9bb-4e08-b827-04728a72980f"
                                    ]
                                },
                                {
                                    "text": "."
                                },
                                {
                                    "text": "NET",
                                    "revisionIds": [
                                        "80a06038-0f6b-4a87-9dae-5518fea6c609"
                                    ]
                                },
                                {
                                    "text": "net",
                                    "revisionIds": [
                                        "2aae587d-9776-4c64-933a-4e2293edec4b"
                                    ]
                                },
                                {
                                    "text": " "
                                },
                                {
                                    "text": "c",
                                    "revisionIds": [
                                        "798ad0fd-21dc-4bdb-922f-fd9aaae7f938"
                                    ]
                                },
                                {
                                    "text": "C",
                                    "revisionIds": [
                                        "6fc9c1f4-5fbd-4857-9955-523011a8c8a7"
                                    ]
                                },
                                {
                                    "text": "ore is the web develop"
                                },
                                {
                                    "text": " framework that comes together with the ne"
                                },
                                {
                                    "text": "w .NET Core and, besides all the new features,"
                                },
                                {
                                    "text": " ",
                                    "revisionIds": [
                                        "6ef86691-b42e-4fdc-9c36-126b0d047f29"
                                    ]
                                },
                                {
                                    "text": "also adopts a significantly new approach to web development. The first chapter starts by going through the history of Microsoft's web stack to show the motivations that led to this framework. Later, it moves t"
                                },
                                {
                                    "text": "o more practical matters, like showing you how to get started with ."
                                },
                                {
                                    "text": "Net",
                                    "revisionIds": [
                                        "1a353a7a-aabf-477d-9511-142fb35343e2"
                                    ]
                                },
                                {
                                    "text": "net",
                                    "revisionIds": [
                                        "1c78faa0-3e72-48bc-b973-6f52795d10a4"
                                    ]
                                },
                                {
                                    "text": " "
                                },
                                {
                                    "text": "c",
                                    "revisionIds": [
                                        "b7e55980-4794-4edb-b3d3-15d109d9645d"
                                    ]
                                },
                                {
                                    "text": "C",
                                    "revisionIds": [
                                        "e9e9819b-f471-41f9-b146-eb8134aeaf64"
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
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "Before trying to understand the reason for its existence, let's first try to define"
                                },
                                {
                                    "text": " what .NET Core and ASP.NET Core are."
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Heading 2"
                            },
                            "inlines": [
                                {
                                    "name": "_Toc523387947",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc523388457",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015553",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015588",
                                    "bookmarkType": 0
                                },
                                {
                                    "text": ".NET Core"
                                },
                                {
                                    "name": "_Toc523387947",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc523388457",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015553",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015588",
                                    "bookmarkType": 1
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "The framework .NET Core 1.1 a is modular, cross-platform, cloud-optimized version of the .NET Framework, consisting of the "
                                },
                                {
                                    "text": "CoreCLR"
                                },
                                {
                                    "text": " and the implementation of the .NET Standard Library 1.6. One of the main feat"
                                },
                                {
                                    "text": "ures of this library is the ability to install only the features that are needed for the application you are building, reducing its footprint and the possibility of installing the library itself within the application. This makes it possible for applicatio"
                                },
                                {
                                    "text": "ns built with different versions to co-exist on the same machine without the compatibility problems typical of the full .NET Framework."
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Heading 2"
                            },
                            "inlines": [
                                {
                                    "name": "_Toc523387948",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc523388458",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015554",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_Toc42015589",
                                    "bookmarkType": 0
                                },
                                {
                                    "text": "ASP.NET Core"
                                },
                                {
                                    "name": "_Toc523387948",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc523388458",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015554",
                                    "bookmarkType": 1
                                },
                                {
                                    "name": "_Toc42015589",
                                    "bookmarkType": 1
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "ASP.NET Core is a complete rewrite of ASP.NET, built with the goal of being cross-platform, complete"
                                },
                                {
                                    "text": "ly",
                                    "revisionIds": [
                                        "0a876474-7164-4c1e-8b97-a18a855e421f"
                                    ]
                                },
                                {
                                    "text": " open"
                                },
                                {
                                    "text": "-source, and without the limitations of backward compatibility. Like .NET Core, ASP.NET Core is also built with a modular approach. This means the application you build can include only the needed features without taking on additional burdens. This is made"
                                },
                                {
                                    "text": " possible by the new startup and execution environment, based on the Open Web Interface for .NET (OWIN) standard. In addition, ASP.NET Core comes with many interesting features that we are going to see throughout the book, like an integrated dependency inj"
                                },
                                {
                                    "text": "ection system and a new application framework that unifies the programming models of ASP.NET MVC and Web API."
                                }
                            ]
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
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "Now that it is clear what ASP.NET Core and .NET Core are, and why they were created, it's time to look at how to install them and how to build a simple application with them."
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
                                        "9f6e263c-7289-4dad-9292-0455f375da73"
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
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "Installing on Windows is "
                                },
                                {
                                    "text": "pretty easy",
                                    "revisionIds": [
                                        "d6d85993-c119-4223-8299-bbfb7072bab4"
                                    ]
                                },
                                {
                                    "text": "easy",
                                    "revisionIds": [
                                        "55973d80-9fa5-4d4f-9bad-dd72e1475b6f"
                                    ]
                                },
                                {
                                    "text": ". With Visual"
                                },
                                {
                                    "text": " Studio 2017, chances are you already installed it. If not, go back to the Visual Studio Installer and make sure you have the .NET Core workload selected."
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
                                        "a3330ddc-0b35-4102-8fed-74bddc293e57"
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
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "The beauty of .NET Core is that it can also be installed on "
                                },
                                {
                                    "text": "a Mac (or Linux, for that matter) without relying on third-party frameworks, as was needed before with Mono."
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
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
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "You can read instructions specific to your distribution on the official .NET Core website. As an examp"
                                },
                                {
                                    "text": "le, we’ll show you how to install on a Mac."
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "italic": true
                            },
                            "paragraphFormat": {
                                "textAlignment": "Center",
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "Code Listing 3-1",
                                    "characterFormat": {
                                        "italic": true
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
                                                            "text": ">brew update"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "paragraphFormat": {
                                                        "styleName": "Normal"
                                                    },
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
                                                    "paragraphFormat": {
                                                        "styleName": "Normal"
                                                    },
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
                                                    "paragraphFormat": {
                                                        "styleName": "Normal"
                                                    },
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
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "Once all these pr"
                                },
                                {
                                    "text": "erequisites have been installed, you can download and install the official SDK for macOS by downloading it from the "
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
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "On Linux and Mac, you do not have Visual Studio to develop app"
                                },
                                {
                                    "text": "s, but you can use the .NET Core SDK or Visual Studio Code, which is a lightweight, extensible, cross-platform text editor built by Microsoft and the community. The last chapter of this book covers in detail each of the tools with which you can build .NET "
                                },
                                {
                                    "text": "Core apps."
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
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "The release of .NET Core has been a very difficult one, with many delays and changes in direction. While the framework is stable, with .NET Core 1.1 released in November 2016, the tooling is still in development."
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "When we wro"
                                },
                                {
                                    "text": "te this book, we relied on previews that were made available at the "
                                },
                                {
                                    "text": "Con"
                                },
                                {
                                    "name": "_GoBack",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_GoBack",
                                    "bookmarkType": 1
                                },
                                {
                                    "text": "nect("
                                },
                                {
                                    "text": "); event of November 2016, so some of the screenshots or procedures in the examples might be different from what is currently available."
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "What can we expect for the future of .NET C"
                                },
                                {
                                    "text": "ore?"
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "First, unlike previous frameworks, we "
                                },
                                {
                                    "text": "have to",
                                    "revisionIds": [
                                        "3742a158-cadf-4848-b105-ca2cbcde35c7"
                                    ]
                                },
                                {
                                    "text": "must",
                                    "revisionIds": [
                                        "666ca6c2-ac2b-49b5-bfdb-dff924672b91"
                                    ]
                                },
                                {
                                    "text": " expect a continuous release of enhanced tools, both for the CLI and for the tooling inside Visual Studio. Second, on the framework side, there will be the second big release of .NET Core 2.0, implementing "
                                },
                                {
                                    "text": ".NET Standard 2.0."
                                }
                            ]
                        },
                        {
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
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
                        "pageStartingNumber": 0
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
                "lineSpacing": 1.0791666507720948,
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
                                "fontFamily": "Symbol"
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
                                "fontFamily": "Courier New"
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
                                "fontFamily": "Wingdings"
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
                                "fontFamily": "Symbol"
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
                                "fontFamily": "Courier New"
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
                                "fontFamily": "Wingdings"
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
                                "fontFamily": "Symbol"
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
                                "fontFamily": "Courier New"
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
                                "fontFamily": "Wingdings"
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
                        "fontColor": "#2F5496FF"
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
                        "fontColor": "#2F5496FF"
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
                        "fontColor": "#1F3763FF"
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
                        "fontColor": "#2F5496FF"
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
                        "fontColor": "#2F5496FF"
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
                        "fontColor": "#1F3763FF"
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
                        "fontColor": "#2F5496FF"
                    }
                },
                {
                    "type": "Character",
                    "name": "Heading 2 Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontSize": 13.0,
                        "fontFamily": "Calibri Light",
                        "fontColor": "#2F5496FF"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Notes",
                    "basedOn": "Normal",
                    "next": "Normal",
                    "characterFormat": {
                        "bold": true
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
                        "fontFamily": "Calibri Light"
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
                        "fontFamily": "Calibri Light"
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
                    "type": "Character",
                    "name": "Heading 3 Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontSize": 12.0,
                        "fontFamily": "Calibri Light",
                        "fontColor": "#1F3763FF"
                    }
                },
                {
                    "type": "Character",
                    "name": "Heading 4 Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "italic": true,
                        "fontFamily": "Calibri Light",
                        "fontColor": "#2F5496FF"
                    }
                },
                {
                    "type": "Character",
                    "name": "Heading 5 Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontFamily": "Calibri Light",
                        "fontColor": "#2F5496FF"
                    }
                },
                {
                    "type": "Character",
                    "name": "Heading 6 Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontFamily": "Calibri Light",
                        "fontColor": "#1F3763FF"
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
                }
            ],
            "revisions": [
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "b756b968-3c64-4455-80aa-61b916ed6f80"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "e8b50102-c9bb-4e08-b827-04728a72980f"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "80a06038-0f6b-4a87-9dae-5518fea6c609"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "2aae587d-9776-4c64-933a-4e2293edec4b"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "798ad0fd-21dc-4bdb-922f-fd9aaae7f938"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "6fc9c1f4-5fbd-4857-9955-523011a8c8a7"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:35:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "6ef86691-b42e-4fdc-9c36-126b0d047f29"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "1a353a7a-aabf-477d-9511-142fb35343e2"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "1c78faa0-3e72-48bc-b973-6f52795d10a4"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "b7e55980-4794-4edb-b3d3-15d109d9645d"
                },
                {
                    "author": "Andrew Fuller",
                    "date": "2020-06-02T18:41:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "e9e9819b-f471-41f9-b146-eb8134aeaf64"
                },
                {
                    "author": "Nancy Davolio",
                    "date": "2020-06-02T18:35:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "0a876474-7164-4c1e-8b97-a18a855e421f"
                },
                {
                    "author": "Nancy Davolio",
                    "date": "2020-06-02T18:35:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "9f6e263c-7289-4dad-9292-0455f375da73"
                },
                {
                    "author": "Nancy Davolio",
                    "date": "2020-06-02T18:35:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "d6d85993-c119-4223-8299-bbfb7072bab4"
                },
                {
                    "author": "Nancy Davolio",
                    "date": "2020-06-02T18:35:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "55973d80-9fa5-4d4f-9bad-dd72e1475b6f"
                },
                {
                    "author": "Nancy Davolio",
                    "date": "2020-06-02T18:35:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "a3330ddc-0b35-4102-8fed-74bddc293e57"
                },
                {
                    "author": "Nancy Davolio",
                    "date": "2020-06-02T18:42:00Z",
                    "revisionType": "Deletion",
                    "revisionId": "3742a158-cadf-4848-b105-ca2cbcde35c7"
                },
                {
                    "author": "Nancy Davolio",
                    "date": "2020-06-02T18:42:00Z",
                    "revisionType": "Insertion",
                    "revisionId": "666ca6c2-ac2b-49b5-bfdb-dff924672b91"
                }
            ],
            "defaultTabWidth": 36.0,
            "formatting": false,
            "trackChanges": true,
            "protectionType": "NoProtection",
            "enforcement": false,
            "dontUseHTMLParagraphAutoSpacing": false
        };
        // tslint:enable        
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Track Changes';
        this.titleBar.updateDocumentTitle();
        this.container.documentChange = (): void => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };
    }
}