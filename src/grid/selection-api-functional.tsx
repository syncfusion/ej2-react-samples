import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Page, Selection, Inject, SelectionSettings } from '@syncfusion/ej2-react-grids';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { data } from './data';
import { updateSampleSection } from '../common/sample-base';

function SelectionAPI() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const selectionsettings: Object = { type: 'Multiple' };
    let ToolbarInstance: ToolbarComponent;
    let checkboxObj: CheckBoxComponent;
    let gridInstance: GridComponent;
    function selectingEvents(e: any): void {
        if ((this as any).selectionSettings.allowColumnSelection) {
            e.cancel = true;
        }
    }
    function click(e: MouseEvent): void {
        let element: HTMLElement = e.target as HTMLElement;
        let options: {
            type?: { class: string, val: (mode: string) => string },
            mode?: { class: string, val: (mode: string) => string }
        } = {
            type: { class: '.e-gtype', val: (mode: string) => mode === 'Single' ? 'Multiple' : 'Single' },
            mode: { class: '.e-gmode', val: (mode: string) => mode === 'Row' ? 'Cell' : 'Row' },
        };

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element) as HTMLElement;
        let isType: boolean = element.parentElement.parentElement.classList.contains('e-gtype');
        let opt: { class: string, val: (mode: string) => string } = options[isType ? 'type' : 'mode'];
        let parent: Element = document.querySelector('.e-gridlist');
        let typeEle: Element = parent.querySelector(opt.class + ' .e-tbar-btn-text');
        let type: string = typeEle.innerHTML;
        let val: string = opt.val(type);
        typeEle.innerHTML = val;
        gridInstance.selectionSettings = isType ? { type: val } as SelectionSettings : { mode: val } as SelectionSettings;
        gridInstance.refresh();
    }
    function setColumnSelection(args: ChangeEventArgs): void {
        gridInstance.clearSelection();
        if (args.checked) {
            ToolbarInstance.enableItems(1, false);
            gridInstance.selectionSettings.allowColumnSelection = true;
        }
        else {
            ToolbarInstance.enableItems(1, true);
            gridInstance.selectionSettings.allowColumnSelection = false;
        }
    }
    function checkboxTemp(): any {
        return (<CheckBoxComponent label='Enable Column Selection' ref={(columnSelection) => { checkboxObj = columnSelection; }}
            change={setColumnSelection.bind(this)} />);
    }
    const template: any = checkboxTemp;

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='e-statustext'>Selection Type / Selection Mode</div>
                <ToolbarComponent className="e-gridlist" ref={toolbar => ToolbarInstance = toolbar} onClick={click.bind(this)} >
                    <ItemsDirective>
                        <ItemDirective text="Multiple" cssClass='e-gtype' />
                        <ItemDirective text="Row" cssClass='e-gmode' />
                        <ItemDirective template={template.bind(this)} />
                    </ItemsDirective>
                </ToolbarComponent>
                <br />
                <GridComponent dataSource={data} ref={grid => gridInstance = grid} enableHover={false} allowSorting={true} allowPaging={true} pageSettings={{ pageCount: 5 }} selectionSettings={selectionsettings}
                    rowSelecting={selectingEvents} cellSelecting={selectingEvents}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign="Right"></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                        <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right'/>
                        <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right'/>
                        <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign="Right"></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, Selection, Sort]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the selection functionality of the Grid, you can select the type and mode from the desired button</p>
            </div>
            <div id='description'>
                <p>
                    Selection provides an interactive support to highlight the row or cell or column that you select. Selection can be done through simple
                    Mouse down or Keyboard interaction. To enable selection, set <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid#allowselection">
                        allowSelection
                    </a></code> as true.
                </p>
                <p>Grid component supports two types of selection which can be set using <code><a target="_blank" className="code"
                    href="https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#type">
                    selectionSettings-&gt;type
                </a></code> property.
                    They are,</p>
                <ul>
                    <li><code>Single</code> - Enabled by default. Allows the user to select single row/cell/column at a time.</li>
                    <li><code>Multiple</code> - Allows the user to select more than one row/cell/column at a time.</li>
                </ul>
                <p>Also, supports three modes of selection which can be set using <code><a target="_blank" className="code"
                    href="https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#mode">
                    selectionSettings-&gt;mode
                </a></code> property. They
                    are,
                </p>
                <ul>
                    <li><code>Row</code> - Enabled by default. Enables row selection in Grid.</li>
                    <li><code>Cell</code> - Enables cell selection in Grid.</li>
                    <li><code>Both</code> - Enables both row and cell selection in Grid. Clicking any cell will select both the row and cell
                        simultaneously
                    </li>
                </ul>
                <p>To perform the column selection, enable the <code><a target="_blank" className="code"
                    href="https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#allowcolumnselection">
                    selectionSettings-&gt;allowColumnSelection
                </a></code> property.</p>
                <p>To perform the multi-selection, hold <strong>CTRL</strong> key and click the desired rows/cells/columns. To select range of rows/cells/columns,
                    hold <strong>SHIFT</strong> key and click the rows/cells/columns.</p>
                <p>While using the Grid in a touch device environment, there is an option for multi-selection through a single tap on the
                    row and it will show a popup with the multi-selection symbol. Tap the icon to enable multi-selection in a single
                    tap.
                </p>
                <p>In this demo, click the toolbar options to toggle between the selection type and selection mode available in Grid.</p>
                <p>
                    More information on the selection configuration can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/grid/selection.html#selection"> documentation section</a>.
                </p>

            </div>
        </div>
    )
}
export default SelectionAPI;