import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ColorPicker, ColorPickerComponent, ColorPickerEventArgs, PaletteTileEventArgs } from '@syncfusion/ej2-react-inputs';
import { SignatureFileType, Signature, SignatureComponent } from '@syncfusion/ej2-react-inputs';
import { Button } from '@syncfusion/ej2-react-buttons';
import { getComponent, createElement, addClass } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import './toolbar.css';
import { ClickEventArgs, ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { ChangeEventArgs, CheckBox } from '@syncfusion/ej2-buttons';
import { MenuEventArgs, SplitButton, SplitButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

function Toolbar() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let signature: SignatureComponent;

    let disabledTemplate: CheckBox = new CheckBox({ label: 'Disabled', checked: false, change: change });


    function change(args: ChangeEventArgs): void {
        let signature: Signature = getComponent(document.getElementById('signature'), 'signature');
        signature.disabled = args.checked;
    }

    function onCreated(): void {
        let strokeColor: ColorPicker = getComponent(document.getElementById('stroke-color'), 'colorpicker');
        let bgColor: ColorPicker = getComponent(document.getElementById('bg-color'), 'colorpicker');
        addClass([strokeColor.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
        addClass([bgColor.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
        document.getElementById('save-option').addEventListener('click', saveBtnClick);
        clearButton();
        let toolbarlItems: NodeListOf<Element> = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < toolbarlItems.length; i++) {
            if (toolbarlItems[i].children[0].classList.contains('e-undo')) {
                let undoButton: Button = getComponent(toolbarlItems[i] as HTMLElement, 'btn');
                undoButton.disabled = true;
            }
            if (toolbarlItems[i].children[0].classList.contains('e-redo')) {
                let redoButton: Button = getComponent(toolbarlItems[i] as HTMLElement, 'btn');
                redoButton.disabled = true;
            }
        }
    }

    function onClicked(args: ClickEventArgs): void {
        let signature: Signature = getComponent(document.getElementById('signature'), 'signature');
        let saveBtn: SplitButton = getComponent(document.getElementById("save-option"), 'split-btn');
        if (signature.disabled && args.item.tooltipText != 'Disabled') {
            return;
        }
        switch (args.item.tooltipText) {
            case 'Undo (Ctrl + Z)':
                if (signature.canUndo()) {
                    signature.undo();
                    updateUndoRedo();
                    updateSaveBtn();
                }
                break;
            case 'Redo (Ctrl + Y)':
                if (signature.canRedo()) {
                    signature.redo();
                    updateUndoRedo();
                    updateSaveBtn();
                }
                break;
            case 'Clear':
                signature.clear();
                if (signature.isEmpty()) {
                    clearButton();
                    saveBtn.disabled = true;
                }
                break;
        }
    }

    function onChange() {
        let signature: Signature = getComponent(document.getElementById('signature'), 'signature');
        let saveBtn: SplitButton = getComponent(document.getElementById("save-option"), 'split-btn');
        if (!signature.isEmpty()) {
            clearButton();
            saveBtn.disabled = false;
        }
        updateUndoRedo();
    }

    function saveBtnClick(): void {
        let signature: Signature = getComponent(document.getElementById("signature"), 'signature');
        signature.save();
    }

    function clearButton() {
        let signature: Signature = getComponent(document.getElementById('signature'), 'signature');
        let tlItems: NodeListOf<Element> = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < tlItems.length; i++) {
            if (tlItems[i].children[0].classList.contains('e-clear')) {
                let clrBtn: Button = getComponent(tlItems[i] as HTMLElement, 'btn');
                if (signature.isEmpty()) {
                    clrBtn.disabled = true;
                } else {
                    clrBtn.disabled = false;
                }
            }
        }
    }

    function updateSaveBtn() {
        let signature: Signature = getComponent(document.getElementById('signature'), 'signature');
        let saveBtn: SplitButton = getComponent(document.getElementById("save-option"), 'split-btn');
        if (signature.isEmpty()) {
            saveBtn.disabled = true;
        } else {
            saveBtn.disabled = false;
        }
    }

    function updateUndoRedo() {
        let signature: Signature = getComponent(document.getElementById('signature'), 'signature');
        let undoButton: Button; let redoButton: Button
        let tlItems: NodeListOf<Element> = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < tlItems.length; i++) {
            if (tlItems[i].children[0].classList.contains('e-undo')) {
                undoButton = getComponent(tlItems[i] as HTMLElement, 'btn');
            }
            if (tlItems[i].children[0].classList.contains('e-redo')) {
                redoButton = getComponent(tlItems[i] as HTMLElement, 'btn');
            }
        }
        if (signature.canUndo()) {
            undoButton.disabled = false;
        } else {
            undoButton.disabled = true;
        }
        if (signature.canRedo()) {
            redoButton.disabled = false;
        } else {
            redoButton.disabled = true;
        }
    }

    function saveTemplate() {
        let items: { text: string; }[];
        items = [
            {
                text: 'Png'
            },
            {
                text: 'Jpeg'
            },
            {
                text: 'Svg'
            }
        ];

        function onSelect(args: MenuEventArgs): void {
            let signature: Signature = getComponent(document.getElementById('signature'), 'signature');
            signature.save(args.item.text as SignatureFileType, 'Signature');
        }

        return (<div >
            <SplitButtonComponent content="Save" id="save-option" items={items} iconCss='e-sign-icons e-save' select={onSelect} disabled={true} />
        </div>);
    }

    function strokeColorTemplate() {
        let presets: any;
        presets = {
            'custom': ['#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
        };

        function tileRender(args: PaletteTileEventArgs): void {
            args.element.classList.add('e-circle-palette');
            args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
        }

        function strokeColorChanged(args: ColorPickerEventArgs): void {
            let signature: Signature = getComponent(document.getElementById('signature'), 'signature');
            let strokeColor: ColorPicker = getComponent(document.getElementById('stroke-color'), 'colorpicker');
            if (signature.disabled) {
                return;
            }
            let selElem: HTMLElement = strokeColor.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
            selElem.style.borderBottomColor = args.currentValue.rgba;
            signature.strokeColor = args.currentValue.rgba;
        }

        return (<div >
            <ColorPickerComponent id="stroke-color" mode='Palette' cssClass='e-stroke-color' modeSwitcher={false} showButtons={false} columns={4} presetColors={presets} beforeTileRender={tileRender} change={strokeColorChanged}></ColorPickerComponent>
        </div>);
    }
    
    function bgColorTemplate() {
        let presets: any;
        presets = {
            'custom': ['#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
        };


        function beforeTileRender(args: PaletteTileEventArgs): void {
            args.element.classList.add('e-circle-palette');
            args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));

        }

        function bgColorChanged(args: ColorPickerEventArgs): void {
            let signature: Signature = getComponent(document.getElementById('signature'), 'signature');
            let bgColor: ColorPicker = getComponent(document.getElementById('bg-color'), 'colorpicker');
            if (signature.disabled) {
                return;
            }
            let selElem: HTMLElement = bgColor.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
            signature.backgroundColor = args.currentValue.rgba;
            selElem.style.borderBottomColor = args.currentValue.rgba;
        }

        return (<div >
            <ColorPickerComponent id="bg-color" noColor={true} mode='Palette' cssClass='e-bg-color' modeSwitcher={false} showButtons={false} columns={4} presetColors={presets} beforeTileRender={beforeTileRender} change={bgColorChanged}></ColorPickerComponent>
        </div>);
    }

    function strokeWidthTemplate() {
        let data: any = [1, 2, 3, 4, 5];
        let value: any = 2;


        function strokeWidthChanged(args: any): void {
            let signature: Signature = getComponent(document.getElementById('signature'), 'signature');
            signature.maxStrokeWidth = args.value;
        }

        return (<div >
            <DropDownListComponent id="ddlelement" dataSource={data} value={value} width="60" change={strokeWidthChanged} />
        </div>);
    }

    return (
        <div className='control-pane'>
            <div className="col-lg-12 control-section">
                <div id="signature-toolbar-control">
                    <ToolbarComponent id='toolbar' created={onCreated} clicked={onClicked}>
                        <ItemsDirective>
                            <ItemDirective text='Undo' prefixIcon='e-icons e-undo' tooltipText='Undo (Ctrl + Z)' />
                            <ItemDirective text='Redo' prefixIcon='e-icons e-redo' tooltipText='Redo (Ctrl + Y)' />
                            <ItemDirective type='Separator' />
                            <ItemDirective tooltipText='Save (Ctrl + S)' type='Button' template={saveTemplate} />
                            <ItemDirective type='Separator' />
                            <ItemDirective tooltipText='Stroke Color' template={strokeColorTemplate} />
                            <ItemDirective type='Separator' />
                            <ItemDirective tooltipText='Background Color' template={bgColorTemplate} />
                            <ItemDirective type='Separator' />
                            <ItemDirective tooltipText='Stroke Width' template={strokeWidthTemplate} />
                            <ItemDirective type='Separator' />
                            <ItemDirective text='Clear' prefixIcon='e-sign-icons e-clear' tooltipText='Clear' />
                            <ItemDirective tooltipText='Disabled' type='Input' template={disabledTemplate} align='Right' />
                        </ItemsDirective>
                    </ToolbarComponent>
                    <div id="signature-control">
                        <SignatureComponent maxStrokeWidth={2} id="signature" change={onChange}></SignatureComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the <b>Signature</b> component with toolbar items to illustrate the undo, redo, save with background, background color, stroke color, clear and disabled support of the <b>Signature</b> component.</p>
            </div>
            <div id="description">
                <p>The <code>Signature</code> component supports undo, redo, background color, stroke color, save, save with background, clear, and disabled functionalities.</p>
                <p>In this sample, each toolbar item illustrates the <code>Signature</code> component functionalities, which are listed below.</p>
                <ul>
                    <li><p>Use <b>Undo</b> button or <b>Ctrl + Z</b> key to revert your signature.</p></li>
                    <li><p>Use the <b>Redo</b> button or <b>Ctrl + Y</b> key to remake your reverted signature.</p></li>
                    <li><p>Use the <b>Save</b> button or <b>Ctrl + S</b> key to store your signature as an image file.</p></li>
                    <li><p><b>Stroke</b> color picker is used to apply the stroke color to the Signature component.</p></li>
                    <li><p><b>Background</b> color picker is used to apply the background color to the Signature component.</p></li>
                    <li><p>Use <b>Stroke Width</b> drop-down list values to change the signature stroke width.</p></li>
                    <li><p>Use the <b>Clear</b> button to clear the signature.</p></li>
                    <li><p>Check the <b>Disabled</b> checkbox to disable the Signature component.</p></li>
                </ul>
                <p>
                    More information about Signature can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/signature/getting-started"> documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Toolbar;
