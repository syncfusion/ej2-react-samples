import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, Inject, FieldList } from '@syncfusion/ej2-react-pivotview';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { defaultData } from './data-source';
import { SampleBase } from '../common/sample-base';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs as Args } from '@syncfusion/ej2-buttons';

/**
 * PivotView sample with Grid Configurations.
 */

let dataSource: IDataOptions = {
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Quarter' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
    data: defaultData,
    expandAll: false,
    filters: []
};

const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}`;

export class GridConfig extends SampleBase<{}, {}> {

    private pivotGridObj: PivotViewComponent;
    private mode: DropDownListComponent;
    private gridLineOptions: { [key: string]: Object }[] = [{
        id: 'Default',
        type: 'Default'
    },
    {
        id: 'Both',
        type: 'Both'
    },
    {
        id: 'None',
        type: 'None'
    },
    {
        id: 'Horizontal',
        type: 'Horizontal'
    },
    {
        id: 'Vertical',
        type: 'Vertical'
    }
    ];
    onChange(e: ChangeEventArgs): void {
        (this.pivotGridObj.gridSettings.gridLines as any) = e.value;
    }

    checkChange(args: Args): void {
        if ((args.event.target as HTMLElement).id === 'reorder') {
            this.pivotGridObj.gridSettings.allowReordering = args.checked;
        } else if ((args.event.target as HTMLElement).id === 'resize') {
            this.pivotGridObj.gridSettings.allowResizing = args.checked;
        } else {
            this.pivotGridObj.gridSettings.allowTextWrap = args.checked;
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section' style={{ overflow: 'initial' }}>
                    <div className='col-lg-9 adaptive'>
                        <PivotViewComponent id='PivotView' ref={(pivotview) => { this.pivotGridObj = pivotview }} dataSource={dataSource} width={'100%'} height={'300'} showFieldList={true} gridSettings={{ allowReordering: true, allowResizing: true, columnWidth:140 }} >
                            <Inject services={[FieldList]} />
                        </PivotViewComponent>
                    </div>
                    <div className='col-lg-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: "50px" }}>
                                        <td>
                                            <div className='row' style={{ margin: '0px' }}>
                                                <CheckBoxComponent id='reorder' checked={true} label='Allow Reordering' change={this.checkChange.bind(this)} ></CheckBoxComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: "50px" }}>
                                        <td>
                                            <div className='row' style={{ margin: '0px' }}>
                                                <CheckBoxComponent id='resize' checked={true} label='Allow Resizing' change={this.checkChange.bind(this)} ></CheckBoxComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: "50px" }}>
                                        <td>
                                            <div className='row' style={{ margin: '0px' }}>
                                                <CheckBoxComponent id='autowrap' label='Allow Text Wrap' change={this.checkChange.bind(this)} ></CheckBoxComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td style={{ width: "30%" }}>
                                            <div  style={{ 'marginLeft': '-70px' }}>
                                                <DropDownListComponent change={this.onChange.bind(this)} floatLabelType={'Auto'} width={'100%'} id="etype" value="Both" dataSource={this.gridLineOptions} fields={{ text: 'type', value: 'id' }} placeholder="Grid Lines" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>

                </div>
                <div id="action-description">
                    <p>This sample demonstrates the visibility of gridlines and text wrap along with user interactions like reordering and resizing
                        columns. You can change the visibility and user interaction settings through the options available in the properties
                        panel.
                    </p>
                </div>
                <div id="description">
                    <p>The
                        <code>gridLines</code> property is used to control the line visibility that separates the rows and columns. The grid control allows us
                                        to display the following grid lines:
                    </p>
                    <ul>
                        <li>
                            <code>Default</code> - Shows the Horizontal line.
                            <br />
                        </li>
                        <li>
                            <code>None</code> - Shows no line.
                            <br />
                        </li>
                        <li>
                            <code>Both</code> - Shows both Horizontal and Vertical lines.
                            <br />
                        </li>
                        <li>
                            <code>Horizontal</code> - Shows the Horizontal line.
                            <br />
                        </li>
                        <li>
                            <code>Vertical</code> - Shows the Vertical line.
                            <br />
                            <br />
                        </li>
                    </ul>

                    <p>
                        <strong>Auto wrap</strong> cell content can be enabled using the
                        <code>allowTextWrap</code>property of the grid. Setting this property will wrap cell text on multiple lines. This feature is useful to view
                                        the cell content when it exceeds the cell width. Also this property will wrap the text in both content cell and
                                        header cells.
                    </p>
                    <p>
                        <strong>Reordering</strong> can be enabled by setting the
                        <code>allowReordering</code> property as true. Reordering can be done by dragging and dropping the column header from one index to another index
                                        within the Grid. The location in which the column is to be placed will be indicated by two arrow symbols.
                    </p>
                    <p>
                        <strong>Resizing:</strong> A grid column can be resized by clicking and dragging at the right edge of the column’s header.
                        To enable column resize behavior, set the
                        <code>allowResizing</code> property as true.
                    </p>
                </div>
            </div>
        )
    }
}