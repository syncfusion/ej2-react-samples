import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, FilterSettingsModel,
 Filter, DetailRow,
} from '@syncfusion/ej2-react-grids';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { productDetail } from './data';
import { SampleBase } from '../common/sample-base';
import './product-catalog.css';

export class ProductCatalog extends SampleBase<{}, {}> {
  public filterSettings: FilterSettingsModel = { type: 'Excel' };

  // ============================================================================
  // FILTER TEMPLATE
  // ============================================================================
  private numElement: HTMLInputElement;
  public templateOptionsNumericTextBox: any = {
    create: () => {
      const container = document.createElement('div');
      const label = document.createElement('div');
      label.classList.add('e-cus-label');
      this.numElement = document.createElement('input') as HTMLInputElement;
      this.numElement.classList.add('e-fltrtemp-focus');
      container.append(label);
      container.append(this.numElement);
      return container;
    },
    write: () => {
      const numericTextBox = new NumericTextBox({ format: 'n' });
      numericTextBox.appendTo(this.numElement);
    },
  };

  // ============================================================================
  // COLUMN TEMPLATES
  // ============================================================================
  public productColumnTemplate = (props) => (
  <div className="product-cell">
    <img
      src={`src/grid/images/products/${props.ProductName}.png`}
      alt={props.ProductName}
      className="product-image"
    />
    <div className="product-copy">
      <div className="product-name">{props.ProductName}</div>
      <div className="product-meta">
        <span className="product-description">{props.Description}</span>
        <span className="product-sku">SKU: {props.SKU}</span>
      </div>
    </div>
  </div>
);

public salesColumnTemplate = (props) => {
  const trend =
    ((props.SalesMonth3 - props.SalesMonth2) / Math.max(props.SalesMonth2, 1)) * 100;
  return (
    <div className="sales-cell">
      <div className="sales-number">{props.SalesMonth3}</div>
      <div className={`sales-growth ${trend >= 0 ? 'positive' : 'negative'}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
      </div>
    </div>
  );
};

public statusColumnTemplate = (props) => (
  <div className="status-cell">
    <span
      className={`status-badge ${
        props.Status === 'In Stock' ? 'status-badge-success' : 'status-badge-error'
      }`}
    >
      {props.Status}
    </span>
    <div className="status-units">{props.Units} units</div>
  </div>
);

// ============================================================================
// HEADER TEMPLATE
// ============================================================================
public headerIcons = {
  ProductName: 'e-icons e-description',
  Category: 'e-icons e-folder',
  SalesMonth3: 'e-icons e-chart',
  Price: 'e-icons e-money',
};

public headerTemplate = (props) => {
  const iconClass = this.headerIcons[props.field] || 'e-icons e-list';
  return (
    <div className="custom-header">
      <span className={iconClass}></span>
      <span className="header-text">{props.headerText}</span>
    </div>
  );
};

  // ============================================================================
  // DETAIL (EXPAND ROW) TEMPLATE
  // ============================================================================
  public detailTemplate = (props: any) => {
    const discount = Math.round(
      ((props.OriginalPrice - props.Price) / props.OriginalPrice) * 100
    );

    return (
      <div className="detail-page">
        <div className="detail-top">
          <div className="product-detail-wrapper">
            <div className="detail-grid">
              {/* Product Description */}
              <div className="e-card">
                <div className="e-card-header">
                  <div className="e-card-header-caption">
                    <div className="e-card-title">Product Description</div>
                  </div>
                </div>
                <div className="e-card-content">
                  <div className="product-description-text">{props.ProductDescription}</div>
                  <h4 className="sub-title">Key Highlights</h4>
                  <ul className="highlight-list">
                    {(props.Highlights || []).map((item: any, index: number) => (
                      <li key={index}>
                        <span className="bullet"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="e-card">
                <div className="e-card-header">
                  <div className="e-card-header-caption">
                    <div className="e-card-title">Technical Specifications</div>
                  </div>
                </div>
                <div className="e-card-content">
                  {Object.entries(props.Specifications || {}).map(([key, value]: [string, any]) => (
                    <div className="info-row" key={key}>
                      <span>{key}</span>
                      <span>{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Details */}
              <div className="e-card">
                <div className="e-card-header">
                  <div className="e-card-header-caption">
                    <div className="e-card-title">Pricing Details</div>
                  </div>
                </div>
                <div className="e-card-content">
                  <div className="info-row">
                    <span>Current Price</span>
                    <span className="current-price">
                      ${props.Price.toLocaleString()}
                    </span>
                  </div>
                  <div className="info-row">
                    <span>Original Price</span>
                    <span className="original-price">
                      ${props.OriginalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="info-row">
                    <span>Discount</span>
                    <span className="discount-price">{discount}%</span>
                  </div>
                  <div className="info-row">
                    <span>Cost Price</span>
                    <span className="cost-price">
                      ${props.CostPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="info-row">
                    <span>Profit Margin</span>
                    <span className="profit-price">{props.ProfitMargin}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <GridComponent
            dataSource={productDetail}
            height="520px"
            allowSorting={true}
            allowFiltering={true}
            filterSettings={this.filterSettings}
            detailTemplate={this.detailTemplate}
          >
            <ColumnsDirective>
              <ColumnDirective field="ProductID" headerText="ID" width="90"  isPrimaryKey={true} filterBarTemplate={this.templateOptionsNumericTextBox}/>
                      <ColumnDirective field= 'ProductName'
                              headerText= 'Product'
                              width= "150"
                              defaultValue= 'MacBook Pro 14'
                              template= {this.productColumnTemplate}
                              textAlign= 'Center'
                              ></ColumnDirective>
                      <ColumnDirective field= 'Category'
                              headerText= 'Category'
                              width= "110"
                              textAlign= 'Center'
                              ></ColumnDirective>
                          <ColumnDirective headerText="Sales" textAlign="Center" template ={this.salesColumnTemplate} width="90" />
                          <ColumnDirective field="Price" headerText="Price" width="80" textAlign="Right" format="C2" />
                          <ColumnDirective field="Status" headerText="Status" width="120" textAlign="Center" template={this.statusColumnTemplate}/>
            </ColumnsDirective>
            <Inject services={[Sort, Filter, DetailRow]} />
          </GridComponent>
        </div>

      <div id="action-description">
        <p>
          This sample demonstrates a product catalog built using the Syncfusion® React Data Grid with column templates and a detail template. Each row displays product information through customized templates, including product details, sales trends, pricing, and stock status.
        </p>
      </div>

      <div id="description">
        <p>
          The Syncfusion® React Data Grid demonstrates the use of detail and column templates to display product inventory. Custom templates are applied to columns such as "Product", "Sales", and "Status".
        </p>
        <p>
          Rows can be expanded to display a detail section using the Syncfusion® Card layout. This section presents product information including detailed descriptions, specifications, and pricing details.
        </p>
        <p>
          <strong>Injecting Module:</strong>
        </p>
        <p>
          Features of the Grid component are segregated into individual feature-wise modules. To use the detail row feature, inject the <code>DetailRow</code> module into the <code>services</code> collection.
        </p>
        <p>
           More information on the detail template can be found in this
           <a target="_blank" aria-label="API link for documentation"
                      href="https://ej2.syncfusion.com/react/documentation/grid/row/detail-template/"> documentation section</a>.
        </p>
        <p>Looking for the full React Data Grid component overview, features, pricing, and documentation? Visit our
          <a target="_blank"
            href="https://www.syncfusion.com/react-components/react-data-grid"> React Data Grid component</a> page.</p>
       </div>
      </div>
    );
  }
}
