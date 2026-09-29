import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Filter, Sort, Edit, Toolbar, InfiniteScroll, ColumnChooser } from '@syncfusion/ej2-react-grids';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { Browser } from "@syncfusion/ej2-base";
import { createSalesDataSource, salesDataSource } from './data';
import { SampleBase } from '../common/sample-base';

interface ResponsiveLayoutState {
  isMobileLayout: boolean;
  salesData: Object[];
}

// custom code start
const SAMPLE_CSS = `
.e-bigger.e-responsive-dialog .e-dlg-content {
  padding: 16px;
}

/* The device with borders */
.e-mobile-layout {
  position: relative;
  width: 360px;
  height: 640px;
  margin: auto;
  border: 16px #f4f4f4 solid;
  border-top-width: 60px;
  border-bottom-width: 60px;
  border-radius: 36px;
  box-shadow: 0 0px 2px rgb(144 144 144), 0 0px 10px rgb(0 0 0 / 16%);
}

.tailwind-dark .e-mobile-layout,
.material-dark .e-mobile-layout,
.fabric-dark .e-mobile-layout,
.bootstrap-dark .e-mobile-layout,
.bootstrap5-dark .e-mobile-layout {
  border: 16px rgb(255 255 255 / 10%) solid;
  border-top-width: 60px;
  border-bottom-width: 60px;
}

/* The horizontal line on the top of the device */
.e-mobile-layout:before {
  content: '';
  display: block;
  width: 60px;
  height: 5px;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ebebeb;
  border-radius: 10px;
}

.tailwind-dark .e-mobile-layout::before,
.tailwind-dark .e-mobile-layout::after,
.material-dark .e-mobile-layout::before,
.material-dark .e-mobile-layout::after,
.fabric-dark .e-mobile-layout::before,
.fabric-dark .e-mobile-layout::after,
.bootstrap-dark .e-mobile-layout::before,
.bootstrap-dark .e-mobile-layout::after,
.bootstrap5-dark .e-mobile-layout::before,
.bootstrap5-dark .e-mobile-layout::after {
  background: rgb(255 255 255  / 20%);
}

/* The circle on the bottom of the device */
.e-mobile-layout:after {
  content: '';
  display: block;
  width: 35px;
  height: 35px;
  position: absolute;
  left: 50%;
  bottom: -65px;
  transform: translate(-50%, -50%);
  background: #e8e8e8;
  border-radius: 50%;
}

/* The screen (or content) of the device */
.e-mobile-layout .e-mobile-content {
  overflow: hidden;
  width: 328px;
  height: 100%;
  background: transparent;
  border: 0px solid #dddddd;
}

.highcontrast .e-mobile-layout {
    border: 16px #000000 solid;
    border-top-width: 60px;
    border-bottom-width: 60px;
    box-shadow: -1px 2px white, -2px -2px white, 2px -2px white, 2px 1px white;
}`;

