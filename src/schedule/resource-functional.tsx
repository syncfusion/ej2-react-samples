import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    Day, Week, WorkWeek, Month, Agenda, ScheduleComponent, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import './resource.css';
import { updateSampleSection } from '../common/sample-base';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

function Resource() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let scheduleObj: ScheduleComponent;
    let ownerOneObj: CheckBoxComponent;
    let ownerTwoObj: CheckBoxComponent;
    let ownerThreeObj: CheckBoxComponent;
    const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).resourceSampleData, null, true) as Record<string, any>[];
    const resourceData: Record<string, any>[] = [
        { Text: 'Margaret', Id: 1, Color: '#ea7a57' },
        { Text: 'Robert', Id: 2, Color: '#df5286' },
        { Text: 'Laura', Id: 3, Color: '#865fcf' }
    ];

    function onChange(): void {
        let predicate: Predicate;
        let checkBoxes: CheckBox[] = [ownerOneObj, ownerTwoObj, ownerThreeObj];
        checkBoxes.forEach((checkBoxObj: CheckBox) => {
            if (checkBoxObj.checked) {
                if (predicate) {
                    predicate = predicate.or('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                } else {
                    predicate = new Predicate('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                }
            }
        });
        scheduleObj.eventSettings.query = new Query().where(predicate);
    }

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-9 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent cssClass='resource' width='100%' height='650px' selectedDate={new Date(2021, 5, 6)}
                        ref={schedule => scheduleObj = schedule} eventSettings={{ dataSource: data }} >
                        <ResourcesDirective>
                            <ResourceDirective field='OwnerId' title='Owners' name='Owners' allowMultiple={true}
                                dataSource={resourceData} textField='Text' idField='Id' colorField='Color'>
                            </ResourceDirective>
                        </ResourcesDirective>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div className='col-lg-3 property-section'>
                <PropertyPane title='Properties'>
                    <table id="property" title="Resources" className='property-panel-table'>
                        <tbody>
                            <tr>
                                <td>
                                    <CheckBoxComponent ref={checkboxObj => ownerOneObj = checkboxObj} value='1'
                                        id='margaret' cssClass='margaret' checked={true} label='Margaret'
                                        change={onChange.bind(this)} ></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CheckBoxComponent ref={checkboxObj => ownerTwoObj = checkboxObj} value='2'
                                        id='robert' cssClass='robert' checked={true} label='Robert'
                                        change={onChange.bind(this)} ></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CheckBoxComponent ref={checkboxObj => ownerThreeObj = checkboxObj} value='3'
                                        id='laura' cssClass='laura' checked={true} label='Laura'
                                        change={onChange.bind(this)} ></CheckBoxComponent>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This example demonstrates how to dynamically show or hide the appointments of resources on Scheduler based on
                    the resource selection.</p>
            </div>
            <div id="description">
                <p>In this example, the resource appointments are dynamically shown or hidden on the Scheduler, by passing the
                    filtered event data of selected resources to the <code>query</code> option of the <code>eventSettings</code>.</p>
            </div>
        </div>
    );
}
export default Resource;