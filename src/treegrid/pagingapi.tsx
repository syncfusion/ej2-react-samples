import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { getObject } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { sampleData } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';


export class PagingAPI extends SampleBase<{}, {}> {

  public treegridObj: TreeGridComponent;
  public sizemodeObj: DropDownListComponent;
  public pageSizeObj: NumericTextBoxComponent;
  public pageCountObj: NumericTextBoxComponent;
  public currentPageObj: NumericTextBoxComponent;

  private onChange(args: ChangeEventArgs): void {
    this.treegridObj.allowPaging = args.checked;
    this.toggleInputs(this.treegridObj.allowPaging, true);
  }

  private changeNum() {
    this.pageSizeObj.value = this.pageSizeObj.value > this.treegridObj.pageSettings.totalRecordsCount ?
        this.treegridObj.pageSettings.totalRecordsCount : this.pageSizeObj.value;
    this.treegridObj.pageSettings.pageSize = this.pageSizeObj.value;
    this.currentPageObj.max = Math.ceil(this.treegridObj.pageSettings.totalRecordsCount / this.treegridObj.pageSettings.pageSize);
  }

  private countChange() {
    this.pageCountObj.value = this.pageCountObj.value > 8 ? 8 : this.pageCountObj.value;
    this.treegridObj.pageSettings.pageCount = this.pageCountObj.value;
  }

  private currentPageChange() {
    this.currentPageObj.value = this.currentPageObj.value > this.currentPageObj.max ? this.currentPageObj.max : this.currentPageObj.value;
    let pageNumber: number = this.currentPageObj.value;
    this.treegridObj.goToPage(pageNumber);
  }

  private change(args: Object): void {
     let type: string = getObject('value', args);
     if (type === 'Root') {
        this.treegridObj.pageSettings = { pageSizeMode: 'Root', pageSize: 2 };
     } else {
        this.treegridObj.pageSettings = { pageSizeMode: 'All', pageSize: this.pageSizeObj.value };
     }
     this.toggleInputs(type === 'All');
  }

  private toggleInputs(state: boolean, isPager?:boolean) {
    if (!isNullOrUndefined(isPager)) {
      let element: HTMLElement = document.getElementsByClassName('con-prop1')[0] as HTMLElement;
      element.style.display = state ? 'table-row' : 'none';
    }
    let flag: Boolean = this.sizemodeObj.value === 'All';
    let elem: HTMLCollectionOf<Element> = document.getElementsByClassName('con-prop2');
    for (let i: number = 0; i < elem.length; i++) {
      let element: HTMLElement = elem[i] as HTMLElement
      element.style.display = state && flag ? 'table-row' : 'none';
    }
  }

  private type: { [key: string]: Object }[] = [
    { id: 'All', type: 'All' },
    { id: 'Root', type: 'Root' }
  ];

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className = 'col-md-9'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' allowPaging='true' 
              ref={treegrid=> this.treegridObj = treegrid} pageSettings={{ pageCount: 2 }} >
              <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' width='100' type='date' format='yMd' textAlign='Right' />
                <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right' />
                <ColumnDirective field='progress' headerText='progress' width='90' textAlign='Right' />
              </ColumnsDirective>
            <Inject services={[Page]} />
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                  <tr>
                    <td style={{ width: '60%' }}>
                      <div> Allow Paging </div>
                    </td>
                    <td style={{ width: '60%' }}>
                      <div>
                        <CheckBoxComponent checked={true} change={ this.onChange.bind(this) } ></CheckBoxComponent>
                      </div>
                    </td>
                  </tr>
                  <tr className='con-prop1'>
                    <td style= {{ width: '50%' }}>
                      <div style= {{ paddingTop: '7px' }}> Page Size Mode </div>
                    </td>
                    <td style={{ width: '50%', paddingTop: '10px 10px 10px 0px' }}>
                      <div id='dropdown'>
                        <DropDownListComponent width="90px" id="sizemode" change={this.change.bind(this)}
                            dataSource={this.type} fields={{ text: 'type', value: 'id' }} value="All"
                            ref={dropdown=> this.sizemodeObj = dropdown} />
                      </div>
                    </td>
                  </tr>
                  <tr className='con-prop2'>
                    <td style= {{ width: '50%' }}>
                      <div style= {{ paddingTop: '7px' }}> Page Size </div>
                    </td>
                    <td style={{ width: '50%', paddingTop: '10px 10px 10px 0px' }}>
                      <div id='numericbox'>
                        <NumericTextBoxComponent width="90px" id='pagesize' format='##' min={1} max={200} value={12}
                          ref={numeric=> this.pageSizeObj = numeric} change={this.changeNum.bind(this)}>
                        </NumericTextBoxComponent>
                      </div>
                    </td>
                  </tr>
                  <tr className='con-prop2'>
                    <td style= {{ width: '50%' }}>
                      <div style= {{ paddingTop: '7px' }}> Page Count </div>
                    </td>
                    <td style={{ width: '50%', paddingTop: '10px 10px 10px 0px' }}>
                      <div id='numericbox'>
                        <NumericTextBoxComponent width="90px" id='pagecount' format='##' min={1} max={4} value={2}
                          ref={numeric=> this.pageCountObj = numeric} change={this.countChange.bind(this)}>
                        </NumericTextBoxComponent>
                      </div>
                    </td>
                  </tr>
                  <tr className='con-prop2'>
                    <td style= {{ width: '50%' }}>
                      <div style= {{ paddingTop: '7px' }}> Current Page </div>
                    </td>
                    <td style={{ width: '50%', paddingTop: '10px 10px 10px 0px' }}>
                      <div id='numericbox'>
                        <NumericTextBoxComponent width="90px" id='currentpage' format='##' min={1} max={17} value={1}
                          ref={numeric=> this.currentPageObj = numeric} change={this.currentPageChange.bind(this)}>
                        </NumericTextBoxComponent>
                      </div>
                    </td>
                  </tr>
              </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the usage of paging API in TreeGrid. In this sample, use the properties panel 
          to change the page size mode, page size, page count and current page of the TreeGrid.</p>
      </div>

      <div id="description">
        <p>Paging allows you to display the contents of the TreeGrid in page segments. The number of items on a page is determined by
            the <code>pageSettings->pageSize</code> property. If no value is specified for the <code>pageSettings->pageSize</code> property,
            the TreeGrid will display 12 items on a page. By default, paging is disabled. To enable paging,
            set <code>allowPaging</code> property to true.</p>
        <p>In this demo,</p>
        <ul>
          <li>Click the <strong>Allow Paging</strong> check box to enable/disable paging feature.</li>
          <li>Change the value of <strong>Page Size Mode</strong> Dropdown to change <code>pageSettings->pageSizeMode.</code></li>
          <li>Change the value of <strong>Page Size</strong> textbox to change <code>pageSettings->pageSize.</code></li>
          <li>Change the value of <strong>Page Count</strong> textbox to change <code>pageSettings->pageCount.</code></li>
          <li>Change the value of <strong>Current Page</strong> textbox to change
          <code> pageSettings->currentPage.</code></li>
        </ul>
        <p>Injecting Module:</p>
        <p>
          TreeGrid features are segregated into individual feature-wise modules. To use paging feature, we need to inject
            <code>Page</code> module into the <code>services</code>.
        </p>
        <p>
          More information on the paging configuration can be found in the  documentation section.
        </p>
        </div>
      </div>
    )
  }
}