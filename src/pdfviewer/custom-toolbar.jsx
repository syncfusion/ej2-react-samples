import * as React from 'react';
import { PdfViewerComponent, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Inject } from '@syncfusion/ej2-react-pdfviewer';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './pdf.component.css';
export class CustomToolbar extends SampleBase {
    constructor() {
        super(...arguments);
        this.currentPageNumber = '1';
        this.fileName = '';
        this.onPageChange = () => {
            this.currentPageNumber = this.viewer.currentPageNumber.toString();
            let inputElement = document.getElementById('currentPage');
            inputElement.value = this.currentPageNumber;
            this.updatePageNavigation();
        };
        this.documentLoaded = () => {
            var pageCount = document.getElementById('totalPage');
            pageCount.textContent = 'of ' + this.viewer.pageCount;
            this.updatePageNavigation();
        };
    }
    rendereComplete() {
        this.wireEvent();
    }
    render() {
        function template() {
            return (<div><span className='e-pv-total-page-number' id='totalPage'>of 0</span></div>);
        }
        function inputTemplate() {
            return (<div><input type='text' className='e-input-group e-pv-current-page-number' id='currentPage'/></div>);
        }
        return (<div>
            <div className='control-section'>
                <div>
                    <div className='e-pdf-toolbar'>
                        <ToolbarComponent ref={(scope) => { this.toolbar = scope; }} clicked={this.clickHandler.bind(this)}>
                            <ItemsDirective>
                                <ItemDirective prefixIcon='e-pv-open-document-icon' id='file_Open' tooltipText='Open'></ItemDirective>
                                <ItemDirective prefixIcon="e-pv-previous-page-navigation-icon" id='previous_page' tooltipText="Previous Page" align="Center"></ItemDirective>
                                <ItemDirective prefixIcon="e-pv-next-page-navigation-icon" id='next_page' tooltipText="Next Page" align="Center"></ItemDirective>
                                <ItemDirective template={inputTemplate} tooltipText="Page Number" type="Input" align="Center"></ItemDirective>
                                <ItemDirective template={template} align="Center" tooltipText="Page Number"></ItemDirective>
                                <ItemDirective prefixIcon="e-pv-print-document-icon" tooltipText="Print" id='print' align="Right"></ItemDirective>
                                <ItemDirective prefixIcon="e-pv-download-document-icon" tooltipText="Download" id='download' align="Right"></ItemDirective>
                            </ItemsDirective>
                        </ToolbarComponent>
                    </div>
                    
                    <PdfViewerComponent id="container" ref={(scope) => { this.viewer = scope; }} enableToolbar={false} enableNavigationToolbar={false} documentLoad={this.documentLoaded} pageChange={this.onPageChange} documentPath="Hive_Succinctly.pdf" serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer" style={{ 'display': 'block', 'height': '640px' }}>
                        <Inject services={[Magnification, Navigation, LinkAnnotation, BookmarkView,
            ThumbnailView, Print, TextSelection, TextSearch]}/>
                    </PdfViewerComponent>
                    <input type="file" id="fileUpload" accept=".pdf" onChange={this.readFile.bind(this)} style={{ 'display': 'block', 'visibility': 'hidden', 'width': '0', 'height': '0' }}/>
                    <div className='e-pdf-toolbar' id="magnificationToolbarItems">
                        <ToolbarComponent id="magnificationToolbar" clicked={this.clickHandler.bind(this)}>
                            <ItemsDirective>
                                <ItemDirective prefixIcon="e-pv-fit-page" id='fit_to_page' tooltipText="Fit to page"></ItemDirective>
                                <ItemDirective prefixIcon="e-pv-zoom-in-icon" id='zoom_in' tooltipText="Zoom in"></ItemDirective>
                                <ItemDirective prefixIcon="e-pv-zoom-out-sample" id='zoom_out' tooltipText="Zoom out"></ItemDirective>
                            </ItemsDirective>
                        </ToolbarComponent>
                    </div>

                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrate how to perform the PDF Viewer core functionalities using a custom toolbar.</p>
            </div>
            <div id="description">
                <p>
                    This sample demonstrate how to perform the PDF Viewer core functionalities using a custom toolbar.
                </p>
                <p>
                    In this example, you can see PDF Viewer control API in action to perform the functionalities.
                </p>
                <ul>
                    <li>Go to Previous Page - <code>viewer.navigation.goToPreviousPage()</code></li>
                    <li>Go to Next Page - <code>viewer.navigation.goToNextPage()</code></li>
                    <li>Go to Page - <code>viewer.navigation.goToPage(pageindex)</code></li>
                    <li>Print - <code>viewer.print.print()</code></li>
                    <li>Download - <code>viewer.download()</code></li>
                    <li>Fit To Page - <code>viewer.magnification.fitToPage()</code></li>
                    <li>Zoom In - <code>viewer.magnification.zoomIn()</code></li>
                    <li>Zoom Out - <code>viewer.magnification.zoomOut()</code></li>
                    <li>Load document - <code>viewer.load(fileName, password)</code></li>
                </ul>
                <p>
                    More information on the PDF Viewer instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
                      documentation section
                    </a>.
                </p>
            </div>
        </div>);
    }
    wireEvent() {
        let inputElement = document.getElementById('currentPage');
        inputElement.addEventListener('click', this.currentPageClicked.bind(this));
        inputElement.addEventListener('keypress', this.onCurrentPageBoxKeypress.bind(this));
        inputElement.value = this.currentPageNumber;
    }
    clickHandler(args) {
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
    }
    updatePageNavigation() {
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
    }
    onCurrentPageBoxKeypress(event) {
        let currentPageBox = document.getElementById('currentPage');
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
    }
    currentPageClicked() {
        let currentPage = document.getElementById('currentPage');
        currentPage.select();
    }
    readFile(evt) {
        let uploadedFiles = evt.target.files;
        let uploadedFile = uploadedFiles[0];
        this.fileName = uploadedFile.name;
        let reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        let viewer = this.viewer;
        let uploadedFileName = this.fileName;
        reader.onload = function () {
            let uploadedFileUrl = this.result;
            viewer.load(uploadedFileUrl, null);
            viewer.fileName = uploadedFileName;
            var pageCount = document.getElementById('totalPage');
            pageCount.textContent = 'of ' + viewer.pageCount;
        };
    }
}
