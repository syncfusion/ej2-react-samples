import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ImageEditorComponent } from "@syncfusion/ej2-react-image-editor"
import { ColorPickerComponent, ColorPickerEventArgs, PaletteTileEventArgs, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ClickEventArgs, ItemDirective, ItemsDirective, NodeSelectEventArgs, SidebarComponent, ToolbarComponent, TreeViewComponent } from "@syncfusion/ej2-react-navigations";
import { hideSpinner, showSpinner } from "@syncfusion/ej2-react-popups";
import { createElement, Draggable } from "@syncfusion/ej2-base";
import { useEffect } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { StabilityAiModel, StabilityAiModelBGRemover, StabilityAiModelMagicEraser } from './stability-ai-model';
import './image-editor.css';

function ImageEditor() {
    let imageEditorObj: ImageEditorComponent;
    let treeObj: TreeViewComponent;
    let sideObj: SidebarComponent;
    let outlineTextBox: TextBoxComponent;
    let colorPicker: ColorPickerComponent;
    let wrapperDiv: HTMLDivElement;
    let colorPickerVal: string = '';
    useEffect(() => {
        const draggableElements = ['magic-eraser', 'bg-changer'];
        draggableElements.forEach(className => {
            const dragElement = document.getElementsByClassName(className)[0] as HTMLElement;
            new Draggable(dragElement, { clone: false });
        });
        imageEditorObj.open('images/image-ai.png');
    }, []);

    const folderEle: string = '<div class= "e-folder"><div class= "e-folder-name">AI Image Editor</div></div>';
    const treeData: { [key: string]: Object }[] = [
        { id: "1", name: "Magic Eraser", imageUrl: "images/object-remover.gif" },
        { id: "2", name: "Change Background", imageUrl: "images/change-bg.png" },
        { id: "2", name: "Remove Background", imageUrl: "images/remove-bg.png" }
    ];

    // Assume you already have an ImageData object named imageData
    function imageDataToBase64(imageData: ImageData): string {
        const canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.putImageData(imageData, 0, 0);
            return canvas.toDataURL();
        }
        return '';
    }

    function toggleDisplay(elementClassToShow: string, elementClassToHide: string): void {
        (document.getElementsByClassName(elementClassToHide)[0] as HTMLElement).style.display = 'none';
        (document.getElementsByClassName(elementClassToShow)[0] as HTMLElement).style.display = 'block';
    }

    function processImageData(): void {
        showSpinner(imageEditorObj.element);
        wrapperDiv.style.opacity = '0.5';
        let imageData = (imageEditorObj as any).getImageData(false);
        let url = imageDataToBase64(imageData);
        const file = base64ToFile(url, 'image.png');
        removeBG(file);
    }

    function OnSelect(args: NodeSelectEventArgs): void {
        switch (args.nodeData.text) {
            case "Magic Eraser":
                toggleDisplay('magic-eraser', 'bg-changer');
                imageEditorObj.update();
                imageEditorObj.element.setAttribute('data-value', 'mask-drawing');
                (imageEditorObj as any).freehandDraw(true);
                treeObj.selectedNodes = [];
                break;
            case "Change Background":
                toggleDisplay('bg-changer', 'magic-eraser');
                treeObj.selectedNodes = [];
                processImageData();
                break;
            case "Remove Background":
                processImageData();
                break;
        }
    }

    function bgRemoveBtnClick() {
        (document.getElementsByClassName('bg-changer')[0] as HTMLElement).style.display = 'none';
        colorPicker.refresh();
        colorPickerVal = '#ffffff';
        outlineTextBox.value = '';
        const selectedElement = (colorPicker.element.parentElement as HTMLElement).querySelector('.e-selected');
        if (selectedElement) {
            selectedElement.classList.remove('e-selected');
        }
        hideSpinner(imageEditorObj.element);
        wrapperDiv.style.opacity = '1';
    }

    function getImageDataAsBase64(imageEditor: ImageEditorComponent): string {
        const imageData = imageEditor.getImageData(false);
        return imageDataToBase64(imageData);
    }

    function base64ToFile(base64String: string, fileName: string) {
        const byteString = atob(base64String.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([intArray], { type: 'image/png' });
        const file = new File([blob], fileName, { type: 'image/png' });
        return file;
    }

    function removeBG(file: File) {
        let aiOutput = StabilityAiModelBGRemover(file);
        aiOutput.then((result: any) => {
            imageEditorObj.open(result, false, { backgroundColor: '' });
            setTimeout(() => {
                hideSpinner(imageEditorObj.element);
                wrapperDiv.style.opacity = '1';
                treeObj.selectedNodes = [];
            }, 100);
        });
    }

    const removeBtnClick = (): void => {
        imageEditorObj.element.setAttribute('data-value', '');
        (document.getElementsByClassName('magic-eraser')[0] as HTMLElement).style.display = 'none';
        hideSpinner(imageEditorObj.element);
        wrapperDiv.style.opacity = '1';
        imageEditorObj.discard();
    }

    const bgBtnClick = (): void => {
        bgRemoveBtnClick();
    }

    const eraseBtnClick = (): void => {
        const maskUrl = getImageDataAsBase64(imageEditorObj);
        imageEditorObj.element.setAttribute('data-value', '');
        imageEditorObj.freehandDraw(false);
        const url = getImageDataAsBase64(imageEditorObj);
        showSpinner(imageEditorObj.element);
        const file = base64ToFile(url, 'image.png');
        const maskFile = base64ToFile(maskUrl, 'mask.png');
        const aiOutput = StabilityAiModelMagicEraser(file, maskFile);
        aiOutput.then((result: any) => {
            imageEditorObj.open(result, false, { backgroundColor: '' });
            setTimeout(() => {
                hideSpinner(imageEditorObj.element);
                wrapperDiv.style.opacity = '1';
                treeObj.selectedNodes = [];
            }, 100);
            (document.getElementsByClassName('magic-eraser')[0] as HTMLElement).style.display = 'none';
        });
    }

    const bgChangeBtnClick = (): void => {
        showSpinner(imageEditorObj.element);
        wrapperDiv.style.opacity = '0.5';
        if (outlineTextBox.value && outlineTextBox.value !== '') {
            let url = getImageDataAsBase64(imageEditorObj);
            const file = base64ToFile(url, 'image.png');
            let prompt = outlineTextBox.value;
            let searchPrompt = 'Background of the image';
            let aiOutput = StabilityAiModel(file, prompt, searchPrompt);
            aiOutput.then((result: any) => {
                imageEditorObj.open(result, false, { backgroundColor: '' });
                setTimeout(() => {
                    bgRemoveBtnClick();
                }, 100);
                (document.getElementsByClassName('bg-changer')[0] as HTMLElement).style.display = 'none';
            });
        } else {
            bgRemoveBtnClick();
        }
    }

    function change(args: ColorPickerEventArgs): void {
        colorPickerVal = args.currentValue.hex;
        imageEditorObj.open('', false, { backgroundColor: colorPickerVal });
    }

    function toolbarCliked(args: ClickEventArgs): void {
        if (args.item.tooltipText == "Menu") {
            sideObj.toggle();
            setTimeout(() => {
                imageEditorObj.update();
            }, 500);
        }
    }

    return (
        <>
            <div className="container">
                <div id="wrapper-container"
                    ref={wrapper => wrapperDiv = wrapper as HTMLDivElement}>
                    <div className="magic-eraser">
                        <div className="upper-div">
                            <label>Magic Eraser</label>
                            <ButtonComponent id="remove-btn" aria-label="button"
                            onClick={removeBtnClick}
                                iconCss='e-icons e-close' cssClass='e-small e-round' isPrimary={true}
                            ></ButtonComponent>
                        </div>
                        <div className="lower-div">
                            <img src="images/object-remover.gif" style={{ width: "130px", height: "130px" }}/>
                            <br></br><span>Select the object to be removed</span>
                        </div>
                        <ButtonComponent className="remove-button" id="eraseBtn" isPrimary={true} onClick={eraseBtnClick}>Remove</ButtonComponent>
                    </div>
                    <div className="bg-changer">
                        <div className="upper-div">
                            <label>Change Background</label>
                            <ButtonComponent id="bg-change-remove-btn" aria-label="button"
                            onClick={bgBtnClick}
                                iconCss='e-icons e-close' cssClass='e-small e-round' isPrimary={true}
                            ></ButtonComponent>
                        </div>
                        <div className="lower-div">
                            <div className="col-lg-12 control-section">
                                <div id="colorpicker-control">
                                    <span style={{ marginBottom: "10px" }}>New Color</span>
                                    <br></br>
                                    <ColorPickerComponent id="color-picker" type="color"
                                        change={change}
                                    />
                                </div>
                            </div>
                            <br></br><span>Preset Colors</span>
                            <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                <ColorPickerComponent
                                    ref={colorpickerObj => colorPicker = colorpickerObj as ColorPickerComponent}
                                    id="circle-palette"
                                    type="color"
                                    mode="Palette"
                                    modeSwitcher={false}
                                    inline={true}
                                    showButtons={false}
                                    columns={6}
                                    presetColors={{
                                        'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                                            '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
                                    }}
                                    beforeTileRender={(args: PaletteTileEventArgs) => {
                                        args.element.classList.add('e-circle-palette');
                                        args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
                                    }}
                                    change={change}
                                />
                            </div>
                            <span>Custom Background</span><br></br>
                            <TextBoxComponent id="outlined"
                                ref={textbox => outlineTextBox = textbox as TextBoxComponent}
                                placeholder='Example: Waterfalls, Mountains, etc..'
                                cssClass='e-outline'
                            />
                        </div>
                        <ButtonComponent className="bg-change-button" id="bgChangeBtn" onClick={bgChangeBtnClick} isPrimary={true}>Apply</ButtonComponent>
                    </div>
                    <div id="sidebar-wrapper" className="control-section">
                        <div style={{width: "100%"}}>
                            <ToolbarComponent
                                id="defaultToolbar"
                                cssClass="defaultToolbar"
                                height="50px"
                                clicked={toolbarCliked}
                            >
                                <ItemsDirective>
                                    <ItemDirective
                                        prefixIcon="e-tbar-menu-icon tb-icons"
                                        tooltipText="Menu"
                                    />
                                    <ItemDirective
                                        template={folderEle}
                                        cssClass="e-folder"
                                    />
                                </ItemsDirective>
                            </ToolbarComponent>
                        </div>
                        <div className="maincontent" style={{width: "100%"}}>
                            <div id="controlWrapper">
                                <ImageEditorComponent id="imageeditor" className="row"
                                    ref={imageEditor => imageEditorObj = imageEditor as ImageEditorComponent}
                                    fileOpened={() => {
                                        setTimeout(() => {
                                            imageEditorObj.update();
                                        }, 200);
                                    }}
                                ></ImageEditorComponent>
                            </div>
                        </div>
                    </div>
                    <SidebarComponent id="defaultSidebar" className="default-sidebar"
                        ref={sidebar => sideObj = sidebar as SidebarComponent}
                        width="200px"
                        target=".maincontent"
                        position='Left'
                        type='Push'
                    >
                        <TreeViewComponent id="defaultTree"
                        cssClass="image-editor-tree"
                            ref={tree => treeObj = tree as TreeViewComponent}
                            nodeSelected={OnSelect}
                            fields={{ dataSource: treeData, id: "id", text: "name", selected: "selected", parentID: "pid", hasChildren: "hasChild", expanded: "expanded" }}
                        ></TreeViewComponent>
                    </SidebarComponent>
                </div>
            </div>
        </>
    )
}

export default ImageEditor
