import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SheetsDirective, SheetDirective, ColumnsDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RowsDirective, RowDirective, CellsDirective, CellDirective } from '@syncfusion/ej2-react-spreadsheet';
import { ImageModel, ColumnDirective, SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import { updateSampleSection } from '../common/sample-base';
import './spreadsheet.css';
import { base64ImageUrl } from './data';

/**
 * Image sample with import and export support.
 */

function Image() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let spreadsheet: SpreadsheetComponent;
    //To insert image in a cell
    const image: ImageModel[] = [{
        src: base64ImageUrl,
        height: 149, width: 907, top: 20, left: 20
    }];
    function onCreated(): void {
        spreadsheet.merge('B2:F2');
        spreadsheet.merge('B4:F4');
        spreadsheet.cellFormat({ fontSize: '28pt', fontFamily: 'Arial', color: '#3a3838', verticalAlign: 'middle', textAlign: 'center' }, 'B4');
        spreadsheet.cellFormat({ fontSize: '16pt', fontFamily: 'Calibri', color: '#757171', verticalAlign: 'middle' }, 'B6:F6');
        spreadsheet.cellFormat({ fontSize: '14pt', fontFamily: 'Calibri', color: '#757171', verticalAlign: 'middle', textAlign: 'center' }, 'B7:B13');
        spreadsheet.cellFormat({ fontSize: '14pt', color: '#000000', verticalAlign: 'middle' }, 'C7:F13');
        spreadsheet.setBorder({ border: '1px solid #e0e0e0' }, 'B7:F13', 'Horizontal');
    }
    return (
        <div className='control-pane'>
            <div className='control-section spreadsheet-control'>
                <SpreadsheetComponent openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open'
                    saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save'
                    ref={(ssObj) => { spreadsheet = ssObj }} created={onCreated.bind(this)}
                    showRibbon={false} showFormulaBar={false} >
                    <SheetsDirective>
                        <SheetDirective name='Weekly Diet Planner' showGridLines={false} selectedRange='B4'>
                            <RowsDirective>
                                <RowDirective height={20}>
                                </RowDirective>
                                <RowDirective height={150}>
                                    <CellsDirective>
                                        <CellDirective index={1} image={image}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={20}>
                                </RowDirective>
                                <RowDirective height={50}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Weekly Diet Planner'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={20}>
                                </RowDirective>
                                <RowDirective height={50}>
                                    <CellsDirective>
                                        <CellDirective index={2} value='BREAKFAST'></CellDirective>
                                        <CellDirective value='LUNCH'></CellDirective>
                                        <CellDirective value='DINNER'></CellDirective>
                                        <CellDirective value='SNACKS'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={50}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='S'></CellDirective>
                                        <CellDirective value='Bacon, Eggs, and Toast'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={50}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='M'></CellDirective>
                                        <CellDirective value='Strawberry Waffles'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={50}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='T'></CellDirective>
                                        <CellDirective value='Pancakes and Maple Syrup'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={50}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='W'></CellDirective>
                                        <CellDirective value='Sausage and Egg Sandwich'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={50}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='T'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={50}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='F'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={50}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='S'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                            </RowsDirective>
                            <ColumnsDirective>
                                <ColumnDirective width={20}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={208}></ColumnDirective>
                                <ColumnDirective width={200}></ColumnDirective>
                                <ColumnDirective width={200}></ColumnDirective>
                                <ColumnDirective width={200}></ColumnDirective>
                            </ColumnsDirective>
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample explains about the image feature by using weekly diet planner as an example. You can change the height and width of the picture by resizing and move it to another position by drag and drop.
                </p>
            </div>
            <div id="description">
                <p>
                    In this demo, the image has been inserted in the specific cell position by using the <code>image</code> property in the cell object. You can also insert an image by using the <code>insertImage</code> method.
                    To enable or disable this feature use the <code>allowImage</code> property in Spreadsheet.
                </p>
                <p>
                    This sample is configured with import and export options. Use <b>Ctrl + O</b> to open an excel file and <b>Ctrl + S</b> to save an excel file with a picture.
                </p>
                <p>
                    More information about the image can be found in this <a target="_blank" href=
                        "https://ej2.syncfusion.com/react/documentation/spreadsheet/illustrations/#image"> documentation</a> section.
                </p>
            </div>
        </div>
    )
}
export default Image;
