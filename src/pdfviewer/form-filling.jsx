import * as React from 'react';
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, Inject } from '@syncfusion/ej2-react-pdfviewer';
import { SampleBase } from '../common/sample-base';
export class FormFilling extends SampleBase {
    render() {
        return (<div>
        <div className='control-section'>
            
            <PdfViewerComponent id="container" documentPath="FormFillingDocument.pdf" serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer" style={{ 'height': '640px' }}>
                <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields]}/>
            </PdfViewerComponent>
          </div>
        <div id="action-description">
        <p>This sample demonstrates the form filling features of PDF Viewer and allows you to edit the form fields, download and print the edited form fields PDF documents.</p>
        </div>
 
        <div id="description">
        <p>
        The PDF Viewer component enables you to view and print the PDF files. This sample demonstrate the following key features of PDF Viewer,
        </p>
        <ul>
        <li>View the PDF document</li>
        <li>Core interactions - Scrolling, Zooming, panning and page navigation</li>
        <li>Built-in toolbar</li>
        <li>Select and copy text from PDF file</li>
        <li>Search a text easily across the PDF document</li>
        <li>Easy navigation with the help of Bookmarks, thumbnails, hyperlinks and table of contents</li>
        <li>View modes - fit to page and fit to width</li>
        <li>Print the entire document or a specific page directly from the browser.</li>
        </ul>
        <p>
        More information on the PDF Viewer instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
        documentation section
        </a>.
        </p>
        </div>
        </div>);
    }
}
