import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, ContextMenu, Filter, Sort, ContextMenuClickEventArgs, ContextMenuItem, QueryCellInfoEventArgs, Freeze } from '@syncfusion/ej2-react-grids';
import { sales } from './data';
import { CategorySeries, ChartChanges, ChartPopupArgs, GridChart, UpdateChartArgs } from '@syncfusion/ej2-grid-chart';
import { AccumulationChartModel, ChartModel, IAccLoadedEventArgs, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { loadAccumulationChartTheme, loadChartTheme } from './grid-chart-theme-color';
import { isNullOrUndefined } from '@syncfusion/ej2/base';
import './chart.css';
import { updateSampleSection } from '../common/sample-base';

function GridChartIntegration() {
  let gridRef: GridComponent | null;
  let chartInstanceRef: GridChart | null;
  React.useEffect(() => {
      updateSampleSection();
  }, []);
  const contextMenuItems: ContextMenuItem[] = [
    'Bar', 'StackingBar', 'StackingBar100',
    'Pie',
    'Column', 'StackingColumn', 'StackingColumn100',
    'Line', 'StackingLine', 'StackingLine100',
    'Area', 'StackingArea', 'StackingArea100',
    'Scatter'
  ];

  const handleQueryCellInfo = (args: QueryCellInfoEventArgs) => {
    if (args.column && args.column.field === 'ProfitLoss') {
      const profit = (args.data as any).ProfitLoss;
      if (profit < 0) {
        args.cell!.classList.add('e-gridchart-sales-loss');
      } else {
        args.cell!.classList.add('e-gridchart-sales-profit');
      }
    }
  };

  const updateChartSettings = (args: UpdateChartArgs): void => {
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

  const categoryTemplate = (props: any): JSX.Element => {
    return (
      <div className="e-category-info">
        <div dangerouslySetInnerHTML={{ __html: props.CategoryIcon }} />
        <span>{props.Category}</span>
      </div>
    );
  };

  const productTemplate = (props: any): any => {
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

  const handleCreated = (): void => {
    chartInstanceRef = new GridChart({
      enablePropertyPanel: true,
      allowExport: true,
      enableRtl: gridRef.enableRtl,
      locale: gridRef.locale,
      updateChartSettings: updateChartSettings
    });
  }
 
  const handleContextMenuClick = (args: ContextMenuClickEventArgs) => {
    if (args.chartType && chartInstanceRef) {
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
        series: ['Online', 'Retail', 'Revenue']
      };

      chartInstanceRef.render(chartArgs, model, categorySeries);
    }
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <GridComponent
          id="GridChart"
          ref={grid => gridRef = grid}
          dataSource={sales}
          height={500}
          allowFiltering={true}
          filterSettings={{ type: 'Menu' }}
          allowSorting={true}
          allowMultiSorting={true}
          allowSelection={true}
          selectionSettings={{ type: 'Multiple' }}
          contextMenuItems={contextMenuItems}
          gridLines="Both"
          contextMenuClick={handleContextMenuClick}
          queryCellInfo={handleQueryCellInfo}
          created= {handleCreated}
        >
          <ColumnsDirective>
          <ColumnDirective type="checkbox" width={50} freeze="Left" textAlign="Center" customAttributes={{class: 'grid-chart-checkbox-css'}}/>
            <ColumnDirective field="Product" headerText="Products" width={200} template={productTemplate} freeze="Left"/>
            <ColumnDirective field="Category" headerText="Categories" width={160} template={categoryTemplate} />
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

export default GridChartIntegration;
