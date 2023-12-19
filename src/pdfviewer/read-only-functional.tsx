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
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';
import { isLocked } from '@syncfusion/ej2/spreadsheet';
import { showTooltip } from '@syncfusion/ej2/charts';

function ReadOnly() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let viewer: PdfViewerComponent;
    return (<div>
        <div className='control-section'>
                <div className="flex-container">
                <label htmlFor="checked" className="switchLabel" > Standalone PDF Viewer </label>
                 <div className="e-message render-mode-info">
                     <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
                 </div>
                    <div>
                    <SwitchComponent cssClass="buttonSwitch" id="checked" change={change} checked={true}></SwitchComponent>
                    </div>
                </div>
            {/* Render the PDF Viewer */}
            <PdfViewerComponent ref={(scope) => { viewer = scope; }} id="container" documentPath="https://cdn.syncfusion.com/content/pdf/restricted-formfield.pdf" 
            resourceUrl = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib"
            created={created} 
            enableStickyNotesAnnotation={false} style={{ 'height': '640px' }} annotationSettings={{isLock : true}}  >
                <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner]} />

            </PdfViewerComponent>
            
        </div>
        <div id="action-description">
            <p>The sample showcases the PDF viewer operating in a read-only mode, which restricts the ability to make changes to annotations, form fields, and also disables text selection.</p>
        </div>
        <div id="description">        
            <p>
                More information on the PDF Viewer instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
                    documentation section
                </a>.
            </p>
        </div>
    </div>
    );

    function created() {
        var viewer = (document.getElementById('container') as any).ej2_instances[0];
        viewer.textFieldSettings = {
            isReadOnly: true,
        };

        viewer.radioButtonFieldSettings = {
            isReadOnly: true,
        };

        viewer.DropdownFieldSettings = {
            isReadOnly: true,
        };
        viewer.checkBoxFieldSettings = {
            isReadOnly: true,
        };
        viewer.signatureFieldSettings = {
            isReadOnly: true,
        };
        viewer.listBoxFieldSettings = {
            isReadOnly: true,
        };
        viewer.passwordFieldSettings = {
            isReadOnly: true,
        };
        viewer.initialFieldSettings = {
            isReadOnly: true,
        };

        viewer.contextMenuOption = "None";
        viewer.toolbarSettings = {
            showTooltip: true, toolbarItems: ['OpenOption', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'PrintOption']
        };
        viewer.dataBind();
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

export default ReadOnly;