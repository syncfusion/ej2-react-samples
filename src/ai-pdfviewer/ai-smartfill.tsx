import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    PdfViewerComponent,
    Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields,
    Inject,
    FormFieldDataFormat
} from '@syncfusion/ej2-react-pdfviewer';
import { Browser } from '@syncfusion/ej2-base';
import { useEffect } from 'react';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-react-popups';
import { AppBarComponent, ItemDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { ItemsDirective } from '@syncfusion/ej2-react-layouts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

function SmartFill() {
    // Replace the localhost web service url here
    const SERVICE_URL: string = 'Service_Url/api/pdfviewer';
    useEffect(() => {
        if (rightContainerBlack) {
            createSpinner({ target: rightContainerBlack });
            hideSpinner(rightContainerBlack);
        }
        toolbarObj.hideItem(6, true);
        toolbarObj.hideItem(5, true);
        if (Browser.isDevice) {
            if (copyObjBtn1 && copyObjBtn2 && copyObjBtn3) {
                copyObjBtn1.element.style.display = "block";
                copyObjBtn2.element.style.display = "block";
                copyObjBtn3.element.style.display = "block";
            }
        }
        else {
            document.getElementById("e-pv-card1")?.addEventListener("mouseenter", () => {
                if (copyObjBtn1) {
                    copyObjBtn1.element.style.display = "block";
                }
            });
            document.getElementById("e-pv-card1")?.addEventListener("mouseleave", () => {
                if (copyObjBtn1) {
                    copyObjBtn1.element.style.display = "none";
                    copyObjBtn1.iconCss = "e-icons e-copy";
                    copyObjBtn1.disabled = false;
                    copyObjBtn1.dataBind();
                }
            });
            document.getElementById("e-pv-card2")?.addEventListener("mouseenter", () => {
                if (copyObjBtn2) {
                    copyObjBtn2.element.style.display = "block";
                }
            });
            document.getElementById("e-pv-card2")?.addEventListener("mouseleave", () => {
                if (copyObjBtn2) {
                    copyObjBtn2.element.style.display = "none";
                    copyObjBtn2.iconCss = "e-icons e-copy";
                    copyObjBtn2.disabled = false;
                    copyObjBtn2.dataBind();
                }
            });
            document.getElementById("e-pv-card3")?.addEventListener("mouseenter", () => {
                if (copyObjBtn3) {
                    copyObjBtn3.element.style.display = "block";
                }
            });
            document.getElementById("e-pv-card3")?.addEventListener("mouseleave", () => {
                if (copyObjBtn3) {
                    copyObjBtn3.element.style.display = "none";
                    copyObjBtn3.iconCss = "e-icons e-copy";
                    copyObjBtn3.disabled = false;
                    copyObjBtn3.dataBind();
                }
            });
        }
        if (copyObjBtn1) {
            copyObjBtn1.element.addEventListener('click', copyContent1);
        }
        if (copyObjBtn2) {
            copyObjBtn2.element.addEventListener('click', copyContent2);
        }
        if (copyObjBtn3) {
            copyObjBtn3.element.addEventListener('click', copyContent3);
        }
        fileUploadBtn.addEventListener('change', readFile, false);
    }, []);
    let pdfviewer: PdfViewerComponent;
    let toolbarObj: ToolbarComponent;
    let rightContainer: HTMLDivElement;
    let rightContainerBlack: HTMLDivElement;
    let smartFillContainerOpen: boolean = false;
    let copyObjBtn1: ButtonComponent;
    let copyObjBtn2: ButtonComponent;
    let copyObjBtn3: ButtonComponent;
    let clipContent: any;
    let fileUploadBtn: HTMLInputElement;

    /* Function for the document load event */
    function documentLoaded() {
        toolbarObj.hideItem(6, false);
        if (Browser.isDevice) {
            toolbarObj.hideItem(5, false);
        }
    }

    /* Function for download */
    function downloadClicked() {
        pdfviewer.download();
    }

    /* Function for print */
    function printClicked() {
        pdfviewer.print.print();
    }

    /* Function for create event */
    function sampleCreated() {
        const appbarContainer = document.getElementById('e-pv-smartfill-appbar-container');
        const appbarContainerSm = document.getElementById('e-pv-smartfill-appbar-container-sm');
        if (appbarContainer) {
            appbarContainer.style.display = 'block';
        }
        if (Browser.isDevice) {
            if (appbarContainerSm) {
                appbarContainerSm.style.display = 'block';
            }
        }
        pdfviewer.load('form_document_1.pdf', '');
    }

    function copyContent1() {
        var obj = document.getElementById("e-pv-card-content1");
        clipContent = obj?.innerHTML;
        copyToClipboard(clipContent);
        copyObjBtn1.iconCss = "e-icons e-check";
        copyObjBtn1.disabled = true;
        copyObjBtn1.dataBind();
        copyObjBtn2.iconCss = "e-icons e-copy";
        copyObjBtn2.dataBind();
        copyObjBtn3.iconCss = "e-icons e-copy";
        copyObjBtn3.dataBind();
        if (Browser.isDevice) {
            setTimeout(() => {
                copyObjBtn1.iconCss = "e-icons e-copy";
                copyObjBtn1.disabled = false;
                copyObjBtn1.dataBind();
            }, 2000);
        }
    }
    function copyContent2() {
        var obj = document.getElementById("e-pv-card-content2");
        clipContent = obj?.innerHTML;
        copyToClipboard(clipContent);
        copyObjBtn1.iconCss = "e-icons e-copy";
        copyObjBtn1.dataBind();
        copyObjBtn2.iconCss = "e-icons e-check";
        copyObjBtn2.disabled = true;
        copyObjBtn2.dataBind();
        copyObjBtn3.iconCss = "e-icons e-copy";
        copyObjBtn3.dataBind();
        if (Browser.isDevice) {
            setTimeout(() => {
                copyObjBtn2.iconCss = "e-icons e-copy";
                copyObjBtn2.disabled = false;
                copyObjBtn2.dataBind();
            }, 2000);
        }
    }
    function copyContent3() {
        var obj = document.getElementById("e-pv-card-content3");
        clipContent = obj?.innerHTML;
        copyToClipboard(clipContent);
        copyObjBtn1.iconCss = "e-icons e-copy";
        copyObjBtn1.dataBind();
        copyObjBtn2.iconCss = "e-icons e-copy";
        copyObjBtn2.dataBind();
        copyObjBtn3.iconCss = "e-icons e-check";
        copyObjBtn3.disabled = true;
        copyObjBtn3.dataBind();
        if (Browser.isDevice) {
            setTimeout(() => {
                copyObjBtn3.iconCss = "e-icons e-copy";
                copyObjBtn3.disabled = false;
                copyObjBtn3.dataBind();
            }, 2000);
        }
    }

    function copyToClipboard(text: string): void {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {

            }).catch(err => {
                console.error("Failed to copy text to clipboard: ", err);
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand("copy");
                console.log("Text copied to clipboard using fallback method!");
            } catch (err) {
                console.error("Failed to copy text to clipboard: ", err);
            }
            document.body.removeChild(textarea);
        }
    }

    function openSampleContent() {
        if (Browser.isDevice) {
            if (!smartFillContainerOpen) {
                if (rightContainer) {
                    rightContainer.style.display = 'block';
                }
                smartFillContainerOpen = true;
            }
            else {
                if (rightContainer) {
                    rightContainer.style.display = 'none';
                }
                smartFillContainerOpen = false;
            }
        }
    }

    /* Function for create request to get the form field data */
    function getSmartFillResult() {
        if (rightContainerBlack) {
            rightContainerBlack.style.display = 'block';
        }
        if (rightContainerBlack) {
            showSpinner(rightContainerBlack);
        }
        let data: any = pdfviewer.getRootElement();
        var hashId: any = data.ej2_instances[0].viewerBase.hashId;
        var dictionary: any = {
            "hashId": hashId
        };
        let url: any = SERVICE_URL + "/SmartFillClicked";
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                let response = xhr.responseText;
                try {
                    pdfviewer.importFormFields(response, FormFieldDataFormat.Xfdf);
                    pdfviewer.dataBind();
                    if (rightContainerBlack) {
                        rightContainerBlack.style.display = 'none';
                    }
                    if (rightContainerBlack) {
                        hideSpinner(rightContainerBlack);
                    }
                } catch (e) {
                    console.error('Failed to parse response as JSON:', e);
                }
            } else {
                console.error('Request failed with status:', xhr.status, xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.error('Network error');
        };
        navigator.clipboard.readText().then((clipboardText: string) => {
            pdfviewer.exportFormFieldsAsObject(FormFieldDataFormat.Xfdf)
                .then((xfdfdata: any) => {
                    var post: any = JSON.stringify({
                        jsonObject: dictionary,
                        textareaContent: clipboardText,  // Set clipboard content here
                        exportFormFieldValue: xfdfdata
                    });
                    xhr.send(post); // Send the request with clipboard content
                })
                .catch((error: any) => {
                    console.error('Error getting XFDF data:', error);
                });
        }).catch(err => {
            console.error("Failed to read clipboard: ", err);
        });
    }

    /* Function for read the open file */
    function readFile(args: any): void {
        let upoadedFiles: any = args.target.files;
        if (args.target.files[0] !== null) {
            let uploadedFile: File = upoadedFiles[0];
            if (uploadedFile) {
                let reader: FileReader = new FileReader();
                let filename: string = upoadedFiles[0].name;
                reader.readAsDataURL(uploadedFile);
                reader.onload = (e: any): void => {
                    let uploadedFileUrl: string = e.currentTarget.result;
                    pdfviewer.documentPath = uploadedFileUrl;
                    pdfviewer.fileName = filename;
                };
            }
        }
    }

    /* Function for open the document */
    function openDocument(): void {
        fileUploadBtn?.click();
    }


    return (
        <>
            <div id="e-pv-smartfill-parent-container">
                <div id="e-pv-smart-fill-container">
                    <div id="e-pv-smartfill-left-container">
                        <div id="e-pv-smartfill-appbar-container" style={{ display: 'none' }}>
                            <AppBarComponent id="e-pv-smartfill-defaultappbar"
                                colorMode='Primary'
                            >
                                <span className="e-pv-smartfill-regular">Smart Fill</span>
                            </AppBarComponent>
                        </div>
                        <ToolbarComponent id="e-pv-smartfill-toolbar" style={{ top: '0px' }}
                            ref={toolbar => toolbarObj = toolbar as ToolbarComponent}
                        >
                            <ItemsDirective>
                                <ItemDirective prefixIcon="e-icons e-folder" tooltipText="Open" text="Open File" id="openButton" cssClass="e-pv-open-container" click={openDocument} />
                                <ItemDirective type="Separator" tooltipText="separator" align="Left" />
                                <ItemDirective prefixIcon="e-icons e-download" tooltipText="Save" text="Save" id="saveButton" cssClass="e-pv-save-container" click={downloadClicked} />
                                <ItemDirective prefixIcon="e-icons e-print" tooltipText="Print" text="Print" id="printButton" cssClass="e-pv-print-container" click={printClicked} />
                                <ItemDirective type="Separator" tooltipText="separator" />
                                <ItemDirective prefixIcon="e-icons e-redaction" tooltipText="Open Sample Content" text="Open Content" align="Right" id="openSampleContentButton" cssClass="e-pv-content-smartfill-btn-container" click={openSampleContent} />
                                <ItemDirective tooltipText="Smart Fill" text="Smart Form Fill" align="Right" id="smartFillButton"
                                    template={() => (
                                        !Browser.isDevice ?
                                            <ButtonComponent
                                                isPrimary={true}
                                                id="smartfill_btn"
                                                iconCss='e-icons e-smart-paste'
                                                isToggle={true}
                                                content='Smart Form Fill'
                                            /> :
                                            <ButtonComponent
                                                isPrimary={true}
                                                id="smartfill_btn"
                                                iconCss='e-icons e-smart-paste'
                                                isToggle={true}
                                            />
                                    )}
                                    cssClass="e-pv-smartfill-btn-container" click={getSmartFillResult} />
                            </ItemsDirective>
                        </ToolbarComponent>
                        <PdfViewerComponent id="e-pv-smartfill-pdfviewer"
                            ref={pdfviewerObj => pdfviewer = pdfviewerObj as PdfViewerComponent}
                            serviceUrl={SERVICE_URL}
                            enableAnnotationToolbar={false}
                            enableToolbar={false}
                            enablePageOrganizer={false}
                            zoomMode="FitToPage"
                            downloadFileName="SmartFill.pdf"
                            created={sampleCreated}
                            documentLoad={documentLoaded}
                        >
                            <Inject services={[Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields]} />
                        </PdfViewerComponent>
                        <input
                            type="file"
                            ref={fileUpload => fileUploadBtn = fileUpload as HTMLInputElement}
                            id="e-pv-smartfill-fileUpload"
                            accept=".pdf"
                            style={{ display: 'block', visibility: 'hidden', width: '0', height: '0' }}
                        />
                        <div id="e-pv-smartfill-right-container-blackout" style={{ display: 'none' }}
                            ref={container => rightContainerBlack = container as HTMLDivElement}
                        ></div>
                    </div>
                    <div id="e-pv-smartfill-right-container"
                        ref={container => rightContainer = container as HTMLDivElement}>
                        <div id="e-pv-smartfill-text">
                            <div id="e-pv-smartfill-header-text">Sample content to copy</div>
                        </div>
                        <div tabIndex={0} className="e-card" id="e-pv-card1">
                            <ButtonComponent cssClass='e-copy-icon' iconCss='e-icons e-copy' id="e-pv-copy-card1" style={{ display: 'none' }}
                                ref={btn => copyObjBtn1 = btn as ButtonComponent}
                            ></ButtonComponent>
                            <div className="e-card-content" id="e-pv-card-content1">
                                Hi, this is Alice. You can contact me at alice456@gmail.com. I am female, born on July 15, 1998. I want to unsubscribe from a newspaper and learn courses, specifically a Cloud Computing course. I am from Texas.
                            </div>
                        </div>
                        <div tabIndex={0} className="e-card" id="e-pv-card2">
                            <ButtonComponent cssClass='e-copy-icon' ref={btn => copyObjBtn2 = btn as ButtonComponent} iconCss='e-icons e-copy' id="e-pv-copy-card2" style={{ display: 'none' }}></ButtonComponent>
                            <div className="e-card-content" id="e-pv-card-content2">
                                Hello, I'm John Paul born on March 12, 2001. I am not looking to subscribe to any newspapers or enroll in courses. I'm male and you can reach me at johnpaul2209@gmail.com. I'm from Alaska and I'm interested in a Web Development course.
                            </div>
                        </div>
                        <div tabIndex={0} className="e-card" id="e-pv-card3">
                            <ButtonComponent cssClass='e-copy-icon' ref={btn => copyObjBtn3 = btn as ButtonComponent} iconCss='e-icons e-copy' id="e-pv-copy-card3" style={{ display: 'none' }}></ButtonComponent>
                            <div className="e-card-content" id="e-pv-card-content3">
                                Hello, my name is Peter Parker, born on Sept 22, 2002. I'm interested in subscribing to a newspaper and learning through courses. I'm male, and you can contact me at peterparker03@gmail.com. I'm from New York, and I'm interested in a Digital Marketing course.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SmartFill