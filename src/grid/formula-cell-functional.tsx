import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Selection, Edit, Toolbar, Page, Formula,
    EditSettingsModel, SelectionSettingsModel, Sort, PageSettingsModel } from '@syncfusion/ej2-react-grids';
import { formulaData } from './data';
import { updateSampleSection } from '../common/sample-base';

function FormulaCell() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    const editSettings: EditSettingsModel = { allowEditing: true, mode: 'Cell' };
    const selectionSettings: SelectionSettingsModel = {  mode: 'Cell', cellSelectionMode: 'Box', type: 'Multiple'};

    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <GridComponent dataSource={formulaData} editSettings={editSettings} enableAutoFill={true} 
                     selectionSettings={selectionSettings} height={400} clipMode="EllipsisWithTooltip">
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='100' isPrimaryKey={true} textAlign='Right' validationRules={{ required: true }}></ColumnDirective>
                        <ColumnDirective field='ProductName' headerText='Product Name' width='200' validationRules={{ required: true }} allowEditing={false}></ColumnDirective>
                        <ColumnDirective field='Category' headerText='Category' width='130' allowEditing={false}></ColumnDirective>
                        <ColumnDirective field='Quantity' headerText='Quantity' width='120' textAlign='Right' editType='numericedit' edit={{ params: { showSpinButton: false } }}></ColumnDirective>
                        <ColumnDirective field='PricePerUnit' headerText='Price Per Unit' width='140' textAlign='Right' editType='numericedit' format='C2' edit={{ params: { showSpinButton: false } }}></ColumnDirective>
                        <ColumnDirective field='GrossAmount' headerText='Gross Amount' width='150' textAlign='Right' allowFormula={true} format='C2'></ColumnDirective>
                        <ColumnDirective field='TaxAmount' headerText='Tax Amount' width='130' textAlign='Right' allowFormula={true} format='C2' allowEditing={false}></ColumnDirective>
                        <ColumnDirective field='TotalAmount' headerText='Total Amount' width='150' textAlign='Right' allowFormula={true} format='C2'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[ Selection, Edit, Sort, Toolbar, Page, Formula]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the Formula Cell feature in the Data Grid, which brings spreadsheet-like calculations directly into grid cells. It enables formulas to be dynamically defined and evaluated based on the values of other cells within the same row.</p>
            </div>
            <div id="description">
                <p>
                    In this demo, formulas are configured directly in the data source and are automatically evaluated during the initial rendering of the grid. Whenever the values of dependent cells change, the calculated fields are instantly recalculated and updated. Formula calculations are enabled for the Gross Amount, Tax Amount, and Total Amount columns by setting the <code>allowFormula</code> property to <code>true</code>. Double-click a cell to edit its value and recalculate formulas automatically.
                </p>
                <p>
                    The formulas used are:
                </p>
                <ul>
                    <li><b>Gross Amount</b> = Quantity × Price Per Unit</li>
                    <li><b>Tax Amount</b> = Gross Amount × 0.07</li>
                    <li><b>Total Amount</b> = Gross Amount + Tax Amount</li>
                </ul>
                <p>
                    When the "Quantity" or "Price Per Unit" values are modified, the Data Grid automatically recalculates the related formula-driven columns, ensuring that all computed values remain accurate and synchronized in real time.
                </p>
                <p>
                    <strong>Injecting Module:</strong>
                </p>
                <p>
                    The Grid component organizes its features into separate, feature-specific modules. To enable the Formula Cell feature, inject the <code>Formula</code> and <code>Edit</code> module into the services collection.
                </p>
                <p>
                    More information on formula cells can be found in <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/grid/editing">
                        documentation section</a>.
                </p>
                <p>Looking for the full React Data Grid component overview, features, pricing, and documentation? Visit our
                    <a target="_blank"
                        href="https://www.syncfusion.com/react-components/react-data-grid"> React Data Grid component</a> page.</p>
            </div>
        </div>
    );
}

export default FormulaCell;