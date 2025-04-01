/**
 * Sample for Range Navigator Customization
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    IChangedEventArgs, DateTime, ChartTheme, Inject, IRangeLoadedEventArgs, RangeNavigatorComponent
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { employeeData } from './data-source';
import { updateSampleSection } from '../common/sample-base';
import { loadRangeNavigatorTheme } from './theme-color';

export let transX: string = 'translateX(10%)';
const divStyle = {
    transform: transX
};

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px;
     }
     #days {
         font-size: 15px;
         font-style: normal;
         font-family: "Segoe UI";
         font-weight: 500;
         text-anchor: middle;
         transform: none;
         opacity: 1;
     }
     `;
function Customization() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let grid1: GridComponent;
    let rangenavigator1: RangeNavigatorComponent;
    let gridRender: boolean;
    let gridData: Object[] = employeeData.filter((data: { [key: string]: Object }): Boolean => {
        return (data.HireDate >= new Date(1992, 5, 1) && data.HireDate <= new Date(1993, 4, 1));
    });

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className="row" style={{ textAlign: "center" }}>
                    <div id="days" >Filter From Hire Date</div>
                </div>
                <div className="row">
                    <RangeNavigatorComponent id='rangenavigator'
                        ref={rangenavigator => rangenavigator1 = rangenavigator}
                        style={{ textAlign: "center" }}
                        height='75'
                        valueType='DateTime'
                        intervalType='Quarter'
                        load={load.bind(this)}
                        changed={changed.bind(this)}
                        width={Browser.isDevice ? '100%' : '80%'}
                        enableGrouping={true}
                        allowSnapping={true}
                        groupBy='Years'
                        enableDeferredUpdate={true}
                        value={[new Date('1992-06-01'), new Date('1993-05-01')]}
                        dataSource={employeeData} xName='HireDate' yName='yValue'>
                        <Inject services={[DateTime]} />
                    </RangeNavigatorComponent>
                </div>
                <div className="row" style={divStyle}>
                    <GridComponent id="grid" ref={grid => grid1 = grid}
                        dataSource={gridData}
                        created={gridCreated.bind(this)}
                        width={Browser.isDevice ? '100%' : '80%'}>
                        <Inject services={[DateTime]} />
                        <ColumnsDirective>
                            <ColumnDirective field='EmployeeID' headerText='Employee ID' textAlign='Center'></ColumnDirective>
                            <ColumnDirective field='FirstName' headerText='Name' textAlign='Center'></ColumnDirective>
                            <ColumnDirective field='Title' headerText='Title' textAlign='Center'></ColumnDirective>
                            <ColumnDirective field='HireDate' headerText='Hire Date' format={{ skeleton: 'yMd', type: 'date' }} textAlign='Center'></ColumnDirective>
                        </ColumnsDirective>
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample filters the data by hire date using date-time axis.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to bind the value of the range navigator to the grid control using the <code>changed</code> event.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        The range navigator component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the <code>RangeNavigator.Inject(DateTime)</code> method.
                    </p>
                </div>
            </div>
        </div>
    )

    function changed(args: IChangedEventArgs): void {
        if (grid1 && gridRender) {
            grid1.dataSource = employeeData.filter((data: { [key: string]: Object }): Boolean => {
                return (data.HireDate >= new Date(+args.start) && data.HireDate <= new Date(+args.end));
            });
            grid1.refresh();
        }
    };

    function load(args: IRangeLoadedEventArgs): void {
       loadRangeNavigatorTheme(args);
    };

    function gridCreated(args: Object): void {
        gridRender = true;
    }
}
export default Customization;