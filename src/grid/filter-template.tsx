import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Filter, Page, Selection, Sort, KeyboardEventArgs, PredicateModel } from '@syncfusion/ej2-react-grids';
import { productData } from './data';
import { NumericTextBoxComponent, TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { closest } from '@syncfusion/ej2-base';
import './filter-template.css';

export class FilterTemplate extends SampleBase<{}, {}> {

    private gridInstance: GridComponent;
    private productIDTxtObj: NumericTextBoxComponent;
    private ProductNameTxtObj: TextBoxComponent;
    private minTextBox: NumericTextBoxComponent;
    private maxTextBox: NumericTextBoxComponent;

    private templateOptionsNumericTextBox(): React.JSX.Element {
        return (
            <div>
                <div className="e-cus-label">Id</div>
                <NumericTextBoxComponent ref={num => this.productIDTxtObj = num} className='e-fltrtemp-focus' format={'n'} />
            </div>
        );
    };

    private templateOptionsStringTextBox(): React.JSX.Element {
        return (
            <div>
                <div className="e-cus-label">Name</div>
                <TextBoxComponent ref={str => this.ProductNameTxtObj = str} className='e-fltrtemp-focus' />
            </div>
        );
    };

    private templateOptionsMinMax(): React.JSX.Element {
        return (
            <div className='e-flex-layout'>
                <div className='e-min-max-separator'>
                    <div className="e-cus-label">Min</div>
                    <NumericTextBoxComponent ref={num => this.minTextBox = num} className='e-fltrtemp-focus' format={'n'} />
                </div>
                <div>
                    <div className="e-cus-label">Max</div>
                    <NumericTextBoxComponent ref={num => this.maxTextBox = num} className='e-fltrtemp-focus' format={'n'} />
                </div>
            </div>
        );
    };

    private templateOptionsDropDown(): React.JSX.Element {
        return (
            <div>
                <div className="e-cus-label">Status</div>
                <DropDownListComponent cssClass='e-fltrtemp-focus' dataSource={['Both', 'true', 'false']} value={'Both'} change={this.discontinuedChange.bind(this)} />
            </div>
        );
    };

    private discontinuedChange(args: ChangeEventArgs): void {
        if (args.value !== 'Both') {
            this.gridInstance.filterByColumn('Discontinued', 'equal', args.value === 'true' ? true : false);
        } else {
            this.gridInstance.removeFilteredColsByField('Discontinued');
        }
    };

    private dataBound(): void {
        const filterBarOperatorDiv: HTMLDivElement = this.gridInstance.getHeaderTable()
            .querySelector('.e-filterdiv.e-fltrinputdiv');
        if (!filterBarOperatorDiv.querySelector('.e-cus-label')) {
            const label: HTMLDivElement = document.createElement('div');
            label.classList.add('e-cus-label');
            label.innerText = 'Stock';
            filterBarOperatorDiv.insertBefore(label, filterBarOperatorDiv.firstChild);
        }
    };

    private keyPressed(args: KeyboardEventArgs): void {
        if (args.keyCode === 13) {
            const target: Element = args.target as Element;
            const th: Element = closest(target, 'th');
            if (
                th &&
                th.classList.contains('e-filterbarcell') &&
                th.hasAttribute('e-mappinguid')
            ) {
                const field: string = this.gridInstance.getColumnByUid(
                    th.getAttribute('e-mappinguid')
                ).field;
                if (field === 'UnitPrice') {
                    args.cancel = true;
                    if (this.minTextBox.element.value || this.maxTextBox.element.value) {
                        const filterColumns: PredicateModel[] =
                            this.gridInstance.filterSettings.columns.filter(
                                (data) => data.field !== 'UnitPrice'
                            );
                        if (this.minTextBox.element.value) {
                            filterColumns.push({
                                field: 'UnitPrice',
                                operator: 'greaterthanorequal',
                                predicate: 'and',
                                value: parseFloat(this.minTextBox.element.value),
                            });
                        }
                        if (this.maxTextBox.element.value) {
                            filterColumns.push({
                                field: 'UnitPrice',
                                operator: 'lessthanorequal',
                                predicate: 'and',
                                value: parseFloat(this.maxTextBox.element.value),
                            });
                        }
                        setTimeout(() => {
                            this.gridInstance.setProperties({
                                filterSettings: { columns: filterColumns },
                            });
                        }, 0);
                    } else {
                        const filterColumns: PredicateModel[] =
                            this.gridInstance.filterSettings.columns.filter(
                                (data) => data.field === 'UnitPrice'
                            );
                        if (filterColumns.length) {
                            this.gridInstance.removeFilteredColsByField('UnitPrice');
                        }
                    }
                }
                if (field === 'ProductID' || field === 'ProductName') {
                    args.cancel = true;
                    let elemValue: string | number =
                        field === 'ProductID'
                            ? this.productIDTxtObj.element.value
                            : this.ProductNameTxtObj.element.value.trim();
                    const operator: string = field === 'ProductID' ? 'equal' : 'startswith';
                    if (elemValue.length > 0) {
                        if (field === 'ProductID') elemValue = parseFloat(elemValue);
                        this.gridInstance.filterByColumn(field, operator, elemValue);
                    } else {
                        this.gridInstance.clearFiltering([field]);
                    }
                }
            }
        }
    };

    render(): React.JSX.Element {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent ref={grid => this.gridInstance = grid} dataSource={productData} allowPaging={true} allowFiltering={true} allowSorting={true}
                        filterSettings={{ showFilterBarOperator: true, showFilterBarStatus: false }} gridLines={'Both'} pageSettings={{ pageCount: 5 }}
                        dataBound={this.dataBound.bind(this)} keyPressed={this.keyPressed.bind(this)}>
                        <ColumnsDirective>
                            <ColumnDirective field='ProductID' headerText='Product ID' width={120} textAlign={'Right'} isPrimaryKey={true} filterTemplate={this.templateOptionsNumericTextBox.bind(this)} />
                            <ColumnDirective field='ProductName' headerText='Product Name' width={220} filterTemplate={this.templateOptionsStringTextBox.bind(this)} />
                            <ColumnDirective field='UnitPrice' headerText='Price' width={200} format={'C2'} textAlign={'Right'} filterTemplate={this.templateOptionsMinMax.bind(this)} />
                            <ColumnDirective field='UnitsInStock' headerText='Stock' width={120} format={'N'} textAlign={'Right'} />
                            <ColumnDirective field='Discontinued' displayAsCheckBox={true} type={'boolean'} headerText='Discontinued' width={150} filterTemplate={this.templateOptionsDropDown.bind(this)} />
                        </ColumnsDirective>
                        <Inject services={[Filter, Page, Selection, Sort]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates the Grid's filtering bar feature, utilizing custom components in the filter cells
                        through the <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#filtertemplate">filterTemplate</a></code> feature. This functionality allows users to filter records based on specified
                        criteria, displaying a reduced set of data. To enable filtering, set the <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid#allowfiltering">allowFiltering</a></code> property to <code>true</code>,
                        which renders a filter bar row next to the header. Users can then filter data by entering text into the cells of
                        this row.
                    </p>
                </div>
                <div id='description'>
                    <p>
                        The <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#filtertemplate">filterTemplate</a></code> feature in the Syncfusion EJ2 React Grid allows customization of the controls in
                        the filter bar. By default, a text box appears in the filter bar cell. In this demo, the Grid showcases various
                        custom input components: a custom input component for the ID, Name and Price columns, and a Syncfusion
                        DropDownList for the Discontinued column, all achieved through
                        the filter template feature. You can customize the filter components in the filter cells by setting the <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#filtertemplate">filterTemplate</a></code> property for each column. The Unit Stock column uses the default filter bar cell with
                        operator functionality.
                    </p>
                    <p>
                        Injecting Module:
                    </p>
                    <p>
                        Grid features are divided into individual modules. To utilize the filtering feature, inject the <code>Filter</code> module into the <code>services</code>. For more details on configuring filters, refer to the
                        relevant <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/grid/filtering/filter-bar#filter-bar-template-with-custom-component">
                            documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}
