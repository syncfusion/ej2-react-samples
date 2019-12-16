import * as React from 'react';
import { closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective, Filter, Inject, VirtualScroll, Sort } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { getData } from './data';
import './grid-overview.css';
function statusTemplate(props) {
    return (<div id="status" className="statustemp">
  <span className="statustxt">{props.Status}</span>
</div>);
}
function ratingTemplate(props) {
    return (<div className="rating">
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
        </div>);
}
function progessTemplate(props) {
    return (<div id="myProgress" className="pbar">
  <div id="myBar" className="bar">
    <div id="label" className="barlabel"></div>
  </div>
</div>);
}
let loc = { width: '31px', height: '24px' };
function trustTemplate(props) {
    var Trustworthiness = props.Trustworthiness == "Sufficient" ? 'src/grid/images/Sufficient.png' : props.Trustworthiness == "Insufficient" ? 'src/grid/images/Insufficient.png' : 'src/grid/images/Perfect.png';
    return (<div> <img style={loc} src={Trustworthiness}/>
  <span id="Trusttext">{props.Trustworthiness}</span></div>);
}
function empTemplate(props) {
    return (<div>
      <div className="empimg">
        <span className="e-userimg">
        </span>
      </div> 
      <span id="Emptext">{props.Employees}</span>
    </div>);
}
function coltemplate(props) {
    return (<div className="Mapimage">
  <img src="src/grid/images/Map.png" className="e-image"/> <span>  </span> 
  <span id="locationtext">{props.Location}</span>
</div>);
}
function trustdetails(props) {
    if (props.Trustworthiness === "Select All") {
        return (<span></span>);
    }
    let loc = { width: '31px', height: '24px' };
    let Trustworthiness = props.Trustworthiness == "Sufficient" ? 'src/grid/images/Sufficient.png' : props.Trustworthiness == "Insufficient" ? 'src/grid/images/Insufficient.png' : 'src/grid/images/Perfect.png';
    return (<div><img style={loc} src={Trustworthiness}/> <span id="Trusttext">{props.Trustworthiness}</span></div>);
}
function ratingDetails(props) {
    let ele = [];
    for (var i = 0; i < 5; i++) {
        if (i < props.Rating) {
            ele.push(<span className="star checked"></span>);
        }
        else {
            ele.push(<span className="star"></span>);
        }
    }
    return <div className="rating">{ele}</div>;
}
function statusdetails(props) {
    if (props.Status === "Select All") {
        return (<span>Select All</span>);
    }
    if (props.Status === "Active") {
        return (<div className="statustemp e-activecolor">
            <span className="statustxt e-activecolor">Active</span>
            </div>);
    }
    if (props.Status === "Inactive") {
        return (<div className="statustemp e-inactivecolor">
          <span className="statustxt e-inactivecolor">Inactive</span>
          </div>);
    }
}
export class OverView extends SampleBase {
    constructor() {
        super(...arguments);
        this.dReady = false;
        this.dtTime = false;
        this.isDataBound = false;
        this.isDataChanged = true;
        this.dropSlectedIndex = null;
        this.ddlData = [
            { text: '1,000 Rows and 11 Columns', value: '1000' },
            { text: '10,000 Rows and 11 Columns', value: '10000' },
            { text: '1,00,000 Rows and 11 Columns', value: '100000' }
        ];
        this.fields = { text: 'text', value: 'value' };
        this.getTradeData = getData(1000);
        this.check = {
            type: 'CheckBox'
        };
        this.select = {
            persistSelection: true,
            type: "Multiple",
            checkboxOnly: true
        };
        this.Filter = {
            type: 'Menu'
        };
        this.status = {
            type: 'CheckBox',
            itemTemplate: statusdetails
        };
        this.trust = {
            type: 'CheckBox',
            itemTemplate: trustdetails
        };
        this.rating = {
            type: 'CheckBox',
            itemTemplate: ratingDetails
        };
    }
    onQueryCellInfo(args) {
        if (args.column.field === 'Employees') {
            if (args.data.EmployeeImg === 'usermale') {
                args.cell.querySelector('.e-userimg').classList.add("sf-icon-Male");
            }
            else {
                args.cell.querySelector('.e-userimg').classList.add("sf-icon-FeMale");
            }
        }
        if (args.column.field === 'Status') {
            if (args.cell.textContent === "Active") {
                args.cell.querySelector(".statustxt").classList.add("e-activecolor");
                args.cell.querySelector(".statustemp").classList.add("e-activecolor");
            }
            if (args.cell.textContent === "Inactive") {
                args.cell.querySelector(".statustxt").classList.add("e-inactivecolor");
                args.cell.querySelector(".statustemp").classList.add("e-inactivecolor");
            }
        }
        if (args.column.field === 'Rating') {
            if (args.column.field === 'Rating') {
                for (var i = 0; i < args.data.Rating; i++) {
                    args.cell.querySelectorAll("span")[i].classList.add("checked");
                }
            }
        }
        if (args.column.field === "Software") {
            if (args.data.Software <= 20) {
                args.data.Software = args.data.Software + 30;
            }
            args.cell.querySelector(".bar").style.width = args.data.Software + "%";
            args.cell.querySelector(".barlabel").textContent = args.data.Software + "%";
            if (args.data.Status === "Inactive") {
                args.cell.querySelector(".bar").classList.add("progressdisable");
            }
        }
    }
    onDataBound() {
        clearTimeout(this.clrIntervalFun);
        clearInterval(this.intervalFun);
        this.dtTime = true;
    }
    onComplete(args) {
        if (args.requestType === "filterchoicerequest") {
            if (args.filterModel.options.field === "Trustworthiness" || args.filterModel.options.field === "Rating" || args.filterModel.options.field === "Status") {
                var span = args.filterModel.dialogObj.element.querySelectorAll('.e-selectall')[0];
                if (!isNullOrUndefined(span)) {
                    closest(span, '.e-ftrchk').classList.add("e-hide");
                }
            }
        }
    }
    onChange() {
        this.ddObj.hidePopup();
        this.gridInstance.showSpinner();
        this.dropSlectedIndex = null;
        let index = this.ddObj.value;
        clearTimeout(this.clrIntervalFun2);
        this.clrIntervalFun2 = setTimeout(() => {
            this.isDataChanged = true;
            this.stTime = null;
            let contentElement = this.gridInstance.contentModule.getPanel().firstChild;
            contentElement.scrollLeft = 0;
            contentElement.scrollTop = 0;
            this.gridInstance.pageSettings.currentPage = 1;
            this.stTime = performance.now();
            this.gridInstance.dataSource = getData(index);
            this.gridInstance.hideSpinner();
        }, 100);
    }
    onLoad(args) {
        document.getElementById('overviewgrid').ej2_instances[0].on('data-ready', () => {
            this.dReady = true;
            this.stTime = performance.now();
        });
        document.getElementById('overviewgrid').addEventListener('DOMSubtreeModified', () => {
            if (this.dReady && this.stTime && this.isDataChanged) {
                let msgEle = document.getElementById('msg');
                let val = (performance.now() - this.stTime).toFixed(0);
                this.stTime = null;
                this.dReady = false;
                this.dtTime = false;
                this.isDataChanged = false;
                msgEle.innerHTML = 'Load Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
                msgEle.classList.remove('e-hide');
            }
        });
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
        <div>
        <DropDownListComponent id="games" width='220' dataSource={this.ddlData} index={0} ref={(dropdownlist) => { this.ddObj = dropdownlist; }} fields={this.fields} change={this.onChange.bind(this)} placeholder="Select a Data Range" popupHeight="240px"/>
        <span id='msg'></span>
        <br />
        </div>
          <GridComponent id="overviewgrid" dataSource={this.getTradeData} enableHover={false} enableVirtualization={true} rowHeight={38} height='600' ref={(g) => { this.gridInstance = g; }} actionComplete={this.onComplete.bind(this)} load={this.onLoad.bind(this)} queryCellInfo={this.onQueryCellInfo.bind(this)} dataBound={this.onDataBound.bind(this)} filterSettings={this.Filter} allowFiltering={true} allowSorting={true} allowSelection={true} selectionSettings={this.select}>
            <ColumnsDirective>
            <ColumnDirective type='checkbox' allowSorting={false} allowFiltering={false} width='60'></ColumnDirective>
              <ColumnDirective field='EmployeeID' visible={false} headerText='Employee ID' isPrimaryKey={true} width='130'></ColumnDirective>
              <ColumnDirective field='Employees' headerText='Employee Name' width='230' clipMode='EllipsisWithTooltip' template={empTemplate} filter={this.check}/>
              <ColumnDirective field='Designation' headerText='Designation' width='170' filter={this.check} clipMode='EllipsisWithTooltip'/>
              <ColumnDirective field='Mail' headerText='Mail' filter={this.Filter} width='230'></ColumnDirective>
              <ColumnDirective field='Location' headerText='Location' width='140' filter={this.check} template={coltemplate}></ColumnDirective>
              <ColumnDirective field='Status' headerText='Status' filter={this.status} template={statusTemplate} width='130'></ColumnDirective>
              <ColumnDirective field='Trustworthiness' filter={this.trust} headerText='Trustworthiness' template={trustTemplate} width='160'></ColumnDirective>
              <ColumnDirective field='Rating' headerText='Rating' filter={this.rating} template={ratingTemplate} width='160'/>
              <ColumnDirective field='Software' allowFiltering={false} allowSorting={false} headerText='Software Proficiency' width='180' template={progessTemplate} format='C2'/>
              <ColumnDirective field='CurrentSalary' headerText='Current Salary' filter={this.Filter} width='160' format='C2'></ColumnDirective>
              <ColumnDirective field='Address' headerText='Address' width='240' filter={this.Filter} clipMode="EllipsisWithTooltip"></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Filter, VirtualScroll, Sort]}/>
          </GridComponent>
        </div>  
        <style>
            @import 'src/grid/Grid/style.css';
        </style>
<div id="action-description">
    <p>This sample demonstrates the overview of basic grid features with its performance metrics of large data. To change datasource count, select rows and columns count from dropdown.</p>
</div>

<div id="description">
    <p>
        The Grid is used to display and manipulate tabular data with configuration options to control 
        the way the data is presented and manipulated. 
        It will pull the data from a data source, such as an array of JSON objects, OData web services,
        or <code><a target="_blank" className="code" href="http://ej2.syncfusion.com/documentation/data/api-dataManager.html">
        DataManager</a></code> binding data fields to columns. 
        Also, displaying a column header to identify the field with support for grouped records.
    </p>
    <p>
        In this demo, Grid features such as <code>Virtual Scrolling, Filtering, Sorting, Column Template </code> etc... are used along with large data source.
    </p>
    <p>
        More information on the Grid instantiation can be found in this
        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/grid/getting-started.html">
            documentation section</a>.
    </p>
</div>
</div>);
    }
}
