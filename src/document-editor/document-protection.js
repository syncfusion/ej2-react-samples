"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_documenteditor_1 = require("@syncfusion/ej2-react-documenteditor");
var title_bar_1 = require("./title-bar");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./default.component.css");
ej2_react_documenteditor_1.DocumentEditorContainerComponent.Inject(ej2_react_documenteditor_1.Toolbar);
// tslint:disable:max-line-length
var DocumentProtection = /** @class */ (function (_super) {
    __extends(DocumentProtection, _super);
    function DocumentProtection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';
        _this.userList = ['engineer@mycompany.com', 'manager@mycompany.com'];
        _this.onLoadDefault = function () {
            // tslint:disable
            var defaultDocument = {
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
            _this.container.documentEditor.open(JSON.stringify(defaultDocument));
            _this.container.documentEditor.documentName = 'Document Protection';
            _this.titleBar.updateDocumentTitle();
            _this.container.documentChange = function () {
                _this.titleBar.updateDocumentTitle();
                _this.container.documentEditor.focusIn();
            };
        };
        return _this;
    }
    DocumentProtection.prototype.rendereComplete = function () {
        this.container.serviceUrl = this.hostUrl + 'api/documenteditor/';
        this.container.showPropertiesPane = false;
        this.container.documentEditor.currentUser = 'engineer@mycompany.com';
        // this.container.documentEditor.pageOutline = '#E0E0E0';
        // this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.titleBar = new title_bar_1.TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true);
        this.onLoadDefault();
    };
    DocumentProtection.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-9 control-section" },
                React.createElement("div", { id: 'documenteditor_titlebar', className: "e-de-ctn-title" }),
                React.createElement("div", { id: "documenteditor_container_body" },
                    React.createElement(ej2_react_documenteditor_1.DocumentEditorContainerComponent, { id: "container", ref: function (scope) { _this.container = scope; }, style: { 'display': 'block', 'height': '590px' }, enableToolbar: true, locale: 'en-US' }))),
            React.createElement("div", { className: "col-lg-3 property-section" },
                React.createElement("div", { className: "property-panel-header" }, "User Permission"),
                React.createElement("table", { id: "property", title: "User Permission", style: { width: "100%", marginTop: "10px" } },
                    React.createElement("tr", null,
                        React.createElement("td", { className: "left-side" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ddlelement", dataSource: this.userList, change: this.onChange.bind(this), placeholder: "Select a game", value: this.userList[0], popupHeight: "220px" }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates document protection support in document editor to restrict the types of changes can be made to the document by a user/user group.")),
            React.createElement("div", { id: "description" },
                React.createElement("div", null,
                    React.createElement("p", null, "In this demo, the Document editor opens a protected document that includes permitted ranges for two users identified by email: each user is authorized to edit a separate text area."),
                    React.createElement("p", null, "You can switch between the current user to edit different parts by selecting dropdown list in User permissions pane."),
                    React.createElement("p", null, "User can add the user in dropdown who have editing permission in document by using addItem method."),
                    React.createElement("p", { style: { 'display': 'block' } },
                        " More information about the document editor features can be found in this ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/document-editor/" }, "documentation section.")))),
            React.createElement("script", null, window.onbeforeunload = function () {
                return 'Want to save your changes?';
            })));
    };
    DocumentProtection.prototype.onChange = function (event) {
        this.container.documentEditor.currentUser = event.value;
    };
    return DocumentProtection;
}(sample_base_1.SampleBase));
exports.DocumentProtection = DocumentProtection;
