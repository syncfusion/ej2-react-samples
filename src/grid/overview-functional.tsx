import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Filter, IFilter, VirtualScroll, Sort } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import './grid-overview.css';


function statusTemplate(props): any {

  React.useEffect(() => {
    updateSampleSection();
  }, [])

  return (<div id="status" className="statustemp">
    <span className="statustxt">{props.Status}</span>
  </div>)
}
function ratingTemplate(): any {
  return (<div className="rating">
    <span className="star"></span>
    <span className="star"></span>
    <span className="star"></span>
    <span className="star"></span>
    <span className="star"></span>
  </div>)
}
function progessTemplate(): any {
  return (<div id="myProgress" className="pbar">
    <div id="myBar" className="bar">
      <div id="pbarlabel" className="barlabel"></div>
    </div>
  </div>)
}
let loc = { width: '31px', height: '24px' };
function trustTemplate(props): any {
  var Trustworthiness = props.Trustworthiness == "Sufficient" ? 'src/grid/images/Sufficient.png' : props.Trustworthiness == "Insufficient" ? 'src/grid/images/Insufficient.png' : 'src/grid/images/Perfect.png';
  return (<div> <img style={loc} src={Trustworthiness} />
    <span id="Trusttext">{props.Trustworthiness}</span></div>)
}

