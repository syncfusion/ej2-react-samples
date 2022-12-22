import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { getObject } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { sampleData } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';


function PagingAPI() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj: TreeGridComponent;
  let sizemodeObj: DropDownListComponent;
  let pageSizeObj: NumericTextBoxComponent;
  let pageCountObj: NumericTextBoxComponent;
  let currentPageObj: NumericTextBoxComponent;

  function onChange(args: ChangeEventArgs): void {
    treegridObj.allowPaging = args.checked;
    toggleInputs(treegridObj.allowPaging, true);
  }

  function changeNum() {
    pageSizeObj.value = pageSizeObj.value > treegridObj.pageSettings.totalRecordsCount ?
      treegridObj.pageSettings.totalRecordsCount : pageSizeObj.value;
    treegridObj.pageSettings.pageSize = pageSizeObj.value;
    currentPageObj.max = Math.ceil(treegridObj.pageSettings.totalRecordsCount / treegridObj.pageSettings.pageSize);
  }

  function countChange() {
    pageCountObj.value = pageCountObj.value > 8 ? 8 : pageCountObj.value;
    treegridObj.pageSettings.pageCount = pageCountObj.value;
  }

  function currentPageChange() {
    currentPageObj.value = currentPageObj.value > currentPageObj.max ? currentPageObj.max : currentPageObj.value;
    let pageNumber: number = currentPageObj.value;
    treegridObj.goToPage(pageNumber);
  }

  function change(args: Object): void {
    let type: string = getObject('value', args);
    if (type === 'Root') {
      treegridObj.pageSettings = { pageSizeMode: 'Root', pageSize: 2 };
    } else {
      treegridObj.pageSettings = { pageSizeMode: 'All', pageSize: pageSizeObj.value };
    }
    toggleInputs(type === 'All');
  }

  function toggleInputs(state: boolean, isPager?: boolean) {
    if (!isNullOrUndefined(isPager)) {
      let element: HTMLElement = document.getElementsByClassName('con-prop1')[0] as HTMLElement;
      element.style.display = state ? 'table-row' : 'none';
    }
    let flag: Boolean = sizemodeObj.value === 'All';
    let elem: HTMLCollectionOf<Element> = document.getElementsByClassName('con-prop2');
    for (let i: number = 0; i < elem.length; i++) {
      let element: HTMLElement = elem[i] as HTMLElement
      element.style.display = state && flag ? 'table-row' : 'none';
    }
  }

  const type: { [key: string]: Object }[] = [
    { id: 'All', type: 'All' },
    { id: 'Root', type: 'Root' }
  ];
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-md-9'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='350' allowPaging={true}
            ref={treegrid => treegridObj = treegrid} pageSettings={{ pageCount: 2 }} >
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
                    <CheckBoxComponent checked={true} change={onChange.bind(this)} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
              <tr className='con-prop1'>
                <td style={{ width: '50%' }}>
                  <div style={{ paddingTop: '7px' }}> Page Size Mode </div>
                </td>
                <td style={{ width: '50%', paddingTop: '10px 10px 10px 0px' }}>
                  <div id='dropdown'>
                    <DropDownListComponent width="90px" id="sizemode" change={change.bind(this)}
                      dataSource={type} fields={{ text: 'type', value: 'id' }} value="All"
                      ref={dropdown => sizemodeObj = dropdown} />
                  </div>
                </td>
              </tr>
              <tr className='con-prop2'>
                <td style={{ width: '50%' }}>
                  <div style={{ paddingTop: '7px' }}> Page Size </div>
                </td>
                <td style={{ width: '50%', paddingTop: '10px 10px 10px 0px' }}>
                  <div id='numericbox'>
                    <NumericTextBoxComponent id='pagesize' format='##' min={1} max={200} value={12} width='110px'
                      ref={numeric => pageSizeObj = numeric} change={changeNum.bind(this)}>
                    </NumericTextBoxComponent>
                  </div>
                </td>
              </tr>
              <tr className='con-prop2'>
                <td style={{ width: '50%' }}>
                  <div style={{ paddingTop: '7px' }}> Page Count </div>
                </td>
                <td style={{ width: '50%', paddingTop: '10px 10px 10px 0px' }}>
                  <div id='numericbox'>
                    <NumericTextBoxComponent id='pagecount' format='##' min={1} max={4} value={2} width='110px'
                      ref={numeric => pageCountObj = numeric} change={countChange.bind(this)}>
                    </NumericTextBoxComponent>
                  </div>
                </td>
              </tr>
              <tr className='con-prop2'>
                <td style={{ width: '50%' }}>
                  <div style={{ paddingTop: '7px' }}> Current Page </div>
                </td>
                <td style={{ width: '50%', paddingTop: '10px 10px 10px 0px' }}>
                  <div id='numericbox'>
                    <NumericTextBoxComponent id='currentpage' format='##' min={1} max={17} value={1} width='110px'
                      ref={numeric => currentPageObj = numeric} change={currentPageChange.bind(this)}>
                    </NumericTextBoxComponent>
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the usage of paging API in Tree Grid. In this sample, use the properties panel
          to change the page size mode, page size, page count and current page of the Tree Grid.</p>
      </div>

      <div id="description">
        <p>Paging allows you to display the contents of the Tree Grid in page segments. The number of items on a page is determined by
          the <code>pageSettings-&gt;pageSize</code> property. If no value is specified for the <code>pageSettings-&gt;pageSize</code> property,
          the Tree Grid will display 12 items on a page. By default, paging is disabled. To enable paging,
          set <code>allowPaging</code> property to true.</p>
        <p>In this demo,</p>
        <ul>
          <li>Click the <strong>Allow Paging</strong> check box to enable/disable paging feature.</li>
          <li>Change the value of <strong>Page Size Mode</strong> Dropdown to change <code>pageSettings-&gt;pageSizeMode.</code></li>
          <li>Change the value of <strong>Page Size</strong> textbox to change <code>pageSettings-&gt;pageSize.</code></li>
          <li>Change the value of <strong>Page Count</strong> textbox to change <code>pageSettings-&gt;pageCount.</code></li>
          <li>Change the value of <strong>Current Page</strong> textbox to change
            <code> pageSettings-&gt;currentPage.</code></li>
        </ul>
        <p>Injecting Module:</p>
        <p>
          Tree Grid features are segregated into individual feature-wise modules. To use paging feature, we need to inject
          <code>Page</code> module into the <code>services</code>.
        </p>
        <p>
          More information on the paging configuration can be found in the  documentation section.
        </p>
      </div>
    </div>
  )
}
export default PagingAPI;