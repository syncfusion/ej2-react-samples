import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Dimension, ImageEditorComponent, ImageFilterOption, ShapeChangeEventArgs, ShapeType } from '@syncfusion/ej2-react-image-editor';
import { isNullOrUndefined, getComponent } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import './custom-toolbar.css';
import { FabComponent } from '@syncfusion/ej2-react-buttons';
import { ShapeSettings } from '@syncfusion/ej2/maps';
import { DropDownButtonComponent, ItemModel as DropDownButtonItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { ItemDirective, ItemModel, ItemsDirective, Toolbar, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { ToolbarClickEventArgs } from '@syncfusion/ej2/filemanager';
import { ColorPickerComponent, ColorPickerEventArgs, PaletteTileEventArgs } from '@syncfusion/ej2-react-inputs';
import { Browser, createElement, extend } from '@syncfusion/ej2/base';

const CustomToolbar = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let imageEditorInstance = useRef<ImageEditorComponent>(null);
    let topToolbarInstance = useRef<ToolbarComponent>(null);
    let bottomToolbarInstance = useRef<ToolbarComponent>(null);
    let filterToolbarInstance = useRef<ToolbarComponent>(null);
    let fontColorInstance = useRef<ColorPickerComponent>(null);
    let annotationInstance = useRef<DropDownButtonComponent>(null);
    let fillColorInstance = useRef<ColorPickerComponent>(null);
    let strokeColorInstance = useRef<ColorPickerComponent>(null);
    let penColorInstance = useRef<ColorPickerComponent>(null);
    let currentToolbar: string = 'main';
    let activeObjIndex: string;
    let tempShapeSettings: any;
    let isShapeCustomizing: boolean = false;
    let isTextEditing: boolean = false;
    let isShapeSelected: boolean = false;
    let filter: ImageFilterOption = ImageFilterOption.Default;
    let imageData: ImageData;
    const presetColors: { [key: string]: string[]; } = {
        'custom': ['#ffffff', '#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
        '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
    };
    const editClicked = () => {
        document.getElementById('imagePreviewContainer').style.display = 'none';
        document.getElementById('image-editor-container').style.display = 'block';
        imageEditorInstance.current.open((document.getElementById('previewImgContainer') as HTMLImageElement).src);
        let toolbarArea: HTMLElement = document.getElementById('top-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        toolbarArea = document.getElementById('bottom-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        refreshToolbar('main');
    };
    const fileOpened = () => {
        imageData = imageEditorInstance.current.getImageData();
    }
    const onIECreated = () => {
        const image: HTMLImageElement = document.getElementById('previewImgContainer') as HTMLImageElement;
        if (Browser.isDevice && image) {
            image.src = 'src/image-editor/images/flower.png';
        }
        document.addEventListener('keydown', keyDownEventHandler.bind(this));
        document.getElementById('image-editor-container').addEventListener('dblclick', doubleClickEvent.bind(this));
    }
    const shapeChanging = (args: ShapeChangeEventArgs): void => {
        if (args.action === 'select') {
            isShapeSelected = isShapeSelected ? false : true;
            updateToolbar(args, true);
        } else if (args.action === 'insert') {
            activeObjIndex = args.currentShapeSettings.id;
            tempShapeSettings = args.currentShapeSettings;
        }
    };
    const shapeChange = (args: ShapeChangeEventArgs): void => {
        if (args.action === 'apply' && !isShapeCustomizing) {
            isTextEditing = false;
            setTimeout(function() {
                refreshToolbar('main');
            }, 1);
        }
    };
    const click = (): void => {
        if (currentToolbar === 'filter') {
            refreshToolbar('main');
        }
    }
    // Handler used to reposition the tooltip on page scroll
    const onScroll = (): void => {
        if (document.getElementById("image-editor_sliderWrapper")) {
            let slider: any = getComponent(
                document.getElementById("image-editor_sliderWrapper"),
                "slider"
            );
            slider.refreshTooltip(slider.tooltipTarget);
        }
    };
    if (!isNullOrUndefined(document.getElementById("right-pane"))) {
        document
            .getElementById("right-pane")
            .addEventListener("scroll", onScroll.bind(this));
    }

    const fontColorTemplate = () => {
        const fontColorChanged = (args: ColorPickerEventArgs): void => {
            if (imageEditorInstance.current.disabled) {
                return;
            }
            let selElem: HTMLElement = fontColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
            selElem.style.backgroundColor = args.currentValue.rgba;
            isShapeCustomizing = true;
            const shapeSetting: any = imageEditorInstance.current.getShapeSetting(activeObjIndex);
            shapeSetting.color = args.value;
            imageEditorInstance.current.updateShape(shapeSetting, true);
            tempShapeSettings.color = args.value;
            isShapeSelected = true;
            if (isTextEditing) {
                imageEditorInstance.current.enableTextEditing();
            }
            isShapeCustomizing = false;
        }

        const color = tempShapeSettings && tempShapeSettings.color != null ? tempShapeSettings.color : '#fff';

        return (
            <div>
                <ColorPickerComponent id="imageEditor_textFont" ref={fontColorInstance} mode='Palette' cssClass='e-text-font-color' modeSwitcher={false} noColor={false} inline={false} showButtons={false} presetColors={presetColors} change={fontColorChanged} value={color} columns={4}></ColorPickerComponent>
            </div>
        )
    }

    const annotationTemplate = () => {
        const items: DropDownButtonItemModel[] = [
            { text: 'Rectangle', id: 'rectangle', iconCss: 'e-icons e-rectangle' },
            { text: 'Ellipse', id: 'ellipse', iconCss: 'e-icons e-circle' },
            { text: 'Line', id: 'line', iconCss: 'e-icons e-line' }
        ];
        const change = (args: any) => {
            if (imageEditorInstance.current.disabled) {
                return;
            }
            refreshToolbar(args.item.id);
        }
        return (
            <div>
                <DropDownButtonComponent ref={annotationInstance} id="imageEditor_annotationButton" iconCss='e-icons e-shapes' cssClass='e-image-popup' items={items} select={change}></DropDownButtonComponent>
            </div>
        )
    }

    const fillColorTemplate = () => {
        const tileRender = (args: PaletteTileEventArgs): void => {
            args.element.classList.add("e-circle-palette");
            args.element.appendChild(createElement("span", { className: "e-circle-selection" }));
        }

        const colors: {[key: string]: string[]; } = extend({}, presetColors, {}, true) as {[key: string]: string[]};
        colors['custom'][0] = '';

        const fillColorChanged = (args: ColorPickerEventArgs): void => {
            if (imageEditorInstance.current.disabled) {
                return;
            }
            let selElem: HTMLElement = fillColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
            if (args.currentValue.rgba === '') {
                selElem.classList.add('e-nocolor-item');
            } else {
                selElem.classList.remove('e-nocolor-item');
                selElem.style.background = args.currentValue.rgba;
            }
            selElem.style.background = args.currentValue.rgba;
            isShapeCustomizing = true;
            const shapeSetting: any = imageEditorInstance.current.getShapeSetting(activeObjIndex);
            shapeSetting.fillColor = args.currentValue.rgba;
            imageEditorInstance.current.updateShape(shapeSetting, true);
            tempShapeSettings.fillColor = args.currentValue.rgba;
            isShapeSelected = true;
            if (isTextEditing) {
                imageEditorInstance.current.enableTextEditing();
            }
            isShapeCustomizing = false;
        }

        return (
            <div>
                <ColorPickerComponent ref={fillColorInstance} id="imageEditor_shapeFill" mode='Palette' cssClass='e-shape-fill-color' modeSwitcher={false} noColor={true} inline={false} showButtons={false} presetColors={colors} beforeTileRender={tileRender} change={fillColorChanged} value='' columns={4}></ColorPickerComponent>
            </div>
        )
    }

    const strokeColorTemplate = () => {
        const tileRender = (args: PaletteTileEventArgs): void => {
            args.element.classList.add("e-circle-palette");
            args.element.appendChild(createElement("span", { className: "e-circle-selection" }));
        }

        const strokeColorChanged = (args: ColorPickerEventArgs): void => {
            if (imageEditorInstance.current.disabled) {
                return;
            }
            let selElem: HTMLElement = strokeColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
            selElem.style.backgroundColor = args.currentValue.rgba;
            isShapeCustomizing = true;
            const shapeSetting: any = imageEditorInstance.current.getShapeSetting(activeObjIndex);
            shapeSetting.strokeColor = args.currentValue.rgba;
            imageEditorInstance.current.updateShape(shapeSetting, true);
            tempShapeSettings.strokeColor = args.currentValue.rgba;
            isShapeSelected = true;
            if (isTextEditing) {
                imageEditorInstance.current.enableTextEditing();
            }
            isShapeCustomizing = false;
        }

        return (
            <div>
                <ColorPickerComponent ref={strokeColorInstance} id="imageEditor_shapeStroke" mode='Palette' cssClass='e-shape-stroke-color' modeSwitcher={false} noColor={false} inline={false} showButtons={false} presetColors={presetColors} beforeTileRender={tileRender} change={strokeColorChanged} value='#fff' columns={4}></ColorPickerComponent>
            </div>
        )
    }

    const penColorTemplate = () => {
        const tileRender = (args: PaletteTileEventArgs): void => {
            args.element.classList.add("e-circle-palette");
            args.element.appendChild(createElement("span", { className: "e-circle-selection" }));
        }

        const penColorChanged = (args: ColorPickerEventArgs): void => {
            if (imageEditorInstance.current.disabled) {
                return;
            }
            let selElem: HTMLElement = penColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;;
            selElem.style.backgroundColor = args.currentValue.rgba;
            if (tempShapeSettings && tempShapeSettings.id && tempShapeSettings.id.split('_')[0] === 'pen') {
                const shapeSetting: any = {id: tempShapeSettings.id, type: ShapeType.FreehandDraw,
                    startX: tempShapeSettings.startX, startY: tempShapeSettings.startY,
                    strokeColor: args.currentValue.hex, strokeWidth: tempShapeSettings.strokeWidth,
                    opacity: tempShapeSettings.opacity, points: tempShapeSettings.points };
                imageEditorInstance.current.updateShape(shapeSetting, true);
                tempShapeSettings.strokeColor = args.currentValue.hex;
                isShapeSelected = true;
            } else {
                const shapeSetting: any = {id: null, type: ShapeType.FreehandDraw, startX: null, startY: null,
                    strokeColor: args.currentValue.hex};
                imageEditorInstance.current.updateShape(shapeSetting);
            }
        }

        return (
            <div>
                <ColorPickerComponent ref={penColorInstance} id="imageEditor_pen_stroke" mode='Palette' cssClass='e-pen-color' modeSwitcher={false} noColor={false} inline={false} showButtons={false} presetColors={presetColors} beforeTileRender={tileRender} change={penColorChanged} value='#fff' columns={4}></ColorPickerComponent>
            </div>
        )
    }

    const defaultCanvasTemplate = () => {
        return (
            <div className='filter-wrapper' style={{boxSizing:"content-box"}}>
                <canvas id='imageEditor_defaultCanvas'></canvas>
                <div style={{textAlign:"center"}}>
                    <span>Default</span>
                </div>
            </div>
        )
    }

    const chromeCanvasTemplate = () => {
        return (
            <div className='filter-wrapper' style={{boxSizing:"content-box"}}>
                <canvas id='imageEditor_chromeCanvas'></canvas>
                <div style={{textAlign:"center"}}>
                    <span>Chrome</span>
                </div>
            </div>
        )
    }

    const coldCanvasTemplate = () => {
        return (
            <div className='filter-wrapper' style={{boxSizing:"content-box"}}>
                <canvas id='imageEditor_coldCanvas'></canvas>
                <div style={{textAlign:"center"}}>
                    <span>Cold</span>
                </div>
            </div>
        )
    }

    const warmCanvasTemplate = () => {
        return (
            <div className='filter-wrapper' style={{boxSizing:"content-box"}}>
                <canvas id='imageEditor_warmCanvas'></canvas>
                <div style={{textAlign:"center"}}>
                    <span>Warm</span>
                </div>
            </div>
        )
    }

    const grayscaleCanvasTemplate = () => {
        return (
            <div className='filter-wrapper' style={{boxSizing:"content-box"}}>
                <canvas id='imageEditor_grayscaleCanvas'></canvas>
                <div style={{textAlign:"center"}}>
                    <span>Grayscale</span>
                </div>
            </div>
        )
    }

    const sepiaCanvasTemplate = () => {
        return (
            <div className='filter-wrapper' style={{boxSizing:"content-box"}}>
                <canvas id='imageEditor_sepiaCanvas'></canvas>
                <div style={{textAlign:"center"}}>
                    <span>Sepia</span>
                </div>
            </div>
        )
    }

    const invertCanvasTemplate = () => {
        return (
            <div className='filter-wrapper' style={{boxSizing:"content-box"}}>
                <canvas id='imageEditor_invertCanvas'></canvas>
                <div style={{textAlign:"center"}}>
                    <span>Invert</span>
                </div>
            </div>
        )
    }

    const onTopToolbarCreated = () => {
        const toolbarArea: HTMLElement = document.getElementById('top-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
    }

    const onBottomToolbarCreated = () => {
        const toolbarArea: HTMLElement = document.getElementById('bottom-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
    }

    const onFilterToolbarCreated = () => {
        const inMemoryCanvas: HTMLCanvasElement = document.createElement('canvas');
        const inMemoryContext: CanvasRenderingContext2D = inMemoryCanvas.getContext('2d');
        inMemoryCanvas.width = imageData.width; inMemoryCanvas.height = imageData.height;
        inMemoryContext.putImageData(imageData, 0, 0);
        updateFilterCanvas('_defaultCanvas', 'default', inMemoryCanvas);
        updateFilterCanvas('_chromeCanvas', 'chrome', inMemoryCanvas);
        updateFilterCanvas('_coldCanvas', 'cold', inMemoryCanvas);
        updateFilterCanvas('_warmCanvas', 'warm', inMemoryCanvas);
        updateFilterCanvas('_grayscaleCanvas', 'grayscale', inMemoryCanvas);
        updateFilterCanvas('_sepiaCanvas', 'sepia', inMemoryCanvas);
        updateFilterCanvas('_invertCanvas', 'invert', inMemoryCanvas);
    }

    const updateFilterCanvas = (selector: string, type: string, inMemoryCanvas: HTMLCanvasElement) => {
        const filter: HTMLCanvasElement = document.querySelector('#imageEditor' + selector);
        if (filter) {
            let ctx: CanvasRenderingContext2D = filter.getContext('2d');
            ctx = filter.getContext('2d');
            filter.style.width = '100px'; filter.style.height = '100px';
            ctx.filter = imageEditorInstance.current.getImageFilter(toPascalCase(type) as ImageFilterOption) as string;
            ctx.drawImage(inMemoryCanvas, 0, 0, 300, 150);
        }
    }

    const toolbarClicked = (args: ToolbarClickEventArgs) => {
        const item: string = args.item.id.toLowerCase();
        const dimension: Dimension = imageEditorInstance.current.getImageDimension();
        let imageData: ImageData; let canvas: HTMLCanvasElement;
        switch (item) {
        case 'back':
            apply();
            refreshToolbar('main');
            break;
        case 'cancel':
            isTextEditing = false;
            if (currentToolbar === 'main') {
                document.getElementById('image-editor-container').style.display = 'none';
                (document.getElementById('imagePreviewContainer') as HTMLElement).style.display = 'block';
                imageEditorInstance.current.reset();
            } else {
                if ((isShapeCustomizing || isShapeSelected) && tempShapeSettings && tempShapeSettings.id) {
                    imageEditorInstance.current.updateShape(tempShapeSettings);
                }
                imageEditorInstance.current.clearSelection(true);
                refreshToolbar('main');
            }
            break;
        case 'undo':
            if (currentToolbar === 'pen') {
                imageEditorInstance.current.freeHandDraw(false);
            }
            isTextEditing = false;
            imageEditorInstance.current.undo();
            refreshToolbar('main');
            break;
        case 'redo':
            if (currentToolbar === 'pen') {
                imageEditorInstance.current.freeHandDraw(false);
            }
            isTextEditing = false;
            imageEditorInstance.current.redo();
            refreshToolbar('main');
            break;
        case 'ok':
            isTextEditing = false;
            if (currentToolbar === 'main') {
                imageData = imageEditorInstance.current.getImageData();
                canvas = document.createElement('canvas');
                canvas.width = imageData.width; canvas.height = imageData.height;
                canvas.getContext('2d').putImageData(imageData, 0, 0);
                (document.getElementById('previewImgContainer') as HTMLImageElement).src = canvas.toDataURL();
                imageEditorInstance.current.open(imageData);
                document.getElementById('image-editor-container').style.display = 'none';
                (document.getElementById('imagePreviewContainer') as HTMLElement).style.display = 'block';
            } else {
                apply();
                refreshToolbar('main');
            }
            break;
        case 'cropandtransform':
            imageEditorInstance.current.select('custom');
            refreshToolbar('crop');
            break;
        case 'rotateleft':
            imageEditorInstance.current.rotate(-90);
            break;
        case 'rotateright':
            imageEditorInstance.current.rotate(90);
            break;
        case 'addtext':
            imageEditorInstance.current.drawText(dimension.x + (dimension.width / 2) - 65, dimension.y + (dimension.height / 2) - 15, 'Add Text',
                                    'Arial', 30, false, false, '#fff', true);
            isShapeSelected = true;
            refreshToolbar('text');
            break;
        case 'remove':
            if (isNullOrUndefined(activeObjIndex) && tempShapeSettings && tempShapeSettings.id) {
                activeObjIndex = tempShapeSettings.id;
            }
            if (isTextEditing) {
                tempShapeSettings = imageEditorInstance.current.getShapeSetting(activeObjIndex);
                activeObjIndex = tempShapeSettings.id;
            }
            imageEditorInstance.current.deleteShape(activeObjIndex);
            refreshToolbar('main');
            break;
        case 'edittext':
            isTextEditing = true;
            imageEditorInstance.current.enableTextEditing();
            refreshToolbar('edittext');
            break;
        case 'addpen':
            imageEditorInstance.current.freeHandDraw(true);
            refreshToolbar('pen');
            break;
        case 'filters':
            refreshToolbar('filter');
            break;
        }
    }

    const apply = () => {
        if (currentToolbar === 'crop') {
            imageEditorInstance.current.crop();
        } else if (currentToolbar === 'pen') {
            if (activeObjIndex && activeObjIndex.split('_')[0] === 'pen') {
                tempShapeSettings = imageEditorInstance.current.getShapeSetting(activeObjIndex);
            } else {
                const shapeSettings: any = imageEditorInstance.current.getShapeSettings();
                if (shapeSettings.length > 0) {
                    tempShapeSettings = shapeSettings[shapeSettings.length - 1].id.split('_')[0] === 'pen' ? shapeSettings[shapeSettings.length - 1] : null;
                    if (tempShapeSettings) {
                        imageEditorInstance.current.selectShape(tempShapeSettings.id);
                    } else {
                        imageEditorInstance.current.freeHandDraw(false);
                    }
                } else {
                    imageEditorInstance.current.freeHandDraw(false);
                    return;
                }
            }
            if (tempShapeSettings) {
                imageEditorInstance.current.updateShape(tempShapeSettings);
            }
        } else if (currentToolbar === 'freehanddraw' && tempShapeSettings) {
            imageEditorInstance.current.updateShape(tempShapeSettings);
        } else if (currentToolbar !== 'filter' && activeObjIndex) {
            tempShapeSettings = imageEditorInstance.current.getShapeSetting(activeObjIndex);
            imageEditorInstance.current.updateShape(tempShapeSettings);
        }
        tempShapeSettings = null; activeObjIndex = null;
    }

    const filterImage = (args: ToolbarClickEventArgs) => {
        imageEditorInstance.current.applyImageFilter(args.item.id as ImageFilterOption);
        filter = args.item.id as ImageFilterOption;
    }

    const refreshToolbar = (type: string, isEvent?: boolean) => {
        const toolbar: Toolbar = bottomToolbarInstance.current;
        let items: string[] = []; let filterToolbar: Toolbar; let itemModel: ItemModel[];
        const dimension: Dimension = imageEditorInstance.current.getImageDimension();; let shapeSettings: ShapeSettings[];
        document.getElementById('filter-toolbar').style.display = 'none';
        currentToolbar = type;
        switch (type) {
        case 'main':
            items = ['cropAndTransform', 'addText', 'shapes', 'addPen', 'filters'];
            break;
        case 'crop':
            items = ['rotateLeft', 'rotateRight'];
            break;
        case 'text':
        case 'edittext':
            items = ['back', 'fontColor', 'remove', 'editText'];
            break;
        case 'rectangle':
            items = ['back', 'fillColor', 'strokeColor', 'remove'];
            if (!isEvent) {
                imageEditorInstance.current.drawRectangle(dimension.x + (dimension.width / 2) - 100, dimension.y + (dimension.height / 2) - 50,
                                            200, 100, 2, '#fff', null, null, true);
                isShapeSelected = true;
            }
            break;
        case 'ellipse':
            items = ['back', 'fillColor', 'strokeColor', 'remove'];
            if (!isEvent) {
                imageEditorInstance.current.drawEllipse(dimension.x + (dimension.width / 2) - 100, dimension.y + (dimension.height / 2) - 50,
                                        100, 50, 2, '#fff', null, null, true);
                isShapeSelected = true;
            }
            break;
        case 'line':
            items = ['back', 'strokeColor', 'remove'];
            if (!isEvent) {
                imageEditorInstance.current.drawLine(dimension.x + (dimension.width / 2) - 200, dimension.y + (dimension.height / 2) - 100,
                                        dimension.x + (dimension.width / 2) + 200, dimension.y + (dimension.height / 2) + 100, 2, '#fff', true);
                isShapeSelected = true;
            }
            break;
        case 'pen':
        case 'freehanddraw':
            items = ['back', 'penStrokeColor', 'remove'];
            break;
        case 'filter':
            document.getElementById('filter-toolbar').style.display = 'block';
            onFilterToolbarCreated();
            items = ['default', 'chrome', 'cold', 'warm', 'grayscale', 'sepia', 'invert'];
            break;
        }
        for (let i: number = 0; i < toolbar.items.length; i++) {
            if (items.indexOf(toolbar.items[i as number].id) !== -1) {
                toolbar.items[i as number].visible = true;
                if (toolbar.items[i as number].id.toLowerCase() === 'edittext') {
                    if (type === 'edittext') {
                        toolbar.items[i as number].disabled = true;
                        setTimeout(function() {
                            (document.querySelector('.e-textarea') as HTMLInputElement).focus();
                        }, 1);
                    } else {
                        toolbar.items[i as number].disabled = false;
                    }
                }
            } else {
                toolbar.items[i as number].visible = false;
            }
            if (toolbar.items[i as number].id === 'remove') {
                if (type === 'pen') {
                    toolbar.items[i as number].disabled = true;
                } else {
                    toolbar.items[i as number].disabled = false;
                }
            }
        }
        const enableUndo: boolean = imageEditorInstance.current.canUndo();
        const enableRedo: boolean = imageEditorInstance.current.canRedo();
        const topToolbar: Toolbar = topToolbarInstance.current;
        for (let i: number = 0; i < topToolbar.items.length; i++) {
            if (topToolbar.items[i as number].id === 'undo') {
                topToolbar.items[i as number].disabled = !enableUndo;
            } else if (topToolbar.items[i as number].id === 'redo') {
                topToolbar.items[i as number].disabled = !enableRedo;
            } else if (topToolbar.items[i as number].id === 'ok') {
                if (currentToolbar === 'main') {
                    topToolbar.items[i as number].visible = true;
                    topToolbar.items[i as number].tooltipText = 'Save';
                    topToolbar.items[i as number].prefixIcon = 'e-icons e-save';
                } else if (currentToolbar === 'crop' || currentToolbar === 'filter') {
                    topToolbar.items[i as number].visible = true;
                    topToolbar.items[i as number].tooltipText = 'Apply';
                    topToolbar.items[i as number].prefixIcon = 'e-icons e-check-tick';
                } else {
                    topToolbar.items[i as number].visible = false;
                }
            
            } else if (topToolbar.items[i as number].id === 'cancel') {
                if (currentToolbar === 'main' || currentToolbar === 'crop') {
                    topToolbar.items[i as number].visible = true;
                } else {
                    topToolbar.items[i as number].visible = false;
                }
            }
        }
        setTimeout(() => {
            let toolbarArea: HTMLElement = document.getElementById('bottom-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
            toolbarArea = document.getElementById('top-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        }, 1);
    }

    const updateToolbar = (args: ShapeChangeEventArgs, isEvent?: boolean) => {
        const type: string = args.currentShapeSettings.type.toLowerCase();
        refreshToolbar(type, isEvent);
        if (isEvent) {
            tempShapeSettings = args.currentShapeSettings;
            activeObjIndex = tempShapeSettings.id;
        }
        setTimeout(() => {
            const selFillElem: HTMLElement = fillColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
            const selStrokeElem: HTMLElement = strokeColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
            const selTextStrokeElem: HTMLElement = fontColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
            const selPenStrokeElem: HTMLElement = penColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
            if (selFillElem && (type === 'rectangle' || type === 'ellipse')) {
                if (args.currentShapeSettings.fillColor === '') {
                    selFillElem.classList.add('e-nocolor-item');
                } else {
                    selFillElem.classList.remove('e-nocolor-item');
                    selFillElem.style.background = args.currentShapeSettings.fillColor;
                }
                if (document.querySelector('#' + 'imageEditor_shapeFill')) {
                    fillColorInstance.current.value = args.currentShapeSettings.fillColor;
                }
            }
            if (selStrokeElem && (type === 'rectangle' || type === 'ellipse' || type === 'line')) {
                selStrokeElem.style.backgroundColor = args.currentShapeSettings.strokeColor;
                (selStrokeElem.children[0] as HTMLElement).style.backgroundColor = args.currentShapeSettings.strokeColor;
                if (document.querySelector('#' + 'imageEditor_shapeStroke')) {
                    strokeColorInstance.current.value = args.currentShapeSettings.strokeColor;
                }
            }
            if (selTextStrokeElem && type === 'text') {
                selTextStrokeElem.style.backgroundColor = args.currentShapeSettings.color;
                (selTextStrokeElem.children[0] as HTMLElement).style.backgroundColor = args.currentShapeSettings.color;
                if (document.querySelector('#' + 'imageEditor_textFont')) {
                    fontColorInstance.current.value = args.currentShapeSettings.color;
                }
            }
            if (selPenStrokeElem && type === 'freehanddraw') {
                selPenStrokeElem.style.backgroundColor = args.currentShapeSettings.strokeColor;
                (selPenStrokeElem.children[0] as HTMLElement).style.backgroundColor = args.currentShapeSettings.strokeColor;
                if (document.querySelector('#' + 'imageEditor_penStroke')) {
                    penColorInstance.current.value = args.currentShapeSettings.strokeColor;
                }
            }
        }, 10);
    }

    const toPascalCase = (text: string): string => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const keyDownEventHandler = (e: KeyboardEvent): void => {
        if (e.ctrlKey && (e.key === '+' || e.key === '-')) {
            e.preventDefault();
        }
        switch (e.key) {
        case (e.ctrlKey && 's'):
            imageEditorInstance.current.export();
            break;
        case (e.ctrlKey && 'z'):
            isTextEditing = false;
            refreshToolbar('main');
            break;
        case (e.ctrlKey && 'y'):
            isTextEditing = false;
            refreshToolbar('main');
            break;
        case 'Delete':
            if (isNullOrUndefined(activeObjIndex) && tempShapeSettings && tempShapeSettings.id) {
                activeObjIndex = tempShapeSettings.id;
            }
            if (activeObjIndex) {imageEditorInstance.current.deleteShape(activeObjIndex); }
            refreshToolbar('main');
            break;
        case 'Escape':
            if (currentToolbar === 'crop') {
                imageEditorInstance.current.clearSelection(true);
                refreshToolbar('main');
            }
            break;
        case 'Enter':
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (!(e.target as any).closest('.e-textarea')) {
                apply();
                refreshToolbar('main');
            }
            break;
        }
    }

    const doubleClickEvent = (e: MouseEvent & TouchEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (e.type === 'dblclick' && (e.target as any).closest('.e-textarea')) {
            isTextEditing = true;
        }
    }

    return (
        <div className="control-pane">
            <div className="control-section">
                <div className="row">
                    <div className='col-lg-12 control-section e-img-editor-sample'>
                        <div className='customToolbar'>
                        <div className="header">
                            <div className="header-details">
                                <div className="header-name">Image Editor</div>
                            </div>
                        </div>
                            <div className='image-preview-container' id='imagePreviewContainer'>
                                <img src="src/image-editor/images/bridge.jpg" id="previewImgContainer" className="preview-img-container" alt="previewImage" />
                                <br />
                                <div className='button-container' id="button-container">
                                    <FabComponent id='edit' className='custom-button'
                                        iconCss='e-icons e-edit' position='BottomRight' target='.image-preview-container' isPrimary={true} onClick={editClicked} content={'Edit Image'}></FabComponent>
                                </div>
                            </div>
                            <div className="image-editor-container" id="image-editor-container" style={{ display: 'none' }}>
                                <div id="top-toolbarArea">
                                    <ToolbarComponent ref={topToolbarInstance} id="top-toolbar" created={onTopToolbarCreated} clicked={toolbarClicked}>
                                        <ItemsDirective>
                                            <ItemDirective id='cancel' prefixIcon='e-icons e-close' tooltipText='Cancel' align='Center'></ItemDirective>
                                            <ItemDirective id='undo' prefixIcon='e-icons e-undo' tooltipText='Undo' align='Center' disabled={true}></ItemDirective>
                                            <ItemDirective id='redo' prefixIcon='e-icons e-redo' tooltipText='Redo' align='Center' disabled={true}></ItemDirective>
                                            <ItemDirective id='ok' prefixIcon='e-icons e-save' tooltipText='Save' align='Center'></ItemDirective>
                                        </ItemsDirective>
                                    </ToolbarComponent>
                                </div>
                                <div id="imageEditor">
                                    <ImageEditorComponent
                                        ref={imageEditorInstance}
                                        created={onIECreated}
                                        fileOpened={fileOpened}
                                        toolbar={[]}
                                        showQuickAccessToolbar={false}
                                        shapeChanging={shapeChanging}
                                        shapeChange={shapeChange}
                                        click={click}
                                        zoomSettings={{ minZoomFactor: 0.1, maxZoomFactor: 50 }}
                                    ></ImageEditorComponent>
                                </div>
                                <div id="bottom-toolbarArea">
                                    <ToolbarComponent ref={bottomToolbarInstance} id="bottom-toolbar" created={onBottomToolbarCreated} clicked={toolbarClicked}>
                                        <ItemsDirective>
                                        <ItemDirective id='cropAndTransform' prefixIcon='e-icons e-crop' tooltipText='Crop and Transform' align='Center'></ItemDirective>
                                            <ItemDirective id='back' prefixIcon='e-icons e-arrow-left' tooltipText='Back' align='Center' visible={false}></ItemDirective>
                                            <ItemDirective id='rotateLeft' prefixIcon='e-icons e-transform-left' tooltipText='Rotate Left' align='Center' visible={false}></ItemDirective>
                                            <ItemDirective id='rotateRight' prefixIcon='e-icons e-transform-right' tooltipText='Rotate Right' align='Center' visible={false}></ItemDirective>
                                            <ItemDirective id='addText' prefixIcon='e-icons e-text-annotation' tooltipText='Text' align='Center'></ItemDirective>
                                            <ItemDirective id='fontColor' cssClass='top-icon e-text-fontColor' tooltipText='Font Color' align='Center' visible={false} type='Input' template={fontColorTemplate}></ItemDirective>
                                            <ItemDirective id='shapes' prefixIcon='e-icons e-shapes' tooltipText='Annotations' align='Center' template={annotationTemplate}></ItemDirective>
                                            <ItemDirective id='fillColor' prefixIcon='e-icons e-copy' cssClass='top-icon e-fill' tooltipText='Fill Color' align='Center' visible={false} type='Input' template={fillColorTemplate}></ItemDirective>                    
                                            <ItemDirective id='strokeColor' prefixIcon='e-icons e-copy' cssClass='top-icon e-stroke' tooltipText='Stroke Color' align='Center' visible={false} type='Input' template={strokeColorTemplate}></ItemDirective>
                                            <ItemDirective id='penStrokeColor' prefixIcon='e-icons e-copy' cssClass='top-icon e-pen-stroke-color' tooltipText='Stroke Color' align='Center' visible={false} type='Input' template={penColorTemplate}></ItemDirective>
                                            <ItemDirective id='remove' prefixIcon='e-icons e-trash' tooltipText='Remove' align='Center' visible={false} disabled={false}></ItemDirective>
                                            <ItemDirective id='editText' prefixIcon='e-icons e-annotation-edit' cssClass='top-icon e-annotation-edit' tooltipText='Edit Text' align='Center' visible={false} disabled={false}></ItemDirective>
                                            <ItemDirective id='addPen' prefixIcon='e-icons e-free-pen' tooltipText='Pen' align='Center'></ItemDirective>
                                            <ItemDirective id='filters' prefixIcon='e-icons e-filters' tooltipText='Filters' align='Center'></ItemDirective>
                                        </ItemsDirective>
                                    </ToolbarComponent>
                                    <ToolbarComponent ref={filterToolbarInstance} id="filter-toolbar" clicked={filterImage}>
                                        <ItemsDirective>
                                            <ItemDirective id='default' tooltipText='Default' align='Center' template={defaultCanvasTemplate}></ItemDirective>
                                            <ItemDirective id='chrome' tooltipText='Chrome' align='Center' template={chromeCanvasTemplate}></ItemDirective>
                                            <ItemDirective id='cold' tooltipText='Cold' align='Center' template={coldCanvasTemplate}></ItemDirective>
                                            <ItemDirective id='warm' tooltipText='Warm' align='Center' template={warmCanvasTemplate}></ItemDirective>
                                            <ItemDirective id='grayscale' tooltipText='Grayscale' align='Center' template={grayscaleCanvasTemplate}></ItemDirective>
                                            <ItemDirective id='sepia' tooltipText='Sepia' align='Center' template={sepiaCanvasTemplate}></ItemDirective>
                                            <ItemDirective id='invert' tooltipText='Invert' align='Center' template={invertCanvasTemplate}></ItemDirective>
                                        </ItemsDirective>
                                    </ToolbarComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates a custom toolbar using the Image Editor Control.
                </p>
            </div>
            <div id="description">
                <p>
                    The Image Editor component provides built-in support for adding a custom toolbar
                    through APIs in the following ways:
                </p>
                <ul>
                    <li>
                        <b>Selection</b> : Multiple selection options are available. The
                        selection region can be a square or circle, customized to various
                        aspects ratios, and customized by dragging and resizing.
                    </li>
                    <li>
                        <b>Crop</b> : The image can be cropped based on the selection.
                    </li>
                    <li>
                        <b>Rotate</b> : The image can be rotated both clockwise and
                        anticlockwise by 90 degrees.
                    </li>
                    <li>
                        <b>Freehand drawing</b> : Draw freehand on the image and adjust the
                        pen's stroke width and stroke color.
                    </li>
                    <li>
                        <b>Get Image data</b> : Retrieves the edited image in image data format.
                    </li>
                    <li>
                        <b>Annotation</b> : Text, rectangle, ellipse, path, image, and line annotation shapes are supported.
                    </li>
                    <li>
                        <b>Filters</b> : The predefined filters such as chrome, cold, warm, grayscale, sepia, and invert can be applied to the image.
                    </li>
                </ul>
                <p>
                    More information about Image Editor can be found in this
                    <a
                        target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/image-editor/getting-started/"
                    >
                        documentation section
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
export default CustomToolbar;