function empTemplate(props): any {
  return (<div>
    <div className="empimg">
      <span className="e-userimg">
      </span>
    </div>
    <span id="Emptext">{props.Employees}</span>
  </div>)
}
function coltemplate(props): any {
  return (<div className="Mapimage">
    <img src="src/grid/images/Map.png" className="e-image" /> <span>  </span>
    <span id="locationtext">{props.Location}</span>
  </div>)
}
function trustdetails(props): any {
  if (props.Trustworthiness === "Select All") {
    return (<span></span>);
  }
  let loc = { width: '31px', height: '24px' };
  let Trustworthiness = props.Trustworthiness == "Sufficient" ? 'src/grid/images/Sufficient.png' : props.Trustworthiness == "Insufficient" ? 'src/grid/images/Insufficient.png' : 'src/grid/images/Perfect.png';
  return (<div><img style={loc} src={Trustworthiness} /> <span id="Trusttext">{props.Trustworthiness}</span></div>);
}
function ratingDetails(props): any {
  let ele = [];
  for (var i = 0; i < 5; i++) {
    if (i < props.Rating) {
      ele.push(<span className="star checked"></span>);
    }
    else {
      ele.push(<span className="star"></span>)
    }
  }
  return <div className="rating">{ele}</div>;
}
function statusdetails(props): any {
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

function OverView() {
  let dReady: boolean = false;
  let dtTime: boolean = false;
  let isDataBound: boolean = false;
  let isDataChanged: boolean = true;
  let intervalFun: any;
  let clrIntervalFun: any;
  let clrIntervalFun1: any;
  let clrIntervalFun2: any;
  let dropSlectedIndex: number = null;
  let ddObj: DropDownListComponent
  let gridInstance: GridComponent;
  let stTime: any;
  const ddlData: { [key: string]: Object }[] = [
    { text: '1,000 Rows and 11 Columns', value: '1000' },
    { text: '10,000 Rows and 11 Columns', value: '10000' },
    { text: '1,00,000 Rows and 11 Columns', value: '100000' }
  ];

  const fields: object = { text: 'text', value: 'value' };

  function onQueryCellInfo(args: any): void {
    if (args.column.field === 'Employees') {
      if (args.data.EmployeeImg === 'usermale') {
        args.cell.querySelector('.e-userimg').classList.add("sf-icon-Male");
      } else {
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
  function onDataBound(): void {
    clearTimeout(clrIntervalFun);
    clearInterval(intervalFun);
    dtTime = true;
  }
  function onComplete(args: any): void {
    if (args.requestType === "filterchoicerequest") {
      if (args.filterModel.options.field === "Trustworthiness" || args.filterModel.options.field === "Rating" || args.filterModel.options.field === "Status") {
        var span = args.filterModel.dialogObj.element.querySelectorAll('.e-selectall')[0];
        if (!isNullOrUndefined(span)) {
          closest(span, '.e-ftrchk').classList.add("e-hide");
        }
      }
    }
  }
  const hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
  const data: DataManager = new DataManager({ url: hostUrl + 'api/UrlDataSource', adaptor: new UrlAdaptor  });
  const query = new Query().addParams('dataCount', '1000');
  function onChange(): void {
    ddObj.hidePopup();
    dropSlectedIndex = null;
    let index: number = ddObj.value as number;
    clearTimeout(clrIntervalFun2);
    clrIntervalFun2 = setTimeout(() => {
      isDataChanged = true;
      stTime = null;
      let contentElement: Element = gridInstance.contentModule.getPanel().firstChild as Element;
      contentElement.scrollLeft = 0;
      contentElement.scrollTop = 0;
      gridInstance.pageSettings.currentPage = 1;
      stTime = performance.now();
      if (gridInstance.query.params.length > 1) {
        for (let i: number = 0; i < gridInstance.query.params.length; i++) {
            if (gridInstance.query.params[i].key === 'dataCount') {
                gridInstance.query.params[i].value = index.toString();
                break;
            }
        }
      }
      else {
          gridInstance.query.params[0].value = index.toString();
      }
      gridInstance.setProperties({dataSource: data});
    }, 100);
  }
  const check: IFilter = {
    type: 'CheckBox'
  }
  const select: any = {
    persistSelection: true,
    type: "Multiple",
    checkboxOnly: true
  }
  function onLoad(args: any): void {
    (document.getElementById('overviewgrid') as any).ej2_instances[0].on('data-ready', () => {
      dReady = true;
      stTime = performance.now();
    });
    document.getElementById('overviewgrid').addEventListener('DOMSubtreeModified', () => {
      if (dReady && stTime && isDataChanged) {
        let msgEle = document.getElementById('msg');
        let val: any = (performance.now() - stTime).toFixed(0);
        stTime = null;
        dReady = false;
        dtTime = false;
        isDataChanged = false;
        msgEle.innerHTML = 'Load Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
        msgEle.classList.remove('e-hide')
      }
    })
  }
  const gridFilter: any = {
    type: 'Menu'
  }
  const status: any = {
    type: 'CheckBox',
    itemTemplate: statusdetails
  }
  const trust: any = {
    type: 'CheckBox',
    itemTemplate: trustdetails
  }
  const rating: any = {
    type: 'CheckBox',
    itemTemplate: ratingDetails
  }

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div style={{paddingBottom: '18px'}}>
          <DropDownListComponent id="games" width='220' dataSource={ddlData} index={0} ref={(dropdownlist) => { ddObj = dropdownlist }} fields={fields} change={onChange.bind(this)} placeholder="Select a Data Range" popupHeight="240px" />
          <span id='msg'></span>
          <br />
        </div>
        <GridComponent id="overviewgrid" dataSource={data} loadingIndicator= {{ indicatorType: 'Shimmer' }} query={query} enableHover={false} enableVirtualization={true} rowHeight={38} height='600' ref={(g) => { gridInstance = g }} actionComplete={onComplete.bind(this)} load={onLoad.bind(this)} queryCellInfo={onQueryCellInfo.bind(this)} dataBound={onDataBound.bind(this)} filterSettings={gridFilter} allowFiltering={true} allowSorting={true} allowSelection={true} selectionSettings={select} enableHeaderFocus={true}>
          <ColumnsDirective>
            <ColumnDirective type='checkbox' allowSorting={false} allowFiltering={false} width='60'></ColumnDirective>
            <ColumnDirective field='EmployeeID' visible={false} headerText='Employee ID' isPrimaryKey={true} width='130'></ColumnDirective>
            <ColumnDirective field='Employees' headerText='Employee Name' width='230' clipMode='EllipsisWithTooltip' template={empTemplate} />
            <ColumnDirective field='Designation' headerText='Designation' width='170' clipMode='EllipsisWithTooltip' />
            <ColumnDirective field='Mail' headerText='Mail' width='230'></ColumnDirective>
            <ColumnDirective field='Location' headerText='Location' width='140' template={coltemplate}></ColumnDirective>
            <ColumnDirective field='Status' headerText='Status' template={statusTemplate} width='130'></ColumnDirective>
            <ColumnDirective field='Trustworthiness' headerText='Trustworthiness' template={trustTemplate} width='160'></ColumnDirective>
            <ColumnDirective field='Rating' headerText='Rating' template={ratingTemplate} width='160' />
            <ColumnDirective field='Software' allowFiltering={false} allowSorting={false} headerText='Software Proficiency' width='180' template={progessTemplate} format='C2' />
            <ColumnDirective field='CurrentSalary' headerText='Current Salary' width='160' format='C2'></ColumnDirective>
            <ColumnDirective field='Address' headerText='Address' width='240' clipMode="EllipsisWithTooltip" ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Filter, VirtualScroll, Sort]} />
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
          More information on the Grid instantiation can be found in this
          <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/grid/getting-started.html">
            documentation section</a>.
        </p>
      </div>
    </div>
  )

}
export default OverView;
