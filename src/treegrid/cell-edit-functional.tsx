import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Edit, Toolbar, Page } from '@syncfusion/ej2-react-treegrid';
import { retailInventoryData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
const SAMPLE_CSS = `
  .status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-active {
  background: #dcfce7;
  color: #166534;
}

.status-low-stock {
  background: #fef3c7;
  color: #92400e;
}

.status-pending {
  background: #dbeafe;
  color: #1d4ed8;
}

.status-out-stock {
  background: #fee2e2;
  color: #991b1b;
}

.status-discontinued {
  background: #e5e7eb;
  color: #374151;
}`;
const CellEdit = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let treegridObj = useRef<TreeGridComponent>(null);
    const toolbarOptions: any = ["Add", "Delete", "Update", "Cancel"];
    const editSettings: any = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Cell"
    };
    const statusTemplate = (props:any): JSX.Element => {

    const statusClass =
      props.status === 'Active'
        ? 'status-active'
        : props.status === 'Low Stock'
        ? 'status-low-stock'
        : props.status === 'Pending Restock'
        ? 'status-pending'
        : props.status === 'Out of Stock'
        ? 'status-out-stock'
        : 'status-discontinued';

    return (
      <span className={`status-badge ${statusClass}`}>
        {props.status}
      </span>
    );
  };
    return (
        <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <TreeGridComponent
                    ref={treegridObj}
                    dataSource={retailInventoryData}
                    idMapping="productId"
                    parentIdMapping="parentId"
                    treeColumnIndex={1}
                    allowPaging={true}
                    toolbar={toolbarOptions}
                    editSettings={editSettings}
                    height="500"
                >
                    <ColumnsDirective>

                        <ColumnDirective
                            field="productId"
                            headerText="Product ID"
                            isPrimaryKey={true}
                            textAlign="Right"
                            width="100"
                            validationRules={{ required: true }}
                        />

                        <ColumnDirective
                            field="productName"
                            headerText="Product Name"
                            width="150"
                            validationRules={{ required: true }}
                        />

                        <ColumnDirective
                            field="supplier"
                            headerText="Supplier"
                            width="180"
                            validationRules={{ required: true }}
                        />

                        <ColumnDirective
                            field="stockQty"
                            headerText="Stock Qty"
                            textAlign="Right"
                            width="90"
                            editType="numericedit"
                            validationRules={{ required: true, number: true }}
                        />

                        <ColumnDirective
                            field="unitPrice"
                            headerText="Unit Price (₹)"
                            textAlign="Right"
                            width="120"
                            editType="numericedit"
                            validationRules={{ required: true, number: true }}
                        />

                        <ColumnDirective
                            field="status"
                            headerText="Status"
                            width="150"
                            template={statusTemplate}
                            editType="dropdownedit"
                            validationRules={{ required: true }}
                        />

                    </ColumnsDirective>

                    <Inject services={[Edit, Toolbar, Page]} />
                </TreeGridComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates cell editing in the TreeGrid, allowing users to quickly update individual field values
                    directly within the data view.
                </p>
            </div>
            <div id="description">
                <p>
                    Cell editing enables users to modify one cell at a time without opening a separate edit form. This mode is
                    enabled by setting
                    <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/treegrid/editsettings#mode">editSettings.mode</a></code>
                    double-clicking it, and changes are saved when the user presses the <strong>Enter</strong> key or shifts focus
                    to another cell.
                </p>

                <p>
                    This mode provides a streamlined way to update data while working within the TreeGrid. It can be used together
                    with features such as validation, custom editors, and formatting to deliver an efficient editing experience.
                </p>

                <p>Injecting Module:</p>
                <p>
                    TreeGrid functionality is provided through individual feature modules. To enable editing and toolbar support, we
                    need to inject <code>Edit</code> module into the <code>services</code>.
                </p>

                <p>
                    More information about TreeGrid cell editing can be found in the
                    <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/treegrid/editing/cell-editing">
                        documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default CellEdit;