import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar, Page, QueryCellInfoEventArgs } from '@syncfusion/ej2-react-grids';
import { machineDataList, MachineData } from './datasource';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

function AnamolyDetection() {
    let gridInstance!: GridComponent;
    let AIgeneratedData: MachineData[] = [];
    const toolbarTemplate = () => {
        return <ButtonComponent id='anomaly' isPrimary={true} onClick={DetectAnomalyData}>Detect Anomaly Data</ButtonComponent>
    };
    const toolbarOptions = [
        { template: toolbarTemplate }
    ];

    function DetectAnomalyData() {
        gridInstance.showSpinner();
        DetectAnamolyData();
    }

    function DetectAnamolyData() {
        const gridReportJson: string = JSON.stringify(gridInstance.dataSource);
        const userInput: string = generatePrompt(gridReportJson);
        let aiOutput: any = (window as any).getAzureChatAIRequest({ messages: [{ role: 'user', content: userInput }] });
        aiOutput.then((result: any) => {
            result = result.replace('```json', '').replace('```', '');
            AIgeneratedData = JSON.parse(result);
            gridInstance.hideSpinner();
            if (AIgeneratedData.length) {
                gridInstance.showColumns(['Anomaly Description']);
                for (let i: number = 0; i < AIgeneratedData.length; i++) {
                    const item = AIgeneratedData[i];
                    gridInstance.setRowData(item.MachineID, item);
                }
            }
        });
    }

    function generatePrompt(data: string): string {
        return `Given the following datasource are bounded in the Grid table\n\n${data}.\n Return the anomaly data rows (ie. pick the ir-relevant datas mentioned in the corresponding table) present in the table mentioned above as like in the same format provided do not change the format. Example: Watch out the production rate count and the factors that is used to acheive the mentioned production rate(Temprature, Pressure, Motor Speed) If the production rate is not relevant to the concern factors mark it as anomaly Data. If it is anomaly data then due to which column data it is marked as anomaly that particular column name should be updated in the AnomalyFieldName. Also Update the AnomalyDescription stating that due to which reason it is marked as anomaly a short description. Example if the data is marked as anomaly due to the Temperature column, Since the mentioned temperature is too high than expected, it is marked as anomaly data.\n\nGenerate an output in JSON format only and Should not include any additional information or contents in response`;
    }

    function CustomizeCell(args: QueryCellInfoEventArgs) {
        if (AIgeneratedData != null && AIgeneratedData.length > 0) {
            let isAnamolyData: boolean = false;
            AIgeneratedData.map((e: any) => {
                if (!isNullOrUndefined(e.AnomalyFieldName) && e.MachineID === (args.data as MachineData).MachineID &&
                    (e.AnomalyFieldName === args.column?.field || args.column?.field === 'AnomalyDescription')) {
                    isAnamolyData = true;
                }
            });
            if (isAnamolyData) {
                args.cell?.classList.add('anomaly-cell');
                args.cell?.classList.remove('normal-cell');
            }
        }
        else if (args.column?.field === 'AnomalyDescription') {
            args.cell?.classList.add('normal-cell');
        }
    }


    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='container'>
                    <GridComponent
                        id='Grid'
                        ref={grid => gridInstance = grid as GridComponent}
                        dataSource={machineDataList}
                        toolbar={toolbarOptions}
                        queryCellInfo={CustomizeCell}
                        enableHover={false}
                        enableStickyHeader={true}
                        allowTextWrap={true}
                        rowHeight={75}
                        height={450}
                    >
                        <ColumnsDirective>
                            <ColumnDirective field='MachineID' isPrimaryKey={true} headerText='Machine ID' textAlign='Right' width={85} />
                            <ColumnDirective field='Temperature' headerText='Temperature (C)' textAlign='Right' width={120} />
                            <ColumnDirective field='Pressure' headerText='Pressure (psi)' textAlign='Right' width={100} />
                            <ColumnDirective field='Voltage' headerText='Voltage (V)' textAlign='Right' width={100} />
                            <ColumnDirective field='MotorSpeed' headerText='Motor Speed (rpm)' textAlign='Right' width={140} />
                            <ColumnDirective field='ProductionRate' headerText='Production Rate (units/hr)' textAlign='Right' width={140} />
                            <ColumnDirective field='AnomalyDescription' visible={false} headerText='Anomaly Description' width={290} />
                        </ColumnsDirective>
                        <Inject services={[Toolbar, Page]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how the syncfusion React DataGrid, enhanced with AI, can detect anomalies within
                        its data.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id="description">
                    <p>In this example, the DataGrid displays details like Machine ID, Voltage, Pressure, Temperature, Motor Speed, and
                        Production Rate. AI analyzes this data to identify unusual points and explains why they are considered
                        anomalies. When you press the "Detect Anomaly" button, the grid updates to display the anomaly details.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AnamolyDetection;