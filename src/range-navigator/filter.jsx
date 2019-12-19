/**
 * Sample for Range Navigator Customization
 */
import * as React from "react";
import { DateTime, Inject, RangeNavigatorComponent } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { employeeData } from './data-source';
import { SampleBase } from '../common/sample-base';
export let transX = 'translateX(10%)';
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
export class Customization extends SampleBase {
    constructor() {
        super(...arguments);
        this.gridData = employeeData.filter((data) => {
            return (data.HireDate >= new Date(1992, 5, 1) && data.HireDate <= new Date(1993, 4, 1));
        });
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className="row" style={{ textAlign: "center" }}>
                        <div id="days">Filter From Hire Date</div>
                    </div>
                    <div className="row">
                        <RangeNavigatorComponent id='rangenavigator' ref={rangenavigator => this.rangenavigator1 = rangenavigator} style={{ textAlign: "center" }} height='75' valueType='DateTime' intervalType='Quarter' load={this.load.bind(this)} changed={this.changed.bind(this)} width={Browser.isDevice ? '100%' : '80%'} enableGrouping={true} allowSnapping={true} groupBy='Years' enableDeferredUpdate={true} value={[new Date('1992-06-01'), new Date('1993-05-01')]} dataSource={employeeData} xName='HireDate' yName='yValue'>
                            <Inject services={[DateTime]}/>
                        </RangeNavigatorComponent>
                    </div>
                    <div className="row" style={divStyle}>
                        <GridComponent id="grid" ref={grid => this.grid1 = grid} dataSource={this.gridData} created={this.gridCreated.bind(this)} width={Browser.isDevice ? '100%' : '80%'}>                            
                            <Inject services={[DateTime]}/>
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
                                In this example, you can see how to bind the value of the range navigator to the grid control using the 
                                <code>changed</code> event.
                            </p>
                            <br></br>
                            <p><b>Injecting Module</b></p>
                            <p>
                                The range navigator component features are segregated into individual feature-wise modules. To use date-time axis, inject the
                                <code>DateTime</code> module using the
                                <code>RangeNavigator.Inject(DateTime)</code> method.
                            </p>
                        </div>
                </div>
            </div>);
    }
    changed(args) {
        if (this.grid1 && this.gridRender) {
            this.grid1.dataSource = employeeData.filter((data) => {
                return (data.HireDate >= new Date(+args.start) && data.HireDate <= new Date(+args.end));
            });
            this.grid1.refresh();
        }
    }
    ;
    gridCreated(args) {
        this.gridRender = true;
    }
}
