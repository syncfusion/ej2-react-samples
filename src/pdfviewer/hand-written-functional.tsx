/**
 * Default PDF Viewer sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, Inject
} from '@syncfusion/ej2-react-pdfviewer';
import { updateSampleSection } from '../common/sample-base';
import { RouteComponentProps } from 'react-router';
function HandWrittenSignature() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let viewer: PdfViewerComponent;
    return (<div>
        <div className='control-section'>
            {/* Render the PDF Viewer */}
            <PdfViewerComponent ref={(scope) => { viewer = scope; }} id="container" documentPath="HandwrittenSignature.pdf" serviceUrl="https://services.syncfusion.com/react/production/api/pdfviewer" documentLoad={documentLoaded} style={{ 'height': '640px' }}>
                <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner]} />
            </PdfViewerComponent>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the Handwritten signature and initial support of the PDF Viewer. The signature or initial support reduces the paperwork of reviewing the contents and it is verified digitally.</p>
        </div>
        <div id="description">
            <p>
                In the PDF Viewer component, we can explicitly open the Handwritten signature dialog or initial dialog using the method setAnnotationMode.
            </p>
            <p>
                More information on the PDF Viewer instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
                    documentation section
                </a>.
            </p>
        </div>
    </div>
    );
    function documentLoaded() {
        viewer.annotationModule.setAnnotationMode('HandWrittenSignature');
    }
}
export default HandWrittenSignature;
