/**
 * Default PDF Viewer sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, Inject } from '@syncfusion/ej2-react-pdfviewer';
import { SampleBase } from '../common/sample-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';

export class ReadOnly extends SampleBase<{}, {}> {
  public viewer: PdfViewerComponent;
  render() {
    return ( <div>
        <div className='control-section'>
        <div className="flex-container">
                <label htmlFor="checked" className="switchLabel" > Standalone PDF Viewer </label>
                <div className="e-message render-mode-info">
                    <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
                </div>
                <SwitchComponent cssClass="buttonSwitch" id="checked" change={this.change} checked={true}></SwitchComponent>
            </div>
            {/* Render the PDF Viewer */}
            <PdfViewerComponent ref={(scope) => { this.viewer = scope; }}  id="container" documentPath="https://cdn.syncfusion.com/content/pdf/restricted-formfield.pdf" resourceUrl = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib" created={this.created} enableStickyNotesAnnotation={false} annotationSettings={{isLock:true}} style={{ 'height': '640px' }}>
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
    }
    public created(){
        var viewer=(document.getElementById('container')as any).ej2_instances[0];
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


    change = (args) => {
        if (args.checked) {
            this.viewer.serviceUrl = '';
        }
        else {
            this.viewer.serviceUrl = 'https://services.syncfusion.com/react/production/api/pdfviewer';
        }
        this.viewer.dataBind();
        this.viewer.load(this.viewer.documentPath, null);
    }
}