import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    Day, Week, WorkWeek, Month, Agenda, ScheduleComponent, ResourcesDirective, ResourceDirective,
    Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import './resource.css';
import { SampleBase } from '../common/sample-base';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

export class Resource extends SampleBase<{}, {}> {
    private scheduleObj: ScheduleComponent;
    private ownerOneObj: CheckBoxComponent;
    private ownerTwoObj: CheckBoxComponent;
    private ownerThreeObj: CheckBoxComponent;
    private data: Object[] = extend([], (dataSource as any).resourceSampleData, null, true) as Object[];
    private resourceData: Object[] = [
        { Text: 'Margaret', Id: 1, Color: '#ea7a57' },
        { Text: 'Robert', Id: 2, Color: '#df5286' },
        { Text: 'Laura', Id: 3, Color: '#865fcf' }
    ];

    private onChange(): void {
        let predicate: Predicate;
        let proxy = this;
        let checkBoxes: CheckBox[] = [this.ownerOneObj, this.ownerTwoObj, this.ownerThreeObj];
        checkBoxes.forEach((checkBoxObj: CheckBox) => {
            if (checkBoxObj.checked) {
                if (predicate) {
                    predicate = predicate.or('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                } else {
                    predicate = new Predicate('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                }
            }
        });
        proxy.scheduleObj.eventSettings.query = new Query().where(predicate);
    }

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent cssClass='resource' width='100%' height='650px' selectedDate={new Date(2018, 5, 5)}
                            ref={schedule => this.scheduleObj = schedule}
                            eventSettings={{
                                dataSource: this.data,
                            }} >
                            <ResourcesDirective>
                                <ResourceDirective field='OwnerId' title='Owners' name='Owners' allowMultiple={true}
                                    dataSource={this.resourceData} textField='Text' idField='Id' colorField='Color'>
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
                                        <CheckBoxComponent ref={checkboxObj => this.ownerOneObj = checkboxObj} value='1'
                                            id='margaret' cssClass='margaret' checked={true} label='Margaret'
                                            change={this.onChange.bind(this)} ></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <CheckBoxComponent ref={checkboxObj => this.ownerTwoObj = checkboxObj} value='2'
                                            id='robert' cssClass='robert' checked={true} label='Robert'
                                            change={this.onChange.bind(this)} ></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <CheckBoxComponent ref={checkboxObj => this.ownerThreeObj = checkboxObj} value='3'
                                            id='laura' cssClass='laura' checked={true} label='Laura'
                                            change={this.onChange.bind(this)} ></CheckBoxComponent>
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
                    filtered event data of selected resources to the <code>Query</code> option of the <code>Eventsettings</code>.</p>
                </div>
            </div>
        );
    }
}