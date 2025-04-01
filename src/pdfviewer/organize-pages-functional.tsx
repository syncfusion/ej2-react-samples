/**
 * Default PDF Viewer sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer, Inject
} from '@syncfusion/ej2-react-pdfviewer';
import { updateSampleSection } from '../common/sample-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';

function Default() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let viewer: PdfViewerComponent;
    let isInitialLoading: boolean =  true;
    return (<div>
        <div className='control-section'>
                <div className="flex-container">
                <label htmlFor="checked" className="switchLabel" > Standalone PDF Viewer </label>
                 <div className="e-message render-mode-info">
                     <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
                 </div>
                 <SwitchComponent cssClass="buttonSwitch" id="checked" change={change} checked={true}></SwitchComponent>
                </div>
            {/* Render the PDF Viewer */}
            <PdfViewerComponent ref={(scope) => { viewer = scope; }} id="container" documentPath="https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf" resourceUrl = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib" documentLoad = {documentLoaded} style={{ 'height': '640px' }}>
                <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer]} />
            </PdfViewerComponent>
        </div>
        <div id="action-description">
        <p>This sample showcases the page organization features of the PDF Viewer component, allowing users to effortlessly insert, delete, rearrange, copy, import, undo, redo, and rotate pages. Additionally, users can select all pages for collective adjustments and save changes instantly or download the edited document.</p>
        </div>
        <div id="description">
        <p>
            Explore the comprehensive page organization capabilities of the PDF Viewer component through this sample. Users can seamlessly manage the PDF documents with the following functionalities:
        </p>
        <ul>
            <li>Add new pages to the document to integrate additional content seamlessly.</li>
            <li>Remove unnecessary pages with ease, streamlining document management.</li>
            <li>Resolve orientation issues by rotating pages clockwise <code>right</code>  or counterclockwise <code>left</code> as required.</li>
            <li>Conveniently select all pages for uniform adjustments and modifications.</li>
            <li>Rearrange pages by dragging and dropping selected pages to the desired position.</li>
            <li>Copy pages by selecting the thumbnails and using the copy option; duplicates are added next to the selected pages.</li>
            <li>Click the "Import Documents" icon in the toolbar to import a document. If any thumbnail is selected, the new document will be imported next to it; otherwise, it will be imported as the first thumbnail.</li>
            <li>Undo and redo actions are available at the organize pages dialog.</li>
            <li>Enjoy real-time updates as any changes made to the page organization are instantly reflected within the PDF Viewer, when you click on the <code>Save</code> button.</li>
            <li>Utilize the <code>Save As</code> feature to preserve edits, enabling users to download the modified version of the PDF document for future reference.</li> 
        </ul>      
            <p>
                More information on the PDF Viewer instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
                    documentation section
                </a>.
            </p>
        </div>
    </div>
    );
    function documentLoaded() {
        if(isInitialLoading){
            viewer.isPageOrganizerOpen = true;
            isInitialLoading = false;
        }
        else{
            viewer.isPageOrganizerOpen = false;
        }
    }
    function change(args){
        if (args.checked) {
            viewer.serviceUrl = '';
        }
        else {
            viewer.serviceUrl = 'https://services.syncfusion.com/react/production/api/pdfviewer';
        }
        viewer.dataBind();
        viewer.load(viewer.documentPath, null);
    }
}
export default Default;