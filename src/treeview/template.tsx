import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import './template.css';
export class Template extends SampleBase<{}, {}> {

public employees: { [key: string]: Object }[] = [
    { id: 1, name: 'Steven Buchanan', eimg: '10', job: 'CEO', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Laura Callahan', eimg: '2', job: 'Product Manager', hasChild: true },
    { id: 3, pid: 2, name: 'Andrew Fuller', eimg: '7', job: 'Team Lead', hasChild: true },
    { id: 4, pid: 3, name: 'Anne Dodsworth', eimg: '1', job: 'Developer' },
    { id: 5, pid: 1, name: 'Nancy Davolio', eimg: '4', job: 'Product Manager', hasChild: true },
    { id: 6, pid: 5, name: 'Michael Suyama', eimg: '9', job: 'Team Lead', hasChild: true },
    { id: 7, pid: 6, name: 'Robert King', eimg: '8', job: 'Developer ' },
    { id: 8, pid: 7, name: 'Margaret Peacock', eimg: '6', job: 'Developer' },
    { id: 9, pid: 1, name: 'Janet Leverling', eimg: '3', job: 'HR' },
];
private fields: Object = { dataSource: this.employees,  id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
private cssClass:string = "custom";
// Template to render tree node
private nodeTemplate: string = '<div><img class="eimage" src="src/images/employees/${eimg}.png" alt="${eimg}"/>' +
  '<div class="ename">${name}</div><div class="ejob">${job}</div></div>';
  render() {
    return (       
      <div className = 'control-pane'>
        <div className='control-section'>
        <div className='control_wrapper'>
          {/* Render the TreeView using template option */}
            <TreeViewComponent fields={this.fields} cssClass={this.cssClass} nodeTemplate={this.nodeTemplate}/>
        </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the template functionalities of the TreeView. Select the customized root node by click on it, or expand the root node and select the customized child node.</p>
        </div>
        <div id="description">
            <p>The <code>TreeView</code> component has an option to customize the node structure through the <code>nodeTemplate</code> property, so that the tree node can be formed with any custom structure.</p>
            <p>In this demo, the node is formed with the employee's image, name and designation.</p>
            <p>For more information, you can refer to the <a href="http://ej2.syncfusion.com/react/documentation/treeview/template.html" target="_blank">Templates</a> section from the documentation.</p>
        </div>
      </div>
    )
  }
}
