/**
 * Invisible signature sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    PdfViewerComponent, Toolbar,FormDesigner,FormFields, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection, Annotation, TextSearch, PageOrganizer,Inject
} from '@syncfusion/ej2-react-pdfviewer';
import { MessageComponent } from '@syncfusion/ej2-react-notifications';
import { ToolbarComponent, ItemsDirective, ItemDirective, ClickEventArgs } from '@syncfusion/ej2-react-navigations';
import { updateSampleSection } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { useState } from 'react';
import './pdf.component.css';
function InvisibleDigitalSignature() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const [successVisible,setVisible] = useState<boolean>(false);
    const [errorVisible,seterrorVisible] = useState<boolean>(false);
    const [warningVisible,setwarningVisible] = useState<boolean>(false);
    let viewer: PdfViewerComponent;
    let toolbar: ToolbarComponent;
    let fileName: string = '';
    //Specifies the visibility of the complete signing.
    let buttonVisiblity: boolean = true ;
    //Specifies the visibility of the download icon
    let downloadVisiblity : boolean = true ;
    let msgWarning=  "The document has been digitally signed and at least one signature has problem ";
    let msgError="The document has been digitally signed, but it has been modified since it was signed and at least one signature is invalid";
    let  msgSuccess="The document has been digitally signed and all the signatures are valid";
    let  documentData  :any;
    // Specifies whether the document has a digital signature or not.
    let  hasDigitalSignature: boolean = false;
    return (<div>
        <div className='control-section'>
            <div>
                <div className='e-pdf-toolbar'>
                    <ToolbarComponent ref={(scope) => { toolbar = scope; }} clicked={clickHandler.bind(this)}>
                        <ItemsDirective>
                                <ItemDirective prefixIcon='e-icons e-folder-open' id='file_Open' tooltipText='Open' cssClass='e-pv-button-container'></ItemDirective>
                                <ItemDirective text="Complete Signing"  id='pdfviewer_sign' tooltipText='Finish Signing' disabled={buttonVisiblity} align="Right"></ItemDirective>
                                <ItemDirective prefixIcon='e-icons e-download' tooltipText="Download" id='download' disabled={downloadVisiblity} align="Right"  cssClass= 'e-pv-download-document-container'></ItemDirective>
                        </ItemsDirective>
                    </ToolbarComponent>
                </div>
               <div>
                   <MessageComponent id="msg_success" content={msgSuccess} visible={successVisible} severity="Success"></MessageComponent>
                   <MessageComponent id="msg_warning"  content={msgWarning} visible={warningVisible} severity="Warning"></MessageComponent>
                   <MessageComponent id="msg_error" content={msgError} visible={errorVisible} severity="Error"></MessageComponent>
                </div>
                {/* Render the PDF Viewer */}
                <PdfViewerComponent id="container" ref={(scope) => { viewer = scope; }} enableToolbar={false} enableNavigationToolbar={false}
                    documentLoad={documentLoaded}
                    serviceUrl='https://services.syncfusion.com/react/production/api/pdfviewer'
                    documentPath="InvisibleDigitalSignature.pdf"
                    addSignature={addSignature}
                    style={{ 'display': 'block', 'height': '640px' }}>
                    <Inject services={[Magnification,FormFields,FormDesigner, Navigation, LinkAnnotation, BookmarkView,
                        ThumbnailView, Print, TextSelection, Annotation, TextSearch,PageOrganizer]} />
                </PdfViewerComponent>
                <input type="file" id="fileUpload" accept=".pdf" onChange={readFile.bind(this)} style={{ 'display': 'block', 'visibility': 'hidden', 'width': '0', 'height': '0' }} />
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
    //This method will get invoked while clicking the toolbar items.
    function clickHandler(args: ClickEventArgs) {
        switch (args.item.id) {
            case 'file_Open':
                document.getElementById('fileUpload').click();
                break;
            case 'pdfviewer_sign':
                viewer.serverActionSettings.download = 'AddSignature';
                let data;
                let base64data;
                viewer.saveAsBlob().then((value) => {
                    data = value;
                    var reader = new FileReader();
                    reader.readAsDataURL(data);
                    reader.onload = () => {
                        base64data = reader.result;
                        documentData = base64data;
                        viewer.load(base64data, null);
                        downloadVisiblity = false;
                        buttonVisiblity = true;
                        toolbar.items[1].disabled = true;
                        toolbar.items[2].disabled = false;
                        viewer.fileName = fileName;
				        viewer.downloadFileName = fileName;
                    };
                });
                viewer.serverActionSettings.download = 'Download';
                break;
            //Downloads the PDF document being loaded in the PDFViewer.
            case 'download':
                viewer.download();
                break;
        }
    }
    function documentLoaded(args){
        fileName = args.documentName;
        const postData: any = {
            documentData: documentData
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
                    toolbar.items[1].disabled = true;
                if (!body.downloadVisibility)
                    toolbar.items[2].disabled = false;
                if ((body.successVisible)) {
                    setTimeout(() => {
                        msgSuccess = body.message;
                        setVisible(true);
                    }, 1000);
                    setTimeout(() => {
                        setVisible(false);
                    }, 5000);
                }
                if ((body.warningVisible)) {
                    msgWarning= body.message;
                    setwarningVisible(true);
                }
                if (body.errorVisible) {
                    msgError = body.message;
                    seterrorVisible(false);
                }

            });

    }
  
    function readFile(evt) {
        let uploadedFiles = evt.target.files;
        let uploadedFile = uploadedFiles[0];
        fileName = uploadedFile.name;
        let reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        let uploadedFileName: string = fileName;
        reader.onload = function (e:any) {
            toolbar.items[2].disabled = true;
            let uploadedFileUrl: string = e.currentTarget.result;
            documentData = uploadedFileUrl;
            viewer.load(uploadedFileUrl, null);
            viewer.fileName = fileName;
            viewer.downloadFileName = fileName;
        }
    }
    
    
     //Triggers while adding the signature in signature field.
    function addSignature() {
        let field;
        // To retrieve the form fields in the loaded PDF Document.
        field = viewer.retrieveFormFields();
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
            if (!hasDigitalSignature) {
                buttonVisiblity=false;
                toolbar.items[1].disabled = false;
            }
        }
    }
}
export default InvisibleDigitalSignature;


