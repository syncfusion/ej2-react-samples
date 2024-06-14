import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective, GridLine, Page, Inject, Sort, Toolbar, ToolbarItems, FilterSettingsModel, EditSettingsModel, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { employeeData } from './data';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';

function GridLines() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let lines: String = "Default";
    let gridInstance: GridComponent;
    const filterSettings: FilterSettingsModel = {type: 'Excel'};
    const toolbar: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const firstnameRule: Object = { required: true, minLength: 5};
    const employeeidRules: Object = { required: true, number: true };
    function click(e: MouseEvent): void {
        let element: HTMLElement = e.target as HTMLElement;

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element) as HTMLElement;
        removeClass([].slice.apply(document.getElementsByClassName('e-ghidden')), 'e-ghidden');
        addClass([element.parentElement.parentElement], 'e-ghidden');
        lines = element.innerHTML;
        gridInstance.gridLines = lines as GridLine;
        gridInstance.dataBind();
        gridInstance.refresh();
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='e-statustext'>Select Grid Line</div>
                <ToolbarComponent id="toolbar" onClick={click.bind(this)} >
                    <ItemsDirective>
                        <ItemDirective text='Default' cssClass="e-ghidden" />
                        <ItemDirective text="None" />
                        <ItemDirective text="Both" />
                        <ItemDirective text="Horizontal" />
                        <ItemDirective text="Vertical" />
                    </ItemsDirective>
                </ToolbarComponent>
                <br />
                <GridComponent dataSource={employeeData} ref={grid => gridInstance = grid} gridLines='Default' allowSorting={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings} toolbar={toolbar}>
                    <ColumnsDirective>
                        <ColumnDirective field='EmployeeID' headerText='Employee ID' width='125' textAlign='Right'validationRules={employeeidRules} isPrimaryKey={true}/>
                        <ColumnDirective field='FirstName' headerText='FirstName' width='125' validationRules={firstnameRule}/>
                        <ColumnDirective field='Title' headerText='Title' width='180' />
                        <ColumnDirective field='HireDate' headerText='Hire Date' width='135' format={{ skeleton: 'yMd', type: 'date' }} textAlign='Right' editType='datepickeredit'/>
                    </ColumnsDirective>
                    <Inject services={[Sort, Toolbar, Filter, Edit]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates visibility of the grid lines that separates the rows and columns. In this sample, you can change
                    the gridline from the toolbar.</p>
            </div>
            <div id='description'>
                <p>    The  <code><a target='_blank' className='code'
                    href='https://ej2.syncfusion.com/react/documentation/api/grid/#gridlines'>
                    gridLines</a></code> property is used to control the line visibility that separates the rows and columns. The Grid allow us to display the following grid lines,</p>
                <ul><li><code>Default</code> - Shows the Horizontal line.</li>
                    <li><code>None</code> - Shows no line.</li>
                    <li><code>Both </code>- Shows both Horizontal and Vertical lines.</li>
                    <li><code>Horizontal</code> - Shows the Horizontal line.</li>
                    <li><code>Vertical</code> - Shows the Vertical line.</li></ul>

                <p>In this demo, you can modify the display of gridlines by selecting values in the toolbar.</p>

                <p>More information on the gridLines configuration can be found in this <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/grid/#gridlines'> documentation section</a>.

                </p>
            </div>
        </div>
    )
}
export default GridLines;