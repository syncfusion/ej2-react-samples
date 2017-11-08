import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective, GridLine, Page, Inject } from '@syncfusion/ej2-react-grids';
import { employeeData } from '../data';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';

export class GridLines extends SampleBase<{}, {}> {

    public lines: String = "default";
    private gridInstance: GridComponent;
    public click(e: MouseEvent): void {
        let element: HTMLElement = e.target as HTMLElement;

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element) as HTMLElement;
        removeClass([].slice.apply(document.getElementsByClassName('e-ghidden')), 'e-ghidden');
        addClass([element.parentElement.parentElement], 'e-ghidden');
        this.lines = element.innerHTML.toLowerCase();
        this.gridInstance.gridLines = this.lines as GridLine;
        this.gridInstance.refresh();
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div className='e-statustext'>Select Grid Line</div>
                    <ToolbarComponent id="toolbar" onClick={this.click.bind(this)} >
                        <ItemsDirective>
                            <ItemDirective text='Default' cssClass="e-ghidden" />
                            <ItemDirective text="None" />
                            <ItemDirective text="Both" />
                            <ItemDirective text="Horizontal" />
                            <ItemDirective text="vertical" />
                        </ItemsDirective>
                    </ToolbarComponent>
                    <br />
                    <GridComponent dataSource={employeeData} ref={grid => this.gridInstance = grid} gridLines='default'>
                        <ColumnsDirective>
                            <ColumnDirective field='EmployeeID' headerText='Employee ID' width='125' textAlign='right' />
                            <ColumnDirective field='FirstName' headerText='FirstName' width='125' />
                            <ColumnDirective field='Title' headerText='Title' width='180' />
                            <ColumnDirective field='HireDate' headerText='Hire Date' width='135' format={{ skeleton: 'yMd', type: 'date' }} textAlign='right' />
                        </ColumnsDirective>
                    </GridComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<GridLines />, document.getElementById('sample'));