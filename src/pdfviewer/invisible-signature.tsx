/**
 * Invisible signature sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    PdfViewerComponent, Toolbar,FormDesigner,FormFields, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection,Annotation, TextSearch,PageOrganizer, Inject
} from '@syncfusion/ej2-react-pdfviewer';
import { MessageComponent } from '@syncfusion/ej2-react-notifications';
import { ToolbarComponent, ItemsDirective, ItemDirective, ClickEventArgs } from '@syncfusion/ej2-react-navigations';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import './pdf.component.css';
export class InvisibleDigitalSignature extends SampleBase<{}, {}> {
    public viewer: PdfViewerComponent;
    public toolbar: ToolbarComponent;
    public fileName: string = '';
    //Specifies the visibility of the complete signing.
    public buttonVisiblity: boolean = true ;
    //Specifies the visibility of the download icon
    public downloadVisiblity : boolean = true ;
    public msgWarning=  "The document has been digitally signed and at least one signature has problem ";
    public msgError="The document has been digitally signed, but it has been modified since it was signed and at least one signature is invalid";
    public  msgSuccess="The document has been digitally signed and all the signatures are valid";
    public  documentData  :any;
    public successVisible: boolean = false;
    public errorVisible: boolean = false;
    public warningVisible: boolean = false;
    // Specifies whether the document has a digital signature or not.
    public  hasDigitalSignature: boolean = false;
   
    render() {
        return (<div>
            <div className='control-section'>
                <div>
                    <div className='e-pdf-toolbar'>
                        <ToolbarComponent ref={(scope) => { this.toolbar = scope; }} clicked={this.clickHandler.bind(this)}>
                            <ItemsDirective>
                                <ItemDirective prefixIcon='e-icons e-folder-open' id='file_Open' tooltipText='Open' cssClass='e-pv-button-container'></ItemDirective>
                                <ItemDirective text="Complete Signing"  id='pdfviewer_sign' tooltipText='Finish Signing' disabled={this.buttonVisiblity} align="Right"></ItemDirective>
                                <ItemDirective prefixIcon='e-icons e-download' tooltipText="Download" id='download' cssClass= 'e-pv-download-document-container' disabled={this.downloadVisiblity} align="Right"></ItemDirective>
                            </ItemsDirective>
                        </ToolbarComponent>
                    </div>
                    <div>
                        <MessageComponent id="msg_success" content={this.msgSuccess} visible={this.successVisible} severity="Success"></MessageComponent>
                        <MessageComponent id="msg_warning" content={this.msgWarning} visible={this.warningVisible} severity="Warning"></MessageComponent>
                        <MessageComponent id="msg_error" content={this.msgError} visible={this.errorVisible} severity="Error"></MessageComponent>
                    </div>
                    {/* Render the PDF Viewer */}
                    <PdfViewerComponent id="container" ref={(scope) => { this.viewer = scope; }} enableToolbar={false} enableNavigationToolbar={false}
                        documentLoad={this.documentLoaded}
                        serviceUrl='https://services.syncfusion.com/react/production/api/pdfviewer'
                        documentPath="InvisibleDigitalSignature.pdf"
                        addSignature={this.addSignature}
                        style={{ 'display': 'block', 'height': '640px' }}>
                        <Inject services={[Magnification, FormFields, FormDesigner, Navigation, LinkAnnotation, BookmarkView,PageOrganizer,
                            ThumbnailView, Annotation, Print, TextSelection, TextSearch]} />
                    </PdfViewerComponent>
                    <input type="file" id="fileUpload" accept=".pdf" onChange={this.readFile.bind(this)} style={{ 'display': 'block', 'visibility': 'hidden', 'width': '0', 'height': '0' }} />
                </div>
            </div>

            <div id='sample'>
              <div id='loader'>Loading....</div>
            </div>

            <div id="action-description">
                <p>This sample demonstrates how to digitally sign a PDF document from code behind using Syncfusion's PDF Viewer and
                    PDF Library</p>
            </div>

            <div id="description">
                <p>
                    This sample operates correctly when a signature field is present in the PDF document. If all signature fields
                    are signed, the "Finish Signing" button becomes enabled. Clicking this button adds a digital signature
                    certificate programmatically and reloads the digitally signed document into the viewer.
                </p>
                <br />
                <p>The below are the messages shown in the respective scenarios:</p>
                <br />
                <p>1. The document has been digitally signed, but it has been modified since it was signed and at least one
                    signature is invalid.</p>
                <ul>
                    <li>This message appears if the digitally signed document is edited after reloading.</li>
                </ul>
                <p>2. The document has been digitally signed and at least one signature has a problem.</p>
                <ul>
                    <li>This message is shown if the digital signature is not registered on the machine and is not in the trusted
                        list. Adding the certificate to the trusted list is necessary.</li>
                </ul>
                <p>3. The document has been digitally signed and all the signatures are valid.</p>
                <ul>
                    <li>This message indicates that the document is digitally signed without any issues.</li>
                </ul>
                <p>
                    More information on the PDF Viewer instantiation can be found on this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
                        documentation section </a>.
                </p>
            </div>
        </div>
        );
    }
    //This method will get invoked while clicking the toolbar items.
     clickHandler(args: ClickEventArgs) {
        switch (args.item.id) {
            case 'file_Open':
                document.getElementById('fileUpload').click();
                break;

            case 'pdfviewer_sign':
                this.viewer.serverActionSettings.download = 'AddSignature';
                let data;
                let base64data;
                this.viewer.saveAsBlob().then((value) => {
                    data = value;
                    var reader = new FileReader();
                    reader.readAsDataURL(data);
                    reader.onload = () => {
                        base64data = reader.result;
                        this.documentData = base64data;
                        this.viewer.load(base64data, null);
                        this.downloadVisiblity = false;
                        this.buttonVisiblity = true;
                        this.toolbar.items[1].disabled = true;
                        this.toolbar.items[2].disabled = false;
                        this.viewer.fileName = this.fileName;
				        this.viewer.downloadFileName = this.fileName;
                    };
                });
                this.viewer.serverActionSettings.download = 'Download';
                break;
            //Downloads the PDF document being loaded in the PDFViewer.
            case 'download':
                this.viewer.download();
                break;
        }
    }
     documentLoaded(args){
        this.fileName = args.documentName;
        const postData: any = {
            documentData: this.documentData
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };
        const apiUrl = 'https://services.syncfusion.com/react/production/api/pdfviewer/ValidateSignature';
        fetch(apiUrl, options)
            .then(response => response.json())
            .then(body => {
                if (body.successVisible || body.warningVisible || body.errorVisible)
                    this.toolbar.items[1].disabled = true;
                if (!body.downloadVisibility)
                    this.toolbar.items[2].disabled = false;
                if ((body.successVisible)) {
                    setTimeout(() => {
                        this.msgSuccess = body.message;
                        this.successVisible = true;
                    }, 1000);
                    setTimeout(() => {
                        this.successVisible= false;
                    }, 5000);
                }
                if ((body.warningVisible)) {
                    this.msgWarning= body.message;
                    this.warningVisible= true;
                }
                if (body.errorVisible) {
                    this.msgError = body.message;
                    this.errorVisible = true;
                }

            });

    }
  
     readFile(evt) {
        let uploadedFiles = evt.target.files;
        let uploadedFile = uploadedFiles[0];
        this.fileName = uploadedFile.name;
        let reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        let viewer: PdfViewerComponent = this.viewer;
		let uploadedFileName: string = this.fileName;
        reader.onload = function (e:any) {  
            let toolbar: ToolbarComponent; 
            let fileName: string = ''; 
            let documentData  :any;        
            toolbar.items[2].disabled = true;
            let uploadedFileUrl: string = e.currentTarget.result;
            documentData = uploadedFileUrl;
            viewer.load(uploadedFileUrl, null);
            viewer.fileName = fileName;
            viewer.downloadFileName = fileName;
        }
    }
     //Triggers while adding the signature in signature field.
    addSignature() {
        let field;
        // To retrieve the form fields in the loaded PDF Document.
        field = this.viewer.retrieveFormFields();
        let signatureFieldCount = 0;
        let signaturesCount = 0;
        
        for (let i = 0; i < field.Count; i++) {
            if (field[i].Type.ToString() === "SignatureField") {
                signatureFieldCount++;
            }
            if (field[i].Value !== "" && field[i].Value !== null && field[i].Type.ToString() === "SignatureField") {
                signaturesCount++;
            }
        }
        
        // Checks whether all the signature fields are signed or not.
        if (signatureFieldCount === signaturesCount) {
            // Checks whether the document has a digital signature or not.
            if (!this.hasDigitalSignature) {
                this.buttonVisiblity=false;
                this.toolbar.items[1].disabled = false;
            }
        }
    }

}
