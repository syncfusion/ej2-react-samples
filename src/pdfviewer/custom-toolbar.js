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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./pdf.component.css");
var CustomToolbar = (function (_super) {
    __extends(CustomToolbar, _super);
    function CustomToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentPageNumber = '1';
        _this.fileName = '';
        _this.onPageChange = function () {
            _this.currentPageNumber = _this.viewer.currentPageNumber.toString();
            var inputElement = document.getElementById('currentPage');
            inputElement.value = _this.currentPageNumber;
            _this.updatePageNavigation();
        };
        _this.documentLoaded = function () {
            var pageCount = document.getElementById('totalPage');
            pageCount.textContent = 'of ' + _this.viewer.pageCount;
            _this.updatePageNavigation();
        };
        return _this;
    }
    CustomToolbar.prototype.rendereComplete = function () {
        this.wireEvent();
    };
    CustomToolbar.prototype.render = function () {
        var _this = this;
        function template() {
            return (React.createElement("div", null,
                React.createElement("span", { className: 'e-pv-total-page-number', id: 'totalPage' }, "of 0")));
        }
        function inputTemplate() {
            return (React.createElement("div", null,
                React.createElement("input", { type: 'text', className: 'e-input-group e-pv-current-page-number', id: 'currentPage' })));
        }
        return (React.createElement("div", null,
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", null,
                    React.createElement("div", { className: 'e-pdf-toolbar' },
                        React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: function (scope) { _this.toolbar = scope; }, clicked: this.clickHandler.bind(this) },
                            React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-pv-open-document-icon', id: 'file_Open', tooltipText: 'Open' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-pv-previous-page-navigation-icon", id: 'previous_page', tooltipText: "Previous Page", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-pv-next-page-navigation-icon", id: 'next_page', tooltipText: "Next Page", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { template: inputTemplate, tooltipText: "Page Number", type: "Input", align: "Center" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { template: template, align: "Center", tooltipText: "Page Number" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-pv-print-document-icon", tooltipText: "Print", id: 'print', align: "Right" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-pv-download-document-icon", tooltipText: "Download", id: 'download', align: "Right" })))),
                    React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { id: "container", ref: function (scope) { _this.viewer = scope; }, enableToolbar: false, enableNavigationToolbar: false, documentLoad: this.documentLoaded, pageChange: this.onPageChange, documentPath: "Hive_Succinctly.pdf", serviceUrl: "https://ej2services.syncfusion.com/production/web-services/api/pdfviewer", style: { 'display': 'block', 'height': '640px' } },
                        React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView,
                                ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch] })),
                    React.createElement("input", { type: "file", id: "fileUpload", accept: ".pdf", onChange: this.readFile.bind(this), style: { 'display': 'block', 'visibility': 'hidden', 'width': '0', 'height': '0' } }),
                    React.createElement("div", { className: 'e-pdf-toolbar', id: "magnificationToolbarItems" },
                        React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "magnificationToolbar", clicked: this.clickHandler.bind(this) },
                            React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-pv-fit-page", id: 'fit_to_page', tooltipText: "Fit to page" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-pv-zoom-in-icon", id: 'zoom_in', tooltipText: "Zoom in" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-pv-zoom-out-sample", id: 'zoom_out', tooltipText: "Zoom out" })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrate how to perform the PDF Viewer core functionalities using a custom toolbar.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample demonstrate how to perform the PDF Viewer core functionalities using a custom toolbar."),
                React.createElement("p", null, "In this example, you can see PDF Viewer control API in action to perform the functionalities."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Go to Previous Page - ",
                        React.createElement("code", null, "viewer.navigation.goToPreviousPage()")),
                    React.createElement("li", null,
                        "Go to Next Page - ",
                        React.createElement("code", null, "viewer.navigation.goToNextPage()")),
                    React.createElement("li", null,
                        "Go to Page - ",
                        React.createElement("code", null, "viewer.navigation.goToPage(pageindex)")),
                    React.createElement("li", null,
                        "Print - ",
                        React.createElement("code", null, "viewer.print.print()")),
                    React.createElement("li", null,
                        "Download - ",
                        React.createElement("code", null, "viewer.download()")),
                    React.createElement("li", null,
                        "Fit To Page - ",
                        React.createElement("code", null, "viewer.magnification.fitToPage()")),
                    React.createElement("li", null,
                        "Zoom In - ",
                        React.createElement("code", null, "viewer.magnification.zoomIn()")),
                    React.createElement("li", null,
                        "Zoom Out - ",
                        React.createElement("code", null, "viewer.magnification.zoomOut()")),
                    React.createElement("li", null,
                        "Load document - ",
                        React.createElement("code", null, "viewer.load(fileName, password)"))),
                React.createElement("p", null,
                    "More information on the PDF Viewer instantiation can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                    "."))));
    };
    CustomToolbar.prototype.wireEvent = function () {
        var inputElement = document.getElementById('currentPage');
        inputElement.addEventListener('click', this.currentPageClicked.bind(this));
        inputElement.addEventListener('keypress', this.onCurrentPageBoxKeypress.bind(this));
        inputElement.value = this.currentPageNumber;
    };
    CustomToolbar.prototype.clickHandler = function (args) {
        switch (args.item.id) {
            case 'file_Open':
                document.getElementById('fileUpload').click();
                break;
            case 'previous_page':
                this.viewer.navigation.goToPreviousPage();
                break;
            case 'next_page':
                this.viewer.navigation.goToNextPage();
                break;
            case 'print':
                this.viewer.print.print();
                break;
            case 'download':
                this.viewer.download();
                break;
            case 'fit_to_page':
                this.viewer.magnification.fitToPage();
                break;
            case 'zoom_in':
                this.viewer.magnification.zoomIn();
                break;
            case 'zoom_out':
                this.viewer.magnification.zoomOut();
                break;
        }
    };
    CustomToolbar.prototype.updatePageNavigation = function () {
        if (this.viewer.currentPageNumber === 1) {
            this.toolbar.enableItems(document.getElementById('previous_page').parentElement, false);
            this.toolbar.enableItems(document.getElementById('next_page').parentElement, true);
        }
        else if (this.viewer.currentPageNumber === this.viewer.pageCount) {
            this.toolbar.enableItems(document.getElementById('previous_page').parentElement, true);
            this.toolbar.enableItems(document.getElementById('next_page').parentElement, false);
        }
        else {
            this.toolbar.enableItems(document.getElementById('previous_page').parentElement, true);
            this.toolbar.enableItems(document.getElementById('next_page').parentElement, true);
        }
    };
    CustomToolbar.prototype.onCurrentPageBoxKeypress = function (event) {
        var currentPageBox = document.getElementById('currentPage');
        if ((event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 13) {
            event.preventDefault();
            return false;
        }
        else {
            var currentPageNumber = parseInt(currentPageBox.value);
            if (event.which === 13) {
                if (currentPageNumber > 0 && currentPageNumber <= this.viewer.pageCount) {
                    this.viewer.navigation.goToPage(currentPageNumber);
                }
                else {
                    currentPageBox.value = this.viewer.currentPageNumber.toString();
                }
            }
            return true;
        }
    };
    CustomToolbar.prototype.currentPageClicked = function () {
        var currentPage = document.getElementById('currentPage');
        currentPage.select();
    };
    CustomToolbar.prototype.readFile = function (evt) {
        var uploadedFiles = evt.target.files;
        var uploadedFile = uploadedFiles[0];
        this.fileName = uploadedFile.name;
        var reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        var viewer = this.viewer;
        var uploadedFileName = this.fileName;
        reader.onload = function () {
            var uploadedFileUrl = this.result;
            viewer.load(uploadedFileUrl, null);
            viewer.fileName = uploadedFileName;
            var pageCount = document.getElementById('totalPage');
            pageCount.textContent = 'of ' + viewer.pageCount;
        };
    };
    return CustomToolbar;
}(sample_base_1.SampleBase));
exports.CustomToolbar = CustomToolbar;