// custom code end
export class ResponsiveLayout extends SampleBase<{}, ResponsiveLayoutState> {  
  public desktopToolbar: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ColumnChooser'];
  public mobileToolbar: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search', 'ColumnChooser'];
  public desktopEditSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true };
  public mobileEditSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
  public renderingMode: any = 'Vertical';
  public productIdRules: Object = { required: true, number: true };
  public productNameRules: Object = { required: true, number: true };
  public priceRules: Object = { required: true, number: true };
  public filterOptions: any = { type: 'CheckBox', enableInfiniteScrolling: true};
  public onChange(e: ChangeEventArgs): void {
    this.setState({
      isMobileLayout: e.checked as boolean
    });
  }
  public componentDidMount(): void {
    createSalesDataSource();
    this.setState({
      salesData: [...salesDataSource]
    });
  }
  public load(): void {
    const mobileContent = document.getElementsByClassName('e-mobile-content')[0] as HTMLElement;
    if (mobileContent) {
      (this as any).adaptiveDlgTarget = mobileContent;
    }
  }
  render() {
    return (
      <div className='control-pane'>        
        <div className='control-section'>
          <div id="responsive-layout-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <label htmlFor="responsive-layout-checkbox"> Switch To Mobile View </label>
            <CheckBoxComponent id="responsive-layout-checkbox" change={this.onChange.bind(this)} aria-label="Responsive Mobile Layout" />
          </div>
          <div>
            {!this.state.isMobileLayout && (
              <GridComponent id="desktopgrid" dataSource={this.state.salesData} height="600" allowFiltering={true} allowSorting={true} showColumnChooser={true} enableInfiniteScrolling={true} filterSettings={this.filterOptions} toolbar={this.desktopToolbar} pageSettings={{ pageSize: 50 }} editSettings={this.desktopEditSettings}>
                <ColumnsDirective>
                  <ColumnDirective field='ProductId' headerText='Product ID' isPrimaryKey={true} validationRules={this.productIdRules} width='130' textAlign='Right'></ColumnDirective>
                  <ColumnDirective field='ProductName' headerText='Product Name' validationRules={this.productNameRules} width='200'></ColumnDirective>
                  <ColumnDirective field='GrossAmount' headerText='Gross Amount' width='180' format='C2' textAlign='Right'></ColumnDirective>
                  <ColumnDirective field='NetAmount' headerText='Net Amount' width='180' format='C2' textAlign='Right'></ColumnDirective>
                  <ColumnDirective field='ProfitMargin' headerText='Profit (%)' width='180' textAlign='Right'></ColumnDirective>
                  <ColumnDirective field='AchievementPercent' headerText='Achievement (%)' width='190' textAlign='Right'></ColumnDirective>
                  <ColumnDirective field='SalesQty' headerText='Sales Quantity' width='150'  textAlign='Right' ></ColumnDirective>
                  <ColumnDirective field='UnitPrice' headerText='Price' width='120' validationRules={this.priceRules}  format='C2' textAlign='Right' ></ColumnDirective>
                  <ColumnDirective field='Month' headerText='Month' editType="dropdownedit" width='120' ></ColumnDirective>
                  <ColumnDirective field='Category' headerText='Category' width='130'></ColumnDirective>
                  <ColumnDirective field='SubCategory' headerText='Sub Category' width='150' visible={false}></ColumnDirective>
                  <ColumnDirective field='Brand' headerText='Brand' width='120' ></ColumnDirective>
                  <ColumnDirective field='City' headerText='City' width='130'></ColumnDirective>
                  <ColumnDirective field='State' headerText='State' width='120' ></ColumnDirective>
                  <ColumnDirective field='Country' headerText='Country' editType="dropdownedit" width='160'></ColumnDirective>
                  <ColumnDirective field='Region' headerText='Region' width='120' ></ColumnDirective>
                </ColumnsDirective>
                <Inject services={[ Filter, Sort, Edit, Toolbar, InfiniteScroll, ColumnChooser ]} />
            </GridComponent>
            )}
            {this.state.isMobileLayout && (
              <div>
                <style>
                {SAMPLE_CSS}
                </style>         
                <div className="e-adaptive-demo e-bigger">
                  <div className="e-mobile-layout">
                    <div className="e-mobile-content">
                      <GridComponent id="mobilegrid" dataSource={this.state.salesData} height="460" enableAdaptiveUI={true} rowRenderingMode={this.renderingMode} allowFiltering={true} allowSorting={true} showColumnChooser={true} enableInfiniteScrolling={true} filterSettings={this.filterOptions} toolbar={this.mobileToolbar} editSettings={this.mobileEditSettings} pageSettings={{ pageSize: 50 }} load={this.load.bind(this)} >
                        <ColumnsDirective>                          
                          <ColumnDirective field='ProductId' headerText='Product ID' isPrimaryKey={true} validationRules={this.productIdRules} width='130'></ColumnDirective>
                          <ColumnDirective field='ProductName' headerText='Product Name' validationRules={this.productNameRules} width='200'></ColumnDirective>
                          <ColumnDirective field='GrossAmount' headerText='Gross Amount' width='180' visible={false} format='C2'></ColumnDirective>
                          <ColumnDirective field='NetAmount' headerText='Net Amount' width='180' visible={false} format='C2' ></ColumnDirective>
                          <ColumnDirective field='ProfitMargin' headerText='Profit (%)' width='180' visible={false}></ColumnDirective>
                          <ColumnDirective field='AchievementPercent' headerText='Achievement (%)' visible={false} width='190'></ColumnDirective>
                          <ColumnDirective field='SalesQty' headerText='Sales Quantity' width='150' visible={false} ></ColumnDirective>
                          <ColumnDirective field='UnitPrice' headerText='Price' width='120' validationRules={this.priceRules} format='C2' ></ColumnDirective>
                          <ColumnDirective field='Month' headerText='Month' editType="dropdownedit" visible={false} width='120' ></ColumnDirective>
                          <ColumnDirective field='Category' headerText='Category' width='130'></ColumnDirective>
                          <ColumnDirective field='SubCategory' headerText='Sub Category' width='150' visible={false}></ColumnDirective>
                          <ColumnDirective field='Brand' headerText='Brand' width='120' ></ColumnDirective>
                          <ColumnDirective field='City' headerText='City' visible={false} width='130'></ColumnDirective>
                          <ColumnDirective field='State' headerText='State' visible={false} width='120' ></ColumnDirective>
                          <ColumnDirective field='Country' headerText='Country' editType="dropdownedit" visible={false} width='160'></ColumnDirective>
                          <ColumnDirective field='Region' headerText='Region' visible={false} width='120' ></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[ Filter, Sort, Edit, Toolbar, InfiniteScroll, ColumnChooser ]} />
                      </GridComponent>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div id="action-description">
            <p>This sample demonstrates how to render the Grid in desktop and mobile views, with the desktop displaying more columns and the mobile showing priority columns.</p>
          </div>
          <div id='description'>
             <p>
              In this demo, the Grid initially renders in desktop view with all columns visible. Selecting <strong>Switch To Mobile View</strong> displays the Grid inside a simulated mobile device frame, showing only priority columns controlled by the <code>visible</code> property, with <code>enableAdaptiveUI</code> enabled and <code>rowRenderingMode</code> set to <code>Vertical</code>. Clearing the checkbox restores the standard desktop Grid layout.
            </p>
            <p>
              Both layouts support sorting, filtering, and infinite scrolling, editing, and column chooser, through the Grid toolbar.
            </p>
            <p>
              <strong>Injecting Module:</strong>
            </p>
            <p>
              Grid features are provided through individual modules. To enable filtering, sorting, editing, column chooser, and infinite scrolling, inject the <code>Filter</code>, <code>Sort</code>, <code>Edit</code>, <code>Toolbar</code>, <code>ColumnChooser</code>, and <code>InfiniteScroll</code>, modules into the component providers.
            </p>
            <p>Looking for the full React Data Grid component overview, features, pricing, and documentation? Visit our
            <a target="_blank"
              href="https://www.syncfusion.com/react-components/react-data-grid"> React Data Grid component</a> page.</p>
          </div>
        </div>
      </div>
    )
  }
}
