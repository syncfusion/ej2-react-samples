import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { FabComponent } from "@syncfusion/ej2-react-buttons";
import { SampleBase } from '../common/sample-base';
import { Grid, EditSettingsModel, GridComponent } from '@syncfusion/ej2-react-grids';
import { Edit, Inject } from '@syncfusion/ej2-react-grids';
import './overview.css';


export class Overview extends SampleBase<{}, {}> {

    public grid: Grid;
    public editOptions: EditSettingsModel = { allowAdding: true, mode: 'Dialog' };

    public orders() {
        const orders: object[] = [];
        for (let i = 1; i < 10; i++) {
            orders.push({
                "OrderID": 10589 + i,
                "CustomerID": ["VINET", "TOMSP", "SUPRD", "CHOPS", "RICSU"][Math.floor(Math.random() * 5)],
                "Freight": (10.35 * i).toFixed(2),
                "ShippingCountry": ["France", "Brazil", "Switzerland", "Germany"][Math.floor(Math.random() * 4)]
            });
        }
        return orders;
    }
    public handleClick() {
        this.grid.addRecord();
    }
    render() {
        return (<div className="control-pane">
            <div className="control-section">
                <div className="fab-grid-container custom-index">
                    {/* Grid component rendered to add it as target for FAB. */}
                    <GridComponent id="Grid" className="fabgrid"
                        dataSource={this.orders()}
                        editSettings={this.editOptions} ref={grid => this.grid = grid}>
                        <Inject services={[Edit]} />
                    </GridComponent>
                    <FabComponent id="fab" title="Add Record"
                        iconCss="fab-icons fab-icon-add" target="#Grid"
                        onClick={this.handleClick = this.handleClick.bind(this)}
                    ></FabComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the usage of the Floating Action Button (FAB) component to add a new record to a DataGrid.</p>
            </div>
            <div id="description">
                <p>
                    The FAB is a button that appears in front of all screen contents and performs the primary action. In this example, FAB is positioned at the bottom left of its target DataGrid to perform the add new record action.
                </p>
            </div>
        </div>
        );
    }
}
