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
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var sample_base_1 = require("../common/sample-base");
var FormFilling = (function (_super) {
    __extends(FormFilling, _super);
    function FormFilling() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormFilling.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { id: "container", documentPath: "FormFillingDocument.pdf", serviceUrl: "https://ej2services.syncfusion.com/production/web-services/api/pdfviewer", style: { 'height': '640px' } },
                    React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the form filling features of PDF Viewer and allows you to edit the form fields, download and print the edited form fields PDF documents.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The PDF Viewer component enables you to view and print the PDF files. This sample demonstrate the following key features of PDF Viewer,"),
                React.createElement("ul", null,
                    React.createElement("li", null, "View the PDF document"),
                    React.createElement("li", null, "Core interactions - Scrolling, Zooming, panning and page navigation"),
                    React.createElement("li", null, "Built-in toolbar"),
                    React.createElement("li", null, "Select and copy text from PDF file"),
                    React.createElement("li", null, "Search a text easily across the PDF document"),
                    React.createElement("li", null, "Easy navigation with the help of Bookmarks, thumbnails, hyperlinks and table of contents"),
                    React.createElement("li", null, "View modes - fit to page and fit to width"),
                    React.createElement("li", null, "Print the entire document or a specific page directly from the browser.")),
                React.createElement("p", null,
                    "More information on the PDF Viewer instantiation can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                    "."))));
    };
    return FormFilling;
}(sample_base_1.SampleBase));
exports.FormFilling = FormFilling;
