import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Internationalization } from '@syncfusion/ej2-base';
import { TreeGridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-treegrid';
import { textdata } from './data';
import { SampleBase } from '../common/sample-base';
import './row-template.css';

let instance: Internationalization = new Internationalization();

interface DateFormat extends Window {
    format?: Function;
}

export class RowTemplate extends SampleBase<{}, {}> {
    
    public format = (value: Date) => {
        return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
    }
    
    public treegridTemplate(props): any {
        var src = 'src/treegrid/images/' + props.FullName + '.png';
        return (<tr>
            <td className="border"  style={{paddingLeft:'18px'}}>
                <div>{props.EmpID}</div>
            </td>
            <td className="border"  style={{padding: '10px 0px 0px 20px'}}>
                <div style={{fontSize:'14px'}}>
                  {props.Name}
                    <p style={{fontSize:'9px'}}>{props.Designation}</p>
                </div>
            </td>
            <td className="border">
                <div>
                    <div style={{position:'relative' , display:'inline-block'}}>
                        <img className="tempimg" src ={src} />
                    </div>
                    <div style={{display:'inline-block'}}>
                        <div style={{padding:'5px'}}>{props.Address}</div>
                        <div style={{padding:'5px'}}>{props.Country}</div>
                        <div style={{padding:'5px' ,fontSize: '12px'}}>{props.Contact}</div>
                    </div>
                </div>
            </td>
            <td className="border" style={{paddingLeft:'20px'}}>
                <div>{this.format(props.DOB)}</div>
            </td>
    </tr>
        );
    }
    public template: any = this.treegridTemplate;
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                <TreeGridComponent dataSource={textdata} childMapping = 'Children' rowTemplate={this.template.bind(this)} treeColumnIndex={0} rowHeight = '83' height='335' >
                <ColumnsDirective>
                <ColumnDirective headerText = 'Employee ID' width = '180' field = 'EmpID'></ColumnDirective>
                <ColumnDirective headerText = 'Employee Name' field = 'Name'></ColumnDirective>
                <ColumnDirective headerText = 'Employee Details' width = '350' field = 'Address'></ColumnDirective>
                <ColumnDirective headerText = 'DOB' editType = 'datepicker' field = 'DOB'></ColumnDirective>
                </ColumnsDirective>
                </TreeGridComponent>
                </div>
                <div id="action-description">
    <p>This sample demonstrates the Tree Grid component with the row template feature. In this sample, we have rendered each Tree Grid
        row using the template.
    </p>
</div>
<div id="description">
    <p>
        The Tree Grid provides a way to use a custom layout for its rows using template feature. The 
        <code><a target="_blank" className="code"
        href="https://ej2.syncfusion.com/react/documentation/treegrid/row/#row-template">rowTemplate
        </a></code> property accepts either string or HTML element`s ID value, which will be used 
        as the template for the row.  
    </p>
    <p>
        In this demo, we have presented Employee Information with Employee Photo and employee details like Name, Address etc.
    </p>
</div>
</div>
        )
    }
}

