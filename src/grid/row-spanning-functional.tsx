import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, QueryCellInfoEventArgs } from '@syncfusion/ej2-react-grids';
import { columnSpanData, ColumnSpanDataType } from './data';
import { updateSampleSection } from '../common/sample-base';

function RowSpanning() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const queryCellInfoEvent = (args: QueryCellInfoEventArgs) => {
        let data: ColumnSpanDataType = args.data as ColumnSpanDataType;
        switch (data.EmployeeID) {
            case 10001:
                if (args.column.field === '9:00' || args.column.field === '2:30') {
                    args.colSpan = 2;
                } else if (args.column.field === '11:00') {
                    args.colSpan = 3;
                } else if (args.column.field === '1:00') {
                    args.colSpan = 3;
                    args.rowSpan = 10;
                } else if (args.column.field === '4:30') {
                    args.colSpan = 2;
                    args.rowSpan = 2;
                } else if (args.column.field === 'EmployeeName') {
                    args.rowSpan = 2;
                }
                break;
            case 10002:
                if (args.column.field === '9:30') {
                    args.colSpan = 3;
                } else if (args.column.field === '11:00') {
                    args.colSpan = 4;
                } else if (args.column.field === '2:30') {
                    args.colSpan = 2;
                    args.rowSpan = 5;
                } else if (args.column.field === '3:30') {
                    args.colSpan = 2;
                }
                break;
            case 10003:
                if (args.column.field === '9:00') {
                    args.colSpan = 3;
                    args.rowSpan = 2;
                } else if (args.column.field === '10:30' || args.column.field === '3:30' || args.column.field === '4:30') {
                    args.colSpan = 2;
                } else if (args.column.field === '11:30') {
                    args.colSpan = 3;
                }
                break;
            case 10004:
                if (args.column.field === '11:00') {
                    args.colSpan = 4;
                } else if (args.column.field === '4:00') {
                    args.colSpan = 2;
                }
                break;
            case 10005:
                if (args.column.field === '9:00') {
                    args.colSpan = 4;
                } else if (args.column.field === '11:30') {
                    args.colSpan = 3;
                } else if (args.column.field === '3:30') {
                    args.colSpan = 2;
                    args.rowSpan = 2;
                } else if (args.column.field === '4:30') {
                    args.colSpan = 2;
                }
                break;
            case 10006:
                if (args.column.field === '9:00' || args.column.field === '4:30') {
                    args.colSpan = 2;
                } else if (args.column.field === '10:00') {
                    args.colSpan = 3;
                } else if (args.column.field === '11:30') {
                    args.colSpan = 3;
                }
                break;
            case 10007:
                if (args.column.field === '9:00' || args.column.field === '10:30' || args.column.field === '3:00') {
                    args.colSpan = 2;
                } else if (args.column.field === '11:30' || args.column.field === '4:00') {
                    args.colSpan = 3;
                }
                break;
            case 10008:
                if (args.column.field === '9:00' || args.column.field === '10:30') {
                    args.colSpan = 3;
                } else if (args.column.field === '2:30') {
                    args.colSpan = 3;
                    args.rowSpan = 2;
                } else if (args.column.field === '4:00') {
                    args.colSpan = 2;
                }
                break;
            case 10009:
                if (args.column.field === '9:00') {
                    args.colSpan = 3;
                } else if (args.column.field === '11:30') {
                    args.colSpan = 3;
                    args.rowSpan = 2;
                } else if (args.column.field === '4:30') {
                    args.colSpan = 2;
                }
                break;
            case 10010:
                if (args.column.field === '9:00' || args.column.field === '2:30' || args.column.field === '4:00') {
                    args.colSpan = 3;
                } else if (args.column.field === '10:30') {
                    args.colSpan = 2;
                }
                break;
        }
    };
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={columnSpanData} queryCellInfo={queryCellInfoEvent.bind(this)} allowTextWrap={true} height='auto' width='auto' gridLines='Both' >
                    <ColumnsDirective>
                        <ColumnDirective field='EmployeeID' headerText='Employee ID' width='150' isPrimaryKey={true} textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='EmployeeName' headerText='Employee Name' width='200' ></ColumnDirective>
                        <ColumnDirective field='9:00' headerText='9:00 AM' width='120'></ColumnDirective>
                        <ColumnDirective field='9:30' headerText='9:30 AM' width='120'></ColumnDirective>
                        <ColumnDirective field='10:00' headerText='10:00 AM' width='120'></ColumnDirective>
                        <ColumnDirective field='10:30' headerText='10:30 AM' width='120'></ColumnDirective>
                        <ColumnDirective field='11:00' headerText='11:00 AM' width='120'></ColumnDirective>
                        <ColumnDirective field='11:30' headerText='11:30 AM' width='120'></ColumnDirective>
                        <ColumnDirective field='12:00' headerText='12:00 PM' width='120'></ColumnDirective>
                        <ColumnDirective field='12:30' headerText='12:30 PM' width='120'></ColumnDirective>
                        <ColumnDirective field='1:00' headerText='1:00 PM' width='120'></ColumnDirective>
                        <ColumnDirective field='1:30' headerText='1:30 PM' width='120'></ColumnDirective>
                        <ColumnDirective field='2:00' headerText='2:00 PM' width='120'></ColumnDirective>
                        <ColumnDirective field='2:30' headerText='2:30 PM' width='120'></ColumnDirective>
                        <ColumnDirective field='3:00' headerText='3:00 PM' width='120'></ColumnDirective>
                        <ColumnDirective field='3:30' headerText='3:30 PM' width='120'></ColumnDirective>
                        <ColumnDirective field='4:00' headerText='4:00 PM' width='120'></ColumnDirective>
                        <ColumnDirective field='4:30' headerText='4:30 PM' width='120'></ColumnDirective>
                        <ColumnDirective field='5:00' headerText='5:00 PM' width='120'></ColumnDirective>
                    </ColumnsDirective>
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the Grid component with the row spanning feature. In this sample, we have spanned row cells together.
                </p>
            </div>
            <div id="description">
                <p>
                    Grid allows to span the row cells. In <a href='https://ej2.syncfusion.com/react/documentation/api/grid/queryCellInfoEventArgs/'><code>QueryCellInfo</code></a>
                    event, you can define the <code>rowSpan</code> attributes to span the cells.
                </p>
                <p>
                    In this demo, Davolio cell is spanned to two rows in the EmployeeName column.
                </p>
                <p>
                    Also Grid supports the spanning of rows and columns for same cells. Lunch Break cell is spanned to ten rows and three columns in the 1:00 column.
                </p>
                <p>
                    More information on the row drag and drop can be found in this
                    <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/grid/row/row-drag-and-drop">
                        documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default RowSpanning;