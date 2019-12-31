import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { employeeData } from './data';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
export class GridLines extends SampleBase {
    constructor() {
        super(...arguments);
        this.lines = "Default";
    }
    click(e) {
        let element = e.target;
        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }
        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element);
        removeClass([].slice.apply(document.getElementsByClassName('e-ghidden')), 'e-ghidden');
        addClass([element.parentElement.parentElement], 'e-ghidden');
        this.lines = element.innerHTML;
        this.gridInstance.gridLines = this.lines;
        this.gridInstance.dataBind();
        this.gridInstance.refresh();
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className='e-statustext'>Select Grid Line</div>
                    <ToolbarComponent id="toolbar" onClick={this.click.bind(this)}>
                        <ItemsDirective>
                            <ItemDirective text='Default' cssClass="e-ghidden"/>
                            <ItemDirective text="None"/>
                            <ItemDirective text="Both"/>
                            <ItemDirective text="Horizontal"/>
                            <ItemDirective text="Vertical"/>
                        </ItemsDirective>
                    </ToolbarComponent>
                    <br />
                    <GridComponent dataSource={employeeData} ref={grid => this.gridInstance = grid} gridLines='Default'>
                        <ColumnsDirective>
                            <ColumnDirective field='EmployeeID' headerText='Employee ID' width='125' textAlign='Right'/>
                            <ColumnDirective field='FirstName' headerText='FirstName' width='125'/>
                            <ColumnDirective field='Title' headerText='Title' width='180'/>
                            <ColumnDirective field='HireDate' headerText='Hire Date' width='135' format={{ skeleton: 'yMd', type: 'date' }} textAlign='Right'/>
                        </ColumnsDirective>
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates visibility of the grid lines that separates the rows and columns. In this sample, you can change
        the gridline from the toolbar.</p>
                </div>
                <div id='description'>
                    <p>    The  <code><a target='_blank' className='code' href='http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#gridlines-string'>
                        gridLines</a></code> property is used to control the line visibility that separates the rows and columns. The Grid allow us to display the following grid lines,</p>
                    <ul><li><code>Default</code> - Shows the Horizontal line.</li>
                        <li><code>None</code> - Shows no line.</li>
                        <li><code>Both </code>- Shows both Horizontal and Vertical lines.</li>
                        <li><code>Horizontal</code> - Shows the Horizontal line.</li>
                        <li><code>Vertical</code> - Shows the Vertical line.</li></ul>

                    <p>In this demo, you can modify the display of gridlines by selecting values in the toolbar.</p>

                    <p>More information on the gridLines configuration can be found in this <a target='_blank' href='http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#gridlines-string'> documentation section</a>.

        </p>
                </div>
            </div>);
    }
}
