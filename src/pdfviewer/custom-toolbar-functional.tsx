/**
 * Custom toolbar sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection, TextSearch, Inject
} from '@syncfusion/ej2-react-pdfviewer';
import { ToolbarComponent, ItemsDirective, ItemDirective, ClickEventArgs } from '@syncfusion/ej2-react-navigations';
import { updateSampleSection } from '../common/sample-base';
import { RouteComponentProps } from 'react-router';
import './pdf.component.css';

function CustomToolbar() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let viewer: PdfViewerComponent;
    let toolbar: ToolbarComponent;
    let currentPageNumber: string = '1';
    let fileName: string = '';
    function rendereComplete() {
        wireEvent();
    }
    function template() {
        return (
            <div ><span className='e-pv-total-page-number' id='totalPage'>of 0</span></div>
        );
    }
    function inputTemplate() {
        return (
            <div><input type='text' className='e-input-group e-pv-current-page-number' id='currentPage' /></div>
        );
    }
    return (<div>
        <div className='control-section'>
            <div>
                <div className='e-pdf-toolbar'>
                    <ToolbarComponent ref={(scope) => { toolbar = scope; }} clicked={clickHandler.bind(this)}>
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
                {/* Render the PDF Viewer */}
                <PdfViewerComponent id="container" ref={(scope) => { viewer = scope; }} enableToolbar={false} enableNavigationToolbar={false}
                    documentLoad={documentLoaded}
                    pageChange={onPageChange}
                    documentPath="Hive_Succinctly.pdf"
                    serviceUrl="https://services.syncfusion.com/react/production/api/pdfviewer"
                    style={{ 'display': 'block', 'height': '640px' }}>
                    <Inject services={[Magnification, Navigation, LinkAnnotation, BookmarkView,
                        ThumbnailView, Print, TextSelection, TextSearch]} />
                </PdfViewerComponent>
                <input type="file" id="fileUpload" accept=".pdf" onChange={readFile.bind(this)} style={{ 'display': 'block', 'visibility': 'hidden', 'width': '0', 'height': '0' }} />
                <div className='e-pdf-toolbar' id="magnificationToolbarItems">
                    <ToolbarComponent id="magnificationToolbar" clicked={clickHandler.bind(this)}>
                        <ItemsDirective >
                            <ItemDirective prefixIcon="e-pv-fit-page" id='fit_to_page' tooltipText="Fit to page" ></ItemDirective>
                            <ItemDirective prefixIcon="e-pv-zoom-in-icon" id='zoom_in' tooltipText="Zoom in"></ItemDirective>
                            <ItemDirective prefixIcon="e-pv-zoom-out-sample" id='zoom_out' tooltipText="Zoom out" ></ItemDirective>
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
    </div>
    );
    function wireEvent() {
        let inputElement: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
        inputElement.addEventListener('click', currentPageClicked.bind(this));
        inputElement.addEventListener('keypress', onCurrentPageBoxKeypress.bind(this));
        inputElement.value = currentPageNumber;
    }
    function onPageChange() {
        currentPageNumber = viewer.currentPageNumber.toString();
        let inputElement: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
        inputElement.value = currentPageNumber;
        updatePageNavigation();
    }
    function clickHandler(args: ClickEventArgs) {
        switch (args.item.id) {
            case 'file_Open':
                document.getElementById('fileUpload').click();
                break;
            case 'previous_page':
                viewer.navigation.goToPreviousPage();
                break;
            case 'next_page':
                viewer.navigation.goToNextPage();
                break;
            case 'print':
                viewer.print.print();
                break;
            case 'download':
                viewer.download();
                break;
            case 'fit_to_page':
                viewer.magnification.fitToPage();
                break;
            case 'zoom_in':
                viewer.magnification.zoomIn();
                break;
            case 'zoom_out':
                viewer.magnification.zoomOut();
                break;
        }
    }
    function documentLoaded() {
        var pageCount = document.getElementById('totalPage');
        pageCount.textContent = 'of ' + viewer.pageCount;
        updatePageNavigation();
        let inputElement: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
        inputElement.addEventListener('click', currentPageClicked.bind(this));
        inputElement.addEventListener(
            'keypress',
            onCurrentPageBoxKeypress.bind(this)
        );
        inputElement.value = "1";
    }
    function updatePageNavigation() {
        if (viewer.currentPageNumber === 1) {
            toolbar.enableItems(document.getElementById('previous_page').parentElement, false);
            toolbar.enableItems(document.getElementById('next_page').parentElement, true);
        } else if (viewer.currentPageNumber === viewer.pageCount) {
            toolbar.enableItems(document.getElementById('previous_page').parentElement, true);
            toolbar.enableItems(document.getElementById('next_page').parentElement, false);
        } else {
            toolbar.enableItems(document.getElementById('previous_page').parentElement, true);
            toolbar.enableItems(document.getElementById('next_page').parentElement, true);
        }
    }
    function onCurrentPageBoxKeypress(event) {
        let currentPageBox: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
        if ((event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 13) {
            event.preventDefault();
            return false;
        }
        else {
            var currentPageNumber = parseInt(currentPageBox.value);
            if (event.which === 13) {
                if (currentPageNumber > 0 && currentPageNumber <= viewer.pageCount) {
                    viewer.navigation.goToPage(currentPageNumber);
                }
                else {
                    currentPageBox.value = viewer.currentPageNumber.toString();
                }
            }
            return true;
        }
    }
    function currentPageClicked() {
        let currentPage: HTMLInputElement = document.getElementById('currentPage') as HTMLInputElement;
        currentPage.select();
    }
    function readFile(evt) {
        let uploadedFiles = evt.target.files;
        let uploadedFile = uploadedFiles[0];
        fileName = uploadedFile.name;
        let reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        let uploadedFileName: string = fileName;
        reader.onload = function (e) {
            let uploadedFileUrl: string = (e.currentTarget as any).result;
            viewer.load(uploadedFileUrl, null);
            viewer.downloadFileName = viewer.fileName = uploadedFileName;
            var pageCount = document.getElementById('totalPage');
            pageCount.textContent = 'of ' + viewer.pageCount;
        }
    }
}
export default CustomToolbar;


