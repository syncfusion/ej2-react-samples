import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { enableRipple } from '@syncfusion/ej2-base';
import { PivotViewComponent, IDataOptions, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './pivot-data/productData.json';
import './heat-map.css';
enableRipple(true);
/**
 * PivotView HeatMap Sample.
 */
export class HeatMap extends SampleBase<{}, {}> {
   private colourScheme: string[] = ['range1', 'range2', 'range3', 'range4', 'range5', 'range6',
      'range7', 'range8', 'range9', 'range10', 'range11', 'range12', 'range13', 'range14'];
   private minValue: number = 0;
   private maxValue: number = 0;

   private data: IDataSet[] = (dataSource as any).data;
   private dataSourceSettings: IDataOptions = {
      enableSorting: false,
      columns: [{ name: 'ProductType' }, { name: 'Product' }],
      valueSortSettings: { headerDelimiter: ' - ' },
      values: [{ name: 'SoldAmount', caption: 'Sold Amount' }],
      dataSource: this.data,
      rows: [{ name: 'Year' }],
      formatSettings: [{ name: 'SoldAmount', format: 'C0' }],
      groupSettings: [{
         name: 'Year',
         type: 'Number',
         rangeInterval: 2
      }],
      expandAll: true,
      filters: [],
      showColumnSubTotals: false
   };

   cellTemplate(args: any): any {
      if (args != null && args.cellInfo) {
         if (args.cellInfo.axis === 'value') {
            if (args.cellInfo.axis === 'value' && !args.cellInfo.isGrandSum) {
               args.targetCell.classList.add(this.cellColour(args.cellInfo.value));
            }
            args.targetCell.querySelector('.e-cellvalue').innerText = '$' + (args.cellInfo.value / 1000).toFixed(1) + 'K';
         }
      }
   }

   cellColour(value: any): string {
      let percentage: number = (this.maxValue - this.minValue) / this.colourScheme.length;
      let colourIndex: number = Math.round((value - this.minValue) / percentage);
      return this.colourScheme[colourIndex];
   }

   aggregateCellInfo(args: any): any {
      if (args.rowCellType !== "grandTotal" && args.columnCellType !== "grandTotal") {
         this.minValue = (this.minValue < args.value && this.minValue !== 0) ? this.minValue : args.value;
         this.maxValue = this.maxValue > args.value ? this.maxValue : args.value;
      }
   }

   enginePopulated(): any {
      this.minValue = this.minValue - 1000;
      this.maxValue = this.maxValue + 1000;
   }

   render() {
      return (
         <div className='control-pane'>
            <div className='control-section'>
               <PivotViewComponent id='PivotView-Heatmap' dataSourceSettings={this.dataSourceSettings} width={'100%'} height={'500'} gridSettings={{ rowHeight: 35, columnWidth: 120 }}
                  cellTemplate={this.cellTemplate.bind(this)} enginePopulated={this.enginePopulated.bind(this)} aggregateCellInfo={this.aggregateCellInfo.bind(this)}>
               </PivotViewComponent>
            </div>
            <div id="action-description">
               <p>In this sample, we show you how to visualize the bound data by making the pivot table cells look like a heatmap.</p>
            </div>
            <div id="description">
               <p>The Pivot Table provides custom styles for each cell's display using the cell template. Using the
                  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/pivotview/#celltemplate"> cellTemplate</a> property in this sample,
                  we are representing the product-specific monthly sales revenue of the goods sold
                  by an online retailer in a year in the form of a heatmap-like appearance. Each pivot table cell was customized
                  by calculating the lowest and highest values via the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/pivotview/#enginepopulated">
                     enginePopulated</a> event and applying a color scheme based on their range.
               </p>
               <br />
               <p>
                  More information on the cell template can be found in this <a target="_blank"
                     href="https://ej2.syncfusion.com/react/documentation/pivotview/row-and-column#cell-template">
                  documentation section</a>.
               </p>
            </div>
         </div>
      );
   }
}
