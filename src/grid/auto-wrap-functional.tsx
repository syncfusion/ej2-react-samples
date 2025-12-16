import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, FilterSettingsModel, Filter, Sort } from '@syncfusion/ej2-react-grids';
import { inventoryData } from './data';
import { updateSampleSection } from '../common/sample-base';
import './sample.css';

function AutoWrap() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const filterSettings: FilterSettingsModel = {type: 'Menu'};
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={inventoryData} allowPaging={true} allowSorting={true} allowFiltering={true} filterSettings={filterSettings} pageSettings={{ pageCount: 5 }} allowTextWrap={true} height='400'>
                    <ColumnsDirective>
                        <ColumnDirective field='Inventor' headerText='Inventor' width='155'></ColumnDirective>
                        <ColumnDirective field='NumberofPatentFamilies' headerText='No of Patent Families' width='200' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='Country' headerText='Country' width='120' />
                        <ColumnDirective field='Active' headerText='Active' width='130' />
                        <ColumnDirective field='Mainfieldsofinvention' headerText='Main Fields of Invention (Primary patent technology areas)' width='180'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, Filter, Sort]} />
                </GridComponent>
                <div className="e-dsalign">Source:
                    <a href="https://en.wikipedia.org/wiki/List_of_prolific_inventors" target='_blank'>Wikipedia: List of Prolific inventors</a>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the Data Grid with the text wrap option enabled for both header and cell content. 
                    This setting ensures that long header text and cell values are fully visible by wrapping onto multiple lines instead of being truncated with an ellipsis.</p>
            </div>
            <div id='description'>
                <p>In this demo, the <strong>"Main Fields of Invention"</strong> column exceeds the available width, so its header and cell content are wrapped across multiple lines for better readability. Text wrapping is enabled by setting the grid’s <code><a aria-label="API link for documentation" target="_blank" className="code"
                    href="http://ej2.syncfusion.com/react/documentation/api/grid/#allowtextwrap">allowTextWrap</a></code> property to <strong>true</strong>, which automatically applies wrapping to both header and cell content.</p>
                <p>More information on text wrap can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/cell"> documentation section</a></p>
            </div>
        </div>
    )
}
export default AutoWrap;