import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, ColumnChooser, ToolbarItems, Inject } from '@syncfusion/ej2-react-treegrid';
import { stackedData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { ColumnChooserSettingsModel } from '@syncfusion/ej2-react-grids';
import { TreeView, TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './stacked-header.css';

const Stacked = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const toolbar: any = ['ColumnChooser'];
  const columnChooserSettings: any = { template: Template, headerTemplate: HeaderTemplate, footerTemplate: FooterTemplate }
  function HeaderTemplate(): any {
    return (
      <div>

        <span id="column-chooser-text" style={{ position: 'relative', left: '5px' }}>Column Options</span>
      </div>
    );
  }

  // Render TreeView in the column chooser's Content
  function Template(props: any): any {
    const parentNodes = [
      { id: 1, name: 'Order Details', hasChild: true, expanded: true },
      { id: 2, name: 'Shipment Details', hasChild: true, expanded: true },
      { id: 3, name: 'Price Details', hasChild: true, expanded: true },
    ];
    let treeData: { [key: string]: Object }[] = [];

    if (props.columns && props.columns.length) {
      treeData = props.columns.map((column: any) => {
        let parentId: any;
        switch (column.field) {
          case 'orderID':
          case 'orderName':
          case 'orderDate':
            parentId = 1;
            break;
          case 'shipMentCategory':
          case 'shippedDate':
          case 'units':
            parentId = 2;
            break;
          case 'unitPrice':
          case 'price':

            parentId = 3;
            break;
          default:
            break;
        }
        return {
          id: column.uid,
          name: column.headerText,
          pid: parentId,
          isChecked: column.visible
        };
      });
      const uniquePids: string[] = [];
      treeData.forEach((item: any) => {
        if (!uniquePids.includes(item.pid)) {
          uniquePids.push(item.pid);
        }
      });
      const filteredParents = parentNodes.filter((parent: any) => uniquePids.includes(parent.id));
      treeData.push(...filteredParents);
    } else {
      treeData = [];
    }

    const fields = { dataSource: treeData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };

    React.useEffect(() => {
      if (treeObj) {
        treeObj.setProperties({ fields });
      }
    }, [props.columns]);

    return (
      <div>

        {props.columns && props.columns.length ? (<TreeViewComponent fields={fields} cssClass="no-border" showCheckBox={true} nodeClicked={nodeCheck.bind(this)} keyPress={nodeCheck.bind(this)} ref={(treeview) => { treeObj = treeview; }} />) : (<div className="no-record-text">No Matches Found</div>)}
      </div>
    );
  }

  function FooterTemplate(): any {
    return (
      <div id="columnChooserFooter">
        <ButtonComponent onClick={columnChooserSubmit}>Apply</ButtonComponent>
        <ButtonComponent onClick={columnChooserClose}>Close</ButtonComponent>
      </div>
    );
  }

  // Handle checking/unchecking nodes in the TreeView (column chooser)
  function nodeCheck(args: any): void {
    let checkedNode: any = [args.node];
    if (args.event.target.classList.contains('e-fullrow') || args.event.key == "Enter") {
      let getNodeDetails: any = treeObj.getNode(args.node);
      if (getNodeDetails.isChecked == 'true') {
        treeObj.uncheckAll(checkedNode);
      } else {
        treeObj.checkAll(checkedNode);
      }
    }
  }
  function columnChooserClose() {
    (treegridInstance.grid.columnChooserModule as any).hideDialog();
  }

  // Apply the column chooser selection
  function columnChooserSubmit() {
    const checkedElements: any = [];
    const uncheckedElements: any = [];
    var showColumns: any = treegridInstance.getVisibleColumns().filter(function (column: any) { return (column.showInColumnChooser === true); });
    showColumns = showColumns.map(function (col: any) { return col.headerText; });
    const treeItems = document.querySelectorAll('.e-list-item');

    treeItems.forEach(item => {
      const itemDetails = treeObj.getNode(item);
      if (!itemDetails.hasChildren) {
        if (item.getAttribute('aria-checked') === 'true') {
          checkedElements.push(itemDetails.text);
        } else {
          uncheckedElements.push(itemDetails.text);
        }
      }
    });
    showColumns = showColumns.filter((col: any) => !uncheckedElements.includes(col));
    checkedElements.forEach(item => {
      if (!showColumns.includes(item)) {
        showColumns.push(item);
      }
    });
    var columnsToUpdate: any = { visibleColumns: showColumns, hiddenColumns: uncheckedElements };
    treegridInstance.grid.columnChooserModule.changeColumnVisibility(columnsToUpdate);
  }
  let treeObj: TreeView;
  let treegridInstance: TreeGridComponent;
  return (
    <div className="control-pane">
      <div className="control-section">
        <TreeGridComponent
          dataSource={stackedData}
          id="TreeGrid"
          ref={(treegrid) => { treegridInstance = treegrid }}
          treeColumnIndex={1}
          childMapping="subtasks"
          height="350"
          allowPaging={true}
          pageSettings={{ pageCount: 5 }}
          showColumnChooser={true}
          columnChooserSettings={columnChooserSettings}
          toolbar={toolbar}
          clipMode='EllipsisWithTooltip'
        >
          <ColumnsDirective>
            <ColumnDirective
              columns={[
                {
                  field: "orderID",
                  headerText: "Order ID",
                  width: 90,
                  textAlign: "Right",
                  showInColumnChooser: false,
                },
                {
                  field: "orderName",
                  headerText: "Order Name",
                  width: 190,
                  textAlign: "Left",
                },
                {
                  field: "orderDate",
                  headerText: "Order Date",
                  width: 110,
                  textAlign: "Right",
                  format: "yMd",
                },
              ]}
              headerText="Order Details"
              textAlign="Center"
            ></ColumnDirective>
            <ColumnDirective
              columns={[
                {
                  field: "shipMentCategory",
                  headerText: "Shipment Category",
                  width: 150,
                  textAlign: "Left",
                },
                {
                  field: "shippedDate",
                  headerText: "Shipped Date",
                  width: 120,
                  textAlign: "Right",
                  format: "yMd",
                },
                {
                  field: "units",
                  headerText: "Units",
                  width: 80,
                  textAlign: "Right",
                },
              ]}
              headerText="Shipment Details"
              textAlign="Center"
            ></ColumnDirective>
            <ColumnDirective
              columns={[
                {
                  field: "unitPrice",
                  headerText: "Price per unit",
                  format: "C2",
                  type: "number",
                  textAlign: "Right",
                  width: 120,
                },
                {
                  field: "price",
                  headerText: "Total Price",
                  width: 115,
                  format: "C",
                  textAlign: "Right",
                  type: "number",
                },
              ]}
              headerText="Price Details"
              textAlign="Center"
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, ColumnChooser,]} />
        </TreeGridComponent>
      </div>
      <div id="action-description">
        <p>This example demonstrates how to use stacked headers and a customizable column chooser in the Tree Grid component.</p>
      </div>
      <div id='description'>
        <p>The stacked header category explains the use of the <code>columns -&gt; column</code> property to group columns under common headers, facilitating a clear and structured display of data for enhanced readability and user navigation. It categorizes columns into three groups: Order Details, comprising Order ID, Order Name, and Order Date; Shipment Details, comprising Shipment Category, Shipped Date, and Units; and Price Details, comprising Price per Unit and Total Price.</p>
        <p>The <b>Column Chooser Template</b> category highlights a customizable layout that allows users to manage column visibility, offering flexibility and improving the overall user experience.</p>
        <p>Key properties include <code>columnChooserSettings -&gt; headerTemplate</code> for a custom header layout, <code>columnChooserSettings -&gt; template</code> for a custom content layout,<code>columnChooserSettings -&gt; footerTemplate</code> for a custom footer layout, and <code>enableSearching</code> to enable or disable search functionality.</p>
        <p>
          More information on the stacked header configuration can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/columns/column-resizing#resize-stacked-column">documentation</a> section.
        </p>
      </div>
    </div>
  );
}
export default Stacked;