import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PagerComponent } from '@syncfusion/ej2-react-grids';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

export class API extends SampleBase<{}, {}> {
  private pagerInstance: PagerComponent;
  private count: NumericTextBoxComponent;
  private page: NumericTextBoxComponent;
  private size: NumericTextBoxComponent;
  private total: NumericTextBoxComponent;
  public countChange(args: any): void {
    if (args.value < 10) {
      this.pagerInstance.pageCount = this.count.value;
    } else {
      this.pagerInstance.pageCount = 10;
      this.count.max = 10;
    }
  }
  public click(args: any): void {
    if (args.currentPage != null && args.currentPage !== 'undefined') {
      this.page.value = args.currentPage;
    }
  }
  public pageChange(): void {
    this.pagerInstance.currentPage = this.page.value;
    this.page.max = this.calc();
  };
  public sizeChange(): void {
    this.pagerInstance.pageSize = this.size.value;
    this.page.max = this.calc();
    this.count.max = this.calc();
  };
  public totalChange(): void {
    this.pagerInstance.totalRecordsCount = this.total.value;
    this.page.max = this.calc();
    this.count.max = this.calc();
  };
  public calc(): number {
    let tot = this.pagerInstance.totalRecordsCount
    let size = this.pagerInstance.pageSize
    let totalPages: number = Math.ceil(tot % size) === 0 ? Math.ceil(tot / size) : Math.ceil(tot / size) + 1;
    return totalPages;
  };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-9'>
            <PagerComponent pageSize={1} totalRecordsCount={20} pageCount={5} ref={pager => this.pagerInstance = pager} click={this.click.bind(this)}>
            </PagerComponent>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' style={{ width: '100%', margin: '10px' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '50%' }}>
                      <div style={{ paddingTop: '7px' }}>
                        Page Count
                    </div>
                    </td>
                    <td style={{ width: '50%', padding: '10px 10px 10px 0px' }}>
                      <div>
                        <NumericTextBoxComponent id='count' format='##' min={1} value={5} floatLabelType='Auto' ref={numerictextbox => this.count = numerictextbox} change={this.countChange.bind(this)}>
                        </NumericTextBoxComponent>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '50%' }}>
                      <div style={{ paddingTop: '7px' }}>
                        Current Page
                    </div>
                    </td>
                    <td style={{ width: '50%', padding: '10px 10px 10px 0px' }}>
                      <div>
                        <NumericTextBoxComponent id='pageno' format='##' min={1} value={1} floatLabelType='Auto' ref={numerictextbox => this.page = numerictextbox} change={this.pageChange.bind(this)}>
                        </NumericTextBoxComponent>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '50%' }}>
                      <div style={{ paddingTop: '7px' }}>
                        Page Size
                    </div>
                    </td>
                    <td style={{ width: '50%', padding: '10px 10px 10px 0px' }}>
                      <div>
                        <NumericTextBoxComponent id='pagesize' format='##' min={1} value={1} max={5} floatLabelType='Auto' ref={numerictextbox => this.size = numerictextbox} change={this.sizeChange.bind(this)}>
                        </NumericTextBoxComponent>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '50%' }}>
                      <div style={{ paddingTop: '7px' }}>
                        Total Records
                    </div>
                    </td>
                    <td style={{ width: '50%', padding: '10px 10px 10px 0px' }}>
                      <div>
                        <NumericTextBoxComponent id='totalrecords' format='##' min={1} value={20} floatLabelType='Auto' ref={numerictextbox => this.total = numerictextbox} change={this.totalChange.bind(this)}>
                        </NumericTextBoxComponent>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="description">
          <p>Pager allows you to display the contents in page segments. The number of items on a page is determined by the <code><a target="_blank" className="code"
            href="http://ej2.syncfusion.com/react/documentation/pager/api-pagerComponent.html#pagesize-number">
            pageSize
        </a></code> property. If no value is specified for the <code><a target="_blank" className="code"
              href="http://ej2.syncfusion.com/react/documentation/pager/api-pagerComponent.html#pagesize-number">
              pageSize
        </a></code> property, the Pager will display 12 items on a page.</p>
          <p>In this demo,</p>
          <ul>
            <li>Change value of <strong>Page Count</strong> textbox to change <code><a target="_blank" className="code"
              href="http://ej2.syncfusion.com/react/documentation/pager/api-pagerComponent.html#pagecount-number">
              pageCount
        </a></code>.</li>
            <li>Change value of <strong>Current Page</strong> textbox to change
                <code><a target="_blank" className="code"
                href="http://ej2.syncfusion.com/react/documentation/pager/api-pagerComponent.html#currentpage-number">
                currentPage
        </a></code>.</li>
            <li>Change value of <strong>Page Size</strong> textbox to change <code><a target="_blank" className="code"
              href="http://ej2.syncfusion.com/react/documentation/pager/api-pagerComponent.html#pagesize-number">
              pageSize
        </a></code>.</li>
            <li>Change value of <strong>totalrecords</strong> textbox to change <code><a target="_blank" className="code"
              href="http://ej2.syncfusion.com/react/documentation/pager/api-pagerComponent.html#totalrecordscount-number">
              totalRecordsCount
        </a></code>.</li>
          </ul>
        </div>
      </div>
    )
  }
}