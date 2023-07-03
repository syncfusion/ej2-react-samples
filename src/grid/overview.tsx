import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { classList, Animation, createElement, closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective,Filter, IFilter,Inject,Grid, VirtualScroll, Sort,SelectionType, Selection  } from '@syncfusion/ej2-react-grids';
import {DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import { CheckBox  } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { Slider } from '@syncfusion/ej2-react-inputs';
import { Query, DataManager, Predicate, UrlAdaptor } from '@syncfusion/ej2-data';
import './grid-overview.css';


function statusTemplate(props):any { 
     
  return(<div>{props.Status === "Active" ? 
      <div id="status" className="statustemp e-activecolor">
        <span className="statustxt e-activecolor">{props.Status}</span>
      </div> : 
      <div id="status" className="statustemp e-inactivecolor">
        <span className="statustxt e-inactivecolor">{props.Status}</span>
      </div>}</div>);
}
function ratingTemplate(props): any {
  return (<RatingComponent value={props.Rating} cssClass={'custom-rating'} readOnly={true} />);
}
function progessTemplate(props): any {
  let percentage: number = props[props.column.field];
  if (percentage <= 20) {
    percentage = percentage + 30;
  }
  return(  <div id="myProgress" className="pbar">
    { props.Status === "Inactive" ? 
    <div id="myBar" className="bar progressdisable" style={{ width: percentage+"%" }}>
      <div id="pbarlabel" className="barlabel">{ percentage + "%" }</div>
    </div> : 
    <div id="myBar" className="bar" style={{ width: percentage+"%" }}>
      <div id="pbarlabel" className="barlabel">{ percentage + "%" }</div>
    </div> }
</div>);
}
let loc = { width: '31px' , height: '24px'};
function trustTemplate(props):any {
  var Trustworthiness = props.Trustworthiness == "Sufficient" ? 'src/grid/images/Sufficient.png' : props.Trustworthiness == "Insufficient" ? 'src/grid/images/Insufficient.png' : 'src/grid/images/Perfect.png' ;
  return(<div> <img style={loc} src={Trustworthiness} />
  <span id="Trusttext">{props.Trustworthiness}</span></div>)
}

function empTemplate(props): any {
  return (<div>
    { props.EmployeeImg === 'usermale' ?
        <div className="empimg">
          <span className="e-userimg sf-icon-Male"/>
        </div> : 
        <div className="empimg">
          <span className="e-userimg sf-icon-FeMale"/>
        </div>
      }
    <span id="Emptext">{props.Employees}</span>
  </div>);
}
function coltemplate(props):any {
  return(<div className="Mapimage">
  <img src="src/grid/images/Map.png" className="e-image" /> <span>  </span> 
  <span id="locationtext">{props.Location}</span>
</div>)
}
function trustdetails(props):any{
    if (props.Trustworthiness === "Select All") {
        return (<span></span>);
    }
    let loc = { width: '31px' , height: '24px'};   
    let Trustworthiness = props.Trustworthiness == "Sufficient" ? 'src/grid/images/Sufficient.png' : props.Trustworthiness == "Insufficient" ? 'src/grid/images/Insufficient.png' : 'src/grid/images/Perfect.png' ;
    return (<div><img style={loc} src={Trustworthiness} /> <span id="Trusttext">{props.Trustworthiness}</span></div>);
}
function ratingDetails(props): any{   
    return (<RatingComponent value={props.Rating} cssClass={'custom-rating'} readOnly={true} />);
}
function statusdetails(props):any {
    if (props.Status === "Select All") {
        return (<span>Select All</span>);
    }     
    if (props.Status === "Active") {
        return (
            <div className="statustemp e-activecolor">
            <span className="statustxt e-activecolor">Active</span>
            </div>)     
    }
    if (props.Status === "Inactive") {
      return (
          <div className="statustemp e-inactivecolor">
          <span className="statustxt e-inactivecolor">Inactive</span>
          </div>)
           }  
  } 

export class OverView extends SampleBase<{}, {}> { 
  public dReady: boolean = false;
  private dtTime: boolean = false;
  private isDataBound: boolean = false;
  public isDataChanged: boolean = true;
  private intervalFun: any;
  private clrIntervalFun: any;
  private clrIntervalFun1: any;
  private clrIntervalFun2: any;
  public dropSlectedIndex: number = null;
  public ddObj: DropDownListComponent
  public gridInstance: GridComponent;
  public stTime: any; 
  private ddlData: { [key: string]: Object }[] = [
    { text: '1,000 Rows and 11 Columns', value: '1000' },
    { text: '10,000 Rows and 11 Columns', value: '10000' },
    { text: '1,00,000 Rows and 11 Columns', value: '100000' }      
  ];
 
  private fields: object = { text: 'text', value: 'value' };
 
  public onDataBound(): void {
    clearTimeout(this.clrIntervalFun);
    clearInterval(this.intervalFun);
    this.dtTime = true;
  }
  public onComplete(args:any): void{
    if (args.requestType === "filterchoicerequest") {
        if (args.filterModel.options.field === "Trustworthiness" || args.filterModel.options.field === "Rating" || args.filterModel.options.field === "Status") {
            var span = args.filterModel.dialogObj.element.querySelectorAll('.e-selectall')[0];
            if(!isNullOrUndefined(span)) {
                closest(span, '.e-ftrchk').classList.add("e-hide");
            }
        }
    }
  }
  public hostUrl: string = 'https://services.syncfusion.com/react/production/';
  public data: DataManager = new DataManager({ url: this.hostUrl + 'api/UrlDataSource', adaptor: new UrlAdaptor  });
  public query: Query = new Query().addParams('dataCount', '1000');
  public onChange(): void {
	this.ddObj.hidePopup();
    this.dropSlectedIndex = null;
    let index: number = this.ddObj.value as number;
    clearTimeout(this.clrIntervalFun2);
    this.clrIntervalFun2 = setTimeout(() => {
        this.isDataChanged = true;
        this.stTime = null;
        let contentElement: Element = this.gridInstance.contentModule.getPanel().firstChild as Element;
        contentElement.scrollLeft = 0;
        contentElement.scrollTop = 0;
        this.gridInstance.pageSettings.currentPage = 1;
        this.stTime = performance.now();
        if (this.gridInstance.query.params.length > 1) {
          for (let i: number = 0; i < this.gridInstance.query.params.length; i++) {
              if (this.gridInstance.query.params[i].key === 'dataCount') {
                this.gridInstance.query.params[i].value = index.toString();
                break;
              }
          }
        }
        else {
          this.gridInstance.query.params[0].value = index.toString();
        }
        this.gridInstance.setProperties({dataSource: this.data});
    }, 100);
  }
  public check : IFilter = {
    type: 'CheckBox'
  }
  public select : any = {
      persistSelection: true,
      type: "Multiple",
      checkboxOnly: true
  }
  public onLoad(args:any): void {      
        (document.getElementById('overviewgrid') as any).ej2_instances[0].on('data-ready', ()=> {
            this.dReady = true; 
            this.stTime = performance.now();
         });
        document.getElementById('overviewgrid').addEventListener('DOMSubtreeModified', () => {
        if (this.dReady && this.stTime && this.isDataChanged) {
            let msgEle = document.getElementById('msg');
            let val: any = (performance.now() - this.stTime).toFixed(0);
            this.stTime = null;
            this.dReady = false;
            this.dtTime = false;
            this.isDataChanged = false;
            msgEle.innerHTML = 'Load Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
            msgEle.classList.remove('e-hide')
        }
     })
    }
  public Filter : any = {
    type: 'Menu'
  }     
  public status : any = {
    type: 'CheckBox',
    itemTemplate: statusdetails
  }      
  public trust : any = {
    type: 'CheckBox',
    itemTemplate: trustdetails
  }   
  public rating : any = {
    type: 'CheckBox',
    itemTemplate: ratingDetails
  }    
  render() {    
    return (
      <div className='control-pane'>
        <div className='control-section'>
        <div style={{paddingBottom: '18px'}}>
        <DropDownListComponent id="games" width='220' dataSource={this.ddlData} index={0} ref={(dropdownlist) => { this.ddObj = dropdownlist }} fields={this.fields} change={this.onChange.bind(this)} placeholder="Select a Data Range" popupHeight="240px" />
        <span id='msg'></span>
        <br/>
        </div>
          <GridComponent id="overviewgrid" dataSource={this.data} query={this.query} enableHover={false} enableVirtualization={true} loadingIndicator= {{ indicatorType: 'Shimmer' }} rowHeight={38} height='400' ref={(g) => { this.gridInstance = g }} actionComplete={this.onComplete.bind(this)} load={this.onLoad.bind(this)} dataBound={this.onDataBound.bind(this)} filterSettings={this.Filter} allowFiltering={true} allowSorting={true} allowSelection={true} selectionSettings={this.select} enableHeaderFocus={true}>
            <ColumnsDirective>
            <ColumnDirective type='checkbox' allowSorting={false} allowFiltering={false}  width='60'></ColumnDirective>
              <ColumnDirective field='EmployeeID' visible={false} headerText='Employee ID' isPrimaryKey={true} width='130'></ColumnDirective>
              <ColumnDirective field='Employees' headerText='Employee Name' width='230'clipMode='EllipsisWithTooltip' template={empTemplate} />
              <ColumnDirective field='Designation'  headerText='Designation' width='170' clipMode='EllipsisWithTooltip' />
              <ColumnDirective field='Mail' headerText='Mail' width='230'></ColumnDirective>
              <ColumnDirective field='Location' headerText='Location' width='140' template={coltemplate}></ColumnDirective>
              <ColumnDirective field='Status' headerText='Status' template={statusTemplate} width='130'></ColumnDirective>
              <ColumnDirective field='Trustworthiness' headerText='Trustworthiness' template={trustTemplate} width='160'></ColumnDirective>
              <ColumnDirective field='Rating' headerText='Rating' template={ratingTemplate} width='220' />
              <ColumnDirective field='Software' allowFiltering={false} allowSorting={false} headerText='Software Proficiency' width='180' template={progessTemplate} format='C2' />
              <ColumnDirective field='CurrentSalary' headerText='Current Salary' width='160' format='C2'></ColumnDirective>
              <ColumnDirective field='Address' headerText='Address' width='240' clipMode="EllipsisWithTooltip" ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Filter,VirtualScroll,Sort]} />
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
        or <code><a target="_blank" className="code"
        href="http://ej2.syncfusion.com/documentation/data/api-dataManager.html">
        DataManager</a></code> binding data fields to columns. 
        Also, displaying a column header to identify the field with support for grouped records.
    </p>
    <p>
        In this demo, Grid features such as <code>Virtual Scrolling, Filtering, Sorting, Column Template </code> etc... are used along with large data source.
    </p>
    <p>
        You can follow the guidelines in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/virtual-scroll/#browser-height-limitation-in-virtual-scrolling-and-solution">
	documentation</a> to get around the browser height restriction when loading and viewing millions of records.
    </p>
    <p>
        More information on the Grid instantiation can be found in this
        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/grid/getting-started.html"> documentation section</a>.
    </p>
</div>
</div>
    )
  }
}
