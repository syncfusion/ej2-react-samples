import * as React from 'react';
import {
    PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, Annotation, FormFields, FormDesigner,
    ThumbnailView, Print, TextSelection, TextSearch, PageOrganizer, Inject, StandardBusinessStampItem, SignStampItem, DynamicStampItem,
    AnnotationAddEventArgs,
    AnnotationRemoveEventArgs,
} from '@syncfusion/ej2-react-pdfviewer';
import { ToolbarComponent, ItemsDirective, ItemDirective, ClickEventArgs, MenuComponent, AppBarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent, SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';
import { updateSampleSection } from '../common/sample-base';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';

function Redaction() {
    React.useEffect(() => {
        updateSampleSection();

    }, [])
    let viewer: PdfViewerComponent;
    let toolbar: ToolbarComponent;
    let primaryToolbar: ToolbarComponent;
    let dropdown: ComboBoxComponent;
    let dialogInstance = React.useRef<DialogComponent>(null);
    let uploadObj = React.useRef<UploaderComponent>(null);
    let asyncSettings: Object;
    asyncSettings = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };

    let currentPageNumber: string = '1';
    let fileName: string = 'programmatical-annotations.pdf';
    let data: string[] = ['10%', '25%', '50%', '75%', '100%', '200%', '400%'];
    let redactionCount: number = 0;
    let annotation: any;
    let customStampSource: string = '';
    let dropAreaRef = document.getElementsByClassName(
        'drop-area-wrap'
    )[0];
    let allowedExtensions: string = '.png, .jpg, .jpeg';

    function template() {
        return (
            <div>
                <span id="e-pv-redact-sb-currentPage" title="Current Page">1 </span>
                <span id="e-pv-redact-sb-totalPage" title="Total Page">/ 1</span>
            </div>
        );
    }
    function clickHandler(args: ClickEventArgs) {
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
                    viewer.rectangleSettings.fillColor = '#a3a2a0';
                    viewer.rectangleSettings.strokeColor = '#a3a2a0';
                    viewer.rectangleSettings.author = 'Text';
                    viewer.annotation.setAnnotationMode('Rectangle');
                    break;

                }
            case 'image_annot':
                {
                    dialogInstance.current.show();
                    break;
                }
            case 'pattern_annot':
                {
                    viewer.rectangleSettings.fillColor = '#dedfe0';
                    viewer.rectangleSettings.strokeColor = '#dedfe0';
                    viewer.rectangleSettings.author = 'Pattern';
                    viewer.annotation.setAnnotationMode('Rectangle');
                    break;
                }
            case 'black_annot':
                {
                    viewer.rectangleSettings.fillColor = '#000000';
                    viewer.rectangleSettings.strokeColor = '#000000';
                    viewer.rectangleSettings.author = 'Redaction';
                    viewer.annotation.setAnnotationMode('Rectangle');
                    break;
                }
            case 'white_annot':
                {
                    viewer.rectangleSettings.fillColor = '#ffffff';
                    viewer.rectangleSettings.strokeColor = '#ffffff';
                    viewer.rectangleSettings.author = 'Redaction';
                    viewer.annotation.setAnnotationMode('Rectangle');
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
                    viewer.serverActionSettings.download = "Redaction";
                    let data: any;
                    let base64data: any;
                    viewer.saveAsBlob().then((value) => {
                        data = value;
                        var reader = new FileReader();
                        reader.readAsDataURL(data);
                        reader.onload = () => {
                            base64data = reader.result;
                            viewer.load(base64data, null);
                        };

                    });
                    redactionCount = 0;
                    updateRedaction();
                    viewer.serverActionSettings.download = "Download";
                    break;
                }
        }

    }

    //To download the redacted pdf
    function download() {
        viewer.fileName = fileName;
        viewer.downloadFileName = fileName;
        viewer.serverActionSettings.download = "Redaction";
        viewer.download();
        viewer.serverActionSettings.download = "Download";
    }


    //Updating the number of redaction while the annotation has been added
    function annotationAdd(e: AnnotationAddEventArgs): void {
        var pdfAnnotationList = new Array();
        pdfAnnotationList = viewer.annotationCollection;
        var selectedAnnotationIndex = pdfAnnotationList.findIndex(item => item.annotationId == e.annotationId);
        if (selectedAnnotationIndex != -1) {
            annotation = pdfAnnotationList[selectedAnnotationIndex];
        }
        if (annotation.author == "Redaction" || annotation.customStampName == "Image" || annotation.author == "Pattern" || annotation.author == "Text") {
            redactionCount = redactionCount + 1;
            updateRedaction();
        }

    }

    //Updating the number of redaction while the annotation has been removed
    function annotationRemove(e: AnnotationRemoveEventArgs): void {
        if (annotation.author == "Redaction" || annotation.customStampName == "Image" || annotation.author == "Pattern" || annotation.author == "Text") {
            redactionCount = redactionCount - 1;
            updateRedaction();
        }
    }

    //To update page number when the previous and next button is clicked
    function updatePageNavigation() {
        if (viewer.currentPageNumber === 1) {
            toolbar.items[0].disabled=true;
            toolbar.items[2].disabled=false;
        } else if (viewer.currentPageNumber === viewer.pageCount) {
            toolbar.items[0].disabled=false;
            toolbar.items[2].disabled=true;
        } else {
            toolbar.items[0].disabled=false;
            toolbar.items[2].disabled=false;
        }
    }
    //To update the redaction count
    function updateRedaction() {
        if (redactionCount <= 0) {
            primaryToolbar.items[8].disabled = true;
        }
        else {
            primaryToolbar.items[8].disabled = false;
        }
    }

    //To update page number when page has been changed
    function onPageChange() {
        currentPageNumber = viewer.currentPageNumber.toString();
        (document.getElementById('e-pv-redact-sb-currentPage') as HTMLSpanElement).textContent = viewer.currentPageNumber.toString() + ' ';
        updatePageNavigation();
    }
    //Updating the total number of pages while loading
    function documentLoaded() {
        toolbar = (document.getElementById('e-pv-redact-sb-toolbar-secondary') as any).ej2_instances[0];
        primaryToolbar = (document.getElementById('e-pv-redact-sb-toolbar') as any).ej2_instances[0];
        (document.getElementById('e-pv-redact-sb-currentPage') as HTMLSpanElement).textContent = viewer.currentPageNumber.toString();
        document.getElementById('e-pv-redact-sb-totalPage').textContent = ' / ' + viewer.pageCount;
        updatePageNavigation();
        updateRedaction();
    }
    //Zoom values changes when the percentage is selected from the dropdown
    function zoomValueChange(args) {
        let zoom = (args).value;
        let previousZoom = (args).previousItemData.value;
        if (zoom !== null || previousZoom !== null) {
            let zoomchange = parseInt(zoom.replace("%", ""), 10);
            viewer.magnificationModule.zoomTo(zoomchange);
        }
    }

    function dropDown() {
        return (
            <div><ComboBoxComponent width={88} popupWidth={80} value='100%' dataSource={data} showClearButton={false} change={zoomValueChange}></ComboBoxComponent></div>
        );
    }

    //dialog header
    function header() {
        return (
            <div>
                <div id="dlg-template" title="Upload image" className="e-icon-settings">Upload Image</div>
            </div>
        );
    }

    //When cancel button is clicked
    function CloseDialog() {
        dialogInstance.current.hide();
    }

    //To get the footer content in dialog box
    function footerTemplate() {
        return (
            <div>
                <button id="cancelButton" className="e-control e-btn e-primary" data-ripple="true" onClick={CloseDialog}>Cancel</button>
            </div>
        );
    }

    //To get content in dialog box
    function contentTemplate() {
        return (
            <div id='dialog'>
                <div id='e-pv-redact-sb-defaultfileupload'>
                    <div className="drop-area-wrap" id='e-pv-redact-sb-drop-area-wrap'>
                        <div>
                            {/* <input type="file" name="UploadFiles" id="fileupload" /> */}
                            <UploaderComponent id='fileupload' type='file' ref={uploadObj} asyncSettings={asyncSettings} change={onFileChange} dropArea={dropAreaRef as any} allowedExtensions={allowedExtensions}></UploaderComponent>
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

    //To add the image in pdf
    function addImage() {
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

    let imageSrc;
    function onFileChange(args) {
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
                'image-container e-pv-redact-sb-image-container-selected';
            (imageElement).style.display = 'block';
            // Bind click event to the image element
            imageElement.addEventListener('click', handleImageClick);
        };
        reader.readAsDataURL(file);
    }

    function handleImageClick() {
        customStampSource = imageSrc;
        dialogInstance.current.hide();
        addImage();
    }
    return (<div>
        <div className='control-section' id='e-pv-redact-sb-panel'>
            <div className="flex-container" id="e-pv-redact-sb-flexContainer">
            </div>
            <div className='control-container'>
                <AppBarComponent colorMode="Primary">
                    <span className="regular">Redaction</span>
                    <div className="e-appbar-spacer"></div>
                    <ButtonComponent cssClass='e-inherit login' iconCss='e-icons e-download e-btn-icon e-icon-left' id='download_pdf' onClick={download}>Download</ButtonComponent>
                </AppBarComponent>
            </div>
            <div className='primaryToolbar' id='toolbar_default'>
                <ToolbarComponent ref={(scope) => { toolbar = scope; }} clicked={clickHandler.bind(this)} id='e-pv-redact-sb-toolbar'>
                    <ItemsDirective>
                        <ItemDirective prefixIcon='e-icon e-folder' tooltipText='Open' cssClass='e-pv-redact-sb-open-container' id='pdfviewer_open' text='Open'></ItemDirective>
                        <ItemDirective type='Separator'></ItemDirective>
                        <ItemDirective prefixIcon='e-icon e-text-annotation' tooltipText='Text' cssClass='e-pv-redact-sb-font-container' text='Text' id='text_annot'></ItemDirective>
                        <ItemDirective prefixIcon='e-icons e-image' tooltipText='Image' cssClass='e-pv-redact-sb-image-btn' text='Image' id='image_annot'></ItemDirective>
                        <ItemDirective prefixIcon='e-icons e-opacity' tooltipText='Pattern' cssClass='e-pv-redact-sb-pattern-container' text='Pattern' id='pattern_annot'></ItemDirective>
                        <ItemDirective prefixIcon='e-icons black-out' tooltipText='Blackout' cssClass='e-pv-redact-sb-black-out-container' text='Blackout' id='black_annot'></ItemDirective>
                        <ItemDirective prefixIcon='e-icons white-out' tooltipText='Whiteout' cssClass='e-pv-redact-sb-white-out-container' text='Whiteout' id='white_annot'></ItemDirective>
                        <ItemDirective type='Separator'></ItemDirective>
                        <ItemDirective prefixIcon='e-icons e-redact' tooltipText='Redaction' cssClass='e-pv-redact-sb-redaction-container' text='Redact' id='redacticon' disabled={true} ></ItemDirective>
                    </ItemsDirective>
                </ToolbarComponent>
            </div>
            <div className='e-pv-secondary-toolbar' id='toolbar_secondary'>
                <ToolbarComponent ref={(scope) => { toolbar = scope; }} clicked={clickHandler.bind(this)} id='e-pv-redact-sb-toolbar-secondary'>
                    <ItemsDirective>
                        <ItemDirective prefixIcon='e-icons e-chevron-left' cssClass='e-pv-redact-sb-previous-container'  tooltipText="Previous Page" id='previousPage' disabled={true}></ItemDirective>
                        <ItemDirective template={template} tooltipText="Page Number"></ItemDirective>
                        <ItemDirective prefixIcon='e-icon e-chevron-right' cssClass='e-pv-redact-sb-next-container' id='nextPage' disabled={true} tooltipText="Next Page"></ItemDirective>
                        <ItemDirective type='Separator'></ItemDirective>
                        <ItemDirective cssClass='percentage' type="Input" tooltipText="Zoom" template={dropDown} align="Left" />
                    </ItemsDirective>
                </ToolbarComponent>
            </div>
            <div id="targetDialog" className="dialog-element">
                <DialogComponent header={header as any} footerTemplate={footerTemplate as any} content={contentTemplate as any} showCloseIcon={true} target="#targetDialog" width={'477px'} ref={dialogInstance} visible={false} isModal={true} id='e-pv-redact-sb-dialog'></DialogComponent>
            </div>
            {/* Render the PDF Viewer */}
            <PdfViewerComponent ref={(scope) => { viewer = scope; }} id="container" documentPath="https://cdn.syncfusion.com/content/pdf/programmatical-annotations.pdf" serviceUrl='https://ej2services.syncfusion.com/react/development/api/pdfviewer'
                style={{ 'height': '640px' }} enableToolbar={false} enableNavigationToolbar={false} enableAnnotationToolbar={false} enableCommentPanel={false}
                documentLoad={documentLoaded} pageChange={onPageChange} annotationAdd={annotationAdd} annotationRemove={annotationRemove}>
                <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer]} />
            </PdfViewerComponent>
            <input type="file" id="fileUpload" accept=".pdf" onChange={readFile.bind(this)} style={{ 'display': 'block', 'visibility': 'hidden', 'width': '0', 'height': '0' }} />
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

    //To read the file when changed
    function readFile(evt) {
        let uploadedFiles = evt.target.files;
        let uploadedFile = uploadedFiles[0];
        fileName = uploadedFile.name;
        let reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        let uploadedFileName: string = fileName;
        reader.onload = function (e) {
            let uploadedFileUrl: string = (e.currentTarget as any).result;
            viewer.documentPath = uploadedFileUrl;
            viewer.fileName = fileName;
            viewer.downloadFileName = fileName;
        }
    }

}
export default Redaction;