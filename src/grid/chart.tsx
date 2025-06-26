import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, ContextMenu, Filter, Sort, ContextMenuClickEventArgs, ContextMenuItem, QueryCellInfoEventArgs, Freeze } from '@syncfusion/ej2-react-grids';
import { sales } from './data';
import { CategorySeries, ChartChanges, ChartPopupArgs, GridChart, UpdateChartArgs } from '@syncfusion/ej2-grid-chart';
import { AccumulationChartModel, ChartModel, IAccLoadedEventArgs, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { loadAccumulationChartTheme, loadChartTheme } from './grid-chart-theme-color';
import { isNullOrUndefined } from '@syncfusion/ej2/base';
import './chart.css';
import { SampleBase } from '../common/sample-base';

export class GridChartIntegration extends SampleBase<{}, {}> {
  private gridInstance: GridComponent | null = null;
  private chartInstance: GridChart | null = null;

  public contextMenuItems: ContextMenuItem[] = [
    'Bar', 'StackingBar', 'StackingBar100',
    'Pie',
    'Column', 'StackingColumn', 'StackingColumn100',
    'Line', 'StackingLine', 'StackingLine100',
    'Area', 'StackingArea', 'StackingArea100',
    'Scatter'
  ];

  public handleQueryCellInfo = (args: QueryCellInfoEventArgs) => {
    if (args.column && args.column.field === 'ProfitLoss') {
      const profit = (args.data as any).ProfitLoss;
      if (profit < 0) {
        args.cell!.classList.add('e-gridchart-sales-loss');
      } else {
        args.cell!.classList.add('e-gridchart-sales-profit');
      }
    }
  };

  public handleCreated = (): void => {
    this.chartInstance = new GridChart({
      enablePropertyPanel: true,
      allowExport: true,
      enableRtl: this.gridInstance.enableRtl,
      locale: this.gridInstance.locale,
      updateChartSettings: this.updateChartSettings.bind(this)
    });
  }

  public updateChartSettings = (args: UpdateChartArgs): void => {
    const chartMargin = args.changes.chart?.margin;
    const accMargin = args.changes.accumulationChart?.margin;

    if (chartMargin) {
      if (!isNullOrUndefined(chartMargin.top)) {
        accMargin.top = chartMargin.top = Math.max(20, Math.min(100, chartMargin.top));
      } else if (!isNullOrUndefined(chartMargin.bottom)) {
        accMargin.bottom = chartMargin.bottom = Math.max(20, Math.min(100, chartMargin.bottom));
      } else if (!isNullOrUndefined(chartMargin.left)) {
        accMargin.left = chartMargin.left = Math.max(20, Math.min(100, chartMargin.left));
      } else if (!isNullOrUndefined(chartMargin.right)) {
        accMargin.right = chartMargin.right = Math.max(20, Math.min(100, chartMargin.right));
      }
    }
  };

  public handleContextMenuClick = (args: ContextMenuClickEventArgs) => {
    if (args.chartType && this.chartInstance) {
      const chartArgs: ChartPopupArgs = {
        gridInstance: args.gridInstance,
        chartType: args.chartType,
        records: args.records
      };

      const chartModel: ChartModel = {
        primaryXAxis: {
          valueType: 'Category',
          labelRotation: 315
        },
        primaryYAxis: {
            title: 'Sales in amount',
            titleStyle: { size: '11px' }
        },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
      };

      const accumulationChartModel: AccumulationChartModel = {
        load: (args: IAccLoadedEventArgs) => {
          loadAccumulationChartTheme(args);
        }
      };

      chartModel.margin = accumulationChartModel.margin = { top: 20, bottom: 20, right: 20, left: 20 };

      const model: ChartChanges = {
        chart: chartModel,
        accumulationChart: accumulationChartModel
      };

      const categorySeries: CategorySeries = {
        category: ['Product', 'Year'],
        series: ['Online', 'Retail', 'Profit', 'Loss']
      };

      this.chartInstance.render(chartArgs, model, categorySeries);
    }
  };

  public categoryTemplate = (props: any): JSX.Element => {
    return (
      <div className="e-category-info">
        <div dangerouslySetInnerHTML={{ __html: props.CategoryIcon }} />
        <span>{props.Category}</span>
      </div>
    );
  };

  public productTemplate = (props: any): any => {
    return (
      <div className="e-product-info">
        <img
          src={`src/grid/images/product/${props.Image}.png`}
          alt={props.Product}
        />
        <span>{props.Product}</span>
      </div>
    );
  };

  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <GridComponent
            id="GridChart"
            ref={grid => this.gridInstance = grid}
            dataSource={sales}
            rowHeight={60}
            height={500}
            allowFiltering={true}
            filterSettings={{ type: 'Menu' }}
            allowSorting={true}
            allowMultiSorting={true}
            allowSelection={true}
            gridLines="Both"
            selectionSettings={{ type: 'Multiple' }}
            contextMenuItems={this.contextMenuItems}
            contextMenuClick={this.handleContextMenuClick.bind(this)}
            queryCellInfo={this.handleQueryCellInfo.bind(this)}
            created= {this.handleCreated.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective type="checkbox" width={50} freeze="Left" textAlign="Center" customAttributes={{class: 'grid-chart-checkbox-css'}}/>
              <ColumnDirective field="Product" headerText="Products" width={200} template={this.productTemplate.bind(this)} freeze="Left"/>
              <ColumnDirective field="Category" headerText="Categories" width={160} template={this.categoryTemplate.bind(this)} />
              <ColumnDirective field="Year" headerText="Year" textAlign="Right" width={140} />
              <ColumnDirective field="Online" headerText="Online" format="C2" textAlign="Right" width={160} />
              <ColumnDirective field="Retail" headerText="Retail" format="C2" textAlign="Right" width={160} />
              <ColumnDirective field="ProfitLoss" headerText="Profit/Loss" format="C2" textAlign="Right" width={200} />
              <ColumnDirective field="UnitsSold" headerText="Units Sold" textAlign="Right" width={160} />
              <ColumnDirective field="Revenue" headerText="Revenue" format="C2" textAlign="Right" width={160} freeze="Right" />
            </ColumnsDirective>
            <Inject services={[ContextMenu, Filter, Sort, Freeze]} />
          </GridComponent>
        </div>

        <div id="action-description">
            <p>
                This sample demonstrates how to visualize grid data in a chart using the context menu feature. You will need to enable the
                context menu feature to access this functionality. <code>Right-click</code> on any row,
                select your preferred chart type, and a dialog will appear showing that data as a chart based on your category and series.
            </p>
        </div>

        <div id="description">
            <p>
                The sample supports various chart types - <code>Line</code>, <code>Area</code>, <code>Column</code>,
                <code>Bar</code>, <code>Scatter</code>, <code>Pie</code> and their stacked variations.
                Charts are rendered using the <code>@syncfusion/ej2-grid-chart</code> package's <code>render</code> method,
                which requires category, series and optional chart properties.
            </p>
            <p>
              This example uses categories like 'Product' and 'Year' with series data for 'Online', 'Retail' and
              'Revenue' in the chart visualization.
            </p>
        </div>
      </div>
    );
  }
}
