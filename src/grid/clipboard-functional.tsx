import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, SelectionSettings, Toolbar } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { updateSampleSection } from '../common/sample-base';
import './sample.css';

function Clipboard() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const selectionsettings: Object = { type: 'Multiple' };
    const toolbarOptions: any = [{ text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' }, { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }];
    let gridInstance: GridComponent;
    const visible = false;
    const animationSettings: Object = { effect: 'None' };
    let alertDialogInstance: DialogComponent;
    const alertButtons = [{
        // Click the footer buttons to hide the Dialog
        click: () => {
            alertDialogInstance.hide();
        },
        buttonModel: { content: 'OK', isPrimary: true }
    }];
    function clickHandler(args: any) {
        if (gridInstance.getSelectedRecords().length > 0) {
            let withHeader: boolean = args.item.id === 'copyHeader' ? true : false;
            gridInstance.copy(withHeader);
        } else {
            alertDialogInstance.show();
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={data} ref={grid => gridInstance = grid} enableHover={false} toolbar={toolbarOptions} allowPaging={true} pageSettings={{ pageCount: 5 }} selectionSettings={selectionsettings} toolbarClick={clickHandler.bind(this)}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='140' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                        <ColumnDirective field='OrderDate' headerText='Order Date' format='yMd' width='170'></ColumnDirective>
                        <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign="Right"></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, Selection, Toolbar]} />
                </GridComponent>
            </div>
            <DialogComponent id="alertDialog" header='Copy with Header' visible={visible} animationSettings={animationSettings} width='300px' content='Atleast one row should be selected to copy with header' ref={alertdialog => alertDialogInstance = alertdialog}
                target='.control-section' buttons={alertButtons} ></DialogComponent>
            <div id="action-description">
                <p>This sample demonstrates copy to clipboard functionality of the Grid component. Select rows and click Copy button from
                    toolbar to copy content. To copy with header click Copy with header button from toolbar.
                </p>
            </div>
            <div id="description">
                <p>Selected rows or cells data in the Grid can be copied into the clipboard using the Keyboard shortcuts and <code><a target="_blank" className="code"
                    href="https://ej2.syncfusion.com/react/documentation/api/grid/#copy">copy
                </a></code> method.
                </p>
                <p>In this demo, selected rows data can be copied into the clipboard using the below Keyboard shortcuts or toolbar interactions.</p>
                <ul>
                    <li><code>Ctrl + C</code> - Selected rows or cells data without header.</li>
                    <li><code>Ctrl + Shift + H</code> - Selected rows or cells data with header.</li>
                </ul>
                <p>More information on the Clipboard feature can be found in this <a target="_blank"
                    href="https://ej2.syncfusion.com/react/documentation/grid/clipboard.html">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Clipboard;