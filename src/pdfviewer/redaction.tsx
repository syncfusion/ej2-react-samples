import * as React from 'react';
import {
    PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, Annotation, FormFields, FormDesigner,
    ThumbnailView, Print, TextSelection, TextSearch, PageOrganizer, Inject, AnnotationAddEventArgs,AnnotationRemoveEventArgs
} from '@syncfusion/ej2-react-pdfviewer';
import { ToolbarComponent, ItemsDirective, ItemDirective, ClickEventArgs, AppBarComponent } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
let viewer: PdfViewerComponent;

export class Redaction extends SampleBase<{}, {}> {
    public viewer: PdfViewerComponent;
    public toolbar: ToolbarComponent;
    public primaryToolbar: ToolbarComponent;
    public dropdown: ComboBoxComponent;
    public currentPageNumber: string = '1';
    public fileName: string = 'programmatical-annotations.pdf';
    public redactionCount: number = 0;
    public annotation: any;
    public dialogInstance: DialogComponent;
    public uploadObj;
    
    public asyncSettings = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };
    public dropAreaRef = document.getElementsByClassName(
        'drop-area-wrap'
    )[0];
    public allowedExtensions: string = '.png, .jpg, .jpeg';

    componentDidMount(): void {
        viewer = (document.getElementById('container') as any).ej2_instances[0];
    }

    render() {
        let data: string[] = ['10%', '25%', '50%', '75%', '100%', '200%', '400%'];
        let url = "https://ej2services.syncfusion.com/react/development/api/pdfviewer/Redaction";
        function template() {
            return (
                <div>
                <span id="e-pv-redact-sb-currentPage" title="Current Page">1 </span>
                <span id="e-pv-redact-sb-totalPage" title="Total Page">/ 1</span>
            </div>
            );
        }
        const clickHandler = function (args: ClickEventArgs) {
            switch (args.item.id) {
                case 'pdfviewer_open':
                    {
                        let fileUpload = document.getElementById(
                            'fileUpload'
                        ) as HTMLInputElement;
                        fileUpload.click();
                        break;
                    }
                case 'text_annot':
                    {
                        this.viewer.rectangleSettings.fillColor = '#a3a2a0';
                        this.viewer.rectangleSettings.strokeColor = '#a3a2a0';
                        this.viewer.rectangleSettings.author = 'Text';
                        this.viewer.annotation.setAnnotationMode('Rectangle');
                        break;
                    }
                case 'image_annot':
                    {
                        this.dialogInstance.current.show();
                        break;
                    }

                case 'pattern_annot':
                    {
                        this.viewer.rectangleSettings.fillColor = '#dedfe0';
                        this.viewer.rectangleSettings.strokeColor = '#dedfe0';
                        this.viewer.rectangleSettings.author = 'Pattern';
                        this.viewer.annotation.setAnnotationMode('Rectangle');
                        break;
                    }
                case 'black_annot':
                    {
                        this.viewer.rectangleSettings.fillColor = '#000000';
                        this.viewer.rectangleSettings.strokeColor = '#000000';
                        this.viewer.rectangleSettings.author = 'Redaction';
                        this.viewer.annotation.setAnnotationMode('Rectangle');
                        break;
                    }
                case 'white_annot':
                    {
                        this.viewer.rectangleSettings.fillColor = '#ffffff';
                        this.viewer.rectangleSettings.strokeColor = '#ffffff';
                        this.viewer.rectangleSettings.author = 'Redaction';
                        this.viewer.annotation.setAnnotationMode('Rectangle');
                        break;
                    }
                case 'previousPage':
                    {
                        viewer.navigation.goToPreviousPage();
                        break;
                    }
                case 'nextPage':
                    {
                        viewer.navigation.goToNextPage();
                        break;
                    }

                case 'redacticon':
                    {
                        if (this.redactionCount > 0) {                         
                            viewer.saveAsBlob().then(function (value) {
                                var data = value;
                                var reader = new FileReader();
                                reader.readAsDataURL(data);
                                reader.onload = function (e) {
                                    var base64String = e.target?.result;
                                    var xhr = new XMLHttpRequest();
                                    xhr.open('POST', url, true);
                                    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                                    var requestData = JSON.stringify({ base64String: base64String });
                                    xhr.onload = function () {
                                        if (xhr.status === 200) {
                                            viewer.load(xhr.responseText, null);
                                        }
                                        else {
                                            console.error('Redaction failed:', xhr.statusText);
                                        }
                                    };
                                    xhr.onerror = function () {
                                        console.error('An error occurred during the redaction:', xhr.statusText);
                                    };
                                    xhr.send(requestData);
                                };
                            });
                            this.redactionCount = 0;
                            updateRedaction();
                        }
                        break;
                    }
            }
        }
        //Updating the total number of pages while loading
        const documentLoaded = function (args: any) {
            this.toolbar = (document.getElementById('e-pv-redact-sb-toolbar-secondary') as any).ej2_instances[0];
            this.primaryToolbar = (document.getElementById('e-pv-redact-sb-toolbar') as any).ej2_instances[0];
            viewer = (document.getElementById('container') as any).ej2_instances[0];
            var pageCount = document.getElementById('totalPage');
            pageCount.textContent = '/ ' + viewer.pageCount;
            (document.getElementById('e-pv-redact-sb-currentPage') as HTMLSpanElement).textContent = this.viewer.currentPageNumber.toString();
            updatePageNavigation.bind(this);
            updateRedaction.bind(this);
        }

        //To update page number when page has been changed
        const onPageChange = function (args: any) {
            this.currentPageNumber = viewer.currentPageNumber.toString();
            (document.getElementById('e-pv-redact-sb-currentPage') as HTMLSpanElement).textContent = this.viewer.currentPageNumber.toString() + ' ';
            updatePageNavigation.bind(this);
        }
        //To update page number when the previous and next button is clicked
        const updatePageNavigation = function () {
            if (this.viewer.currentPageNumber === 1) {
                this.toolbar.items[0].disabled=true;
                this.toolbar.items[2].disabled=false;
            } else if (viewer.currentPageNumber === viewer.pageCount) {
                this.toolbar.items[0].disabled=false;
                this.toolbar.items[2].disabled=true;
            } else {
                this.toolbar.items[0].disabled=false;
                this.toolbar.items[2].disabled=false;
            }
        }

        //To update the redaction count
        const updateRedaction = function () {
            if (this.redactionCount <= 0) {
                this.toolbar.enableItems(document.getElementById('redacticon').parentElement, false);
            }
            else {
                this.toolbar.enableItems(document.getElementById('redacticon').parentElement, true);
            }
        }
        //Updating the number of redaction while the annotation has been added
        const annotationAdd = (e: AnnotationAddEventArgs): void => {
            var pdfAnnotationList = new Array();
            pdfAnnotationList = this.viewer.annotationCollection;
            var selectedAnnotationIndex = pdfAnnotationList.findIndex(item => item.annotationId == e.annotationId);
            if (selectedAnnotationIndex != -1) {
                this.annotation = pdfAnnotationList[selectedAnnotationIndex];
            }
            if (this.annotation.author == "Redaction" || this.annotation.customStampName == "Image" || this.annotation.author == "Pattern" || this.annotation.author == "Text") {
                this.redactionCount = this.redactionCount + 1;
                updateRedaction.bind(this);
            }

        }

        //Updating the number of redaction while the annotation has been removed
        const annotationRemove = (e: AnnotationRemoveEventArgs): void => {
            if (this.annotation.author == "Redaction" || this.annotation.customStampName == "Image" || this.annotation.author == "Pattern" || this.annotation.author == "Text") {
                this.redactionCount = this.redactionCount - 1;
                updateRedaction.bind(this);
            }
        }
        //To download the redacted pdf
        const download = function () {
            viewer.saveAsBlob().then(function (value) {
            let reader = new FileReader();
            reader.readAsDataURL(value);
            reader.onload = function (e) {
                const base64String = e.target?.result as string;
                const xhr:XMLHttpRequest = new XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                const requestData = JSON.stringify({ base64String: base64String });
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        const blobUrl = createBlobUrl(xhr.responseText.split('base64,')[1], 'application/pdf');
                        downloadDocument(blobUrl);
                    }
                    else {
                        console.error('Download failed:', xhr.statusText);
                    }
                };
                xhr.onerror = function () {
                    console.error('An error occurred during the download:', xhr.statusText);
                };
                xhr.send(requestData);
            };
        }).catch(function (error) {
            console.error('Error saving Blob:', error);
        });
    }
    function createBlobUrl(base64String: string, contentType: string):any {
        const sliceSize:number = 512;
        const byteCharacters:string = atob(base64String);
        const byteArrays:any = [];
        for (let offset:number = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice:string = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers:any = new Array(slice.length);
            for (let i:number = 0; i < slice.length; i++) {
                byteNumbers[parseInt(i.toString(), 10)] = slice.charCodeAt(i);
            }
            const byteArray:any = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob:any = new Blob(byteArrays, { type: contentType });
        return blob;
    }
    function downloadDocument(blobUrl: string):void {
        const Url:any = URL || webkitURL;
        blobUrl = Url.createObjectURL(blobUrl);
        viewer.fileName = this.fileName;
        const anchorElement:HTMLElement = document.createElement('a');
        if (anchorElement.click) {
            (anchorElement as HTMLAnchorElement).href = blobUrl;
            (anchorElement as HTMLAnchorElement).target = '_parent';
            if ('download' in anchorElement) {
                const downloadFileName = viewer.fileName || 'downloadedFile.pdf';
                if (downloadFileName) {
                    if (downloadFileName.endsWith('.pdf')) {
                        (anchorElement as HTMLAnchorElement).download = downloadFileName;
                    }
                    else {
                        const splitPdf:string = downloadFileName.split('.pdf')[0] + '.pdf';
                        (anchorElement as HTMLAnchorElement).download = splitPdf;
                    }
                }
                else {
                    (anchorElement as HTMLAnchorElement).download = 'Default.pdf';
                }
            }
            (document.body || document.documentElement).appendChild(anchorElement);
            anchorElement.click();
        }
        else {
            if (window.top === window &&
                blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
                const padCharacter:string = blobUrl.indexOf('?') === -1 ? '?' : '&';
                blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&');
            }
            window.open(blobUrl, '_parent');
        }
    }

        //To get the header in upload image dialog box
        const header = () => {
            return (
                <div>
                    <div id="dlg-template" title="Upload image" className="e-icon-settings">Upload Image</div>
                </div>
            );
        }
        //When the cancel button is clicked
        const CloseDialog = function () {
            this.dialogInstance.current.hide();
        }

        //To get the footer content in upload image dialog box
        const footerTemplate = () => {
            return (
                <div>
                    <button id="cancelButton" className="e-control e-btn e-primary" data-ripple="true" onClick={CloseDialog.bind(this)}>Cancel</button>
                </div>
            );
        }

        //To get the content of dialog box
        const contentTemplate = () => {
            return (
                <div id='dialog'>
                    <div id='e-pv-redact-sb-defaultfileupload'>
                        <div className="drop-area-wrap" id='e-pv-redact-sb-drop-area-wrap'>
                            <div>
                                <UploaderComponent id='fileUpload' type='file' ref={(scope) => { this.uploadObj.current = scope }} asyncSettings={this.asyncSettings} change={onFileChange.bind(this)} dropArea={this.dropAreaRef as any} allowedExtensions={this.allowedExtensions}></UploaderComponent>
                            </div>
                            <div>(Only JPG and PNG images will be accepted)</div>
                        </div>
                        <div className="e-pv-redact-sb-image-list">
                            <div id='imageContainer' className="e-pv-redact-sb-image-container">
                                <img id='imageView' className="e-pv-redact-sb-image-source" style={{ 'display': 'none' }} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        //When the zoom dropdown is changed
        const zoomValueChange = function (args) {
            let zoom = (args).value;
            let previousZoom = (args).previousItemData.value;
            if (zoom !== null || previousZoom !== null) {
                let zoomchange = parseInt(zoom.replace("%", ""), 10);
                viewer.magnificationModule.zoomTo(zoomchange);
            }

        }

        //To display the zoom percentage dropdown
        const dropDown = function () {
            return (
                <div><ComboBoxComponent width={88} popupWidth={80} value='100%' dataSource={data} showClearButton={false} change={zoomValueChange.bind(this)}></ComboBoxComponent></div>
            );
        }

        let imageSrc;
        let customStampSource;
        const onFileChange = function (args) {
            let file = args.file[0].rawFile;
            let imageElement = document.getElementById('imageView') as any;
            let imageElementContainer = document.getElementById('imageContainer');
            let reader = new FileReader();
            reader.onload = function (e) {
                let base64String = e.target ? e.target.result : null;
                imageSrc = base64String;
                customStampSource = imageSrc;
                (imageElement).src = imageSrc;
                imageElementContainer.className =
                    'image-container image-container-selected';
                (imageElement).style.display = 'block';
                // Bind click event to the image element
                imageElement.addEventListener('click', handleImageClick);
            };
            reader.readAsDataURL(file);
        }

        const handleImageClick = function () {
            customStampSource = imageSrc;
            this.dialogInstance.current.hide();
            addImage();
        }

        //To add the image in pdf
        const addImage = function () {
            viewer.stampSettings.author = "Image";
            viewer.customStampSettings = {
                width: 200,
                author: 'Image',
                height: 125,
                isAddToMenu: false,
                enableCustomStamp: false

            };
            viewer.customStamp = [
                {
                    customStampName: 'Image',
                    customStampImageSource: customStampSource
                },
            ];
        }

        return (<div>
            <div className="control-section" id='e-pv-redact-sb-panel'>
                <div className="flex-container" id="e-pv-redact-sb-flexContainer">

                </div>
                {/* Appbar */}
                <div className='control-container'>
                    <AppBarComponent colorMode="Primary">
                        <span className="regular">Redaction</span>
                        <div className="e-appbar-spacer"></div>
                        <ButtonComponent cssClass='e-inherit ' iconCss='e-icons e-download e-btn-icon e-icon-left' id='download_pdf' onClick={download}>Download</ButtonComponent>
                    </AppBarComponent>

                </div>
                <div className='primaryToolbar' id='toolbar_default'>
                    <ToolbarComponent ref={(scope) => { this.toolbar = scope; }} clicked={clickHandler.bind(this)} id='e-pv-redact-sb-toolbar'>
                        <ItemsDirective>
                            <ItemDirective prefixIcon='e-icon e-folder' tooltipText='Open' cssClass='e-pv-redact-sb-open-container' id='pdfviewer_open' text='Open'></ItemDirective>
                            <ItemDirective type='Separator'></ItemDirective>
                            <ItemDirective prefixIcon='e-icon e-text-annotation' tooltipText='Text' cssClass='e-pv-redact-sb-font-container' text='Text' id='text_annot'></ItemDirective>
                            <ItemDirective prefixIcon='e-icons e-image' tooltipText='Image' cssClass='e-pv-redact-sb-image-container' text='Image' id='image_annot'></ItemDirective>
                            <ItemDirective prefixIcon='e-icons e-opacity' tooltipText='Pattern' cssClass='e-pv-redact-sb-pattern-container' text='Pattern' id='pattern_annot'></ItemDirective>
                            <ItemDirective prefixIcon='e-icons black-out' tooltipText='Blackout' cssClass='e-pv-redact-sb-black-out-container' text='Blackout' id='black_annot'></ItemDirective>
                            <ItemDirective prefixIcon='e-icons white-out' tooltipText='Whiteout' cssClass='e-pv-redact-sb-white-out-container' text='Whiteout' id='white_annot'></ItemDirective>
                            <ItemDirective type='Separator'></ItemDirective>
                            <ItemDirective prefixIcon='e-icons e-redact' tooltipText='Redaction' cssClass='e-pv-redact-sb-redaction-container' text='Redact' id='redacticon' disabled={true}></ItemDirective>
                        </ItemsDirective>
                    </ToolbarComponent>

                </div>

                <div className='e-pv-redact-sb-secondary-toolbar' id='toolbar_secondary'>
                    <ToolbarComponent ref={(scope) => { this.toolbar = scope; }} clicked={clickHandler.bind(this)} id='e-pv-redact-sb-toolbar-secondary'>
                        <ItemsDirective>
                            <ItemDirective prefixIcon='e-icons e-chevron-left' cssClass='e-pv-redact-sb-previous-container' tooltipText="Previous Page" id='previousPage' disabled={true}></ItemDirective>
                            <ItemDirective template={template} tooltipText="Page Number"></ItemDirective>
                            <ItemDirective prefixIcon='e-icon e-chevron-right' cssClass='e-pv-redact-sb-next-container'  tooltipText="Next Page" id='nextPage' disabled={true}></ItemDirective>
                            <ItemDirective cssClass='percentage' type="Input" tooltipText="Zoom" template={dropDown} align="Left" />
                        </ItemsDirective>
                    </ToolbarComponent>
                </div>

                <div id="targetDialog" className="dialog-element">
                    <DialogComponent header={header as any} footerTemplate={footerTemplate as any} content={contentTemplate as any} showCloseIcon={true} target="#targetDialog" width={'437px'} height={'255px'} ref={(scope) => { this.dialogInstance = scope; }} id='e-pv-redact-sb-dialog'></DialogComponent>
                </div>
                {/* Render the PDF Viewer */}
                <PdfViewerComponent ref={(scope) => { this.viewer = scope; }} id="container" documentPath="https://cdn.syncfusion.com/content/pdf/programmatical-annotations.pdf" resourceUrl="https://cdn.syncfusion.com/ej2/27.1.55/dist/ej2-pdfviewer-lib"
                    style={{ 'height': '640px' }}
                    enableToolbar={false} enableNavigationToolbar={false} enableAnnotationToolbar={false} enableCommentPanel={false}
                    documentLoad={documentLoaded} pageChange={onPageChange} annotationAdd={annotationAdd} annotationRemove={annotationRemove}>
                    <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer]} />
                </PdfViewerComponent>
                <input type="file" id="fileUpload" accept=".pdf" onChange={this.readFile.bind(this)} style={{ 'display': 'block', 'visibility': 'hidden', 'width': '0', 'height': '0' }} />
            </div>
            <div id="action-description">
                <p> The PDF Viewer facilitates the permanent removal of sensitive or confidential data from PDF files. Simplifying
                    the redaction process, Syncfusion’s <a target='_blank'
                        href='https://www.syncfusion.com/document-processing/pdf-framework/net/pdf-library'
                        aria-label="Navigate to the Redaction Documendation in PDF library">.NET PDF library</a> includes features
                    for seamless implementation. </p>
            </div>
            <div id="description">
                <p> This example showcases the implementation of redaction using rectangle annotation, leveraging the Redaction
                    feature in <a target='_blank' href='https://help.syncfusion.com/file-formats/pdf/working-with-redaction'
                        aria-label="Navigate to the Redaction Documendation by pdf viewer Library">File formats</a>.</p>
                <br />
                <p>Various types of redactions are demonstrated: </p>
                <br />
                <ul>
                    <li>Displaying text over the redacted area</li>
                    <li>Adding an image to the redacted area</li>
                    <li>Drawing patterns on the redacted area</li>
                    <li>Blacking out the redacted area</li>
                    <li>Whitening out the redacted area</li>
                </ul>
                <br />
                <p> Upon selecting areas on a page or across different pages with different redaction options, users can click the
                    `Redact button`. This action redacts the document and reloads it into the PDF Viewer. The redacted document can
                    then be saved or downloaded. </p>

                <p>
                    More information on adding annotation programmatically can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/introduction"> documentation section</a>.
                </p>
            </div>
        </div>
        );
    }

    //To read the file when loaded
    public readFile(evt) {
        let proxy = this;
        let uploadedFiles = evt.target.files;
        let uploadedFile = uploadedFiles[0];
        this.fileName = uploadedFile.name;
        let reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        reader.onload = function (e) {
            let uploadedFileUrl: string = (e.currentTarget as any).result;
            viewer.documentPath = uploadedFileUrl;
            viewer.fileName = proxy.fileName;
            viewer.downloadFileName = proxy.fileName;
        }
    }
}