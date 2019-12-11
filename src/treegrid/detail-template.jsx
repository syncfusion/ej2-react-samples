import * as React from 'react';
import { Internationalization } from '@syncfusion/ej2-base';
import { textdata } from './data';
import { SampleBase } from '../common/sample-base';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, DetailRow, Inject } from '@syncfusion/ej2-react-treegrid';
let instance = new Internationalization();
export class DetailTemplate extends SampleBase {
    constructor() {
        super(...arguments);
        this.format = (value) => {
            return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
        };
        this.template = this.detailtemplate;
    }
    detailtemplate(props) {
        var imag = 'src/treegrid/images/' + props.FullName + '.png';
        return (<div>
                <div style={{ position: 'relative', display: 'inline-block', float: 'left', padding: '5px 4px 2px 27px' }}>
                    <img src={imag}/>
                </div>
                <div style={{ paddingLeft: '10px', display: 'inline-block', width: '66%', fontSize: '13px', fontFamily: 'Segoe UI' }}>
                    <div className="e-description" style={{ marginTop: '5px' }}>
                        <b>{props.Name}</b> was born on {this.format(props.DOB)}. Now lives at {props.Address}, {props.Country}. {props.Name} holds a position of <b>{props.Designation}</b> in our WA department, (Seattle USA).</div>
                    <div className="e-description" style={{ marginTop: '5px' }}>
                        <b style={{ marginRight: '10px' }}>Contact:</b>{props.Contact}
                    </div>
                </div>
            </div>);
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <TreeGridComponent dataSource={textdata} childMapping='Children' detailTemplate={this.template.bind(this)} treeColumnIndex={0} height='335'>
                        <ColumnsDirective>
                            <ColumnDirective headerText='Full Name' width='180' field='Name'></ColumnDirective>
                            <ColumnDirective headerText='DOB' field='DOB' width='85' type='date' format='yMd' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='Designation' headerText='Designation' width='147'></ColumnDirective>
                            <ColumnDirective field='EmpID' headerText='EmployeeID' width='125'></ColumnDirective>
                            <ColumnDirective field='Country' headerText='Country' width='148'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[DetailRow]}/>
                    </TreeGridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the TreeGrid component with the detail template feature.
    </p>
                </div>
                <div id="description">
                    <p>
                        The detail row template provides an additional information about a data row. The
                        <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/treegrid/row/#detail-template">detailTemplate
        </a></code>
                        property accepts either string or HTML element`s ID value, which will be used as the template for the detail
                        row.
    </p>
                    <p>In this demo, we have presented Employee Information with image in the detail row.</p>
                    <p>Injecting Module:
                        TreeGrid features are segregated into individual feature-wise modules. To use detail template feature, we need to
    inject <code>DetailRow</code> using the <code>services</code> section.
</p>
                </div>
            </div>);
    }
}
