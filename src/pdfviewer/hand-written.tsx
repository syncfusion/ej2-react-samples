/**
 * Default PDF Viewer sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, Inject } from '@syncfusion/ej2-react-pdfviewer';
import { SampleBase } from '../common/sample-base';
import { RouteComponentProps } from 'react-router';

export class HandWrittenSignature extends SampleBase<{}, {}> {
  public viewer: PdfViewerComponent;
  render() {
    return ( <div>
        <div className='control-section'>
            {/* Render the PDF Viewer */}
            <PdfViewerComponent ref={(scope) => { this.viewer = scope; }} id="container" documentPath="PDF_Succinctly.pdf" serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer" documentLoad = {this.documentLoaded} style={{ 'height': '640px' }}>
                <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields]} />
            </PdfViewerComponent>
          </div>
        <div id="action-description">
        <p>The sample demonstrates the Handwritten Signature support of  PDF Viewer. The Handwritten signature reduces the paperwork of reviewing the contents and it's verified it's digitally.</p>
        </div>
        <div id="description">
        <p>
        In the PDF Viewer component, we can explicitly open the Handwritten signature dialog using the method 
setAnnotationMode
        </p>
        <p>
        More information on the PDF Viewer instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
        documentation section
        </a>.
        </p>
        </div>
        </div>
    );
  }
  documentLoaded = () => {
    this.viewer.annotationModule.setAnnotationMode('HandWrittenSignature');
  }
}
